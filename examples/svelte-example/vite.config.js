import { svelte } from '@sveltejs/vite-plugin-svelte'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['@stylexjs/open-props'],
  },
  ssr: {
    noExternal: ['@stylexjs/open-props', '@stylexjs/stylex'],
  },
  plugins: [
    svelte(),
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
  ],
})
