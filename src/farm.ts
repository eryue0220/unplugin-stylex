/**
 * This entry file is for farm plugin.
 *
 * @module
 */

import { createFarmPlugin } from 'unplugin'
import { unpluginFactory } from './index'

const farmPlugin: ReturnType<typeof createFarmPlugin> = createFarmPlugin(unpluginFactory)

/**
 * Farm plugin
 *
 * @example
 *
 * import { build } from 'esbuild'
 * import stylexPlugin from 'unplugin-stylex/farm'
 *
 * export default {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default farmPlugin
