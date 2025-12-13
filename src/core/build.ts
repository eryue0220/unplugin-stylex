import type { Rule } from '@stylexjs/babel-plugin'
import stylex from '@stylexjs/babel-plugin'

export function buildStylexRules(stylexRules: { [key: string]: Rule[] }, useCSSLayers: boolean): string {
  const rules = Object.values(stylexRules).flat()
  if (rules.length === 0) return ''

  return stylex.processStylexRules(rules, useCSSLayers)
}
