import { createRspackPlugin } from 'unplugin'
import type { RspackPluginInstance } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexOptions } from './types'

export default createRspackPlugin(unpluginFactory) as (options?: UnpluginStylexOptions) => RspackPluginInstance
