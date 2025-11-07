<script lang="ts">
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

  const mainProps = stylex.props(styles.main)
  const cardProps = stylex.props(styles.card)

  const toStyleString = (style?: Readonly<Record<string, string | number>>) =>
    style ? Object.entries(style).map(([key, value]) => `${key}: ${value}`).join('; ') : undefined
</script>

<main>
  <div class={mainProps.className} style={toStyleString(mainProps.style)}>
    <div class={cardProps.className} style={toStyleString(cardProps.style)}>
      <span>Blue rounded rectangle</span>
    </div>
  </div>
</main>
