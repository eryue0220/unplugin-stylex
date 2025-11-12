import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('remix-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'remix-example')

  it('should have vite.config.ts', () => {
    const configPath = join(exampleDir, 'vite.config.ts')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/vite')
  })

  it('should have remix app files', () => {
    const rootPath = join(exampleDir, 'app', 'root.tsx')
    const root = readFileSync(rootPath, 'utf-8')
    expect(root).toBeDefined()
  })

  it('should have package.json', () => {
    const packagePath = join(exampleDir, 'package.json')
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
    expect(pkg).toBeDefined()
    expect(pkg.name).toBeDefined()
  })
})

