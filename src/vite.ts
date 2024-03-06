import { createVitePlugin } from 'unplugin'
import type { VitePlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

export default createVitePlugin(unpluginFactory) as UnpluginStylexInstance<VitePlugin>
