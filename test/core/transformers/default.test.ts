import { describe, expect, it, vi, beforeEach } from 'vitest'
import { defaultTransformer } from '../../../src/core/transformers/default'
import * as babelCore from '@babel/core'

vi.mock('@babel/core', () => ({
  transformAsync: vi.fn(),
}))

vi.mock('@babel/plugin-syntax-jsx', () => ({
  default: {},
}))

vi.mock('@stylexjs/babel-plugin', () => ({
  default: {
    withOptions: vi.fn((options) => options),
  },
}))

vi.mock('../../../src/core/plugins', () => ({
  getSyntaxPlugins: vi.fn(() => []),
}))

describe('defaultTransformer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should transform code with stylex', async () => {
    const mockCode = 'const styles = stylex.create({ color: "red" })'
    const mockMetadata = {
      stylex: [
        {
          key: 'test',
          ltr: '.test { color: red; }',
          rtl: null,
        },
      ],
    }

    vi.mocked(babelCore.transformAsync).mockResolvedValue({
      code: 'const styles = { color: "red" }',
      map: null,
      metadata: {
        stylex: mockMetadata.stylex,
      },
    })

    const context = {
      id: 'test.tsx',
      inputCode: mockCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await defaultTransformer(context)

    expect(result.code).toBeDefined()
    expect(result.stylexRules).toBeDefined()
    expect(result.stylexRules['test.tsx']).toEqual(mockMetadata.stylex)
  })

  it('should return empty stylexRules when no stylex metadata', async () => {
    vi.mocked(babelCore.transformAsync).mockResolvedValue({
      code: 'const x = 1',
      map: null,
      metadata: {},
    })

    const context = {
      id: 'test.ts',
      inputCode: 'const x = 1',
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await defaultTransformer(context)

    expect(result.code).toBeDefined()
    expect(result.stylexRules).toEqual({})
  })

  it('should handle babelrc configuration', async () => {
    vi.mocked(babelCore.transformAsync).mockResolvedValue({
      code: 'transformed',
      map: null,
      metadata: {},
    })

    const context = {
      id: 'test.ts',
      inputCode: 'code',
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
          babelConfig: {
            babelrc: true,
            plugins: [],
            presets: [],
          },
        },
      },
    }

    const result = await defaultTransformer(context)

    expect(result.code).toBeDefined()
    expect(result.map).toBeUndefined() // Should not include map when babelrc is true
  })

  it('should include map when babelrc is false', async () => {
    const mockMap = { version: 3, sources: [] }
    vi.mocked(babelCore.transformAsync).mockResolvedValue({
      code: 'transformed',
      map: mockMap,
      metadata: {},
    })

    const context = {
      id: 'test.ts',
      inputCode: 'code',
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
          babelConfig: {
            babelrc: false,
            plugins: [],
            presets: [],
          },
        },
      },
    }

    const result = await defaultTransformer(context)

    expect(result.map).toBe(mockMap)
  })

  it('should handle null map gracefully', async () => {
    vi.mocked(babelCore.transformAsync).mockResolvedValue({
      code: 'transformed',
      map: null,
      metadata: {},
    })

    const context = {
      id: 'test.ts',
      inputCode: 'code',
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
          babelConfig: {
            babelrc: false,
            plugins: [],
            presets: [],
          },
        },
      },
    }

    const result = await defaultTransformer(context)

    expect(result.map).toBeUndefined()
  })
})

