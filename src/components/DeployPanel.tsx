import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ExternalLink, GitBranch, Loader2, Rocket, Save, X, XCircle } from 'lucide-react'
import { useCV } from '../store/useCV'
import { ui } from '../i18n'

interface Status {
  branch: string
  remote: string
  dirty: boolean
  lastCommit: string
  pagesUrl: string
  repoUrl: string
}

const NEW_REPO_URL = 'https://github.com/new?name=cv&visibility=public&description=CV+Studio'

/** Dev-only: talks to the Vite middleware in scripts/dev-api.ts */
export default function DeployPanel() {
  const lang = useCV((s) => s.lang)
  const t = ui[lang].deploy
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status | null>(null)
  const [remoteInput, setRemoteInput] = useState('')
  const [busy, setBusy] = useState<'save' | 'deploy' | null>(null)
  const [result, setResult] = useState<{ ok: boolean; log: string[]; msg: string } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const refresh = () =>
    fetch('/__api/status')
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null))

  useEffect(() => {
    if (open) refresh()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const snapshot = () => {
    const { data, themes } = useCV.getState()
    return { data, themes }
  }

  const call = async (kind: 'save' | 'deploy') => {
    setBusy(kind)
    setResult(null)
    try {
      const r = await fetch(`/__api/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: snapshot(), remote: remoteInput.trim() || undefined }),
      })
      const j = (await r.json()) as { ok?: boolean; log?: string[]; error?: string }
      const ok = !!j.ok
      setResult({ ok, log: j.log ?? [], msg: ok ? (kind === 'save' ? t.saved : t.done) : j.error === 'NO_REMOTE' ? t.noRemote : t.failed })
      if (ok) setRemoteInput('')
    } catch (e) {
      setResult({ ok: false, log: [String(e)], msg: t.failed })
    } finally {
      setBusy(null)
      refresh()
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-bold text-ink shadow-sm transition hover:bg-soft"
      >
        <Rocket className="h-4 w-4" style={{ color: 'var(--accent)' }} />
        {t.button}
        {status?.dirty && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
      </button>

      {open && (
        <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-[380px] rounded-2xl border border-line bg-white p-4 shadow-[0_20px_60px_-20px_rgba(27,26,24,0.35)]">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[14px] font-extrabold">{t.title}</h3>
            <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1 text-muted hover:bg-soft hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-3 text-[12px] leading-relaxed text-muted">{t.intro}</p>

          {/* Git status */}
          <div className="mb-3 rounded-xl bg-soft p-3 text-[12px]">
            <div className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5 text-muted" />
              <span className="font-semibold">{t.branch}</span>
              <span className="font-mono text-muted" dir="ltr">{status?.branch || '—'}</span>
              <span className={`ms-auto rounded-full px-2 py-0.5 text-[11px] font-semibold ${status?.dirty ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {status?.dirty ? t.dirty : t.clean}
              </span>
            </div>
            {status?.lastCommit && (
              <div className="mt-1.5 truncate text-muted">
                <span className="font-semibold text-ink-2">{t.lastCommit}</span> · {status.lastCommit}
              </div>
            )}
            {status?.remote ? (
              <div className="mt-1.5 flex items-center gap-3">
                <a href={status.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold hover:underline" style={{ color: 'var(--accent-ink)' }}>
                  <ExternalLink className="h-3 w-3" /> {t.openRepo}
                </a>
                {status.pagesUrl && (
                  <a href={status.pagesUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold hover:underline" style={{ color: 'var(--accent-ink)' }}>
                    <ExternalLink className="h-3 w-3" /> {t.openSite}
                  </a>
                )}
              </div>
            ) : (
              <div className="mt-2">
                <p className="mb-1.5 text-muted">{t.noRemote}</p>
                <a href={NEW_REPO_URL} target="_blank" rel="noreferrer" className="mb-1.5 inline-flex items-center gap-1 font-semibold hover:underline" style={{ color: 'var(--accent-ink)' }}>
                  <ExternalLink className="h-3 w-3" /> {t.createRepo}
                </a>
                <input className="field font-mono !text-[12px]" dir="ltr" value={remoteInput} onChange={(e) => setRemoteInput(e.target.value)} placeholder={t.remotePlaceholder} />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!!busy}
              onClick={() => call('save')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line bg-white py-2 text-[12.5px] font-bold transition hover:bg-soft disabled:opacity-50"
            >
              {busy === 'save' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {t.save}
            </button>
            <button
              type="button"
              disabled={!!busy || (!status?.remote && !remoteInput.trim())}
              onClick={() => call('deploy')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12.5px] font-bold text-white transition hover:brightness-110 disabled:opacity-50"
              style={{ background: 'var(--accent)' }}
            >
              {busy === 'deploy' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Rocket className="h-3.5 w-3.5" />}
              {busy === 'deploy' ? t.publishing : t.publish}
            </button>
          </div>

          {result && (
            <div className={`mt-3 rounded-xl p-3 text-[12px] ${result.ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
              <div className="flex items-center gap-1.5 font-semibold">
                {result.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {result.msg}
              </div>
              {result.log.length > 0 && (
                <pre className="scroll-thin mt-2 max-h-40 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed opacity-80" dir="ltr">
                  {result.log.join('\n')}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
