import type { UnpluginStylexTransformer } from '@/types'
import { astro } from './astro'
import { defaultTransformer } from './default'
import { svelte } from './svelte'

export const transformers: Record<string, UnpluginStylexTransformer> = {
  astro,
  svelte,
  default: defaultTransformer,
} as const
