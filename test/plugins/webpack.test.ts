import { describe, expect, it } from 'vitest'
import webpackPlugin from '../../src/webpack'

describe('webpack plugin', () => {
  it('should export a function', () => {
    expect(typeof webpackPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = webpackPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = webpackPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = webpackPlugin()
    expect(plugin).toBeDefined()
  })
})

