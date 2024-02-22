import typescriptSyntaxPlugin from '@babel/plugin-syntax-typescript'
import flowSyntaxPlugin from '@babel/plugin-syntax-flow'
import hermesParserPlugin from 'babel-plugin-syntax-hermes-parser'

export function getSyntaxPlugins(extname: string) {
  return extname === '.ts'
    ? [typescriptSyntaxPlugin]
    : extname === '.tsx'
      ? [[typescriptSyntaxPlugin, { isTSX: true }]]
      : [flowSyntaxPlugin, hermesParserPlugin]
}
