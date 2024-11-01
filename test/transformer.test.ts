import { describe, expect, it } from 'vitest'
import { transformer } from '../src/core/transformer'

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

      const { code } = await transformer(context)
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

      const { code } = await transformer(context)
      expect(code).toMatchSnapshot()
    })
  })
}
