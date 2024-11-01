import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylexEsbuildPlugin from 'unplugin-stylex/esbuild'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  entryPoints: [path.resolve(__dirname, '..', 'src/index.tsx')],
  bundle: true,
  outfile: 'dist/output.js',
  plugins: [
    stylexEsbuildPlugin({
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        stylexImports: ['@stylexjs/stylex'],
      },
    }),
  ],
}
