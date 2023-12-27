import * as stylex from '@stylexjs/stylex'
import theme from './theme'
import otherTheme from './otherTheme'

const fadeAnimation = stylex.keyframes({
  '0%': {
    opacity: 0.25,
  },
  '100%': {
    opacity: 1,
  },
})

const styles = stylex.create({
  foo: {
    animationName: fadeAnimation,
    display: 'flex',
    marginStart: 10,
    marginBlockStart: 99,
    height: 500,
    ':hover': {
      background: 'red',
    },
  },
})

export default function App() {
  return stylex.props(otherTheme.bar, styles.foo, theme.baz).className
}
