// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT:
// - If deploying to https://<username>.github.io/<repo>/ (project page), set base to '/<repo>/'
// - If deploying to a custom domain or https://<username>.github.io (user/organization page), use '/' or omit base
export default defineConfig({
  plugins: [react()],
  base: '/Adventuro/' // required for GitHub Pages project site
})
