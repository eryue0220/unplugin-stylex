/**
 * This entry file is for rolldown plugin.
 *
 * @module
 */

import { createRolldownPlugin } from 'unplugin'
import { unpluginFactory } from './index'

const rolldownPlugin = createRolldownPlugin(unpluginFactory)

/**
 * @experimental
 *
 * Rolldown plugin
 *
 * @example
 *
 * import { build } from 'esbuild'
 * import stylexPlugin from 'unplugin-stylex/rolldown'
 *
 * export default {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default rolldownPlugin
