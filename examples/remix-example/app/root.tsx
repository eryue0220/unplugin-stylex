import type { LinksFunction } from '@remix-run/node'
import { Links, Meta } from '@remix-run/react'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d6336c',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1864ab',
    padding: '1.5rem',
    borderRadius: '.5rem',
    color: '#f8f9fa',
    fontFamily: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
  },
})

// Export links function to include StyleX CSS
// This is needed because Remix doesn't use index.html, so transformIndexHtml is never called
export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: '/assets/stylex.css',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
        <Meta />
      </head>
      <body style={{ boxSizing: 'border-box', padding: 0, margin: 0 }}>
        <div className={stylex.props(styles.main).className}>
          <div className={stylex.props(styles.card).className}>
            <span>Blue rounded rectangle</span>
          </div>
        </div>
      </body>
    </html>
  )
}
