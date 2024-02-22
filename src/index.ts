import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
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
    enforce: options.enforce,

    async load(id) {
      const dir = path.dirname(id)
      const basename = path.basename(id)
      const file = path.join(dir, basename.includes('?') ? basename.split('?')[0] : basename)

      if (!existsSync(file)) {
        return
      }

      const code = await readFile(file)
      const context = {
        id: file,
        inputCode: code,
        pluginContext: this,
        options,
      }

      if (!options.stylex.stylexImports.some((importName) => code.includes(importName))) {
        return
      }

      try {
        const result = await transformer(context)

        if (result.stylexRules && result.stylexRules[id]) {
          stylexRules[id] = result.stylexRules[id]
        }

        return result
      } catch (error) {
        this.error(error)
      }
    },

    async transform(code, id) {
      const dir = path.dirname(id)
      const basename = path.basename(id)
      const file = path.join(dir, basename.includes('?') ? basename.split('?')[0] : basename)

      if (!existsSync(file)) {
        return
      }

      const context = {
        id: file,
        inputCode: code,
        pluginContext: this,
        options,
      }

      if (!options.stylex.stylexImports.some((importName) => code.includes(importName))) {
        return
      }

      try {
        const result = await transformer(context)

        if (result.stylexRules && result.stylexRules[id]) {
          stylexRules[id] = result.stylexRules[id]
        }

        return result
      } catch (error) {
        this.error(error)
      }
    },

    buildEnd() {
      const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)
      const fileName = options.stylex.filename

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
        const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)
        const fileName = `${viteConfig.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`

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

export default unplugin
