/**
 * This entry file is for Webpack plugin.
 *
 * @module
 */

import { createWebpackPlugin } from 'unplugin'
import type { WebpackPluginInstance } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const webpackPlugin: UnpluginStylexInstance<WebpackPluginInstance> = createWebpackPlugin(unpluginFactory)

/**
 * Webpack plugin
 *
 * @example
 *
 * import stylexPlugin from 'unplugin-stylex/webpack'
 *
 * module.exports = {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default webpackPlugin
