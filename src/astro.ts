/**
 * This entry file is for astro plugin.
 *
 * @module
 */

import * as path from 'node:path'

import { buildStylexRules } from './core/build'
import { getOptions } from './core/options'
import type { UnpluginStylexOptions } from './types'
import { PLUGIN_NAME, STORE_KEY, stylexRulesStore } from './utils'
import vitePlugin from './vite'

/**
 * Astro plugin
 *
 * @example
 *
 * import { defineConfig } from 'astro/config'
 * import stylexAstroPlugin from 'unplugin-stylex/astro'
 *
 * export default defineConfig({
 *   integrations: [
 *     stylexAstroPlugin(),
 *   ],
 * })
 */

export default function astro(options: UnpluginStylexOptions = {}) {
  const configured = getOptions({ ...options, framework: 'vite' })
  const filename = configured.stylex.filename

  return {
    name: PLUGIN_NAME,

    hooks: {
      'astro:config:setup': async ({ config, updateConfig, injectScript }) => {
        const astroOptions: UnpluginStylexOptions = {
          ...options,
          validExts: options.validExts ?? /\.[mc]?[jt]sx?$|\.astro$|\.stylex$/,
        }

        if (!stylexRulesStore.has(STORE_KEY)) {
          stylexRulesStore.set(STORE_KEY, {})
        }

        config.vite.plugins ??= []

        const basePlugin = vitePlugin(astroOptions)
        const wrappedPlugin = {
          ...basePlugin,
          getStylexRules: () => stylexRulesStore.get(STORE_KEY) || {},
        }

        // ;(config as Record<string, unknown>).__stylexPlugin = wrappedPlugin

        const base = config.base ?? '/'
        const cssPath = path.posix.join(base, filename).replace(/\/+/g, '/')

        injectScript(
          'head-inline',
          `
          (function() {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = ${JSON.stringify(cssPath)};
            document.head.appendChild(link);
          })();
          `,
        )

        config.vite.plugins.push(wrappedPlugin)

        const currentNoExternal = config.vite.ssr?.noExternal ?? []
        const noExternal = Array.isArray(currentNoExternal) ? [...currentNoExternal] : []

        if (!noExternal.includes('@stylexjs/stylex')) {
          noExternal.push('@stylexjs/stylex')
        }

        updateConfig({
          vite: {
            ssr: {
              noExternal,
            },
          },
        })
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const base = '/'
          const cssPath = path.posix.join(base, filename).replace(/\/+/g, base)

          if (req.url === cssPath || req.url === `/${filename}` || req.url?.endsWith(`/${filename}`)) {
            const stylexRules = stylexRulesStore.get(STORE_KEY) ?? {}
            const collectedCSS = buildStylexRules(stylexRules, options.stylex?.useCSSLayers ?? false)

            res.setHeader('Content-Type', 'text/css')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(collectedCSS ?? '')

            return
          }
          next()
        })
      },
    },
  }
}
