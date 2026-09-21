import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { build } from 'vite'
import { describe, expect, it } from 'vitest'
import vitePlugin from '../../src/vite'

describe('vite plugin', () => {
  it('should export a function', () => {
    expect(typeof vitePlugin).toBe('function')
  })

  it('should return a plugin when called', () => {
    const plugin = vitePlugin()
    expect(plugin).toBeDefined()
  })

  it('should accept options', () => {
    const plugin = vitePlugin({
      dev: true,
      stylex: {
        filename: 'custom.css',
      },
    })
    expect(plugin).toBeDefined()
  })

  it('should work without options', () => {
    const plugin = vitePlugin()
    expect(plugin).toBeDefined()
  })
  it('resolves stylesheet URLs using the final base, assets directory and filename', async () => {
    const root = mkdtempSync(join(process.cwd(), 'node_modules/.stylex-vite-test-'))
    try {
      const entry = join(root, 'entry.js')
      writeFileSync(
        entry,
        `
        import * as stylex from '@stylexjs/stylex'
        import href from 'virtual:stylex-css-url'
        const styles = stylex.create({ root: { color: 'red' } })
        console.log(href, stylex.props(styles.root))
      `,
      )
      const result = await build({
        root,
        configFile: false,
        logLevel: 'silent',
        base: '/demo/',
        plugins: [vitePlugin({ dev: false, stylex: { filename: 'theme.css' } })],
        build: {
          write: false,
          assetsDir: 'static',
          rollupOptions: { input: entry },
        },
      })
      if (!('output' in result)) throw new Error('Expected one build output')
      const css = result.output.find((asset) => asset.fileName === 'static/theme.css')
      expect(css?.type).toBe('asset')
      const javascript = result.output
        .filter((asset) => asset.type === 'chunk')
        .map((chunk) => chunk.code)
        .join('\n')
      expect(javascript).toContain('/demo/static/theme.css')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
