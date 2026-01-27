import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('rsbuild-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'rsbuild-example')

  it('should have rsbuild.config.ts', () => {
    const configPath = join(exampleDir, 'rsbuild.config.ts')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toBeDefined()
  })

  it('should have source file with stylex imports', () => {
    const sourcePath = join(exampleDir, 'src', 'index.tsx')
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
