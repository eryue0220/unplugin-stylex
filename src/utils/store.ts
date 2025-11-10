import type { Rule } from '@stylexjs/babel-plugin'
import { PLUGIN_NAME } from './constants'

export const STORE_KEY = `stylex-${PLUGIN_NAME}`

// Global storage for stylexRules (shared with Astro integration if needed)
export const stylexRulesStore = new Map<string, Record<string, Rule[]>>()
