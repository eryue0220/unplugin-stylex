import { build } from 'esbuild'
import stylexEsbuildPlugin from 'unplugin-stylex/esbuild'

await build({
  entryPoints: [
    './src/app.js',
  ],
  bundle: true,
  outdir: 'dist',
  plugins: [
    stylexEsbuildPlugin({
      stylex: {
        babelConfig: {
          babelrc: true,
        },
        useCSSLayers: true,
      },
    })
  ],
})
