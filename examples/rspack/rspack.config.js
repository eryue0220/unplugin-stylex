'use strict'

const rspack = require('@rspack/core')
const { default: stylexRspackPlugin } = require('unplugin-stylex/rspack')

module.exports = {
  context: __dirname,
  entry: {
    main: './src/app.js',
  },
  plugins: [
    stylexRspackPlugin({
      stylex: {
        filename: 'stylex-test.css'
      }
    }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ]
}
