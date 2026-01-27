import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

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
})
