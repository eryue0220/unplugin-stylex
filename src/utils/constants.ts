export const PLUGIN_NAME = 'unplugin-stylex'

export function isDevelopment() {
  return (process.env.BABEL_ENV ?? process.env.NODE_ENV) !== 'production'
}

export const EXTENSIONS = ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts']
