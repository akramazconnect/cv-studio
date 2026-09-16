import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'

/**
 * Dev-only API used by the "Deploy" panel in the app.
 * Runs inside the Vite dev server, so it only ever exists on your machine.
 *
 *   GET  /__api/status   → git branch / remote / dirty state
 *   POST /__api/save     → writes the current editor state to src/content/saved.json
 *   POST /__api/deploy   → save + git add/commit/push  (GitHub Actions then publishes)
 */

const SAVED_FILE = 'src/content/saved.json'

const git = (cwd: string, args: string[]) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

const tryGit = (cwd: string, args: string[]) => {
  try {
    return git(cwd, args)
  } catch {
    return ''
  }
}

const readBody = (req: NodeJS.ReadableStream) =>
  new Promise<string>((res, rej) => {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => res(body))
    req.on('error', rej)
  })

export default function devApi(): Plugin {
  return {
    name: 'cv-studio-dev-api',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root

      const json = (res: import('node:http').ServerResponse, status: number, payload: unknown) => {
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(payload))
      }

      const status = () => {
        const branch = tryGit(root, ['branch', '--show-current'])
        const remote = tryGit(root, ['remote', 'get-url', 'origin'])
        const dirty = tryGit(root, ['status', '--porcelain']) !== ''
        const lastCommit = tryGit(root, ['log', '-1', '--format=%s · %cr'])
        const pagesUrl = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)/)
        return {
          branch,
          remote,
          dirty,
          lastCommit,
          pagesUrl: pagesUrl ? `https://${pagesUrl[1]}.github.io/${pagesUrl[2]}/` : '',
          repoUrl: remote.replace(/\.git$/, ''),
        }
      }

      const save = (state: unknown) => {
        const file = resolve(root, SAVED_FILE)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, JSON.stringify(state, null, 2) + '\n', 'utf8')
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/__api/')) return next()
        const log: string[] = []
        try {
          if (req.url === '/__api/status' && req.method === 'GET') return json(res, 200, status())

          if (req.method !== 'POST') return json(res, 405, { error: 'POST only' })
          const body = JSON.parse((await readBody(req)) || '{}') as { state?: unknown; message?: string; remote?: string }

          if (req.url === '/__api/save') {
            save(body.state ?? {})
            return json(res, 200, { ok: true, log: [`Saved ${SAVED_FILE}`] })
          }

          if (req.url === '/__api/deploy') {
            if (body.remote && !tryGit(root, ['remote', 'get-url', 'origin'])) {
              git(root, ['remote', 'add', 'origin', body.remote])
              log.push(`Remote added: ${body.remote}`)
            }
            if (!tryGit(root, ['remote', 'get-url', 'origin'])) {
              return json(res, 400, { error: 'NO_REMOTE', log })
            }
            save(body.state ?? {})
            log.push(`Saved ${SAVED_FILE}`)
            git(root, ['add', '-A'])
            if (tryGit(root, ['status', '--porcelain']) !== '') {
              const msg = body.message || `Update CV — ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`
              git(root, ['commit', '-m', msg])
              log.push(`Committed: ${msg}`)
            } else {
              log.push('Nothing new to commit')
            }
            const branch = tryGit(root, ['branch', '--show-current']) || 'main'
            const out = execFileSync('git', ['push', '-u', 'origin', branch], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
            log.push(`Pushed to origin/${branch}`)
            if (out.trim()) log.push(out.trim())
            return json(res, 200, { ok: true, log, ...status() })
          }

          return json(res, 404, { error: 'Unknown endpoint' })
        } catch (e) {
          const err = e as { stderr?: string; message?: string }
          log.push(err.stderr?.trim() || err.message || String(e))
          return json(res, 500, { error: 'FAILED', log })
        }
      })
    },
  }
}
