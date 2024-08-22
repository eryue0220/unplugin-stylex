import { vitePlugin as remix } from '@remix-run/dev'
import stylexVitePlugin from 'unplugin-stylex/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  plugins: [
    remix(),
    stylexVitePlugin({
      dev: true,
    }),
    tsconfigPaths(),
  ],
})
