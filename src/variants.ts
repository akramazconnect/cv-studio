import type { Theme, VariantId } from './types'
import { savedTheme } from './content'

export interface VariantMeta {
  id: VariantId
  /** default accent */
  accent: string
  /** pastel presets shown in the editor */
  palette: string[]
}

export const VARIANTS: VariantMeta[] = [
  { id: 'corporate', accent: '#5B9A8B', palette: ['#5B9A8B', '#6B8FB5', '#8A7FB8', '#B58A6B', '#5F6B7A'] },
  { id: 'tech',      accent: '#5C6FD6', palette: ['#5C6FD6', '#4F8FA8', '#5B9A8B', '#7A6ACF', '#4A5568'] },
  { id: 'creative',  accent: '#D98B7C', palette: ['#D98B7C', '#C98BB9', '#D9A441', '#7FA88F', '#6B8FB5'] },
  { id: 'startup',   accent: '#8B7CD6', palette: ['#8B7CD6', '#5C9ED6', '#D97C9B', '#5BA88F', '#D9A441'] },
]

export const VARIANT_IDS = VARIANTS.map((v) => v.id)

export const defaultTheme = (variant: VariantId): Theme =>
  savedTheme(variant) ?? {
    accent: VARIANTS.find((v) => v.id === variant)!.accent,
    showPhoto: true,
    // Opérations is deliberately lean (skills-first, no experience section), so give it more air.
    density: variant === 'corporate' ? 'airy' : 'normal',
  }
