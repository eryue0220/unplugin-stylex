<script setup lang="ts">
  import * as stylex from '@stylexjs/stylex'
</script>

<script lang="ts">
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
</script>

<template>
  <div :class="stylex.props(styles.main).className">
    <div :class="stylex.props(styles.card).className">
      <span>Blue rounded rectangle</span>
    </div>
  </div>
</template>
