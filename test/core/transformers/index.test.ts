import { describe, expect, it } from 'vitest'
import { transformers } from '../../../src/core/transformers'

describe('transformers', () => {
  it('should export transformers object', () => {
    expect(transformers).toBeDefined()
    expect(typeof transformers).toBe('object')
  })

  it('should have default transformer', () => {
    expect(transformers.default).toBeDefined()
    expect(typeof transformers.default).toBe('function')
  })

  it('should have astro transformer', () => {
    expect(transformers.astro).toBeDefined()
    expect(typeof transformers.astro).toBe('function')
  })

  it('should have svelte transformer', () => {
    expect(transformers.svelte).toBeDefined()
    expect(typeof transformers.svelte).toBe('function')
  })
})
