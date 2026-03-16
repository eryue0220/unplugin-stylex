import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globalSetup: ['./test/global-setup.ts'],
    testTimeout: 30_000,
    coverage: {
      exclude: ['examples/**'],
      reporter: ['text', 'json', 'html'],
    },
  },
})
