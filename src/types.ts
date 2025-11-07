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
