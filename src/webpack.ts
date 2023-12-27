import { isDevelopment } from './core/constants'

export default (options?) => {
  if (isDevelopment || options?.dev) {
    throw new Error(`If you want to use this plugin through webpack, please use "@stylexjs/webpack-plugin" instead`)
  }
}
