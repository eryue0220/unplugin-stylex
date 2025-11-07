import react from '@vitejs/plugin-react'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
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
