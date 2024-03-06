/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { isDevelopment } from './core/constants'
import type { UnpluginStylexOptions } from './types'

/**
 * Note: Current, please use @stylexjs/rollup-plugin
 */
export default (options?: UnpluginStylexOptions) => {
  if (isDevelopment || options?.dev) {
    throw new Error('If you want to use this plugin through rollup, please use "@stylexjs/rollup-plugin" instead')
  }
}
