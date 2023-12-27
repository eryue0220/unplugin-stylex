import type { UnpluginStylexOptions, BabelConfig } from '@/types'
import { isDevelopment } from './constants'

export function getOptions(options: UnpluginStylexOptions = ({} as UnpluginStylexOptions)) {
  const stylex = options.stylex || {}

  return {
    ...options,
    dev: options.dev || isDevelopment,
    include: options.include || [/\.[jt]sx?$/],
    exclude: options.exclude || [/node_modules/, /\.git/],
    enforce: options.enforce || 'pre',
    stylex: {
      ...stylex,
      filename: stylex.filename || 'stylex.css',
      stylexImports: stylex.stylexImports || ['stylex', '@stylexjs/stylex'],
      useCSSLayers: stylex.useCSSLayers || false,
      unstable_moduleResolution: stylex.unstable_moduleResolution || { type: 'commonJS', rootDir: process.cwd() },
      babelConfig: {
        babelrc: (stylex.babelConfig || {}).babelrc || false,
        plugins: (stylex.babelConfig || {}).plugins || [],
        presets: (stylex.babelConfig || {}).presets || [],
      },
    },
  }
}
