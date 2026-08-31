import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ['@stylexjs/stylex'],
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
    tanstackStart(),
    react(),
  ],
})
