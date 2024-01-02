import { createFilter } from '@rollup/pluginutils'
import stylexBabelPlugin from '@stylexjs/babel-plugin'
import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'

import { PLUGIN_NAME } from './core/constants'
import { getOptions } from './core/utils'
import { transformer } from './core/transformer'
import type { UnpluginStylexOptions } from './types'

export const unpluginFactory: UnpluginFactory<UnpluginStylexOptions | undefined> = (rawOptions = {}) => {
  const options = getOptions(rawOptions)
  const filter = createFilter(options.include, options.exclude)
  const stylexRules = {}
  let viteBuildConfig = null

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
      if (rules.length === 0) return

      const collectedCSS = (stylexBabelPlugin as any).processStylexRules(rules, options.stylex.useCSSLayers)
      const fileName = options.stylex.filename

      this.emitFile({
        fileName,
        source: collectedCSS,
        type: 'asset',
      })
    },
    vite: {
      config(config) {
        viteBuildConfig = config.build;
      },
      buildEnd() {
        const rules = Object.values(stylexRules).flat()
        if (!viteBuildConfig || rules.length === 0) return

        const collectedCSS = (stylexBabelPlugin as any).processStylexRules(rules, options.stylex.useCSSLayers)
        const fileName = `${viteBuildConfig.build?.assetsDir ?? 'assets'}/${options.stylex.filename}`

        this.emitFile({
          fileName,
          source: collectedCSS,
          type: 'asset',
        })
      }
    },
  }
}

export const unplugin = createUnplugin(unpluginFactory)

export default unplugin
