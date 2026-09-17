import type { Lang, VariantId } from '../types'

// Deep links: ?v=tech&l=ar (and &print=1 for a bare page, used by export tooling)
const params = new URLSearchParams(location.search)
const v = params.get('v')
const l = params.get('l')

export const PARAM_VARIANT = v && ['corporate', 'tech', 'creative', 'startup'].includes(v) ? (v as VariantId) : null
export const PARAM_LANG = l && ['fr', 'en', 'ar'].includes(l) ? (l as Lang) : null
export const PRINT_MODE = params.get('print') === '1'
/** One-shot state id handed over by the local PDF renderer */
export const STATE_ID = params.get('sid')
