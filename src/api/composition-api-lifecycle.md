# 컴포지션 API: 수명주기 훅

:::info 사용 참고 사항
이 페이지에 나열된 모든 API는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.
자세한 내용은 [가이드 - 수명주기 훅](/guide/essentials/lifecycle.html)을 참고하세요.
:::

## onMounted()

컴포넌트가 마운트된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onMounted(callback: () => void): void
  ```

- **세부 사항**:

  컴포넌트가 마운트 되었다고 간주하는 조건은 다음과 같습니다:

  - 동기식 자식 컴포넌트가 모두 마운트됨(`<Suspense>` 트리 내부의 비동기 컴포넌트 또는 컴포넌트는 포함하지 않음).

  - 자체 DOM 트리가 생성되어 상위 컨테이너에 삽입됨.
    앱의 루트 컨테이너가 Document 내에 있는 경우에만 컴포넌트의 DOM 트리가 문서 내에 있음을 보장함.

  일반적으로 이 훅은 컴포넌트의 렌더링된 DOM에 접근해야 하는 사이드 이펙트를 실행하거나,
  [서버에서 렌더링 된 앱](/guide/scaling-up/ssr.html)에서 DOM과 관련 코드를 클라이언트에서만 실행하도록 제한하는 데 사용됩니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **예제**:

  템플릿 ref를 통해 엘리먼트에 접근:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated()

반응형 상태 변경으로 컴포넌트의 DOM 트리가 업데이트된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **세부 사항**:

  부모 컴포넌트의 updated 훅은 자식 컴포넌트의 훅 이후에 호출됩니다.

  이 훅은 상태 변경에 영향을 받을 컴포넌트의 DOM 업데이트 후에 호출됩니다.
  특정 상태 변경 후 업데이트된 DOM에 접근해야 하는 경우, [nextTick()](/api/general.html#nexttick)을 사용해야 합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

  :::warning 주의
  updated 훅에서 컴포넌트 상태를 변경하면 안되는데,
  무한 업데이트 루프가 발생할 수 있기 때문입니다!
  :::

- **예제**:

  업데이트된 DOM에 접근:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // 텍스트 내용은 현재 `count.value`와 같아야 함
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted()

컴포넌트가 마운트 해제된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **세부 사항**:

  컴포넌트가 마운트 해제되었다고 간주하는 조건은 다음과 같습니다:

  - 모든 자식 컴포넌트가 마운트 해제됨.

  - 관련된 모든 반응형 이펙트(`setup()`에서 생성된 렌더 이펙트, 계산된 속성, 감시자)가 중지됨.

  이 훅을 사용하여 타이머, DOM 이벤트 리스너 또는 서버 연결처럼 수동으로 생성된 사이드 이펙트를 정리합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **예제**:

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount()

컴포넌트가 마운트되기 직전에 호출될 후크를 등록합니다.

- **타입**:

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **세부 사항**:

  이 훅은 컴포넌트의 반응형 상태 설정이 완료된 후 호출되지만, 아직 DOM 노드가 생성되지 않은 단계입니다.
  첫 DOM 렌더 이펙트를 실행하려고 합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onBeforeUpdate()

반응형 상태 변경으로 컴포넌트의 DOM 트리를 업데이트하기 직전에 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **세부 사항**:

  이 훅은 Vue가 DOM을 업데이트하기 전에 DOM 상태에 접근하는 데 사용할 수 있습니다.
  이 훅 내부에서 컴포넌트 상태를 수정하는 것도 안전합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onBeforeUnmount()

컴포넌트 인스턴스가 마운트 해제되기 직전에 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **세부 사항**:

  이 훅이 호출될 때, 여전히 컴포넌트 인스턴스는 완전히 동작하는 상태입니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onErrorCaptured()

Registers a hook to be called when an error propagating from a descendent component has been captured.

- **타입**:

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **세부 사항**:

  Errors can be captured from the following sources:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  The hook receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  You can modify component state in `errorCaptured()` to display an error state to the user. However, it is important that the error state should not render the original content that caused the error; otherwise the component will be thrown into an infinite render loop.

  The hook can return `false` to stop the error from propagating further. See error propagation details below.

  **Error Propagation Rules**

  - By default, all errors are still sent to the application-level [`app.config.errorHandler`](/api/application.html#app-config-errorhandler) if it is defined, so that these errors can still be reported to an analytics service in a single place.

  - If multiple `errorCaptured` hooks exist on a component's inheritance chain or parent chain, all of them will be invoked on the same error.

  - If the `errorCaptured` hook itself throws an error, both this error and the original captured error are sent to `app.config.errorHandler`.

  - An `errorCaptured` hook can return `false` to prevent the error from propagating further. This is essentially saying "this error has been handled and should be ignored." It will prevent any additional `errorCaptured` hooks or `app.config.errorHandler` from being invoked for this error.

## onRenderTracked() <sup class="vt-badge dev-only" />

Registers a debug hook to be called when a reactive dependency has been tracked by the component's render effect.

**This hook is development-mode-only and not called during server-side rendering.**

- **타입**:

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **참고**: [반응형 심화](/guide/extras/reactivity-in-depth.html)

## onRenderTriggered() <sup class="vt-badge dev-only" />

Registers a debug hook to be called when a reactive dependency triggers the component's render effect to be re-run.

**This hook is development-mode-only and not called during server-side rendering.**

- **타입**:

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **참고**: [반응형 심화](/guide/extras/reactivity-in-depth.html)

## onActivated()

[`<KeepAlive>`](/api/built-in-components.html#keepalive)로 캐시된 컴포넌트 인스턴스가 DOM 트리의 일부로 삽입된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  function onActivated(callback: () => void): void
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명 주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onDeactivated()

[`<KeepAlive>`](/api/built-in-components.html#keepalive)로 캐시된 컴포넌트 인스턴스가 DOM 트리에서 제거된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명 주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" />

Registers a async function to be resolved before the component instance is to be rendered on the server.

- **타입**:

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **세부 사항**:

  If the callback returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.

  This hook is only called during server-side rendering can be used to perform server-only data fetching.

- **예제**:

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **참고**: [서버 사이드 렌더링](/guide/scaling-up/ssr.html)
