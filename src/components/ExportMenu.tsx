import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download, FileText, FileType2, Loader2 } from 'lucide-react'
import { useCV, useCurrentData, useCurrentTheme } from '../store/useCV'
import { ui } from '../i18n'

const saveBlob = (blob: Blob, filename: string) => {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 10_000)
}

/**
 * Split button: main click → PDF, chevron → menu with PDF + Word/Google Docs.
 * PDF is a real file download when the local dev server is available (headless
 * Chrome/Edge render); on the static site it falls back to the print dialog.
 */
export default function ExportMenu() {
  const lang = useCV((s) => s.lang)
  const variant = useCV((s) => s.variant)
  const data = useCurrentData()
  const theme = useCurrentTheme()
  const t = ui[lang]
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState<'pdf' | 'docx' | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 6000)
    return () => clearTimeout(id)
  }, [toast])

  const baseName = () => {
    const name = [data.personal.firstName, data.personal.lastName].filter(Boolean).join('_') || 'CV'
    return `${name}_CV_${t.variants[variant].name}_${lang.toUpperCase()}`.replace(/\s+/g, '_')
  }

  const printFallback = () => {
    const prev = document.title
    document.title = baseName()
    setToast(t.exportHint)
    window.print()
    setTimeout(() => (document.title = prev), 500)
  }

  const exportPdf = async () => {
    setOpen(false)
    if (!import.meta.env.DEV) return printFallback()
    setBusy('pdf')
    try {
      const { data: all, themes } = useCV.getState()
      const r = await fetch('/__api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: { data: all, themes }, variant, lang, filename: baseName() }),
      })
      if (!r.ok) throw new Error(await r.text())
      saveBlob(await r.blob(), `${baseName()}.pdf`)
    } catch {
      // No headless browser available → the print dialog still gives a vector PDF.
      printFallback()
    } finally {
      setBusy(null)
    }
  }

  const exportDocx = async () => {
    setOpen(false)
    setBusy('docx')
    try {
      const { buildDocx } = await import('../lib/docx')
      saveBlob(await buildDocx(data, t, theme, lang), `${baseName()}.docx`)
      setToast(t.exportDocxHint)
    } catch (e) {
      console.error(e)
      setToast(t.exportError)
    } finally {
      setBusy(null)
    }
  }

  const Item = ({ icon: Icon, label, hint, onClick }: { icon: typeof FileText; label: string; hint?: string; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-start transition hover:bg-soft">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
      <span>
        <span className="block text-[13px] font-bold text-ink">{label}</span>
        {hint && <span className="block text-[11px] leading-snug text-muted">{hint}</span>}
      </span>
    </button>
  )

  return (
    <div className="relative" ref={ref}>
      <div className="flex overflow-hidden rounded-lg text-white shadow-sm" style={{ background: 'var(--accent)' }}>
        <button
          type="button"
          onClick={exportPdf}
          disabled={!!busy}
          title={t.exportPdf}
          className="flex items-center gap-2 px-3.5 py-2 text-[13px] font-bold transition hover:brightness-110 disabled:opacity-70"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {busy ? t.generating : t.export}
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={!!busy}
          aria-label="More formats"
          className="border-s border-white/25 px-2 transition hover:brightness-110 disabled:opacity-70"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-[300px] rounded-xl border border-line bg-white p-1.5 shadow-[0_20px_60px_-20px_rgba(27,26,24,0.35)]">
          <Item icon={FileText} label={t.exportPdf} hint={import.meta.env.DEV ? undefined : t.exportHint} onClick={exportPdf} />
          <Item icon={FileType2} label={t.exportDocx} hint={t.exportDocxHint} onClick={exportDocx} />
        </div>
      )}

      {toast && (
        <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-[320px] rounded-xl border border-line bg-ink px-3.5 py-2.5 text-[12px] leading-snug text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
