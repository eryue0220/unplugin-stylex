# unplugin-stylex &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eryue0220/unplugin-stylex/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/unplugin-stylex.svg?style=flat)](https://www.npmjs.com/package/unplugin-stylex)

## Installation

Install the package from the following command

```shell
npm install unplugin-stylex --save-dev
```

or with yarn:

```shell
yarn add unplugin-stylex --save-dev
```

or with pnpm:

```shell
pnpm i unplugin-stylex --save-dev
```

## Configuration

<details>
<summary>vite</summary><br>

```js
// vite.config.js
import { defineConfig } from 'vite'
import stylexPlugin from 'unplugin-stylex/vite'

export default defineConfig({
  plugins: [
    stylexPlugin({ /* options */}),
  ],
})
```

</br></details>

<details>
<summary>esbuild</summary><br>

```js
// esbuild.config.js
import { build } from 'esbuild'
import stylexPlugin from 'unplugin-stylex/esbuild'

export default {
  plugins: [
    stylexPlugin({ /* options */ }),
  ],
}
```

</br></details>

<details>
<summary>farm</summary><br>

```js
// farm.config.js
import { defineConfig } from '@farmfe/core'
import stylexPlugin from 'unplugin-stylex/farm'

export default defineConfig({
  // other rollup config
  plugins: [
    stylexPlugin({ /* options */}),
  ],
})
```

</br></details>

<details>
<summary>rspack</summary><br>

```js
// rspack.config.js
import stylexPlugin from 'unplugin-stylex/rspack'

module.exports = {
  // other rspack config
  plugins: [
    stylexPlugin({ /* options */}),
  ],
}
```

</br></details>

<details>
<summary>rolldown(⚠️ experimental)</summary><br>

```js
// rolldown.config.js
import stylexRolldownPlugin from 'unplugin-stylex/rolldown'

export default {
  // other rolldown config
  plugins: [
    stylexRolldownPlugin({ /* options */}),
  ],
}
```

</br></details>

<details>
<summary>rollup</summary><br>

```js
// rollup.config.js
import stylexRollupPlugin from 'unplugin-stylex/rollup'

export default {
  // other rollup config
  plugins: [
    stylexRollupPlugin({ /* options */}),
  ],
}
```

</br></details>

<details>
<summary>webpack</summary><br>

```js
// webpack.config.js
import stylexWebpackPlugin from 'unplugin-stylex/webpack'

module.exports = {
  // other webpack config
  plugins: [
    stylexWebpackPlugin({ /* options */}),
  ],
}
```

</br></details>

## Usage

More detail usage can check [examples](https://github.com/eryue0220/unplugin-stylex/tree/main/examples)

## Options

Current support argument, which may have change in the future

### options.dev

#### options.stylex.runtimeInjection

#### options.stylex.classNamePrefix

#### options.stylex.useCSSLayers

#### options.stylex.babelConfig

#### options.stylex.stylexImports

#### options.stylex.unstable_moduleResolution

# Acknowledgments

- [@stylexjs/rollup-plugin](https://github.com/facebook/stylex/tree/main/packages/rollup-plugin)
- [vite-plugin-stylex](https://github.com/HorusGoul/vite-plugin-stylex)