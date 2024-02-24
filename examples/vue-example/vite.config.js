import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import stylexVitePlugin from 'unplugin-stylex/vite'

export default defineConfig({
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
