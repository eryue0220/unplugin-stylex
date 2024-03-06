import { createRspackPlugin } from 'unplugin'
import type { RspackPluginInstance } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexInstance } from './types'

type RspackPluginType = UnpluginStylexInstance<RspackPluginInstance | RspackPluginInstance[]>

const rspackPlugin: RspackPluginType = createRspackPlugin(unpluginFactory)

export default rspackPlugin
