import { isDevelopment } from './core/constants'

export default (options?) => {
  if (isDevelopment || options?.dev) {
    throw new Error('If you want to use this plugin through rollup, please use "@stylexjs/rollup-plugin" instead')
  }
}
