import type { UnpluginStylexTransformer } from '@/types'
import { defaultTransformer } from './default'

export const svelte: UnpluginStylexTransformer = async (context) => {
  const { inputCode, id, options } = context
  const scriptMatch = inputCode.match(/<script([^>]*)>([\s\S]*?)<\/script>/i)

  if (!scriptMatch) {
    return {
      code: inputCode,
      map: undefined,
      stylexRules: {},
    }
  }

  const scriptAttrs = scriptMatch[1]
  const scriptContent = scriptMatch[2]
  const fullScriptTag = scriptMatch[0]

  // Transform only the script content
  const ctx = {
    id,
    inputCode: scriptContent,
    pluginContext: this,
    options,
  }
  const result = await defaultTransformer(ctx)
  const transformedScriptTag = `<script${scriptAttrs}>${result.code}</script>`
  const transformedCode = inputCode.replace(fullScriptTag, transformedScriptTag)

  return {
    code: transformedCode,
    map: result.map,
    stylexRules: result.stylexRules,
  }
}
