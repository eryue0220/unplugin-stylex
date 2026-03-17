import { beforeEach, describe, expect, it, vi } from 'vitest'
import { astro } from '../../../src/core/transformers/astro'
import { defaultTransformer } from '../../../src/core/transformers/default'

vi.mock('../../../src/core/transformers/default', () => ({
  defaultTransformer: vi.fn(),
}))

describe('astro transformer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return original code when no frontmatter', async () => {
    const inputCode = '<div>Hello</div>'
    const context = {
      id: 'test.astro',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await astro(context)

    expect(result.code).toBe(inputCode)
    expect(result.stylexRules).toEqual({})
    expect(defaultTransformer).not.toHaveBeenCalled()
  })

  it('should transform frontmatter with stylex imports', async () => {
    const frontmatter = "import stylex from '@stylexjs/stylex'\nconst styles = stylex.create({})"
    const template = '<div>Hello</div>'
    const inputCode = `---\n${frontmatter}\n---\n${template}`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'const styles = {}',
      map: null,
      stylexRules: {
        'test.astro': [
          {
            key: 'test',
            ltr: '.test { color: red; }',
            rtl: null,
          },
        ],
      },
    })

    const context = {
      id: 'test.astro',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await astro(context)

    expect(result.code).toContain('---')
    expect(result.code).toContain('const styles = {}')
    expect(result.code).toContain(template)
    expect(defaultTransformer).toHaveBeenCalled()
  })

  it('should not transform when frontmatter has no stylex imports', async () => {
    const frontmatter = 'const x = 1'
    const template = '<div>Hello</div>'
    const inputCode = `---\n${frontmatter}\n---\n${template}`

    const context = {
      id: 'test.astro',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await astro(context)

    expect(result.code).toBe(inputCode)
    expect(defaultTransformer).not.toHaveBeenCalled()
  })

  it('should handle empty template content', async () => {
    const frontmatter = "import stylex from '@stylexjs/stylex'"
    const inputCode = `---\n${frontmatter}\n---`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'import stylex from "@stylexjs/stylex"',
      map: null,
      stylexRules: {},
    })

    const context = {
      id: 'test.astro',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await astro(context)

    expect(result.code).toContain('---')
    expect(result.code).toContain('import stylex')
  })

  it('should preserve frontmatter delimiters', async () => {
    const frontmatter = "import stylex from '@stylexjs/stylex'"
    const template = '<div>Test</div>'
    const inputCode = `---\n${frontmatter}\n---\n${template}`

    vi.mocked(defaultTransformer).mockResolvedValue({
      code: 'transformed',
      map: null,
      stylexRules: {},
    })

    const context = {
      id: 'test.astro',
      inputCode,
      pluginContext: {},
      options: {
        dev: true,
        stylex: {
          stylexImports: ['@stylexjs/stylex'],
        },
      },
    }

    const result = await astro(context)

    expect(result.code).toMatch(/^---\n/)
    expect(result.code).toMatch(/\n---\n/)
  })
})
