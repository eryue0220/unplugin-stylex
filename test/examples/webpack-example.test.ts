import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('webpack-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'webpack-example')

  it('should have webpack.config.js', () => {
    const configPath = join(exampleDir, 'webpack.config.js')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/webpack')
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
