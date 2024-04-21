/**
 * This entry file is for astro plugin.
 *
 * @module
 */

import { PLUGIN_NAME } from './core/constants'
import vitePlugin from './vite'
import type { UnpluginStylexOptions } from './types'

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
export default function (options: UnpluginStylexOptions) {
  return {
    name: PLUGIN_NAME,

    hooks: {
      'astro:config:setup': async (astro) => {
        astro.config.vite.plugins ||= []
        astro.config.vite.plugins.push(vitePlugin(options))
      },
    },
  }
}
