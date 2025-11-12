import { describe, expect, it, vi, beforeEach } from 'vitest'
import { svelte } from '../../../src/core/transformers/svelte'
import { defaultTransformer } from '../../../src/core/transformers/default'

vi.mock('../../../src/core/transformers/default', () => ({
  defaultTransformer: vi.fn(),
}))

describe('svelte transformer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return original code when no script tag', async () => {
    const inputCode = '<div>Hello</div>'
    const context = {
      id: 'test.svelte',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await svelte(context)

    expect(result.code).toBe(inputCode)
    expect(result.stylexRules).toEqual({})
    expect(defaultTransformer).not.toHaveBeenCalled()
  })

  it('should transform script content with stylex', async () => {
    const scriptContent = "import stylex from '@stylexjs/stylex'\nconst styles = stylex.create({})"
    const inputCode = `<script>\n${scriptContent}\n</script>\n<div>Hello</div>`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'const styles = {}',
      map: null,
      stylexRules: {
        'test.svelte': [
          {
            key: 'test',
            ltr: '.test { color: red; }',
            rtl: null,
          },
        ],
      },
    })

    const context = {
      id: 'test.svelte',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await svelte(context)

    expect(result.code).toContain('<script>')
    expect(result.code).toContain('const styles = {}')
    expect(result.code).toContain('</script>')
    expect(result.code).toContain('<div>Hello</div>')
    expect(defaultTransformer).toHaveBeenCalled()
  })

  it('should preserve script attributes', async () => {
    const scriptContent = "import stylex from '@stylexjs/stylex'"
    const inputCode = `<script lang="ts">\n${scriptContent}\n</script>`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'transformed',
      map: null,
      stylexRules: {},
    })

    const context = {
      id: 'test.svelte',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await svelte(context)

    expect(result.code).toContain('lang="ts"')
  })

  it('should handle multiple script tags', async () => {
    const scriptContent = "import stylex from '@stylexjs/stylex'"
    const inputCode = `<script>\n${scriptContent}\n</script>\n<script context="module">\nconst x = 1\n</script>`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'transformed',
      map: null,
      stylexRules: {},
    })

    const context = {
      id: 'test.svelte',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await svelte(context)

    // Should transform the first script tag
    expect(result.code).toContain('<script>')
    expect(result.code).toContain('transformed')
  })

  it('should handle empty script content', async () => {
    const inputCode = '<script></script><div>Hello</div>'

    const context = {
      id: 'test.svelte',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: '',
      map: null,
      stylexRules: {},
    })

    const result = await svelte(context)

    expect(result.code).toContain('<script>')
    expect(result.code).toContain('</script>')
  })
})

