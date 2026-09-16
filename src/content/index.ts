import type { CVData, Lang, Theme, VariantId } from '../types'
import { uid } from '../lib/id'
import { fr } from './fr'
import { en } from './en'
import { ar } from './ar'
import type { LangContent } from './schema'
import saved from './saved.json'

const content: Record<Lang, LangContent> = { fr, en, ar }

const withIds = <T extends object>(items: T[]) => items.map((item) => ({ ...item, id: uid() }))

type Saved = { data: Partial<Record<`${VariantId}:${Lang}`, CVData>>; themes: Partial<Record<VariantId, Theme>> }
const SAVED = saved as Saved

/** Theme published with the last deploy, if any */
export const savedTheme = (variant: VariantId): Theme | undefined => SAVED.themes[variant]

export function buildDefault(variant: VariantId, lang: Lang): CVData {
  // Content published via the Deploy panel wins over the built-in samples.
  const published = SAVED.data[`${variant}:${lang}`]
  if (published) return structuredClone(published)

  const base = content[lang]
  const v = base.variants[variant]
  return {
    personal: { ...base.personal, title: v.title, photo: '' },
    summary: v.summary,
    experiences: withIds(v.experiences),
    education: withIds(base.education),
    skillGroups: withIds(v.skillGroups),
    projects: withIds(v.projects),
    certifications: withIds(v.certifications),
    languages: withIds(base.languages),
    interests: [...v.interests],
  }
}
