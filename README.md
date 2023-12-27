# unplugin-stylex

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
<summary>Vite</summary><br>

```ts
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

```ts
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
<summary>rspack</summary><br>

```ts
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

## Options

### options.dev

### options.enforce

### options.stylex

#### options.stylex.runtimeInjection

#### options.stylex.classNamePrefix

#### options.stylex.useCSSLayers

#### options.stylex.babelConfig

#### options.stylex.stylexImports

#### options.stylex.unstable_moduleResolution

## License

StyleX is [MIT licensed](./LICENSE)
