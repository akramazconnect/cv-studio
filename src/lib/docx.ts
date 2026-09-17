import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  WidthType,
} from 'docx'
import type { CVData, Lang, Theme } from '../types'
import type { Dict } from '../i18n'
import { contactItems, fullName, range } from '../components/preview/parts'

/**
 * Word / Google Docs export. One clean single-column layout for every variant;
 * the variant still drives the accent colour and the content itself.
 * Arabic gets right-to-left paragraphs and an Arabic-capable font.
 */

const A4 = { width: 11906, height: 16838 } // DXA
const MARGIN = 1000 // ~17.6mm
const CONTENT_WIDTH = A4.width - MARGIN * 2

const hex = (c: string) => c.replace('#', '').toUpperCase()

// Darken the accent the same way the web templates do (70% accent + 30% black)
const accentInk = (accent: string) => {
  const n = parseInt(accent.replace('#', ''), 16)
  const ch = (shift: number) => Math.round(((n >> shift) & 255) * 0.7)
  return [ch(16), ch(8), ch(0)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export async function buildDocx(data: CVData, t: Dict, theme: Theme, lang: Lang): Promise<Blob> {
  const rtl = lang === 'ar'
  const font = rtl ? 'Arial' : 'Calibri'
  const ACCENT = hex(theme.accent)
  const INK = accentInk(theme.accent)
  const MUTED = '7D7973'
  const TEXT = '1B1A18'
  const p = data.personal

  const run = (text: string, opts: Partial<ConstructorParameters<typeof TextRun>[0] & object> = {}) =>
    new TextRun({ text, font, size: 20, color: TEXT, rightToLeft: rtl, ...opts })

  const para = (children: TextRun[], opts: ConstructorParameters<typeof Paragraph>[0] & object = {}) =>
    new Paragraph({ bidirectional: rtl, spacing: { after: 60 }, ...opts, children })

  const heading = (text: string) =>
    new Paragraph({
      bidirectional: rtl,
      spacing: { before: 280, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
      children: [run(rtl ? text : text.toUpperCase(), { bold: true, size: 18, color: INK, characterSpacing: rtl ? 0 : 30 })],
    })

  const bullet = (text: string) =>
    new Paragraph({
      bidirectional: rtl,
      bullet: { level: 0 },
      spacing: { after: 40 },
      children: [run(text, { color: '4B4844' })],
    })

  // Right-aligned date via a tab stop at the end of the line (mirrored for RTL by the bidi paragraph)
  const titleLine = (main: TextRun[], date: string) =>
    new Paragraph({
      bidirectional: rtl,
      spacing: { before: 120, after: 20 },
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
      children: [...main, ...(date ? [run('\t' + date, { size: 17, color: MUTED })] : [])],
    })

  const children: (Paragraph | Table)[] = []

  // ---- Header
  const nameParas = [
    para([run(fullName(p), { bold: true, size: 52, color: TEXT })], { spacing: { after: 40 } }),
    para([run(p.title, { size: 24, color: INK })], { spacing: { after: 120 } }),
    para(
      contactItems(p).flatMap((c, i) => [...(i ? [run('   ·   ', { color: MUTED, size: 18 })] : []), run(c.value, { size: 18, color: '4B4844', rightToLeft: false })]),
      { spacing: { after: 160 } },
    ),
  ]

  if (theme.showPhoto && p.photo) {
    const bytes = Uint8Array.from(atob(p.photo.split(',')[1]), (ch) => ch.charCodeAt(0))
    const type = p.photo.startsWith('data:image/png') ? 'png' : 'jpg'
    const photoPara = new Paragraph({
      alignment: rtl ? AlignmentType.LEFT : AlignmentType.RIGHT,
      children: [new ImageRun({ type, data: bytes, transformation: { width: 84, height: 84 }, altText: { title: 'Photo', description: 'Photo', name: 'photo' } })],
    })
    const cell = (content: Paragraph[], width: number) =>
      new TableCell({
        children: content,
        width: { size: width, type: WidthType.DXA },
        borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
      })
    const photoW = 1500
    const cells = [cell(nameParas, CONTENT_WIDTH - photoW), cell([photoPara], photoW)]
    children.push(
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        visuallyRightToLeft: rtl,
        rows: [new TableRow({ children: cells })],
      }),
    )
  } else {
    children.push(...nameParas)
  }

  // ---- Profile
  if (data.summary) {
    children.push(heading(t.sections.profile), para([run(data.summary, { color: '4B4844' })], { spacing: { after: 80, line: 300 } }))
  }

  // ---- Experience
  if (data.experiences.length) {
    children.push(heading(t.sections.experience))
    for (const e of data.experiences) {
      children.push(
        titleLine(
          [run(e.role, { bold: true }), ...(e.company ? [run(`  ·  ${e.company}`, { color: MUTED })] : [])],
          range(e.start, e.end),
        ),
      )
      if (e.location) children.push(para([run(e.location, { size: 17, color: MUTED })], { spacing: { after: 40 } }))
      for (const b of e.bullets.filter((x) => x.trim())) children.push(bullet(b))
    }
  }

  // ---- Skills (two-column table: group | skills)
  if (data.skillGroups.length) {
    children.push(heading(t.sections.skills))
    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
    const borders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder }
    children.push(
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        visuallyRightToLeft: rtl,
        rows: data.skillGroups.map(
          (g) =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2600, type: WidthType.DXA }, children: [para([run(g.name, { bold: true })], { spacing: { after: 40 } })] }),
                new TableCell({ borders, width: { size: CONTENT_WIDTH - 2600, type: WidthType.DXA }, children: [para([run(g.skills.join('  ·  '), { color: '4B4844' })], { spacing: { after: 40 } })] }),
              ],
            }),
        ),
      }),
    )
  }

  // ---- Projects
  if (data.projects.length) {
    children.push(heading(t.sections.projects))
    for (const pr of data.projects) {
      children.push(
        titleLine([run(pr.name, { bold: true }), ...(pr.tags.length ? [run(`  ${pr.tags.join(', ')}`, { size: 17, color: MUTED })] : [])], ''),
        para([run(pr.description, { color: '4B4844' })]),
      )
    }
  }

  // ---- Education
  if (data.education.length) {
    children.push(heading(t.sections.education))
    for (const ed of data.education) {
      children.push(
        titleLine([run(ed.degree, { bold: true })], range(ed.start, ed.end)),
        para([run([ed.school, ed.location].filter(Boolean).join(' · ') + (ed.note ? ` — ${ed.note}` : ''), { size: 18, color: MUTED })]),
      )
    }
  }

  // ---- Certifications
  if (data.certifications.length) {
    children.push(heading(t.sections.certifications))
    for (const c of data.certifications) {
      children.push(para([run(c.name, { bold: true }), run(`  ·  ${[c.issuer, c.year].filter(Boolean).join(' · ')}`, { size: 18, color: MUTED })]))
    }
  }

  // ---- Languages
  if (data.languages.length) {
    children.push(heading(t.sections.languages), para(data.languages.flatMap((l, i) => [...(i ? [run('   ·   ', { color: MUTED })] : []), run(l.name, { bold: true }), run(` ${l.level}`, { color: MUTED })])))
  }

  // ---- Interests
  if (data.interests.length) {
    children.push(heading(t.sections.interests), para([run(data.interests.join('  ·  '), { color: '4B4844' })]))
  }

  const doc = new Document({
    creator: 'CV Studio',
    title: `${fullName(p)} — CV`,
    styles: { default: { document: { run: { font, size: 20, color: TEXT } } } },
    sections: [
      {
        properties: {
          page: { size: { width: A4.width, height: A4.height }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
          ...(rtl ? { bidi: true } : {}),
        },
        children,
      },
    ],
  })

  return Packer.toBlob(doc)
}
