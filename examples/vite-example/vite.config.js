import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylexVitePlugin from 'unplugin-stylex/vite'

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  plugins: [
    react(),
    stylexVitePlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    }),
  ],
})
