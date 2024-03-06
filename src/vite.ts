import { createVitePlugin } from 'unplugin'
import { unpluginFactory } from './index'

const vitePlugin = createVitePlugin(unpluginFactory)

export default vitePlugin
