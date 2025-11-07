import { vitePlugin as remix } from '@remix-run/dev'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    exclude: ['@stylexjs/open-props'],
  },
  ssr: {
    noExternal: ['@stylexjs/open-props'],
  },
  plugins: [
    remix(),
    tsconfigPaths(),
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
