import type { FilterPattern } from '@rollup/pluginutils'

export type BabelConfig = {
  plugins: any[]
  presets: any[]
  babelrc: boolean
}

type StylexOptions = {
  filename?: string
  stylexImports?: string[]
  classNamePrefix?: string
  useCSSLayers?:  boolean
  unstable_moduleResolution?: {
    type: "commonjs" | "haste"
    rootDir: string
  }
  babelConfig?: BabelConfig
}

export type UnpluginStylexOptions = {
  dev?: boolean
  include?: FilterPattern
  exclude?: FilterPattern
  enforce?: "post" | "pre"
  stylex?: StylexOptions
}
