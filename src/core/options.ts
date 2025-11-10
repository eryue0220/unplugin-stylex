import type { StylexOptions, UnpluginStylexOptions } from '@/types'
import { getAliases, isDevelopment } from '@/utils'

export function getOptions(options: UnpluginStylexOptions & { framework: string }): Required<UnpluginStylexOptions> {
  const projectAliases = getAliases(options.framework)
  const stylex = options.stylex || ({} as StylexOptions)
  const isDev = options.dev || isDevelopment

  return {
    ...options,
    dev: isDev,
    // .js, .jsx, .mjs, .cjs, .ts, .tsx, .mts, .cts, .svelte, .vue
    validExts: options.validExts ?? /\.[mc]?[jt]sx?$|\.svelte$|\.vue$/,
    stylex: {
      filename: stylex.filename || 'stylex.css',
      stylexImports: stylex.stylexImports || ['@stylexjs/stylex'],
      runtimeInjection: stylex.runtimeInjection ?? isDev,
      aliases: stylex.aliases ?? projectAliases ?? {},
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
