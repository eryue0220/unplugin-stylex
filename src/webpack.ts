import { isDevelopment } from './core/constants'
import type { UnpluginStylexOptions } from './types'

export default (options?: UnpluginStylexOptions) => {
  if (isDevelopment || options?.dev) {
    throw new Error('If you want to use this plugin through webpack, please use "@stylexjs/webpack-plugin" instead')
  }
}
