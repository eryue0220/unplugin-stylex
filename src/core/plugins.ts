import typescriptSyntaxPlugin from '@babel/plugin-syntax-typescript'
import flowSyntaxPlugin from '@babel/plugin-syntax-flow'

export function getSyntaxPlugins(extname: string) {
  const TSPlugin = extname === '.tsx'
    ? [[typescriptSyntaxPlugin, { isTSX: true }]]
    : [typescriptSyntaxPlugin]

  return ['.js', '.jsx'].includes(extname)
    ? [flowSyntaxPlugin]
    : TSPlugin
}
