import { defineConfig } from 'rolldown'
import stylexRolldownPlugin from 'unplugin-stylex/rolldown'

export default defineConfig({
  input: 'src/index.jsx',
  build: {
    outDir: 'dist',
  },
  plugins: [
    stylexRolldownPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    }),
  ],
})
