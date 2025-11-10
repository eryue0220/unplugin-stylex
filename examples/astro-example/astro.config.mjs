import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import stylexAstroPlugin from 'unplugin-stylex/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    stylexAstroPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    }),
  ],
})
