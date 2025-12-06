/**
 * This entry file is for main unplugin.
 *
 *
 * @module
 */

import * as path from 'node:path'

import { createUnplugin } from 'unplugin'
import type { UnpluginFactory, UnpluginInstance } from 'unplugin'
import type { BuildOptions } from 'vite'

import { buildStylexRules } from './core/build'
import { getOptions } from './core/options'
import { transformers } from './core/transformers'
import type { UnpluginStylexOptions } from './types'
import { PLUGIN_NAME, STORE_KEY, stylexRulesStore } from './utils'

/**
 * The main unplugin factory.
 */
export const unpluginFactory: UnpluginFactory<UnpluginStylexOptions | undefined> = (rawOptions, meta) => {
  const options = getOptions({ ...(rawOptions || {}), framework: meta.framework })

  if (!stylexRulesStore.has(STORE_KEY)) {
    stylexRulesStore.set(STORE_KEY, {})
  }

  const stylexRules = stylexRulesStore.get(STORE_KEY)
  let viteConfig: { build: BuildOptions | undefined; base: string | undefined } | null = null

  return {
    name: PLUGIN_NAME,

    transformInclude(id) {
      const validExts = options.validExts
      const extname = path.extname(id)
      // for handle vite
      const questionMarkIndex = extname.indexOf('?')
      const validExtName = questionMarkIndex > -1 ? extname.slice(0, questionMarkIndex) : extname
      return validExts instanceof RegExp ? validExts.test(validExtName) : validExts.includes(validExtName)
    },

    async transform(code, id) {
      const dir = path.dirname(id)
      const basename = path.basename(id)
      const file = path.join(dir, basename.includes('?') ? basename.split('?')[0] : basename)
      const extname = path.extname(file).slice(1)

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
        const transformer = transformers[extname] ?? transformers.default
        const result = await transformer(context)

        if (result.stylexRules?.[id]) {
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

      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) {
            next()
            return
          }

          const fileName = `${viteConfig?.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`
          const cssPath = path.posix.join(viteConfig?.base ?? '/', fileName.replace(/\\/g, '/')).replace(/\/+/g, '/')
          const basePath = (viteConfig?.base ?? '/').replace(/\/+$/, '') || '/'
          const filename = options.stylex.filename

          // Check if the request is for the CSS file
          // Match various path formats: /assets/stylex.css, /stylex.css, assets/stylex.css
          const normalizedUrl = req.url.split('?')[0] // Remove query params
          const isCSSRequest =
            normalizedUrl === cssPath ||
            normalizedUrl === `${basePath}/${filename}` ||
            normalizedUrl === `/${filename}` ||
            normalizedUrl.endsWith(`/${filename}`) ||
            normalizedUrl === filename

          if (isCSSRequest) {
            const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)

            res.setHeader('Content-Type', 'text/css')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(collectedCSS || '')

            return
          }

          next()
        })
      },

      buildEnd() {
        const fileName = `${viteConfig?.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`
        const collectedCSS = buildStylexRules(stylexRules, options.stylex.useCSSLayers)

        if (!collectedCSS) return

        this.emitFile({
          fileName,
          source: collectedCSS,
          type: 'asset',
        })
      },

      transformIndexHtml(html, ctx) {
        const fileName = `${viteConfig?.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`
        const css = ctx.bundle?.[fileName]

        if (!css) {
          return html
        }

        const publicPath = path.posix.join(viteConfig?.base ?? '/', fileName.replace(/\\/g, '/'))

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

export const unplugin: UnpluginInstance<UnpluginStylexOptions | undefined, boolean> = createUnplugin(unpluginFactory)

export * from './types'

export default unplugin
