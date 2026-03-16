import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

export default function globalSetup(): void {
  const rootDir = resolve(__dirname, '..')
  const distDir = resolve(rootDir, 'dist')

  if (existsSync(distDir)) {
    return
  }

  execSync('pnpm build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      CI: 'true',
      NODE_ENV: 'production',
    },
  })
}
