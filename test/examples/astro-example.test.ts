import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('astro-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'astro-example')

  it('should have astro.config.mjs', () => {
    const configPath = join(exampleDir, 'astro.config.mjs')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/astro')
  })

  it('should have astro source files', () => {
    const pagePath = join(exampleDir, 'src', 'pages', 'index.astro')
    const page = readFileSync(pagePath, 'utf-8')
    expect(page).toBeDefined()
  })

  it('should have package.json', () => {
    const packagePath = join(exampleDir, 'package.json')
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
    expect(pkg).toBeDefined()
    expect(pkg.name).toBeDefined()
  })
})
