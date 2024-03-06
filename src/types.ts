export type BabelConfig = {
  plugins: unknown[]
  presets: unknown[]
  babelrc: boolean
}

export type StylexOptions = {
  filename?: string
  stylexImports?: string[]
  classNamePrefix?: string
  useCSSLayers?:  boolean
  unstable_moduleResolution?: {
    type: 'commonjs' | 'haste'
    rootDir: string
  }
  babelConfig?: BabelConfig
  runtimeInjection: boolean
  aliases?: string[]
}

export type UnpluginStylexOptions = {
  compiler?: string
  dev?: boolean
  enforce?: 'post' | 'pre'
  stylex?: StylexOptions
}

export type UnpluginStylexInstance<T> = (options?: UnpluginStylexOptions) => T
