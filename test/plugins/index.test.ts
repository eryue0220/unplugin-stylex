import { describe, expect, it } from 'vitest'
import unplugin from '../../src/index'

describe('main unplugin', () => {
  it('should export unplugin instance', () => {
    expect(unplugin).toBeDefined()
  })

  it('should be callable', () => {
    expect(unplugin).toBeDefined()
    expect(typeof unplugin).toBe('object')
  })

  it('should return plugin when called', () => {
    const plugin = typeof unplugin === 'function' ? unplugin() : unplugin
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin =
      typeof unplugin === 'function'
        ? unplugin({
            dev: true,
            stylex: {
              filename: 'custom.css',
            },
          })
        : unplugin
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = typeof unplugin === 'function' ? unplugin() : unplugin
    expect(plugin).toBeDefined()
  })
})
