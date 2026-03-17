import type { UnpluginStylexTransformer } from '@/types'
import { defaultTransformer } from './default'

export const astro: UnpluginStylexTransformer = async (context) => {
  const { inputCode, id, options } = context

  // Astro files have frontmatter between --- delimiters
  // Match the frontmatter section (including the --- delimiters)
  const frontmatterMatch = inputCode.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    // No frontmatter found, return as-is
    return {
      code: inputCode,
      map: undefined,
      stylexRules: {},
    }
  }

  const frontmatterContent = frontmatterMatch[1]
  const templateContent = frontmatterMatch[2] ?? ''

  // Check if frontmatter contains stylex imports
  const stylex = options.stylex ?? {}
  const stylexImports = stylex.stylexImports ?? ['@stylexjs/stylex']

  if (!stylexImports.some((importName) => frontmatterContent.includes(importName))) {
    return {
      code: inputCode,
      map: undefined,
      stylexRules: {},
    }
  }

  // Transform only the frontmatter content
  const ctx = {
    id,
    inputCode: frontmatterContent,
    pluginContext: context.pluginContext,
    options,
  }

  const result = await defaultTransformer(ctx)
  const transformedFrontmatter = `---\n${result.code}\n---`
  const transformedCode = transformedFrontmatter + (templateContent ? `\n${templateContent}` : '')

  return {
    code: transformedCode,
    map: result.map,
    stylexRules: result.stylexRules,
  }
}
