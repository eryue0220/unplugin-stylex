import { describe, expect, it } from 'vitest'
import esbuildPlugin from '../../src/esbuild'

describe('esbuild plugin', () => {
  it('should export a function', () => {
    expect(typeof esbuildPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = esbuildPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = esbuildPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = esbuildPlugin()
    expect(plugin).toBeDefined()
  })
})
