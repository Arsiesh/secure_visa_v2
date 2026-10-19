import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /secure_visa_v2/; the deploy workflow sets BASE_PATH. Locally it stays at the root.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5180, strictPort: true },
})
