<script setup>
import CustomPreferenceSwitch from './CustomPreferenceSwitch.vue'
</script>

# Application API

## createApp()

앱 인스턴스를 생성합니다.

- **타입**:

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **세부 사항**:

  첫 번째 인자는 루트 컴포넌트입니다.
  선택적인 두 번째 인자는 루트 컴포넌트에 전달할 props입니다.

- **예제**:

  루트 컴포넌트를 직접 서술하는 방식(inline)으로 사용하는 경우:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* 루트 컴포넌트 옵션 */
  })
  ```

  컴포넌트 불러오기(`import`)로 사용하는 경우:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **참고**: [가이드 - 앱 생성](/guide/essentials/application.html)

## createSSRApp()

[SSR 하이드레이션](/guide/scaling-up/ssr.html#client-hydration) 모드에서 앱 인스턴스를 생성합니다.
사용법은 `createApp()`과 완전히 동일합니다.

## app.mount()

컨테이너 엘리먼트에 앱 인스턴스를 마운트합니다.

- **타입**:

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **세부 사항**:

  인자는 실제 DOM 엘리먼트 또는 CSS 셀렉터(첫 번째로 일치한 엘리먼트가 사용됨)일 수 있습니다.
  루트 컴포넌트 인스턴스를 반환합니다.

  컴포넌트에 정의된 템플릿 또는 렌더링 함수가 있는 경우, 컨테이너 내부의 기존 DOM 노드를 대체합니다.
  만약 런타임 컴파일러를 사용하는 경우, 컨테이너의 `innerHTML`이 템플릿으로 사용됩니다.

  SSR 하이드레이션 모드에서는 컨테이너 내부의 기존 DOM 노드를 하이드레이트합니다.
  [불일치](/guide/scaling-up/ssr.html#hydration-mismatch)할 경우, 기존 DOM 노드가 의도하는 출력과 일치하도록 변경됩니다.

  각 앱 인스턴스는 `mount()`를 한 번만 호출할 수 있습니다.

- **예제**:

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  실제 DOM 엘리먼트에 마운트할 수도 있습니다:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount()

마운트된 앱 인스턴스를 마운트 해제하여,
앱의 컴포넌트 트리에 있는 모든 컴포넌트에 마운트 해제 수명 주기 훅을 트리거합니다.

- **타입**:

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.provide()

앱 내의 모든 하위 컴포넌트에 주입할 수 있는 값을 제공합니다.

- **타입**:

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **세부 사항**:

  첫 번째 인자는 주입 키이고, 두 번째 인자는 제공될 값입니다.
  반환 값은 앱 인스턴스입니다.

- **예제**:

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', '안녕!')
  ```

  앱 내 컴포넌트에서:

  <CustomPreferenceSwitch />

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // '안녕!'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // '안녕!'
    }
  }
  ```

  </div>

- **참고**:
  - [Provide / Inject](/guide/components/provide-inject.html)
  - [앱 수준의 Provide](/guide/components/provide-inject.html#app-level-provide)

## app.component()

이름(문자열)과 컴포넌트정의를 모두 전달하는 경우, 전역 컴포넌트를 등록합니다.
이름만 전달되는 경우, 이미 등록된 것을 찾습니다.

- **타입**:

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **예제**:

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // 선택적으로 객체를 등록할 수 있음
  app.component('my-component', {
    /* ... */
  })

  // 등록된 컴포넌트 찾기
  const MyComponent = app.component('my-component')
  ```

- **참고**: [컴포넌트 등록](/guide/components/registration.html)

## app.directive()

이름(문자열)과 디렉티브 정의를 모두 전달하는 경우, 전역 커스텀 디렉티브를 등록합니다.
이름만 전달되는 경우, 이미 등록된 것을 찾습니다.

