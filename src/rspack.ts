import { createRspackPlugin } from 'unplugin'
import { unpluginFactory } from './index'

const rspackPlugin = createRspackPlugin(unpluginFactory)

export default rspackPlugin
