import * as path from 'node:path'

export function getStylexAssetFileName(filename: string, assetsDir = 'assets') {
  const normalizedAssetsDir = assetsDir.replace(/[\\/]+$/, '')
  return normalizedAssetsDir ? `${normalizedAssetsDir}/${filename}` : filename
}

export function getStylexPublicPath(base: string | undefined, fileName: string) {
  return path.posix.join(base ?? '/', fileName.replace(/\\/g, '/')).replace(/\/+/g, '/')
}

export function normalizePath(file: string): string {
  return file.replace(/\\/g, '/')
}
