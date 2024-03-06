/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { createVitePlugin } from 'unplugin'
import type { VitePlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const vitePlugin: UnpluginStylexInstance<VitePlugin | VitePlugin[]> = createVitePlugin(unpluginFactory)

/**
 * Vite example
 *
 * @example
 *
 * import { defineConfig } from 'vite'
 * import stylexPlugin from 'unplugin-stylex/vite'
 *
 * export default defineConfig({
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * })
 */
export default vitePlugin
