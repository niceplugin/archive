# SFC CSS 기능 {#sfc-css-features}

## 범위가 지정된 CSS {#scoped-css}

When a `<style>` tag has the `scoped` attribute, its CSS will apply to elements of the current component only. This is similar to the style encapsulation found in Shadow DOM. It comes with some caveats, but doesn't require any polyfills. It is achieved by using PostCSS to transform the following:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">안녕!</div>
</template>
```

Into the following:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>안녕!</div>
</template>
```

### 자식 컴포넌트 루트 엘리먼트 {#child-component-root-elements}

With `scoped`, the parent component's styles will not leak into child components. However, a child component's root node will be affected by both the parent's scoped CSS and the child's scoped CSS. This is by design so that the parent can style the child root element for layout purposes.

### 깊은 셀렉터 {#deep-selectors}

If you want a selector in `scoped` styles to be "deep", i.e. affecting child components, you can use the `:deep()` pseudo-class:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

The above will be compiled into:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
DOM content created with `v-html` are not affected by scoped styles, but you can still style them using deep selectors.
:::

### 슬롯형 셀렉터 {#slotted-selectors}

By default, scoped styles do not affect contents rendered by `<slot/>`, as they are considered to be owned by the parent component passing them in. To explicitly target slot content, use the `:slotted` pseudo-class:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 전역 셀렉터 {#global-selectors}

If you want just one rule to apply globally, you can use the `:global` pseudo-class rather than creating another `<style>` (see below):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### 로컬 및 전역 스타일 혼합 {#mixing-local-and-global-styles}

You can also include both scoped and non-scoped styles in the same component:

```vue
<style>
/* 전역 스타일 */
</style>

<style scoped>
/* 로컬 스타일 */
</style>
```

### 범위가 지정된 스타일 팁 {#scoped-style-tips}

- **Scoped styles do not eliminate the need for classes**. Due to the way browsers render various CSS selectors, `p { color: red }` will be many times slower when scoped (i.e. when combined with an attribute selector). If you use classes or ids instead, such as in `.example { color: red }`, then you virtually eliminate that performance hit.

- **Be careful with descendant selectors in recursive components!** For a CSS rule with the selector `.a .b`, if the element that matches `.a` contains a recursive child component, then all `.b` in that child component will be matched by the rule.

## CSS 모듈 {#css-modules}

A `<style module>` tag is compiled as [CSS Modules](https://github.com/css-modules/css-modules) and exposes the resulting CSS classes to the component as an object under the key of `$style`:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

The resulting classes are hashed to avoid collision, achieving the same effect of scoping the CSS to the current component only.

Refer to the [CSS Modules spec](https://github.com/css-modules/css-modules) for more details such as [global exceptions](https://github.com/css-modules/css-modules#exceptions) and [composition](https://github.com/css-modules/css-modules#composition).

### 커스텀 삽입 이름 {#custom-inject-name}

You can customize the property key of the injected classes object by giving the `module` attribute a value:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### 컴포지션 API와 함께 사용 {#usage-with-composition-api}

The injected classes can be accessed in `setup()` and `<script setup>` via the `useCssModule` API. For `<style module>` blocks with custom injection names, `useCssModule` accepts the matching `module` attribute value as the first argument:

```js
import { useCssModule } from 'vue'

// inside setup() scope...
// default, returns classes for <style module>
useCssModule()

// named, returns classes for <style module="classes">
useCssModule('classes')
```

## CSS에서 `v-bind()` {#v-bind-in-css}

SFC `<style>` tags support linking CSS values to dynamic component state using the `v-bind` CSS function:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

The syntax works with [`<script setup>`](./sfc-script-setup), and supports JavaScript expressions (must be wrapped in quotes):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

The actual value will be compiled into a hashed CSS custom property, so the CSS is still static. The custom property will be applied to the component's root element via inline styles and reactively updated if the source value changes.
