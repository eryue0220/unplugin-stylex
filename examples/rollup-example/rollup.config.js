import { readFileSync } from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import html, { makeHtmlAttributes } from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import stylexRollupPlugin from 'unplugin-stylex/rollup'

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ],
      extensions: ['.js', '.jsx']
    }),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': '"development"'
    }),
    stylexRollupPlugin({
      dev: true,
      stylex: {
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: true,
      },
    }),
    serve({
      contentBase: ['dist'],
      host: 'localhost',
      port: 8081,
    }),
    html({
      publicPath: '/',
      title: 'Stylex With Rollup',
      template: ({ attributes, files, publicPath, title }) => {
        const htmlTemplate = 'public/index.html'
        const { css, js } = files;
        const scripts = (js || [])
          .map(({ fileName }) =>
            `<script src="${publicPath}${fileName}" ${makeHtmlAttributes(attributes.script)}></script>`
          )
          .join('\n')
        const links = (css || [])
          .map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}" />`)
          .join('\n')
        const template = readFileSync(htmlTemplate, 'utf-8')
        return template
          .replace(/{title}/g, title)
          .replace(/{links}/g, links)
          .replace(/{scripts}/g, scripts)
      },
    }),
  ],
}
