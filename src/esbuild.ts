import { createEsbuildPlugin } from 'unplugin'
import type { EsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const esbuildPlugin: UnpluginStylexInstance<EsbuildPlugin | EsbuildPlugin[]> = createEsbuildPlugin(unpluginFactory)

export default esbuildPlugin
