import type { Certification, Education, Experience, LanguageItem, Personal, Project, SkillGroup, VariantId } from '../types'

type NoId<T> = Omit<T, 'id'>

export interface VariantContent {
  title: string
  summary: string
  experiences: NoId<Experience>[]
  skillGroups: NoId<SkillGroup>[]
  projects: NoId<Project>[]
  certifications: NoId<Certification>[]
  interests: string[]
}

export interface LangContent {
  personal: Omit<Personal, 'title' | 'photo'>
  education: NoId<Education>[]
  languages: NoId<LanguageItem>[]
  variants: Record<VariantId, VariantContent>
}
