import { readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { watch } from 'rolldown'
import config from '../rolldown.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')

const port = 3000

const server = createServer((req, res) => {
  let filePath = join(rootDir, req.url === '/' ? 'index.html' : req.url)

  if (req.url?.startsWith('/dist/')) {
    filePath = join(distDir, req.url.replace('/dist/', ''))
  } else if (req.url?.endsWith('.js') || req.url?.endsWith('.css')) {
    const distPath = join(distDir, req.url.replace(/^\//, ''))
    try {
      if (statSync(distPath).isFile()) {
        filePath = distPath
      }
    } catch {
      // noop
    }
  }

  if (!filePath.startsWith(rootDir) && !filePath.startsWith(distDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  try {
    const stats = statSync(filePath)
    if (stats.isFile()) {
      const content = readFileSync(filePath)
      const ext = extname(filePath)
      const contentType =
        ext === '.html'
          ? 'text/html'
          : ext === '.js'
            ? 'application/javascript'
            : ext === '.css'
              ? 'text/css'
              : ext === '.json'
                ? 'application/json'
                : 'text/plain'

      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    } else {
      res.writeHead(404)
      res.end('Not Found')
    }
  } catch {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(port, () => {
  console.log(`[info]: server start at http://127.0.0.1:${port}`)
})

const watcher = await watch(config)

watcher.on('event', (event) => {
  if (event.code === 'BUNDLE_END') {
    console.log('[rolldown]: bundle updated')
  } else if (event.code === 'ERROR') {
    console.error('[rolldown]: error', event.error)
  }
})
