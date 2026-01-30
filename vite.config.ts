import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: [
      'react',
      'react-dom',
    ]
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './index.html',
        mobile: './mobile.html',
        config: './config.html',
      }
    }
  },
  base: './'
})