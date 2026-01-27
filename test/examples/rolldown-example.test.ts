import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('rolldown-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'rolldown-example')

  it('should have rolldown.config.mjs', () => {
    const configPath = join(exampleDir, 'rolldown.config.mjs')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/rolldown')
  })

  it('should have source file with stylex imports', () => {
    const sourcePath = join(exampleDir, 'src', 'index.jsx')
    const source = readFileSync(sourcePath, 'utf-8')
    expect(source).toContain('@stylexjs/stylex')
  })

  it('should have package.json', () => {
    const packagePath = join(exampleDir, 'package.json')
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
    expect(pkg).toBeDefined()
    expect(pkg.name).toBeDefined()
  })
})
