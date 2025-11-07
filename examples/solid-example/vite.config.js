import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    solid(),
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
