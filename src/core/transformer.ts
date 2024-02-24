import { extname as pathExtname } from 'node:path'
import { transformAsync } from '@babel/core'
import jsxSyntaxPlugin from '@babel/plugin-syntax-jsx'
import stylexBabelPlugin from '@stylexjs/babel-plugin'
import { getSyntaxPlugins } from './plugins'

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
    ...(stylex.babelConfig.plugins || []),
    ...getSyntaxPlugins(extname),
    jsxSyntaxPlugin,
    [stylexBabelPlugin, stylexBabelPluginOptions],
  ]

  const { code, map, metadata } = await transformAsync(
    inputCode,
    {
      babelrc: stylex.babelConfig.babelrc,
      filename: id,
      presets: stylex.babelConfig.presets,
      plugins,
    }
  )

  if (metadata.stylex && metadata.stylex.length > 0) {
    stylexRules[id] = metadata.stylex
  }

  if (!stylex.babelConfig.babelrc) {
    return { code, map, stylexRules }
  }

  return { code, stylexRules }
}
