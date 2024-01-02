import { defineConfig } from 'vite'
import stylexVitePlugin from 'unplugin-stylex/vite'

export default defineConfig({
  plugins: [
    stylexVitePlugin({ dev: true, stylex: { filename: 'stylex-test.css' } }),
  ],
})
