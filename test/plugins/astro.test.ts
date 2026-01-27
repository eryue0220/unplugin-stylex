import { describe, expect, it } from 'vitest'
import astroPlugin from '../../src/astro'

describe('astro plugin', () => {
  it('should export a function', () => {
    expect(typeof astroPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = astroPlugin()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe('unplugin-stylex')
    expect(plugin.hooks).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = astroPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = astroPlugin()
    expect(plugin).toBeDefined()
  })

  it('should have required hooks', () => {
    const plugin = astroPlugin()
    expect(plugin.hooks).toBeDefined()
    expect(plugin.hooks['astro:config:setup']).toBeDefined()
    expect(plugin.hooks['astro:server:setup']).toBeDefined()
  })
})
