import type { CVData, Lang, Theme, VariantId } from '../types'
import { uid } from '../lib/id'
import { fr } from './fr'
import { en } from './en'
import { ar } from './ar'
import type { LangContent } from './schema'

const content: Record<Lang, LangContent> = { fr, en, ar }

const withIds = <T extends object>(items: T[]) => items.map((item) => ({ ...item, id: uid() }))

type Saved = { data?: Partial<Record<`${VariantId}:${Lang}`, CVData>>; themes?: Partial<Record<VariantId, Theme>> }

// src/content/local.json is git-ignored: it holds the owner's personal profile on this
// machine only. The glob resolves to {} when the file doesn't exist (e.g. on GitHub).
const localModules = import.meta.glob<{ default: Saved }>('./local.json', { eager: true })
const LOCAL: Saved = Object.values(localModules)[0]?.default ?? {}

/** Theme saved locally on this machine, if any */
export const savedTheme = (variant: VariantId): Theme | undefined => LOCAL.themes?.[variant]

export function buildDefault(variant: VariantId, lang: Lang): CVData {
  // The owner's local profile wins over the built-in placeholder content.
  const local = LOCAL.data?.[`${variant}:${lang}`]
  if (local) return structuredClone(local)

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
