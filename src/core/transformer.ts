import * as fs from 'fs/promises'
import * as path from 'path'

import { transformAsync } from '@babel/core'
import flowSyntaxPlugin from '@babel/plugin-syntax-flow'
import jsxSyntaxPlugin from '@babel/plugin-syntax-jsx'
import typescriptSyntaxPlugin from '@babel/plugin-syntax-typescript'
import stylexBabelPlugin from '@stylexjs/babel-plugin'

export async function transformer(context) {
  const { id, source, options } = context
  const stylex = options.stylex
  const extname = path.extname(id)
  const stylexRules = {}

  if (stylex.stylexImports.some((importName) => source.includes(importName))) {
    const originSource = stylex.babelConfig.babelrc
      ? await fs.readFile(id, 'utf-8')
      : source

    const { code, map, metadata } = await transformAsync(
      originSource,
      {
        babelrc: stylex.babelConfig.babelrc,
        filename: id,
        plugins: [
          ...(stylex.babelConfig.plugins || []),
          extname === '.ts'
            ? typescriptSyntaxPlugin
            : extname === '.tsx'
              ? [typescriptSyntaxPlugin, { isTSX: true }]
              : flowSyntaxPlugin,

          jsxSyntaxPlugin,
          [
            stylexBabelPlugin,
            {
              dev: options.dev,
              unstable_moduleResolution: stylex.unstable_moduleResolution,
              importSources: stylex.stylexImports,
              ...stylex,
            }
          ],
        ],
        presets: stylex.babelConfig.presets,
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

  return { code: source }
}
