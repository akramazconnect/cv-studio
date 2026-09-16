import { useRef } from 'react'
import { Download, ImagePlus, RotateCcw, Upload, X } from 'lucide-react'
import { useCV, useCurrentData, useCurrentTheme } from '../../store/useCV'
import { ui } from '../../i18n'
import { VARIANTS } from '../../variants'
import { uid } from '../../lib/id'
import type { CVData, Density, Personal } from '../../types'
import { AddButton, Card, Field, Group, Input, ListInput, Row, Textarea } from '../ui/primitives'

type ListKey = 'experiences' | 'education' | 'skillGroups' | 'projects' | 'certifications' | 'languages'
type Item<K extends ListKey> = CVData[K][number]

const splitLines = (v: string) => v.split('\n')

export default function Editor() {
  const lang = useCV((s) => s.lang)
  const variant = useCV((s) => s.variant)
  const update = useCV((s) => s.update)
  const updateTheme = useCV((s) => s.updateTheme)
  const reset = useCV((s) => s.reset)
  const importAll = useCV((s) => s.importAll)
  const backupRef = useRef<HTMLInputElement>(null)
  const data = useCurrentData()
  const theme = useCurrentTheme()
  const t = ui[lang]
  const f = t.fields
  const labels = t.actions
  const meta = VARIANTS.find((v) => v.id === variant)!
  const fileRef = useRef<HTMLInputElement>(null)

  const setPersonal = (patch: Partial<Personal>) => update((d) => ({ ...d, personal: { ...d.personal, ...patch } }))

  const list = <K extends ListKey>(key: K) => ({
    set: (id: string, patch: Partial<Item<K>>) =>
      update((d) => ({ ...d, [key]: (d[key] as Item<K>[]).map((it) => (it.id === id ? { ...it, ...patch } : it)) })),
    add: (item: Omit<Item<K>, 'id'>) => update((d) => ({ ...d, [key]: [...(d[key] as Item<K>[]), { ...item, id: uid() }] })),
    remove: (id: string) => update((d) => ({ ...d, [key]: (d[key] as Item<K>[]).filter((it) => it.id !== id) })),
    move: (id: string, dir: -1 | 1) =>
      update((d) => {
        const arr = [...(d[key] as Item<K>[])]
        const i = arr.findIndex((it) => it.id === id)
        const j = i + dir
        if (i < 0 || j < 0 || j >= arr.length) return d
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        return { ...d, [key]: arr }
      }),
  })

  const cardProps = <K extends ListKey>(key: K, id: string, index: number, length: number) => {
    const ops = list(key)
    return {
      labels,
      onUp: index > 0 ? () => ops.move(id, -1) : undefined,
      onDown: index < length - 1 ? () => ops.move(id, 1) : undefined,
      onRemove: () => ops.remove(id),
    }
  }

  const onPhoto = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        // downscale to keep localStorage small
        const size = 480
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!
        const s = Math.min(img.width, img.height)
        ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size)
        setPersonal({ photo: canvas.toDataURL('image/jpeg', 0.86) })
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const exportBackup = () => {
    const { data: all, themes } = useCV.getState()
    const blob = new Blob([JSON.stringify({ data: all, themes }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `cv-studio-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const importBackup = (file?: File) => {
    if (!file) return
    file.text().then((txt) => {
      try {
        const j = JSON.parse(txt) as { data?: unknown; themes?: unknown }
        if (!j || typeof j !== 'object' || (!j.data && !j.themes)) throw new Error()
        importAll(j as Parameters<typeof importAll>[0])
        alert(t.backup.imported)
      } catch {
        alert(t.backup.invalid)
      }
    })
  }

  const exp = list('experiences')
  const edu = list('education')
  const skills = list('skillGroups')
  const projects = list('projects')
  const certs = list('certifications')
  const langs = list('languages')

  return (
    <div className="scroll-thin h-full overflow-y-auto bg-surface">
      {/* Appearance */}
      <Group title={t.editorGroups.theme} defaultOpen>
        <div>
          <span className="label">{f.accent}</span>
          <div className="flex items-center gap-2">
            {meta.palette.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updateTheme({ accent: c })}
                className={`h-7 w-7 rounded-full transition ${theme.accent === c ? 'ring-2 ring-ink ring-offset-2' : 'hover:scale-110'}`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
            <label className="relative ms-1 h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-line-2 bg-[conic-gradient(from_0deg,#f5b8b0,#f5e3b0,#c5ecc7,#b8d4f5,#d9c1f2,#f5b8b0)]" title="Custom">
              <input type="color" value={theme.accent} onChange={(e) => updateTheme({ accent: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" />
            </label>
          </div>
        </div>
        <Row>
          <div>
            <span className="label">{f.density}</span>
            <div className="flex rounded-lg border border-line bg-white p-0.5">
              {(['compact', 'normal', 'airy'] as Density[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => updateTheme({ density: d })}
                  className={`flex-1 rounded-md px-2 py-1 text-[12px] font-semibold transition ${theme.density === d ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
                >
                  {f.densities[d]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="label">{f.showPhoto}</span>
            <button
              type="button"
              onClick={() => updateTheme({ showPhoto: !theme.showPhoto })}
              className={`flex h-[34px] w-full items-center gap-2 rounded-lg border border-line bg-white px-2 text-[12px] font-semibold ${theme.showPhoto ? 'text-ink' : 'text-muted'}`}
            >
              <span className={`relative h-4 w-7 rounded-full transition ${theme.showPhoto ? 'bg-ink' : 'bg-line-2'}`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${theme.showPhoto ? 'start-3.5' : 'start-0.5'}`} />
              </span>
              {f.showPhoto}
            </button>
          </div>
        </Row>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <button type="button" onClick={() => confirm(t.resetConfirm) && reset()} className="flex items-center gap-1.5 text-[12px] font-semibold text-muted transition hover:text-red-600">
            <RotateCcw className="h-3.5 w-3.5" />
            {t.reset}
          </button>
          <span className="ms-auto flex items-center gap-3 text-[12px] font-semibold text-muted">
            <span className="text-[11px] uppercase tracking-wide text-muted/70">{t.backup.title}</span>
            <button type="button" onClick={exportBackup} className="flex items-center gap-1 transition hover:text-ink">
              <Download className="h-3.5 w-3.5" /> {t.backup.export}
            </button>
            <button type="button" onClick={() => backupRef.current?.click()} className="flex items-center gap-1 transition hover:text-ink">
              <Upload className="h-3.5 w-3.5" /> {t.backup.import}
            </button>
            <input ref={backupRef} type="file" accept="application/json" className="hidden" onChange={(e) => { importBackup(e.target.files?.[0]); e.target.value = '' }} />
          </span>
        </div>
      </Group>

      {/* Personal */}
      <Group title={t.editorGroups.personal} defaultOpen>
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-canvas">
            {data.personal.photo ? (
              <img src={data.personal.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <ImagePlus className="absolute inset-0 m-auto h-5 w-5 text-muted" />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-semibold text-ink transition hover:bg-soft">
              {f.uploadPhoto}
            </button>
            {data.personal.photo && (
              <button type="button" onClick={() => setPersonal({ photo: '' })} className="flex items-center gap-1 text-[12px] font-medium text-muted hover:text-red-600">
                <X className="h-3 w-3" /> {f.removePhoto}
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
          </div>
        </div>
        <Row>
          <Field label={f.firstName}><Input value={data.personal.firstName} onChange={(v) => setPersonal({ firstName: v })} /></Field>
          <Field label={f.lastName}><Input value={data.personal.lastName} onChange={(v) => setPersonal({ lastName: v })} /></Field>
        </Row>
        <Field label={f.title}><Input value={data.personal.title} onChange={(v) => setPersonal({ title: v })} /></Field>
        <Row>
          <Field label={f.email}><Input value={data.personal.email} onChange={(v) => setPersonal({ email: v })} dir="ltr" /></Field>
          <Field label={f.phone}><Input value={data.personal.phone} onChange={(v) => setPersonal({ phone: v })} dir="ltr" /></Field>
        </Row>
        <Row>
          <Field label={f.location}><Input value={data.personal.location} onChange={(v) => setPersonal({ location: v })} /></Field>
          <Field label={f.website}><Input value={data.personal.website} onChange={(v) => setPersonal({ website: v })} dir="ltr" /></Field>
        </Row>
        <Row>
          <Field label={f.linkedin}><Input value={data.personal.linkedin} onChange={(v) => setPersonal({ linkedin: v })} dir="ltr" /></Field>
          <Field label={f.github}><Input value={data.personal.github} onChange={(v) => setPersonal({ github: v })} dir="ltr" /></Field>
        </Row>
      </Group>

      {/* Summary */}
      <Group title={t.editorGroups.summary}>
        <Textarea value={data.summary} onChange={(v) => update((d) => ({ ...d, summary: v }))} rows={6} />
      </Group>

      {/* Experience */}
      <Group title={t.editorGroups.experience} count={data.experiences.length}>
        {data.experiences.map((e, i) => (
          <Card key={e.id} {...cardProps('experiences', e.id, i, data.experiences.length)}>
            <Field label={f.role}><Input value={e.role} onChange={(v) => exp.set(e.id, { role: v })} /></Field>
            <Row>
              <Field label={f.company}><Input value={e.company} onChange={(v) => exp.set(e.id, { company: v })} /></Field>
              <Field label={f.location}><Input value={e.location} onChange={(v) => exp.set(e.id, { location: v })} /></Field>
            </Row>
            <Row>
              <Field label={f.start}><Input value={e.start} onChange={(v) => exp.set(e.id, { start: v })} /></Field>
              <Field label={f.end}><Input value={e.end} onChange={(v) => exp.set(e.id, { end: v })} /></Field>
            </Row>
            <Field label={f.bullets} hint={f.bulletsHint}>
              <Textarea value={e.bullets.join('\n')} onChange={(v) => exp.set(e.id, { bullets: splitLines(v) })} rows={5} />
            </Field>
          </Card>
        ))}
        <AddButton onClick={() => exp.add({ role: '', company: '', location: '', start: '', end: '', bullets: [] })}>{labels.add}</AddButton>
      </Group>

      {/* Education */}
      <Group title={t.editorGroups.education} count={data.education.length}>
        {data.education.map((e, i) => (
          <Card key={e.id} {...cardProps('education', e.id, i, data.education.length)}>
            <Field label={f.degree}><Input value={e.degree} onChange={(v) => edu.set(e.id, { degree: v })} /></Field>
            <Row>
              <Field label={f.school}><Input value={e.school} onChange={(v) => edu.set(e.id, { school: v })} /></Field>
              <Field label={f.location}><Input value={e.location} onChange={(v) => edu.set(e.id, { location: v })} /></Field>
            </Row>
            <Row>
              <Field label={f.start}><Input value={e.start} onChange={(v) => edu.set(e.id, { start: v })} /></Field>
              <Field label={f.end}><Input value={e.end} onChange={(v) => edu.set(e.id, { end: v })} /></Field>
            </Row>
            <Field label={f.note}><Input value={e.note} onChange={(v) => edu.set(e.id, { note: v })} /></Field>
          </Card>
        ))}
        <AddButton onClick={() => edu.add({ degree: '', school: '', location: '', start: '', end: '', note: '' })}>{labels.add}</AddButton>
      </Group>

      {/* Skills */}
      <Group title={t.editorGroups.skills} count={data.skillGroups.length}>
        {data.skillGroups.map((g, i) => (
          <Card key={g.id} {...cardProps('skillGroups', g.id, i, data.skillGroups.length)}>
            <Field label={f.groupName}><Input value={g.name} onChange={(v) => skills.set(g.id, { name: v })} /></Field>
            <Field label={f.skillsList} hint={f.skillsHint}>
              <ListInput multiline value={g.skills} onChange={(v) => skills.set(g.id, { skills: v })} />
            </Field>
          </Card>
        ))}
        <AddButton onClick={() => skills.add({ name: '', skills: [] })}>{labels.add}</AddButton>
      </Group>

      {/* Projects */}
      <Group title={t.editorGroups.projects} count={data.projects.length}>
        {data.projects.map((p, i) => (
          <Card key={p.id} {...cardProps('projects', p.id, i, data.projects.length)}>
            <Field label={f.projectName}><Input value={p.name} onChange={(v) => projects.set(p.id, { name: v })} /></Field>
            <Field label={f.description}><Textarea value={p.description} onChange={(v) => projects.set(p.id, { description: v })} rows={3} /></Field>
            <Row>
              <Field label={f.tags} hint={f.skillsHint}><ListInput value={p.tags} onChange={(v) => projects.set(p.id, { tags: v })} /></Field>
              <Field label={f.link}><Input value={p.link} onChange={(v) => projects.set(p.id, { link: v })} dir="ltr" /></Field>
            </Row>
          </Card>
        ))}
        <AddButton onClick={() => projects.add({ name: '', description: '', link: '', tags: [] })}>{labels.add}</AddButton>
      </Group>

      {/* Certifications */}
      <Group title={t.editorGroups.certifications} count={data.certifications.length}>
        {data.certifications.map((c, i) => (
          <Card key={c.id} {...cardProps('certifications', c.id, i, data.certifications.length)}>
            <Field label={f.certName}><Input value={c.name} onChange={(v) => certs.set(c.id, { name: v })} /></Field>
            <Row>
              <Field label={f.issuer}><Input value={c.issuer} onChange={(v) => certs.set(c.id, { issuer: v })} /></Field>
              <Field label={f.year}><Input value={c.year} onChange={(v) => certs.set(c.id, { year: v })} /></Field>
            </Row>
          </Card>
        ))}
        <AddButton onClick={() => certs.add({ name: '', issuer: '', year: '' })}>{labels.add}</AddButton>
      </Group>

      {/* Languages */}
      <Group title={t.editorGroups.languages} count={data.languages.length}>
        {data.languages.map((l, i) => (
          <Card key={l.id} {...cardProps('languages', l.id, i, data.languages.length)}>
            <Row>
              <Field label={f.language}><Input value={l.name} onChange={(v) => langs.set(l.id, { name: v })} /></Field>
              <Field label={f.level}><Input value={l.level} onChange={(v) => langs.set(l.id, { level: v })} /></Field>
            </Row>
          </Card>
        ))}
        <AddButton onClick={() => langs.add({ name: '', level: '' })}>{labels.add}</AddButton>
      </Group>

      {/* Interests */}
      <Group title={t.editorGroups.interests}>
        <Field label={t.editorGroups.interests} hint={f.interestsHint}>
          <ListInput value={data.interests} onChange={(v) => update((d) => ({ ...d, interests: v }))} />
        </Field>
      </Group>
      <div className="h-10" />
    </div>
  )
}
