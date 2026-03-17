import { describe, expect, it } from 'vitest'
import rolldownPlugin from '../../src/rolldown'

describe('rolldown plugin', () => {
  it('should export a function', () => {
    expect(typeof rolldownPlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = rolldownPlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = rolldownPlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = rolldownPlugin()
    expect(plugin).toBeDefined()
  })
})
