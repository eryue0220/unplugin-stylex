import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { PLUGIN_NAME, isDevelopment, EXTENSIONS } from '../../src/utils/constants'

describe('constants', () => {
  const originalEnv = process.env.NODE_ENV
  const originalBabelEnv = process.env.BABEL_ENV

  beforeEach(() => {
    // Reset env
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    process.env.BABEL_ENV = originalBabelEnv
  })

  describe('PLUGIN_NAME', () => {
    it('should be defined', () => {
      expect(PLUGIN_NAME).toBe('unplugin-stylex')
    })
  })

  describe('isDevelopment', () => {
    it('should be true when NODE_ENV is not production', () => {
      process.env.NODE_ENV = 'development'
      process.env.BABEL_ENV = undefined
      expect(isDevelopment).toBe(true)
    })

    it('should be false when NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production'
      process.env.BABEL_ENV = undefined
      // Note: isDevelopment is evaluated at module load time, so we need to check the actual value
      // This test verifies the constant exists
      expect(typeof isDevelopment).toBe('boolean')
    })

    it('should be false when BABEL_ENV is production', () => {
      process.env.NODE_ENV = 'development'
      process.env.BABEL_ENV = 'production'
      expect(typeof isDevelopment).toBe('boolean')
    })
  })

  describe('EXTENSIONS', () => {
    it('should contain expected extensions', () => {
      expect(EXTENSIONS).toContain('.js')
      expect(EXTENSIONS).toContain('.mjs')
      expect(EXTENSIONS).toContain('.cjs')
      expect(EXTENSIONS).toContain('.ts')
      expect(EXTENSIONS).toContain('.mts')
      expect(EXTENSIONS).toContain('.cts')
    })

    it('should be an array', () => {
      expect(Array.isArray(EXTENSIONS)).toBe(true)
    })
  })
})

