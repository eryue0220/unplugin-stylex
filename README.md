# unplugin-stylex &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eryue0220/unplugin-stylex/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/unplugin-stylex.svg?style=flat)](https://www.npmjs.com/package/unplugin-stylex)

`unplugin-stylex` brings StyleX transform support to multiple bundlers via [unplugin](https://github.com/unjs/unplugin).

## Installation

```bash
npm i -D unplugin-stylex @stylexjs/stylex
```

or

```bash
yarn add -D unplugin-stylex @stylexjs/stylex
```

or

```bash
pnpm add -D unplugin-stylex @stylexjs/stylex
```

## Requirements

- Node.js: `^20.19.0 || >=22.12.0`
- Peer dependency: `@stylexjs/stylex@0.x`

## Supported Targets

- Vite (`unplugin-stylex/vite`)
- Astro integration (`unplugin-stylex/astro`)
- Esbuild (`unplugin-stylex/esbuild`)
- Farm (`unplugin-stylex/farm`)
- Rspack (`unplugin-stylex/rspack`)
- RSBuild (through Rspack plugin in `tools.rspack.plugins`)
- Rolldown (`unplugin-stylex/rolldown`)
- Rollup (`unplugin-stylex/rollup`)
- Webpack (`unplugin-stylex/webpack`)

## Quick Start

<details>
<summary>Vite</summary>

```js
// vite.config.js
import { defineConfig } from 'vite'
import stylexPlugin from 'unplugin-stylex/vite'

export default defineConfig({
  plugins: [
    stylexPlugin(),
  ],
})
```

</details>

<details>
<summary>Astro</summary>

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import stylexAstroPlugin from 'unplugin-stylex/astro'

export default defineConfig({
  integrations: [
    stylexAstroPlugin(),
  ],
})
```

</details>

<details>
<summary>Esbuild</summary>

```js
// esbuild.config.js
import { build } from 'esbuild'
import stylexPlugin from 'unplugin-stylex/esbuild'

build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/out.js',
  plugins: [stylexPlugin()],
})
```

</details>

<details>
<summary>Farm</summary>

```js
// farm.config.js
import { defineConfig } from '@farmfe/core'
import stylexPlugin from 'unplugin-stylex/farm'

export default defineConfig({
  plugins: [stylexPlugin()],
})
```

</details>

<details>
<summary>Rspack</summary>

```js
// rspack.config.js
import stylexPlugin from 'unplugin-stylex/rspack'

export default {
  plugins: [stylexPlugin()],
}
```

</details>

<details>
<summary>RSBuild</summary>

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import stylexPlugin from 'unplugin-stylex/rspack'

export default defineConfig({
  tools: {
    rspack: {
      plugins: [stylexPlugin()],
    },
  },
})
```

</details>

<details>
<summary>Rolldown</summary>

```js
// rolldown.config.mjs
import { defineConfig } from 'rolldown'
import stylexPlugin from 'unplugin-stylex/rolldown'

export default defineConfig({
  plugins: [stylexPlugin()],
})
```

</details>

<details>
<summary>Rollup</summary>

```js
// rollup.config.js
import stylexPlugin from 'unplugin-stylex/rollup'

export default {
  plugins: [stylexPlugin()],
}
```

</details>

<details>
<summary>Webpack</summary>

```js
// webpack.config.js
const stylexPlugin = require('unplugin-stylex/webpack').default

module.exports = {
  plugins: [stylexPlugin()],
}
```

</details>

## Options

```ts
type UnpluginStylexOptions = {
  validExts?: RegExp | string[]
  dev?: boolean
  stylex?: {
    filename?: string
    aliases?: Record<string, string | string[]>
    stylexImports?: string[]
    classNamePrefix?: string
    unstable_moduleResolution?: {
      type: 'commonJS' | 'haste'
      rootDir: string
    }
    babelConfig?: {
      plugins: unknown[]
      presets: unknown[]
      babelrc: boolean
    }
    useCSSLayers?: boolean
    genConditionalClasses?: boolean
    treeshakeCompensation?: boolean
    runtimeInjection?: boolean
  }
}
```

### Defaults

- `validExts`: `/\.[mc]?[jt]sx?$|\.svelte$|\.vue$/`
- `dev`: inferred from environment (`NODE_ENV` / `BABEL_ENV`) unless explicitly set
- `stylex.filename`: `'stylex.css'`
- `stylex.stylexImports`: `['@stylexjs/stylex']`
- `stylex.runtimeInjection`: follows `dev` by default
- `stylex.aliases`: auto-reads from project config (TS paths + bundler aliases when available)
- `stylex.useCSSLayers`: `false`
- `stylex.unstable_moduleResolution`: `{ type: 'commonJS', rootDir: process.cwd() }`
- `stylex.babelConfig`: `{ babelrc: false, plugins: [], presets: [] }`

## Notes

- The plugin only transforms modules containing at least one `stylexImports` source.
- Output CSS is emitted as an asset file (`stylex.css` by default).
- Vite and Astro integrations also handle dev server CSS serving and HTML injection.
- Astro integration defaults `validExts` to include `.astro` and `.stylex`.
- For Farm projects, `treeshakeCompensation: true` is usually needed (see example config).

## Examples

- See runnable examples in [`examples`](https://github.com/eryue0220/unplugin-stylex/tree/main/examples)

## Acknowledgments

- [@stylexjs/rollup-plugin](https://github.com/facebook/stylex/tree/main/packages/rollup-plugin)
- [vite-plugin-stylex](https://github.com/HorusGoul/vite-plugin-stylex)
