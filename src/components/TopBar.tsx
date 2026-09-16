import { Download, FileText } from 'lucide-react'
import { useCV, useCurrentData } from '../store/useCV'
import { LANGS, ui } from '../i18n'
import { VARIANTS } from '../variants'
import DeployPanel from './DeployPanel'

export default function TopBar() {
  const lang = useCV((s) => s.lang)
  const variant = useCV((s) => s.variant)
  const setLang = useCV((s) => s.setLang)
  const setVariant = useCV((s) => s.setVariant)
  const data = useCurrentData()
  const t = ui[lang]

  const exportPdf = () => {
    const name = [data.personal.firstName, data.personal.lastName].filter(Boolean).join('_') || 'CV'
    const prev = document.title
    document.title = `${name}_CV_${t.variants[variant].name}_${lang.toUpperCase()}`.replace(/\s+/g, '_')
    window.print()
    setTimeout(() => (document.title = prev), 500)
  }

  return (
    <header className="no-print relative z-30 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-surface/80 px-4 py-2.5 backdrop-blur lg:flex-nowrap lg:px-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
          <FileText className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <div className="text-[14px] font-extrabold tracking-tight">{t.app}</div>
          <div className="hidden text-[11px] text-muted sm:block">{t.tagline}</div>
        </div>
      </div>

      {/* Variants */}
      <nav className="scroll-thin order-last flex w-full items-center gap-1 overflow-x-auto lg:order-none lg:w-auto lg:flex-1 lg:justify-center">
        {VARIANTS.map((v) => {
          const active = v.id === variant
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVariant(v.id)}
              title={t.variants[v.id].desc}
              className={`group flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-1.5 text-start transition ${
                active ? 'border-ink bg-ink text-white shadow-sm' : 'border-transparent hover:border-line hover:bg-soft'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full ring-2 ring-white/60" style={{ background: v.accent }} />
              <span className="leading-tight">
                <span className="block text-[13px] font-bold">{t.variants[v.id].name}</span>
                <span className={`block text-[10.5px] ${active ? 'text-white/70' : 'text-muted'}`}>{t.variants[v.id].for}</span>
              </span>
            </button>
          )
        })}
      </nav>

      {/* Language */}
      <div className="ms-auto flex rounded-lg border border-line bg-white p-0.5 lg:ms-0">
        {LANGS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            title={l.label}
            className={`rounded-md px-2.5 py-1 text-[12px] font-bold transition ${lang === l.id ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
          >
            {l.short}
          </button>
        ))}
      </div>

      {import.meta.env.DEV && <DeployPanel />}

      <button
        type="button"
        onClick={exportPdf}
        title={t.exportHint}
        className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98]"
        style={{ background: 'var(--accent)' }}
      >
        <Download className="h-4 w-4" />
        {t.export}
      </button>
    </header>
  )
}
