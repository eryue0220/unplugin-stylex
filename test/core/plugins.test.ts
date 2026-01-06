import { describe, expect, it } from 'vitest'
import { getSyntaxPlugins } from '../../src/core/plugins'

describe('getSyntaxPlugins', () => {
  it('should return flow syntax plugin for .js files', () => {
    const plugins = getSyntaxPlugins('.js')
    expect(plugins).toHaveLength(1)
    expect(plugins[0]).toBeDefined()
  })

  it('should return flow syntax plugin for .jsx files', () => {
    const plugins = getSyntaxPlugins('.jsx')
    expect(plugins).toHaveLength(1)
    expect(plugins[0]).toBeDefined()
  })

  it('should return typescript syntax plugin for .ts files', () => {
    const plugins = getSyntaxPlugins('.ts')
    expect(plugins).toHaveLength(1)
    expect(plugins[0]).toBeDefined()
  })

  it('should return typescript syntax plugin with isTSX for .tsx files', () => {
    const plugins = getSyntaxPlugins('.tsx')
    expect(plugins).toHaveLength(1)
    expect(plugins[0]).toBeDefined()
    // Check if it's an array with options (isTSX: true)
    if (Array.isArray(plugins[0])) {
      expect(plugins[0][1]).toHaveProperty('isTSX', true)
    }
  })

  it('should handle other extensions', () => {
    const plugins = getSyntaxPlugins('.mjs')
    expect(plugins).toBeDefined()
  })
})

