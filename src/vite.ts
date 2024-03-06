import { createVitePlugin } from 'unplugin'
import type { VitePlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

const vitePlugin: UnpluginStylexInstance<VitePlugin | VitePlugin[]> = createVitePlugin(unpluginFactory)

export default vitePlugin
