import { describe, expect, it } from 'vitest'
import { transformers } from '../src/core/transformers'

for (const name of ['javascript', 'typescript']) {
  describe(name, () => {
    it('basic', async () => {
      const context = {
        id: '',
        source: '',
        options: {
          dev: true,
          stylex: {},
        },
      }

      const { code } = await transformers.default(context)
      expect(code).toMatchSnapshot()
    })

    it('useCSSLayer', async () => {
      const stylexOptions = {
        useCSSLayer: true,
      }

      const context = {
        id: '',
        source: '',
        options: {
          dev: true,
          stylex: stylexOptions,
        },
      }

      const { code } = await transformers.default(context)
      expect(code).toMatchSnapshot()
    })
  })
}
