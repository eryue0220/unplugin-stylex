/**
 * This entry file is for rolldown plugin.
 *
 * @module
 */

import { createRolldownPlugin } from 'unplugin'
import type { RolldownPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

// Todo(eryue0220): upgrade ts declaration
const rolldownPlugin: UnpluginStylexInstance<RolldownPlugin | RolldownPlugin[]> = createRolldownPlugin(unpluginFactory)

/**
 * @experimental
 *
 * Rolldown plugin
 *
 * @example
 *
 * import { build } from 'esbuild'
 * import stylexPlugin from 'unplugin-stylex/rolldown'
 *
 * export default {
 *   plugins: [
 *     stylexPlugin(),
 *   ],
 * }
 */
export default rolldownPlugin
