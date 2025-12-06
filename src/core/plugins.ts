import flowSyntaxPlugin from '@babel/plugin-syntax-flow'
import typescriptSyntaxPlugin from '@babel/plugin-syntax-typescript'

export function getSyntaxPlugins(extname: string) {
  const TSPlugin = extname === '.tsx' ? [[typescriptSyntaxPlugin, { isTSX: true }]] : [typescriptSyntaxPlugin]
  return ['.js', '.jsx'].includes(extname) ? [flowSyntaxPlugin] : TSPlugin
}
