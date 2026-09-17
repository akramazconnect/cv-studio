import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CVData, Lang, Theme, VariantId } from '../types'
import { buildDefault } from '../content'
import { defaultTheme } from '../variants'

type Key = `${VariantId}:${Lang}`
const key = (v: VariantId, l: Lang): Key => `${v}:${l}`

interface State {
  lang: Lang
  variant: VariantId
  data: Partial<Record<Key, CVData>>
  themes: Partial<Record<VariantId, Theme>>
  setLang: (lang: Lang) => void
  setVariant: (variant: VariantId) => void
  update: (patch: (d: CVData) => CVData) => void
  updateTheme: (patch: Partial<Theme>) => void
  reset: () => void
  importAll: (payload: { data?: State['data']; themes?: State['themes'] }) => void
}

// v1 shipped invented sample employers; used by the persist migration below.
// Must be declared before the store: hydration runs synchronously at module load.
const LEGACY_MARKERS = [
  'Société de logistique et messagerie',
  'Prestataire de services IT',
  'Banque / Établissement financier',
  'Clients PME, commerces et associations',
  'Agence de communication',
  'Startups & porteurs de projets',
  'Logistics & courier company',
  'IT services provider',
  'Bank / Financial institution',
  'SMEs, retail and non-profit clients',
  'Communication agency',
  'Startups & founders',
  'شركة لوجستيك ونقل البريد',
  'مزود خدمات معلوماتية',
  'بنك / مؤسسة مالية',
  'مقاولات صغيرة، محلات تجارية وجمعيات',
  'وكالة تواصل',
  'شركات ناشئة وأصحاب مشاريع',
]

export const useCV = create<State>()(
  persist(
    (set, get) => ({
      lang: 'fr',
      variant: 'corporate',
      data: {},
      themes: {},
      setLang: (lang) => set({ lang }),
      setVariant: (variant) => set({ variant }),
      update: (patch) => {
        const { variant, lang, data } = get()
        const k = key(variant, lang)
        const current = data[k] ?? buildDefault(variant, lang)
        set({ data: { ...data, [k]: patch(current) } })
      },
      updateTheme: (patch) => {
        const { variant, themes } = get()
        const current = themes[variant] ?? defaultTheme(variant)
        set({ themes: { ...themes, [variant]: { ...current, ...patch } } })
      },
      importAll: ({ data, themes }) => set({ data: data ?? {}, themes: themes ?? {} }),
      reset: () => {
        const { variant, lang, data, themes } = get()
        const next = { ...data }
        delete next[key(variant, lang)]
        const nextThemes = { ...themes }
        delete nextThemes[variant]
        set({ data: next, themes: nextThemes })
      },
    }),
    {
      name: 'cv-studio-v1',
      version: 2,
      // v1 shipped invented sample employers. Any stored entry that still carries one of
      // them is stale sample data, not a user's own CV — drop it so the new defaults show.
      migrate: (persisted, version) => {
        const state = persisted as Partial<State>
        if (version < 2 && state.data) {
          const stale = (entry: CVData) => LEGACY_MARKERS.some((m) => JSON.stringify(entry).includes(m))
          state.data = Object.fromEntries(Object.entries(state.data).filter(([, v]) => v && !stale(v)))
        }
        return state as State
      },
    },
  ),
)

/** Current CV data (stored edits or defaults). Memoised per key so the reference is stable. */
const defaultsCache = new Map<Key, CVData>()
export const useCurrentData = (): CVData =>
  useCV((s) => {
    const k = key(s.variant, s.lang)
    const stored = s.data[k]
    if (stored) return stored
    let d = defaultsCache.get(k)
    if (!d) {
      d = buildDefault(s.variant, s.lang)
      defaultsCache.set(k, d)
    }
    return d
  })

export const useCurrentTheme = (): Theme =>
  useCV((s) => s.themes[s.variant] ?? THEME_DEFAULTS[s.variant])

const THEME_DEFAULTS: Record<VariantId, Theme> = {
  corporate: defaultTheme('corporate'),
  tech: defaultTheme('tech'),
  creative: defaultTheme('creative'),
  startup: defaultTheme('startup'),
}
