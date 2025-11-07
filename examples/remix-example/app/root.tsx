import { Links, Meta } from '@remix-run/react'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink7,
  },
  card: {
    backgroundColor: colors.blue9,
    padding: sizes.spacing5,
    borderRadius: sizes.spacing2,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    color: colors.gray0,
    fontFamily: fonts.mono,
  },
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.card)}>
            <span>Blue rounded rectangle</span>
          </div>
        </div>
      </body>
    </html>
  )
}