- **타입**:

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **예제**:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // 등록 (객체 디렉티브)
  app.directive('my-directive', {
    /* 커스텀 디렉티브 훅 */
  })

  // 등록 (간단하게 사용하기 위한 함수형 디렉티브)
  app.directive('my-directive', () => {
    /* ... */
  })

  // 등록된 디렉티브 찾기
  const myDirective = app.directive('my-directive')
  ```

- **참고**: [커스텀 디렉티브](/guide/reusability/custom-directives.html)

## app.use()

[플러그인](/guide/reusability/plugins.html) 설치.

- **타입**:

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **세부 사항**:

  첫 번째 인자는 플러그인입니다.
  선택적인 두 번째 인자는 플러그인 옵션입니다. 

  플러그인은 `install()` 메소드가 있는 객체이거나, `install()` 메소드로 사용될 함수입니다.
  `app.use()`의 두 번째 인자인 옵션은 플러그인의 `install()` 메서드에 전달됩니다.

  동일한 플러그인을 여러 번 `app.use()`로 호출하는 경우, 플러그인은 한 번만 설치됩니다.

- **예제**:

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **참고**: [플러그인](/guide/reusability/plugins.html)

## app.mixin()

앱 범위 전역에 믹스인을 적용합니다.
전역 믹스인에 포함된 옵션은 앱 내에 모든 컴포넌트 인스턴스에 적용됩니다.

:::warning 권장하지 않음
믹스인은 라이브러리 생태계에서 널리 사용되고 있기 때문에, 하위 호환성을 위해 Vue 3에서 지원됩니다.
하지만 앱 내 코드에서 믹스인(특히 글로벌 믹스인)의 사용은 피해야 합니다.

로직 재상용은 [구성화](/guide/reusability/composables.html)를 추천합니다.
:::

- **타입**:

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.version

앱을 생성한 Vue 버전을 제공합니다.
이것은 Vue 버전에 기반한 [플러그인](/guide/reusability/plugins.html) 내부에서 조건부 로직이 필요한 경우에 유용합니다.

- **타입**:

  ```ts
  interface App {
    version: string
  }
  ```

- **예제**:

  플러그인 내부에서 버전 확인 진행:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('이 플러그인은 Vue 3가 필요합니다.')
      }
    }
  }
  ```

- **참고**: [전역 API - version](/api/general.html#version)

## app.config

모든 앱 인스턴스는 해당 앱의 환경 설정이 포함된 `config` 객체를 노출합니다.
앱을 마운트하기 전에 속성을 수정할 수 있습니다(아래 문서 참조).

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler

앱 내에서 예외 처리 되지 않은 에러 발생 시, 트리거 될 전역 핸들러를 정의합니다.

- **타입**:

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info`는 Vue 고유의 에러 정보입니다.
      // 예: 에러 발생 수명 주기 훅 표시: 'created hook'
      info: string
    ) => void
  }
  ```

- **세부 사항**:

  핸들러는 "에러", "에러를 트리거한 컴포넌트 인스턴스", "에러 출처 유형을 나타내는 문자열" 세 인자를 받습니다.

  다음 출처에서 에러를 캡처할 수 있습니다:

  - 컴포넌트 렌더
  - 이벤트 핸들러
  - 수명 주기 훅
  - `setup()` 함수
  - 감시자
  - 커스텀 디렉티브 훅
  - 트렌지션 훅

- **예제**:

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // 에러 핸들링: 서비스 에러 로그 기록
  }
  ```

## app.config.warnHandler

Vue에서 런타임 경고 발생 시, 트리거 될 커스텀 핸들러를 정의합니다.

- **타입**:

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **세부 사항**:

  첫 번째 인자로 경고 메세지, 두 번째 인자로 발생한 컴포넌트 인스턴스, 세 번째 인자로 컴포넌트 추적 문자열을 받습니다. 

  특정 경고를 필터링하여 콘솔의 장황함을 줄일 수 있습니다.
  모든 Vue 경고는 개발 중에 해결돼야 합니다.
  따라서 이 함수는 디버깅 시에 많은 경고 중에서 특정 경고에 초점을 맞추는 것이 좋으며, 디버깅이 완료되면 제거해야 합니다.

  :::tip
  경고는 개발 모드에서만 발생하므로, 이것은 프로덕션 모드에서 무시됩니다.
  :::

- **예제**:

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace`는 컴포넌트 계층 구조를 추적한 문자열입니다.
  }
  ```

## app.config.performance

이것을 `true`로 설정하면 (크롬 기준) 브라우저 개발자 도구의 "성능(Performance) 탭 → 소요시간(Timings) 패널"에 컴포넌트 초기화, 컴파일, 렌더링, 패치 성능 추적 기록이 활성화 됩니다.
브라우저가 [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API를 지원하고 개발 모드일 경우에만 작동(기록)합니다.

- **타입**: `boolean`

- **참고**: [가이드 - 성능](/guide/best-practices/performance.html)

## app.config.compilerOptions

런타임 컴파일러 옵션을 설정합니다.
이 객체에 설정된 값은 브라우저 내 템플릿 컴파일러에 전달되고, 설정된 앱의 모든 컴포넌트에 영향을 미칩니다.
[`compilerOptions` 옵션](/api/options-rendering.html#compileroptions)을 사용하여 컴포넌트별로 이러한 옵션을 재정의할 수도 있습니다.

::: warning 중요
이 옵션은 전체 빌드(예: 브라우저에서 템플릿을 컴파일할 수 있는 독립 실행형 `vue.js`)를 사용할 때만 적용됩니다.
빌드 셋업과 함께 런타임 전용 빌드를 사용하는 경우, 빌드 도구 환경설정을 통해 컴파일러 옵션을 `@vue/compiler-dom`으로 전달해야 합니다.

- `vue-loader`의 경우: [`compilerOptions` 로더 옵션을 통해 전달](https://vue-loader.vuejs.org/options.html#compileroptions). [`vue-cli`에서 환경설정 하는 방법](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader)도 참고하세요.

- `vite`의 경우: [`@vitejs/plugin-vue` 옵션을 통해 전달](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#options).
:::

### app.compilerOptions.isCustomElement

네이티브 커스텀 엘리먼트를 인식하기 위한 검사 방법을 지정합니다.

- **타입**: `(tag: string) => boolean`

- **세부 사항**:

  Should return `true` if the tag should be treated as a native custom element. For a matched tag, Vue will render it as a native element instead of attempting to resolve it as a Vue component.

  Native HTML and SVG tags don't need to be matched in this function - Vue's parser recognizes them automatically.

- **예제**:

  ```js
  // treat all tags starting with 'ion-' as custom elements
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **참고**: [Vue와 웹 컴포넌트](/guide/extras/web-components.html)

