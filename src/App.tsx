import { useEffect, useState } from 'react'
import { Eye, PencilLine } from 'lucide-react'
import TopBar from './components/TopBar'
import Editor from './components/editor/Editor'
import Preview from './components/preview/Preview'
import { useCV, useCurrentTheme } from './store/useCV'
import { isRTL, ui } from './i18n'
import { PRINT_MODE } from './lib/params'

export default function App() {
  const lang = useCV((s) => s.lang)
  const theme = useCurrentTheme()
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor')
  const t = ui[lang]

  // Flip the whole app for Arabic; accent drives the export button too.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr'
  }, [lang])
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', theme.accent)
  }, [theme.accent])

  if (PRINT_MODE) return <Preview bare />

  return (
    <div className="app-shell flex h-full flex-col overflow-hidden">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <aside className={`no-print w-full shrink-0 border-e border-line lg:block lg:w-[430px] ${mobileView === 'editor' ? 'block' : 'hidden'}`}>
          <Editor />
        </aside>
        <main className={`min-w-0 flex-1 lg:block ${mobileView === 'preview' ? 'block' : 'hidden'}`}>
          <Preview />
        </main>
      </div>

      {/* Mobile: switch between editor and preview */}
      <nav className="no-print flex border-t border-line bg-surface lg:hidden">
        {(
          [
            ['editor', PencilLine, t.editor],
            ['preview', Eye, t.preview],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMobileView(id)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-[13px] font-bold ${mobileView === id ? 'text-ink' : 'text-muted'}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
