import { createRspackPlugin } from 'unplugin'
import type { RspackPluginInstance } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

export default createRspackPlugin(unpluginFactory) as UnpluginStylexInstance<RspackPluginInstance>
