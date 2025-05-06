import fs from 'node:fs'
import path from 'node:path'
import { EXTENSIONS } from './constants'

function makePathAbsolute(value: string) {
  return path.isAbsolute(value as string) ? value : path.resolve(process.cwd(), value as string)
}

function isTSProject() {
  const tsConfigPath = path.resolve(process.cwd(), 'tsconfig.json')
  return fs.existsSync(tsConfigPath)
}

function getAliasesFromTSConfig() {
  if (!isTSProject()) {
    return undefined
  }

  try {
    const tsConfigPath = path.resolve(process.cwd(), 'tsconfig.json')
    const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8')
    const tsConfig = JSON.parse(tsConfigContent)
    const paths = tsConfig?.compilerOptions?.paths || {}

    const aliases = Object.entries(paths).reduce(
      (acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(makePathAbsolute) : makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string | string[]>,
    )

    return Object.keys(aliases).length > 0 ? aliases : undefined
  } catch (error) {
    // If file doesn't exist or is invalid JSON, return null
    return undefined
  }
}

function getAliasesFromViteConfig() {
  const configFiles = EXTENSIONS.map((ext) => `vite.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    // Import the config file
    const configModule = require(path.resolve(process.cwd(), configPath))
    const config = typeof configModule === 'function' ? configModule() : configModule.default || configModule
    const aliases = config?.resolve?.alias || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

function getAliasesFromWebpackConfig() {
  const configFiles = EXTENSIONS.map((ext) => `webpack.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    const configContent = fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf8')
    const config = JSON.parse(configContent)
    const aliases = config?.resolve?.alias || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

function getAliasesFromRollupConfig() {
  const configFiles = EXTENSIONS.map((ext) => `rollup.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    const configModule = require(path.resolve(process.cwd(), configPath))
    const config = typeof configModule === 'function' ? configModule() : configModule.default || configModule

    // Look for @rollup/plugin-alias configuration
    const aliasPlugin = config?.plugins?.find((plugin) => {
      if (typeof plugin === 'object' && plugin !== null) {
        return plugin.name === '@rollup/plugin-alias'
      }
      return false
    })

    if (!aliasPlugin) {
      return {}
    }

    const aliases = aliasPlugin?.options?.entries || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

function getAliasesFromRolldownConfig() {
  const configFiles = EXTENSIONS.map((ext) => `vite.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    const configModule = require(path.resolve(process.cwd(), configPath))
    const config = typeof configModule === 'function' ? configModule() : configModule.default || configModule
    const aliases = config?.resolve?.alias || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

function getAliasesFromEsbuildConfig() {
  return {}
}

function getAliasesFromRspackConfig() {
  const configFiles = EXTENSIONS.map((ext) => `rspack.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    const configContent = fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf8')
    const config = JSON.parse(configContent)
    const aliases = config?.resolve?.alias || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

function getAliasesFromFarmConfig() {
  const configFiles = EXTENSIONS.map((ext) => `farm.config${ext}`)
  const configPath = configFiles.find((file) => fs.existsSync(path.resolve(process.cwd(), file)))

  if (!configPath) {
    return {}
  }

  try {
    const configModule = require(path.resolve(process.cwd(), configPath))
    const config = typeof configModule === 'function' ? configModule() : configModule.default || configModule
    const aliases = config?.resolve?.alias || {}

    // Convert aliases to absolute paths
    return Object.entries(aliases).reduce(
      (acc, [key, value]) => {
        acc[key] = makePathAbsolute(value as string)
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    // If file can't be read or parsed, return empty object
    return {}
  }
}

export function getAliases(framework: string) {
  const tsAliases = getAliasesFromTSConfig()

  if (framework === 'vite') {
    const viteAliases = getAliasesFromViteConfig()
    return {
      ...tsAliases,
      ...viteAliases,
    }
  }

  if (framework === 'webpack') {
    const webpackAliases = getAliasesFromWebpackConfig()
    return {
      ...tsAliases,
      ...webpackAliases,
    }
  }

  if (framework === 'rollup') {
    const rollupAliases = getAliasesFromRollupConfig()
    return {
      ...tsAliases,
      ...rollupAliases,
    }
  }

  if (framework === 'rolldown') {
    const rolldownAliases = getAliasesFromRolldownConfig()
    return {
      ...tsAliases,
      ...rolldownAliases,
    }
  }

  if (framework === 'esbuild') {
    const esbuildAliases = getAliasesFromEsbuildConfig()
    return {
      ...tsAliases,
      ...esbuildAliases,
    }
  }

  if (framework === 'rspack') {
    const rspackAliases = getAliasesFromRspackConfig()
    return {
      ...tsAliases,
      ...rspackAliases,
    }
  }

  if (framework === 'farm') {
    const farmAliases = getAliasesFromFarmConfig()
    return {
      ...tsAliases,
      ...farmAliases,
    }
  }
}
