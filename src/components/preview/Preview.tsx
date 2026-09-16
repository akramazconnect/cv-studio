import { useEffect, useRef, useState } from 'react'
import { useCV, useCurrentData, useCurrentTheme } from '../../store/useCV'
import { isRTL, ui } from '../../i18n'
import type { Density } from '../../types'
import TemplateCorporate from './TemplateCorporate'
import TemplateTech from './TemplateTech'
import TemplateCreative from './TemplateCreative'
import TemplateStartup from './TemplateStartup'

const TEMPLATES = {
  corporate: TemplateCorporate,
  tech: TemplateTech,
  creative: TemplateCreative,
  startup: TemplateStartup,
}

const DENSITY: Record<Density, { fs: string; gap: number }> = {
  compact: { fs: '9.2pt', gap: 0.7 },
  normal: { fs: '9.9pt', gap: 0.85 },
  airy: { fs: '10.6pt', gap: 1.05 },
}

const PAGE_W_PX = 793.7 // 210mm at 96dpi

export default function Preview({ bare = false }: { bare?: boolean }) {
  const lang = useCV((s) => s.lang)
  const variant = useCV((s) => s.variant)
  const data = useCurrentData()
  const theme = useCurrentTheme()
  const t = ui[lang]
  const rtl = isRTL(lang)
  const Template = TEMPLATES[variant]

  const canvasRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [pageH, setPageH] = useState(1123)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      const available = canvas.clientWidth - 64
      setScale(Math.min(1, available / PAGE_W_PX))
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const ro = new ResizeObserver(() => setPageH(page.offsetHeight))
    ro.observe(page)
    return () => ro.disconnect()
  }, [])

  const d = DENSITY[theme.density]
  const pageStyle = { '--accent': theme.accent, '--cv-fs': d.fs, '--cv-gap': d.gap } as React.CSSProperties

  if (bare) {
    return (
      <div id="cv-page" className="cv-page !shadow-none" dir={rtl ? 'rtl' : 'ltr'} lang={lang} style={pageStyle}>
        <Template data={data} t={t} theme={theme} rtl={rtl} />
      </div>
    )
  }

  return (
    <div ref={canvasRef} className="preview-canvas scroll-thin h-full overflow-auto bg-canvas p-8">
      <div className="preview-frame mx-auto" style={{ width: PAGE_W_PX * scale, height: pageH * scale }}>
        <div className="preview-scaler" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: PAGE_W_PX }}>
          <div
            ref={pageRef}
            id="cv-page"
            className="cv-page"
            dir={rtl ? 'rtl' : 'ltr'}
            lang={lang}
            style={pageStyle}
          >
            <Template data={data} t={t} theme={theme} rtl={rtl} />
          </div>
        </div>
      </div>
    </div>
  )
}
