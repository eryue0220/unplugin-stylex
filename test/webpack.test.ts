import { expect, test } from 'vitest'
import stylexWebpackPlugin from '../src/webpack'

test('webpack should throw error', () => {
  expect(() => stylexWebpackPlugin()).toThrowErrorMatchingSnapshot()
  expect(() => stylexWebpackPlugin({ dev: true })).toThrowErrorMatchingSnapshot()
})
