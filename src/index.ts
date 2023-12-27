import { createFilter } from '@rollup/pluginutils'
import stylexBabelPlugin from '@stylexjs/babel-plugin'
import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'

import { PLUGIN_NAME } from './core/constants'
import { getOptions } from './core/utils'
import { transformer } from './core/transformer'
import type { UnpluginStylexOptions } from './types'

export const unpluginFactory: UnpluginFactory<UnpluginStylexOptions | undefined> = (rawOptions = {}, meta) => {
  const options = getOptions(rawOptions)
  const filter = createFilter(options.include, options.exclude)
  const stylexRules = {}

  return {
    name: PLUGIN_NAME,
    enforce: options.enforce,

    transformInclude(id) {
      return filter(id)
    },

    async transform(source, id) {
      const context = {
        pluginContext: this,
        options,
        source,
        id,
      }

      try {
        const result = await transformer(context)

        if (result.stylexRules && result.stylexRules[id]) {
          stylexRules[id] = result.stylexRules[id]
        }

        return result
      } catch (error) {
        this.error(error)
      }
    },

    buildEnd() {
      const rules = Object.values(stylexRules).flat()
      if (rules.length > 0) {
        const collectedCSS = (stylexBabelPlugin as any).processStylexRules(rules, options.stylex.useCSSLayers)
        this.emitFile({
          fileName: options.stylex.filename,
          source: collectedCSS,
          type: 'asset',
        })
      }
    },
  }
}

export const unplugin = createUnplugin(unpluginFactory)

export default unplugin
