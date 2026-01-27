import { describe, expect, it } from 'vitest'
import rspackPlugin from '../../src/rspack'

describe('rspack plugin', () => {
  it('should export a function', () => {
    expect(typeof rspackPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = rspackPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = rspackPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = rspackPlugin()
    expect(plugin).toBeDefined()
  })
})
