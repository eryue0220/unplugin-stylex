import { extname as pathExtname } from 'node:path'
import { transformAsync } from '@babel/core'
import jsxSyntaxPlugin from '@babel/plugin-syntax-jsx'
import stylexBabelPlugin from '@stylexjs/babel-plugin'

import { getSyntaxPlugins } from './plugins'
import { UnpluginStylexOptions } from '@/types'

export async function transformer(context) {
  const { id, inputCode, options } = context
  const stylex = options.stylex
  const extname = pathExtname(id)
  const stylexRules = {}

  const stylexBabelPluginOptions = {
    dev: options.dev,
    importSources: stylex.stylexImports,
    ...stylex,
  }

  const plugins = [
    ...(stylex.babelConfig?.plugins || []),
    ...getSyntaxPlugins(extname),
    jsxSyntaxPlugin,
    stylexBabelPlugin.withOptions(stylexBabelPluginOptions),
  ]

  const { code, map, metadata } = await transformAsync(inputCode, {
    babelrc: stylex.babelConfig?.babelrc,
    filename: id,
    presets: stylex.babelConfig?.presets,
    plugins,
  })

  if (metadata.stylex && metadata.stylex.length > 0) {
    stylexRules[id] = metadata.stylex
  }

  if (!stylex.babelConfig?.babelrc) {
    return {
      code,
      // compatible for farm, null will occur an error
      map: map || undefined,
      stylexRules,
    }
  }

  return { code, stylexRules }
}

export async function transformerSvelte(code: string, id: string, options: UnpluginStylexOptions) {
  const scriptMatch = code.match(/<script([^>]*)>([\s\S]*?)<\/script>/i)
  if (!scriptMatch) {
    return
  }

  const scriptAttrs = scriptMatch[1]
  const scriptContent = scriptMatch[2]
  const fullScriptTag = scriptMatch[0]

  // Transform only the script content
  const context = {
    id,
    inputCode: scriptContent,
    pluginContext: this,
    options,
  }

  const result = await transformer(context)
  const transformedScriptTag = `<script${scriptAttrs}>${result.code}</script>`
  const transformedCode = code.replace(fullScriptTag, transformedScriptTag)

  return {
    code: transformedCode,
    map: result.map,
    stylexRules: result.stylexRules,
  }
}
