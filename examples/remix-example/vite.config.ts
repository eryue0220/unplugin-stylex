import { vitePlugin as remix } from '@remix-run/dev'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  ssr: {
    noExternal: ['@stylexjs/open-props', '@stylexjs/stylex'],
  },
  plugins: [
    {
      ...stylexVitePlugin({
        dev: true,
        stylex: {
          useCSSLayers: true,
          genConditionalClasses: true,
          treeshakeCompensation: true,
        },
      }),
      enforce: 'pre',
    },
    remix(),
    tsconfigPaths(),
  ],
})
