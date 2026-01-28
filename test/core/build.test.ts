import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildStylexRules } from '../../src/core/build'

// Mock @stylexjs/babel-plugin
vi.mock('@stylexjs/babel-plugin', () => ({
  default: {
    processStylexRules: vi.fn((rules, useCSSLayers) => {
      if (rules.length === 0) return ''
      return useCSSLayers ? '@layer stylex { .test { color: red; } }' : '.test { color: red; }'
    }),
  },
}))

describe('buildStylexRules', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return empty string when no rules provided', () => {
    const result = buildStylexRules({}, false)
    expect(result).toBe('')
  })

  it('should return empty string when rules object is empty', () => {
    const result = buildStylexRules({}, false)
    expect(result).toBe('')
  })

  it('should process stylex rules without CSS layers', () => {
    const stylexRules = {
      'file1.js': [
        {
          key: 'test',
          ltr: '.test { color: red; }',
          rtl: null,
        },
      ],
    }

    const result = buildStylexRules(stylexRules, false)
    expect(result).toContain('.test')
    expect(result).not.toContain('@layer')
  })

  it('should process stylex rules with CSS layers', () => {
    const stylexRules = {
      'file1.js': [
        {
          key: 'test',
          ltr: '.test { color: red; }',
          rtl: null,
        },
      ],
    }

    const result = buildStylexRules(stylexRules, true)
    expect(result).toContain('@layer')
  })

  it('should flatten rules from multiple files', () => {
    const stylexRules = {
      'file1.js': [
        {
          key: 'test1',
          ltr: '.test1 { color: red; }',
          rtl: null,
        },
      ],
      'file2.js': [
        {
          key: 'test2',
          ltr: '.test2 { color: blue; }',
          rtl: null,
        },
      ],
    }

    const result = buildStylexRules(stylexRules, false)
    expect(result).toBeTruthy()
  })
})
