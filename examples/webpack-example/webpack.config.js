const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { default: stylexWebpackPlugin } = require('unplugin-stylex/webpack')

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8080,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    stylexWebpackPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
}
