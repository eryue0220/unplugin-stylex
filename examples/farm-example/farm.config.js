import { defineConfig } from '@farmfe/core'
import stylexFarmPlugin from 'unplugin-stylex/farm'

export default defineConfig({
  plugins: [
    '@farmfe/plugin-react',
    stylexFarmPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    }),
  ],
});