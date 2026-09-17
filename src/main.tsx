import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { useCV } from './store/useCV'
import { PARAM_LANG, PARAM_VARIANT, STATE_ID } from './lib/params'

if (PARAM_VARIANT) useCV.getState().setVariant(PARAM_VARIANT)
if (PARAM_LANG) useCV.getState().setLang(PARAM_LANG)

if (import.meta.env.DEV) (window as unknown as { __cv: unknown }).__cv = useCV

const boot = () =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

// Headless PDF render: load the exact editor state first, then render once.
if (STATE_ID) {
  fetch(`/__api/state/${STATE_ID}`)
    .then((r) => r.json())
    .then((st) => useCV.getState().importAll(st))
    .finally(boot)
} else {
  boot()
}
