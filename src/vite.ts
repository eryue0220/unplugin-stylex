import { createVitePlugin } from 'unplugin'
import type { VitePlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexOptions } from './types'

export default createVitePlugin(unpluginFactory) as (option?: UnpluginStylexOptions) => VitePlugin
