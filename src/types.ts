export type Lang = 'fr' | 'en' | 'ar'
export type VariantId = 'corporate' | 'tech' | 'creative' | 'startup'

export interface Personal {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  photo: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  bullets: string[]
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  start: string
  end: string
  note: string
}

export interface SkillGroup {
  id: string
  name: string
  skills: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  link: string
  tags: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
}

export interface LanguageItem {
  id: string
  name: string
  level: string
}

export interface CVData {
  personal: Personal
  summary: string
  experiences: Experience[]
  education: Education[]
  skillGroups: SkillGroup[]
  projects: Project[]
  certifications: Certification[]
  languages: LanguageItem[]
  interests: string[]
}

export type Density = 'compact' | 'normal' | 'airy'

export interface Theme {
  accent: string
  showPhoto: boolean
  density: Density
}
