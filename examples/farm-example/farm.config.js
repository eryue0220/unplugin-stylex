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
  plugins: [
    '@farmfe/plugin-react',
    stylexFarmPlugin({ dev: true }),
  ],
});