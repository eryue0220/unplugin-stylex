import { createEsbuildPlugin } from 'unplugin'
import type { EsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

export default createEsbuildPlugin(unpluginFactory) as UnpluginStylexInstance<EsbuildPlugin>
