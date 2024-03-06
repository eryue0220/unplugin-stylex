/**
 * This entry file is for Webpack plugin.
 *
 * @module
 */

import { isDevelopment } from './core/constants'
import type { UnpluginStylexOptions } from './types'

/**
 * Note: Current, please use @stylexjs/webpack-plugin
 */
export default (options?: UnpluginStylexOptions) => {
  if (isDevelopment || options?.dev) {
    throw new Error('If you want to use this plugin through webpack, please use "@stylexjs/webpack-plugin" instead')
  }
}
