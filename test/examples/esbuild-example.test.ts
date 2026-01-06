import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('esbuild-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'esbuild-example')

  it('should have build script', () => {
    const buildScriptPath = join(exampleDir, 'scripts', 'build.mjs')
    const buildScript = readFileSync(buildScriptPath, 'utf-8')
    expect(buildScript).toBeDefined()
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

