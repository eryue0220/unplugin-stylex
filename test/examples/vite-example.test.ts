import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildExample, checkCSSProperties, getCSSFromExample } from '../utils/css-test-helpers'

describe('vite-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'vite-example')

  it('should have vite.config.js', () => {
    const configPath = join(exampleDir, 'vite.config.js')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/vite')
    expect(config).toContain('stylexVitePlugin')
  })

  it('should have source file with stylex imports', () => {
    const sourcePath = join(exampleDir, 'src', 'index.tsx')
    const source = readFileSync(sourcePath, 'utf-8')
    expect(source).toContain('@stylexjs/stylex')
    expect(source).toContain('stylex.create')
  })

  it('should have package.json', () => {
    const packagePath = join(exampleDir, 'package.json')
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
    expect(pkg).toBeDefined()
    expect(pkg.name).toBeDefined()
  })

  it('should generate CSS with expected styles for .main class', async () => {
    // Build the example
    buildExample(exampleDir, 'npm run build')
    
    // Get CSS content
    const css = getCSSFromExample(exampleDir)
    expect(css).toBeTruthy()
    expect(css!.length).toBeGreaterThan(0)
    
    // Check for main styles
    const mainStyles = checkCSSProperties(css!, {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': /#d6336c|rgb\(214,\s*51,\s*108\)/i,
    })
    
    expect(mainStyles.found).toBe(true)
    expect(mainStyles.matched.width).toBe(true)
    expect(mainStyles.matched.height).toBe(true)
    expect(mainStyles.matched.display).toBe(true)
    expect(mainStyles.matched['align-items']).toBe(true)
    expect(mainStyles.matched['justify-content']).toBe(true)
    expect(mainStyles.matched['background-color']).toBe(true)
  })

  it('should generate CSS with expected styles for .card class', async () => {
    const css = getCSSFromExample(exampleDir)
    expect(css).toBeTruthy()
    
    // Check for card styles
    const cardStyles = checkCSSProperties(css!, {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'background-color': /#1864ab|rgb\(24,\s*100,\s*171\)/i,
      padding: /1\.5rem|24px/,
      'border-radius': /\.5rem|8px/,
      color: /#f8f9fa|rgb\(248,\s*249,\s*250\)/i,
    })
    
    expect(cardStyles.found).toBe(true)
    expect(cardStyles.matched.display).toBe(true)
    expect(cardStyles.matched['justify-content']).toBe(true)
    expect(cardStyles.matched['align-items']).toBe(true)
    expect(cardStyles.matched['background-color']).toBe(true)
    expect(cardStyles.matched.padding).toBe(true)
    expect(cardStyles.matched['border-radius']).toBe(true)
    expect(cardStyles.matched.color).toBe(true)
  })
})
