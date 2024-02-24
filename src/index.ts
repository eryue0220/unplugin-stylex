import * as path from 'node:path'

import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'

import { buildStylexRules } from './core/build'
import { PLUGIN_NAME } from './core/constants'
import { getOptions } from './core/options'
import { transformer } from './core/transformer'
import type { UnpluginStylexOptions } from './types'

export const unpluginFactory: UnpluginFactory<UnpluginStylexOptions | undefined> = (rawOptions = {}) => {
  const options = getOptions(rawOptions)
  const stylexRules = {}
  let viteConfig = null

  return {
    name: PLUGIN_NAME,

    async transform(code, id) {
      const dir = path.dirname(id)
      const basename = path.basename(id)
      const file = path.join(dir, basename.includes('?') ? basename.split('?')[0] : basename)

      if (!options.stylex.stylexImports.some((importName) => code.includes(importName))) {
        return
      }

      const context = {
        id: file,
        inputCode: code,
        pluginContext: this,
        options,
      }

      try {
        const result = await transformer(context)

        if (result.stylexRules && result.stylexRules[id]) {
          stylexRules[id] = result.stylexRules[id]
        }

        return result
      } catch (error) {
        console.error('transform::error::', error)
        this.error(error)
      }
    },

    buildEnd() {
      const fileName = options.stylex.filename
      const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)

      if (!collectedCSS) return

      this.emitFile({
        fileName,
        source: collectedCSS,
        type: 'asset',
      })
    },

    vite: {
      config(config) {
        viteConfig = {
          build: config.build,
          base: config.base,
        }
      },

      configResolved(config) {
        config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
        config.optimizeDeps.exclude.push('@stylexjs/open-props')
      },

      buildEnd() {
        const fileName = `${viteConfig.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`
        const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)

        if (!collectedCSS) return

        this.emitFile({
          fileName,
          source: collectedCSS,
          type: 'asset',
        })
      },

      transformIndexHtml(html, ctx) {
        const fileName = `${viteConfig.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`
        const css = ctx.bundle?.[fileName]

        if (!css) {
          return html
        }

        const publicPath = path.posix.join(
          viteConfig.base ?? '/',
          fileName.replace(/\\/g, '/')
        )

        return [
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: publicPath,
            },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}

export const unplugin = createUnplugin(unpluginFactory)

export * from './types'

export default unplugin
