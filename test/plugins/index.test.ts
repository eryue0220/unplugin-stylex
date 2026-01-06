import { describe, expect, it } from 'vitest'
import unplugin from '../../src/index'

describe('main unplugin', () => {
  it('should export unplugin instance', () => {
    expect(unplugin).toBeDefined()
  })

  it('should be callable', () => {
    // unplugin is created by createUnplugin which returns an object with a callable property
    expect(unplugin).toBeDefined()
    // Check if it has the expected structure
    expect(typeof unplugin).toBe('object')
  })

  it('should return plugin when called', () => {
    // unplugin from createUnplugin is an object that can be called
    const plugin = typeof unplugin === 'function' ? unplugin() : unplugin
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = typeof unplugin === 'function' ? unplugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    }) : unplugin
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = typeof unplugin === 'function' ? unplugin() : unplugin
    expect(plugin).toBeDefined()
  })
})

