import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { getAliases } from '../../src/utils/get-aliases'

// Mock fs and path modules
vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}))

vi.mock('node:path', () => ({
  default: {
    resolve: vi.fn((...args) => args.join('/')),
    isAbsolute: vi.fn((p) => p.startsWith('/')),
  },
}))

describe('getAliases', () => {
  const originalCwd = process.cwd()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(process, 'cwd').mockReturnValue('/test/project')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return undefined for unknown framework', () => {
    const result = getAliases('unknown')
    expect(result).toBeUndefined()
  })

  it('should handle vite framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('vite')
    expect(result).toBeDefined()
  })

  it('should handle webpack framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('webpack')
    expect(result).toBeDefined()
  })

  it('should handle rollup framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('rollup')
    expect(result).toBeDefined()
  })

  it('should handle rolldown framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('rolldown')
    expect(result).toBeDefined()
  })

  it('should handle esbuild framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('esbuild')
    expect(result).toBeDefined()
  })

  it('should handle rspack framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('rspack')
    expect(result).toBeDefined()
  })

  it('should handle farm framework', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('farm')
    expect(result).toBeDefined()
  })

  it('should merge tsconfig aliases when tsconfig exists', () => {
    const mockTsConfig = {
      compilerOptions: {
        paths: {
          '@/*': ['./src/*'],
          '@/components/*': ['./src/components/*'],
        },
      },
    }

    vi.mocked(fs.existsSync).mockImplementation((filePath) => {
      return String(filePath).includes('tsconfig.json')
    })
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockTsConfig))

    const result = getAliases('vite')
    expect(result).toBeDefined()
  })

  it('should handle invalid tsconfig.json gracefully', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('Invalid JSON')
    })

    const result = getAliases('vite')
    // Should not throw and return a valid result
    expect(result).toBeDefined()
  })

  it('should handle missing config files gracefully', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const result = getAliases('vite')
    expect(result).toBeDefined()
  })
})

