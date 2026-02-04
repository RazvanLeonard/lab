import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// GitHub Pages: copy index.html to 404.html so client-side routes work
function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html')
      const destPath = path.resolve(__dirname, 'dist/404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, destPath)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin()],
  base: '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
