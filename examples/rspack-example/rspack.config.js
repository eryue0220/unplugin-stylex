const path = require('node:path')
const rspack = require('@rspack/core')
const { default: stylexRspackPlugin } = require('unplugin-stylex/rspack')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  target: 'web',
  cache: true,
  entry: {
    main: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  devServer: {
    hot: true,
    port: 4321,
  },
  plugins: [
    stylexRspackPlugin({
      dev: isDev,
      stylex: {
        useCSSLayers: true,
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: 'public/index.html',
    }),
  ],
}
