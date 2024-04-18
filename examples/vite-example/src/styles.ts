import * as stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'

export const styles = stylex.create({
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor: colors.pink7,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: colors.blue9,
    // padding: sizes.spacing5,
    // borderRadius: sizes.spacing2,
    // color: colors.gray0,
    // fontFamily: fonts.mono,
  },
})
