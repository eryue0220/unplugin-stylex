import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('vue-example', () => {
  const exampleDir = join(process.cwd(), 'examples', 'vue-example')

  it('should have vite.config.js', () => {
    const configPath = join(exampleDir, 'vite.config.js')
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('unplugin-stylex/vite')
  })

  it('should have vue source files', () => {
    const appPath = join(exampleDir, 'src', 'App.vue')
    const app = readFileSync(appPath, 'utf-8')
    expect(app).toBeDefined()
  })

  it('should have package.json', () => {
    const packagePath = join(exampleDir, 'package.json')
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
    expect(pkg).toBeDefined()
    expect(pkg.name).toBeDefined()
  })
})
