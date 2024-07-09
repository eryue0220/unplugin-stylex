import { defineConfig } from '@farmfe/core'
import stylexFarmPlugin from 'unplugin-stylex/farm'

export default defineConfig({
  compilation: {
    input: {
      index: './index.html'
    },
    output: {
      path: 'dist',
      publicPath: '/',
      targetEnv: 'browser'
    },
  },
  server: {
    hmr: true,
  },
  plugins: [
    ['@farmfe/plugin-react', {
      refresh: true,
      development: true,
      runtime: 'automatic',
    }],
    stylexFarmPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        // this must set `true` in farm
        treeshakeCompensation: true,
      },
    }),
  ],
})
