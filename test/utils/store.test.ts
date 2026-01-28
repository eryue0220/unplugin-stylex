import { beforeEach, describe, expect, it } from 'vitest'

import { PLUGIN_NAME } from '../../src/utils/constants'
import { STORE_KEY, stylexRulesStore } from '../../src/utils/store'

describe('store', () => {
  beforeEach(() => {
    stylexRulesStore.clear()
  })

  describe('STORE_KEY', () => {
    it('should be defined', () => {
      expect(STORE_KEY).toBe(`stylex-${PLUGIN_NAME}`)
    })
  })

  describe('stylexRulesStore', () => {
    it('should be a Map instance', () => {
      expect(stylexRulesStore).toBeInstanceOf(Map)
    })

    it('should allow setting and getting values', () => {
      const rules = {
        'file1.js': [
          {
            key: 'test',
            ltr: '.test { color: red; }',
            rtl: null,
          },
        ],
      }

      stylexRulesStore.set(STORE_KEY, rules)
      const retrieved = stylexRulesStore.get(STORE_KEY)

      expect(retrieved).toEqual(rules)
    })

    it('should allow clearing the store', () => {
      stylexRulesStore.set(STORE_KEY, { 'file1.js': [] })
      expect(stylexRulesStore.has(STORE_KEY)).toBe(true)

      stylexRulesStore.clear()
      expect(stylexRulesStore.has(STORE_KEY)).toBe(false)
    })

    it('should support multiple keys', () => {
      const key1 = 'key1'
      const key2 = 'key2'
      const rules1 = { 'file1.js': [] }
      const rules2 = { 'file2.js': [] }

      stylexRulesStore.set(key1, rules1)
      stylexRulesStore.set(key2, rules2)

      expect(stylexRulesStore.get(key1)).toEqual(rules1)
      expect(stylexRulesStore.get(key2)).toEqual(rules2)
    })
  })
})
