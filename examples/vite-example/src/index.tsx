import React from 'react';
import { createRoot } from 'react-dom/client'
import * as stylex from '@stylexjs/stylex'
import { styles } from './styles'

function App() {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.card)}>
        <span>Blue rounded rectangle</span>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
