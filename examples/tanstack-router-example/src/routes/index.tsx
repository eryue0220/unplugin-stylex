import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'

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
    fontFamily:
      'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
  },
})

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.card)}>
        <span>Blue rounded rectangle</span>
      </div>
    </div>
  )
}
