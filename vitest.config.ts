import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['examples/**', 'test/**'],
      reporter: ['text', 'json', 'html'],
    },
  },
})
