/**
 * This entry file is for Rspac plugin.
 *
 * @module
 */

import { createRspackPlugin } from 'unplugin'
import type { RspackPluginInstance } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

type RspackPluginType = UnpluginStylexInstance<RspackPluginInstance>

const rspackPlugin: RspackPluginType = createRspackPlugin(unpluginFactory)

/**
 * Rsapck plugin
 *
 * @example
 *
 * import stylexPlugin from 'unplugin-stylex/rspack'
 *
 * module.exports = {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default rspackPlugin
