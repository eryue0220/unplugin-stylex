import { describe, expect, it } from 'vitest'
import vitePlugin from '../../src/vite'

describe('vite plugin', () => {
  it('should export a function', () => {
    expect(typeof vitePlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = vitePlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = vitePlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = vitePlugin()
    expect(plugin).toBeDefined()
  })
})

