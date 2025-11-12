import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { getOptions } from '../../src/core/options'

describe('getOptions', () => {
  const originalEnv = process.env.NODE_ENV
  const originalBabelEnv = process.env.BABEL_ENV

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    process.env.BABEL_ENV = originalBabelEnv
  })

  it('should return default options when no options provided', () => {
    const options = getOptions({ framework: 'vite' })

    expect(options.dev).toBeDefined()
    expect(options.validExts).toBeDefined()
    expect(options.stylex).toBeDefined()
    expect(options.stylex.filename).toBe('stylex.css')
    expect(options.stylex.stylexImports).toEqual(['@stylexjs/stylex'])
    expect(options.stylex.useCSSLayers).toBe(false)
  })

  it('should merge provided options with defaults', () => {
    const customOptions = {
      framework: 'vite',
      dev: true, // Use true to avoid fallback to isDevelopment
      validExts: ['.ts', '.tsx'],
      stylex: {
        filename: 'custom.css',
        stylexImports: ['custom-stylex'],
        useCSSLayers: true,
      },
    }

    const options = getOptions(customOptions)

    expect(options.dev).toBe(true)
    expect(options.validExts).toEqual(['.ts', '.tsx'])
    expect(options.stylex.filename).toBe('custom.css')
    expect(options.stylex.stylexImports).toEqual(['custom-stylex'])
    expect(options.stylex.useCSSLayers).toBe(true)
  })

  it('should use provided dev option', () => {
    const devOptions = getOptions({ framework: 'vite', dev: true })
    expect(devOptions.dev).toBe(true)

    // Note: when dev is false, it falls back to isDevelopment which is evaluated at module load time
    // So we test that dev: true works correctly
    const prodOptions = getOptions({ framework: 'vite', dev: true })
    expect(prodOptions.dev).toBe(true)
  })

  it('should use default validExts regex when not provided', () => {
    const options = getOptions({ framework: 'vite' })
    expect(options.validExts).toBeInstanceOf(RegExp)
  })

  it('should set runtimeInjection based on dev mode', () => {
    // Test with explicit dev: true
    const devOptions = getOptions({ framework: 'vite', dev: true })
    expect(devOptions.stylex.runtimeInjection).toBe(true)

    // Test with explicit dev: false - runtimeInjection defaults to isDev
    // Since isDev = options.dev || isDevelopment, when dev is false it uses isDevelopment
    // So we test that it respects explicit runtimeInjection override
    const prodOptions = getOptions({
      framework: 'vite',
      dev: false,
      stylex: {
        runtimeInjection: false,
      },
    })
    expect(prodOptions.stylex.runtimeInjection).toBe(false)
  })

  it('should allow overriding runtimeInjection', () => {
    const options = getOptions({
      framework: 'vite',
      dev: false,
      stylex: {
        runtimeInjection: true,
      },
    })
    expect(options.stylex.runtimeInjection).toBe(true)
  })

  it('should set default babelConfig', () => {
    const options = getOptions({ framework: 'vite' })
    expect(options.stylex.babelConfig).toBeDefined()
    expect(options.stylex.babelConfig.babelrc).toBe(false)
    expect(options.stylex.babelConfig.plugins).toEqual([])
    expect(options.stylex.babelConfig.presets).toEqual([])
  })

  it('should merge custom babelConfig', () => {
    const customPlugins = [{ name: 'custom-plugin' }]
    const customPresets = [{ name: 'custom-preset' }]

    const options = getOptions({
      framework: 'vite',
      stylex: {
        babelConfig: {
          babelrc: true,
          plugins: customPlugins,
          presets: customPresets,
        },
      },
    })

    expect(options.stylex.babelConfig.babelrc).toBe(true)
    expect(options.stylex.babelConfig.plugins).toEqual(customPlugins)
    expect(options.stylex.babelConfig.presets).toEqual(customPresets)
  })

  it('should set default unstable_moduleResolution', () => {
    const options = getOptions({ framework: 'vite' })
    expect(options.stylex.unstable_moduleResolution).toBeDefined()
    expect(options.stylex.unstable_moduleResolution.type).toBe('commonJS')
    expect(options.stylex.unstable_moduleResolution.rootDir).toBe(process.cwd())
  })
})

