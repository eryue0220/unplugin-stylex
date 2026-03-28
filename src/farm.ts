/**
 * This entry file is for farm plugin.
 *
 * @module
 */

import type { UnpluginInstance } from 'unplugin'
import { createFarmPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexOptions } from './types'

const farmPlugin: UnpluginInstance<UnpluginStylexOptions | undefined>['farm'] = createFarmPlugin(unpluginFactory)

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
