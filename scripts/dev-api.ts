import { execFile, execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { Plugin } from 'vite'

/**
 * Dev-only API used by the "Deploy" panel in the app.
 * Runs inside the Vite dev server, so it only ever exists on your machine.
 *
 *   GET  /__api/status   → git branch / remote / dirty state
 *   POST /__api/save     → writes the editor state to src/content/local.json (git-ignored, never published)
 *   POST /__api/deploy   → git add/commit/push of the app code only (GitHub Actions then publishes)
 *   POST /__api/pdf      → renders the current CV with headless Chrome/Edge and returns a real PDF
 *   GET  /__api/state/id → one-shot state handoff used by the PDF render page
 */

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA ?? ''}/Google/Chrome/Application/chrome.exe`,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]
const findBrowser = () => BROWSERS.find((b) => b && existsSync(b))

const run = (file: string, args: string[]) =>
  new Promise<void>((res, rej) => execFile(file, args, { windowsHide: true }, (err) => (err ? rej(err) : res())))

const LOCAL_FILE = 'src/content/local.json'

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
        const file = resolve(root, LOCAL_FILE)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, JSON.stringify(state, null, 2) + '\n', 'utf8')
      }

      // State handed to the headless print page, keyed by a one-shot id
      const pending = new Map<string, unknown>()

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/__api/')) return next()
        const log: string[] = []
        try {
          if (req.url === '/__api/status' && req.method === 'GET') return json(res, 200, status())

          if (req.url.startsWith('/__api/state/') && req.method === 'GET') {
            const id = req.url.slice('/__api/state/'.length)
            const st = pending.get(id)
            return st ? json(res, 200, st) : json(res, 404, { error: 'NOT_FOUND' })
          }

          if (req.method !== 'POST') return json(res, 405, { error: 'POST only' })
          const body = JSON.parse((await readBody(req)) || '{}') as { state?: unknown; message?: string; remote?: string }
          const ignored = tryGit(root, ['check-ignore', LOCAL_FILE]) !== ''

          if (req.url === '/__api/pdf') {
            const browser = findBrowser()
            if (!browser) return json(res, 500, { error: 'NO_BROWSER', log: ['Chrome or Edge not found'] })
            const { state, variant, lang, filename } = body as unknown as { state: unknown; variant: string; lang: string; filename: string }
            const id = randomUUID()
            pending.set(id, state)
            const out = join(tmpdir(), `cv-studio-${id}.pdf`)
            const port = server.config.server.port ?? 5173
            const url = `http://localhost:${port}/?print=1&v=${encodeURIComponent(variant)}&l=${encodeURIComponent(lang)}&sid=${id}`
            try {
              await run(browser, [
                '--headless=new',
                '--disable-gpu',
                '--no-first-run',
                '--no-default-browser-check',
                `--user-data-dir=${join(tmpdir(), 'cv-studio-chrome-profile')}`,
                '--virtual-time-budget=8000',
                '--no-pdf-header-footer',
                `--print-to-pdf=${out}`,
                url,
              ])
              const pdf = readFileSync(out)
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/pdf')
              res.setHeader('Content-Disposition', `attachment; filename="${(filename || 'CV').replace(/[^\w.-]+/g, '_')}.pdf"`)
              return res.end(pdf)
            } finally {
              pending.delete(id)
              try {
                unlinkSync(out)
              } catch {
                /* already gone */
              }
            }
          }

          if (req.url === '/__api/save') {
            save(body.state ?? {})
            return json(res, 200, { ok: true, log: [`Saved ${LOCAL_FILE}`] })
          }

          if (req.url === '/__api/deploy') {
            if (!ignored) return json(res, 400, { error: 'LOCAL_NOT_IGNORED', log: [`${LOCAL_FILE} must be git-ignored`] })
            if (body.remote && !tryGit(root, ['remote', 'get-url', 'origin'])) {
              git(root, ['remote', 'add', 'origin', body.remote])
              log.push(`Remote added: ${body.remote}`)
            }
            if (!tryGit(root, ['remote', 'get-url', 'origin'])) {
              return json(res, 400, { error: 'NO_REMOTE', log })
            }
            // Personal data is never staged: local.json is git-ignored.
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
