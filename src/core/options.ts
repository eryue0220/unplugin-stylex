import type { StylexOptions, UnpluginStylexOptions } from '@/types'
import { isDevelopment } from './constants'

export function getOptions(options: UnpluginStylexOptions): Required<UnpluginStylexOptions> {
  const stylex = options.stylex || ({} as StylexOptions)
  const isDev = options.dev || isDevelopment

  return {
    ...options,
    dev: isDev,
    // .js, .jsx, .mjs, .cjs, .ts, .tsx, .mts, .cts
    validExts: options.validExts ?? /\.[mc]?[jt]sx?$/,
    stylex: {
      filename: stylex.filename || 'stylex.css',
      stylexImports: stylex.stylexImports || ['@stylexjs/stylex'],
      runtimeInjection: stylex.runtimeInjection ?? isDev,
      aliases: stylex.aliases,
      useCSSLayers: stylex.useCSSLayers || false,
      unstable_moduleResolution: stylex.unstable_moduleResolution || { type: 'commonJS', rootDir: process.cwd() },
      babelConfig: {
        babelrc: stylex.babelConfig?.babelrc ?? false,
        plugins: stylex.babelConfig?.plugins ?? [],
        presets: stylex.babelConfig?.presets ?? [],
      },
      ...stylex,
    },
  }
}
