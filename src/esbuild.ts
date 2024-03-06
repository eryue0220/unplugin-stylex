import { createEsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'

const esbuildPlugin = createEsbuildPlugin(unpluginFactory)

export default esbuildPlugin
