import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path so assets resolve correctly when hosted at
  // https://<user>.github.io/basketball/ on GitHub Pages.
  base: '/basketball/',
})
