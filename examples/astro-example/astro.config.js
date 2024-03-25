import { defineConfig } from 'astro/config'
import stylexAstroPlugin from 'unplugin-stylex/astro'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    stylexAstroPlugin({
      dev: true,
    }),
  ],
})
