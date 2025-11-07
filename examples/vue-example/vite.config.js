import vue from '@vitejs/plugin-vue'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    vue(),
    stylexVitePlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        treeshakeCompensation: true,
      },
    }),
  ],
})
