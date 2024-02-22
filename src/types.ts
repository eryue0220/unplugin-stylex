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
    type: "commonjs" | "haste"
    rootDir: string
  }
  babelConfig?: BabelConfig
  runtimeInjection: boolean
  aliases?: string[]
}

export type UnpluginStylexOptions = {
  dev?: boolean
  enforce?: "post" | "pre"
  stylex?: StylexOptions
}
