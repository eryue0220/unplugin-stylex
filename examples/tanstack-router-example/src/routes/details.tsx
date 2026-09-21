import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

const styles = stylex.create({
  main: {
    minHeight: '100vh',
    padding: '2rem',
    boxSizing: 'border-box',
    backgroundColor: '#1864ab',
    color: '#f8f9fa',
  },
  swatch: (width: number) => ({
    width,
    height: 40,
    backgroundColor: '#fab005',
    marginBlock: '1rem',
  }),
})

export const Route = createFileRoute('/details')({
  component: Details,
})

function Details() {
  const [expanded, setExpanded] = useState(false)
  return (
    <main {...stylex.props(styles.main)}>
      <h1>Dynamic StyleX styles</h1>
      <div {...stylex.props(styles.swatch(expanded ? 160 : 80))} data-testid="swatch" />
      <button type="button" onClick={() => setExpanded((value) => !value)}>
        Toggle width
      </button>
      <p>
        <Link to="/" style={{ color: 'inherit' }}>
          Back home
        </Link>
      </p>
    </main>
  )
}
