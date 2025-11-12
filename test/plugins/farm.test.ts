import { describe, expect, it } from 'vitest'
import farmPlugin from '../../src/farm'

describe('farm plugin', () => {
  it('should export a function', () => {
    expect(typeof farmPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = farmPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = farmPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = farmPlugin()
    expect(plugin).toBeDefined()
  })
})

