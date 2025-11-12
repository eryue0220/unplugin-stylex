import { describe, expect, it } from 'vitest'
import rollupPlugin from '../../src/rollup'

describe('rollup plugin', () => {
  it('should export a function', () => {
    expect(typeof rollupPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = rollupPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = rollupPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = rollupPlugin()
    expect(plugin).toBeDefined()
  })
})

