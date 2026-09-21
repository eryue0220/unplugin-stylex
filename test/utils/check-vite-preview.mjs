import assert from 'node:assert/strict'
import { preview } from 'vite'

const base = process.argv[2] ?? '/'
const assetsDir = process.argv[3] ?? 'assets'
const server = await preview({
  root: process.cwd(),
  base,
  preview: { host: '127.0.0.1', port: 0 },
})

try {
  const address = server.httpServer.address()
  const origin = `http://127.0.0.1:${address.port}`
  for (const [route, content] of [
    ['', 'Blue rounded rectangle'],
    ['details', 'Dynamic StyleX styles'],
  ]) {
    const response = await fetch(`${origin}${base}${route}`)
    assert.equal(response.status, 200)
    const html = await response.text()
    assert.ok(html.includes(content), `Missing SSR content for ${route || '/'}`)
    const href = `${base}${assetsDir}/stylex.css`
    assert.ok(html.includes(`href="${href}"`), `Missing stylesheet link: ${href}`)
    const stylesheet = await fetch(new URL(href, origin))
    assert.equal(stylesheet.status, 200)
    assert.match(stylesheet.headers.get('content-type'), /text\/css/)
    const css = await stylesheet.text()
    const classes = [...html.matchAll(/class="([^"]+)"/g)]
      .flatMap((match) => match[1].split(/\s+/))
      .filter((name) => /^x\w+$/.test(name))
    assert.ok(classes.length > 0)
    for (const name of classes) {
      assert.ok(css.includes(`.${name}`), `Missing SSR class in CSS: ${name}`)
    }
    if (route === 'details') {
      assert.match(html, /style="[^"]*--[^:]+:80px/)
    }
  }
} finally {
  server.httpServer.closeAllConnections()
  await new Promise((resolve, reject) => server.httpServer.close((error) => (error ? reject(error) : resolve())))
}
