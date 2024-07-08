import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import stylexPlugin from 'unplugin-stylex/rspack'

export default defineConfig({
  plugins: [
    pluginReact(),
  ],
  html: {
    template: './public/index.html',
  },
  tools: {
    rspack: {
      plugins: [
        stylexPlugin({
          dev: true,
          stylex: {
            useCSSLayers: true,
            genConditionalClasses: true,
            treeshakeCompensation: true,
          },
        }),
      ],
    },
  },
})
