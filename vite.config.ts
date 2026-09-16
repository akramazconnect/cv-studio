import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import devApi from './scripts/dev-api'

export default defineConfig({
  // Relative base so the same build works on github.io/<repo>/ and on a custom domain.
  base: './',
  plugins: [react(), tailwindcss(), devApi()],
  server: { port: 5173, strictPort: true },
})
