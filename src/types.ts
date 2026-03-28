import type { Rule } from '@stylexjs/babel-plugin'

export type SourceMap = {
  version: number
  sources: string[]
  names: string[]
  mappings: string
  file?: string
  sourceRoot?: string
  sourcesContent?: Array<string | null>
}

export type BabelConfig = {
  plugins: unknown[]
  presets: unknown[]
  babelrc: boolean
}

export type StylexOptions = {
  filename?: string
  aliases?: Record<string, string | string[]>
  stylexImports?: string[]
  classNamePrefix?: string
  unstable_moduleResolution?: {
    type: 'commonJS' | 'haste'
    rootDir: string
  }
  babelConfig?: BabelConfig
  useCSSLayers?: boolean
  genConditionalClasses?: boolean
  treeshakeCompensation?: boolean
  runtimeInjection?: boolean
}

export type UnpluginStylexOptions = {
  // compiler?: string
  validExts?: RegExp | string[]
  dev?: boolean
  // enforce?: 'post' | 'pre'
  stylex?: StylexOptions
}

export type UnpluginStylexInstance<T> = (options?: UnpluginStylexOptions) => T

export type UnpluginStylexTransformer = (context: {
  inputCode: string
  id: string
  options: UnpluginStylexOptions
  pluginContext: unknown
}) => Promise<{
  code: string
  map?: SourceMap | null
  stylexRules: Record<string, Rule[]>
}>