### app.compilerOptions.whitespace

Adjusts template whitespace handling behavior.

- **타입**: `'condense' | 'preserve'`

- **기본 값**: `'condense'`

- **세부 사항**:

  Vue removes / condenses whitespace characters in templates to produce more efficient compiled output. The default strategy is "condense", with the following behavior:

  1. Leading / ending whitespace characters inside an element are condensed into a single space.
  2. Whitespace characters between elements that contain newlines are removed.
  3. Consecutive whitespace characters in text nodes are condensed into a single space.

  Setting this option to `'preserve'` will disable (2) and (3).

- **예제**:

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.compilerOptions.delimiters

Adjusts the delimiters used for text interpolation within the template.

- **타입**: `[string, string]`

- **기본 값**: `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **세부 사항**:

  This is typically used to avoid conflicting with server-side frameworks that also use mustache syntax.

- **예제**:

  ```js
  // Delimiters changed to ES6 template string style
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.compilerOptions.comments

Adjusts treatment of HTML comments in templates.

- **타입**: `boolean`

- **기본 값**: `false`

- **세부 사항**:

  By default, Vue will remove the comments in production. Setting this option to `true` will force Vue to preserve comments even in production. Comments are always preserved during development. This option is typically used when Vue is used with other libraries that rely on HTML comments.

- **예제**:

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties

An object that can be used to register global properties that can be accessed on any component instance inside the application.

- **타입**:

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **세부 사항**:

  This is a replacement of Vue 2's `Vue.prototype` which is no longer present in Vue 3. As with anything global, this should be used sparingly.

  If a global property conflicts with a component’s own property, the component's own property will have higher priority.

- **사용법**:

  ```js
  app.config.globalProperties.msg = '안녕!'
  ```

  This makes `msg` available inside any component template in the application, and also on `this` of any component instance:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // '안녕!'
    }
  }
  ```

## app.config.optionMergeStrategies

An object for defining merging strategies for custom component options.

- **타입**:

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **세부 사항**:

  Some plugins / libraries add support for custom component options (by injecting global mixins). These options may require special merging logic when the same option needs to be "merged" from multiple sources (e.g. mixins or component inheritance).

  A merge strategy function can be registered for a custom option by assigning it on the `app.config.optionMergeStrategies` object using the option's name as the key.

  The merge strategy function receives the value of that option defined on the parent and child instances as the first and second arguments, respectively.

- **예제**:

  ```js
  const app = createApp({
    // option from self
    msg: 'Vue',
    // option from a mixin
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // merged options exposed on this.$options
      console.log(this.$options.msg)
    }
  })

  // define a custom merge strategy for `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logs 'Hello Vue'
  ```

- **참고**: [Component Instance - `$options`](/api/component-instance.html#options)
