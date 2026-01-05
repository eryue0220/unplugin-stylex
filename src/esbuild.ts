/**
 * This entry file is for esbuild plugin. Requires esbuild >= 0.15
 *
 * @module
 */

import type { EsbuildPlugin } from 'unplugin'
import { createEsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const esbuildPlugin: UnpluginStylexInstance<EsbuildPlugin | EsbuildPlugin[]> = createEsbuildPlugin(unpluginFactory)

/**
 * Esbuild plugin
 *
 * @example
 *
 * import { build } from 'esbuild'
 * import stylexPlugin from 'unplugin-stylex/esbuild'
 *
 * export default {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default esbuildPlugin
