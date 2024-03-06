import { createEsbuildPlugin } from 'unplugin'
import type { EsbuildPlugin } from 'unplugin'
import { unpluginFactory } from './index'
import type { UnpluginStylexOptions } from './types'

export default createEsbuildPlugin(unpluginFactory) as (options?: UnpluginStylexOptions) => EsbuildPlugin
