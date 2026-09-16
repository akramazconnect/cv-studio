import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { useCV } from './store/useCV'
import { PARAM_LANG, PARAM_VARIANT } from './lib/params'

if (PARAM_VARIANT) useCV.getState().setVariant(PARAM_VARIANT)
if (PARAM_LANG) useCV.getState().setLang(PARAM_LANG)

if (import.meta.env.DEV) (window as unknown as { __cv: unknown }).__cv = useCV

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
