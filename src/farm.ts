/**
 * This entry file is for farm plugin.
 *
 * @module
 */

import { createFarmPlugin } from 'unplugin'
import type { JsPluginExtended } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const farmPlugin: UnpluginStylexInstance<JsPluginExtended | JsPluginExtended[]> = createFarmPlugin(unpluginFactory)


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
