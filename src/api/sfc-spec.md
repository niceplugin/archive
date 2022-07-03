# SFC 문법 설명서 {#sfc-syntax-specification}

## 개요 {#overview}

일반적으로 `*.vue` 파일 확장자를 사용하는 Vue 싱글 파일 컴포넌트(SFC)는 HTML과 유사한 문법을 사용하여 Vue 컴포넌트를 설명하는 커스텀 파일 형식입니다.
Vue SFC는 HTML과 문법적으로 호환됩니다.

각 `*.vue` 파일은 세 가지 유형의 최상위 언어 블록(`<template>`, `<script>`, `<style>`)과 선택적으로 추가 커스텀 블록으로 구성됩니다:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: '안녕 Vue!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  예를 들어 컴포넌트 설명서가 될 수 있습니다.
</custom1>
```

## 언어 블럭 {#language-blocks}

### `<template>`

- Each `*.vue` file can contain at most one top-level `<template>` block at a time.

- Contents will be extracted and passed on to `@vue/compiler-dom`, pre-compiled into JavaScript render functions, and attached to the exported component as its `render` option.

### `<script>`

- Each `*.vue` file can contain at most one `<script>` block at a time (excluding [`<script setup>`](/api/sfc-script-setup.html)).

- The script is executed as an ES Module.

- The **default export** should be a Vue component options object, either as a plain object or as the return value of [defineComponent](/api/general.html#definecomponent).

### `<script setup>`

- Each `*.vue` file can contain at most one `<script setup>` block at a time (excluding normal `<script>`).

- The script is pre-processed and used as the component's `setup()` function, which means it will be executed **for each instance of the component**. Top-level bindings in `<script setup>` are automatically exposed to the template. For more details, see [dedicated documentation on `<script setup>`](/api/sfc-script-setup).

### `<style>`

- A single `*.vue` file can contain multiple `<style>` tags.

- A `<style>` tag can have `scoped` or `module` attributes (see [SFC Style Features](/api/sfc-css-features) for more details) to help encapsulate the styles to the current component. Multiple `<style>` tags with different encapsulation modes can be mixed in the same component.

### 커스텀 블럭 {#custom-blocks}

Additional custom blocks can be included in a `*.vue` file for any project-specific needs, for example a `<docs>` block. Some real-world examples of custom blocks include:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

Handling of Custom Blocks will depend on tooling - if you want to build your own custom block integrations, see [relevant tooling section](/guide/scaling-up/tooling.html#sfc-custom-block-integrations) for more details.

## 자동으로 이름 추론 {#automatic-name-inference}

An SFC automatically infers the component's name from its **filename** in the following cases:

- Dev warning formatting
- DevTools inspection
- Recursive self-reference. E.g. a file named `FooBar.vue` can refer to itself as `<FooBar/>` in its template. This has lower priority than explicitly registered/imported components.

## 전처리기 {#pre-processors}

Blocks can declare pre-processor languages using the `lang` attribute. The most common case is using TypeScript for the `<script>` block:

```vue-html
<script lang="ts">
  // use TypeScript
</script>
```

`lang` can be applied to any block - for example we can use `<style>` with [SASS](https://sass-lang.com/) and `<template>` with [Pug](https://pugjs.org/api/getting-started.html):

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Note that integration with various pre-processors may differ by toolchain. Check out the respective documentation for examples:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## Src 가져오기 {#src-imports}

If you prefer splitting up your `*.vue` components into multiple files, you can use the `src` attribute to import an external file for a language block:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Beware that `src` imports follow the same path resolution rules as webpack module requests, which means:

- Relative paths need to start with `./`
- You can import resources from npm dependencies:

```vue
<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css" />
```

`src` imports also work with custom blocks, e.g.:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## 주석 {#comments}

각 블록 내에서 사용 중인 언어(HTML, CSS, JavaScript, Pug 등)의 주석 문법을 사용해야 합니다.
최상위 주석의 경우 HTML 주석 문법을 사용하십시오:
`<!-- 컴포넌트 주석 -->`
