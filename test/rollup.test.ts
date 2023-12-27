import { expect, test } from 'vitest'
import stylexRollupPlugin from '../src/rollup'

test('Rollup should throw error', () => {
  expect(() => stylexRollupPlugin()).toThrowErrorMatchingSnapshot()
  expect(() => stylexRollupPlugin({ dev: true })).toThrowErrorMatchingSnapshot()
})
