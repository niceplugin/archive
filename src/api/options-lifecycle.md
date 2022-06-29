# 옵션: 수명주기 {#options-lifecycle}

:::info 참고
수명주기 훅의 여러 사용법에 대해서는 [가이드 - 수명주기 훅](/guide/essentials/lifecycle.html)을 참고하십시오.
:::

## beforeCreate

인스턴스가 초기화된 후 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  인스턴스가 초기화된 다음 props가 처리된 후, `data()` 또는 `computed`와 같은 다른 옵션을 처리하기 전에 호출됩니다.

  컴포지션 API의 `setup()` 훅은 옵션 API의 어떤 훅보다 먼저 (`beforeCreate()` 훅보다 빨리) 호출됩니다.

## created

인스턴스가 모든 상태 관련 옵션 처리를 완료한 후 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  반응형 데이터, 계산된 속성, 메서드 및 감시자가 설정된 후, 이 훅이 호출되면 됩니다.
  그러나 마운팅 단계가 시작되지 않았으므로, `$el` 속성을 아직 사용할 수 없습니다.

## beforeMount

컴포넌트가 마운트되기 직전 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  반응형 상태 설정이 완료되면 이 훅이 호출되지만,
  아직 DOM 노드가 생성되지는 않았으며,
  첫 DOM 렌더 이펙트를 실행하려고 합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## mounted

컴포넌트가 마운트된 후 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  A component is considered mounted after:

  - All of its synchronous child components have been mounted (does not include async components or components inside `<Suspense>` trees).

  - Its own DOM tree has been created and inserted into the parent container. Note it only guarantees that the component's DOM tree is in-document if the application's root container is also in-document.

  This hook is typically used for performing side effects that need access to the component's rendered DOM, or for limiting DOM-related code to the client in a [server-rendered application](/guide/scaling-up/ssr.html).

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## beforeUpdate

반응형 상태 변경에 의한 컴포넌트 DOM 트리 업데이트 직전 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  이 훅은 Vue가 DOM을 업데이트하기 전,
  DOM 상태에 접근하는 데 사용할 수 있습니다.
  이 훅 내부에서 컴포넌트 상태를 수정하는 것도 안전합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## updated

반응형 상태 변경에 의한 컴포넌트 DOM 트리 업데이트 후 호출됩니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  A parent component's updated hook is called after that of its child components.

  This hook is called after any DOM update of the component, which can be caused by different state changes. If you need to access the updated DOM after a specific state change, use [nextTick()](/api/general.html#nexttick) instead.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

  :::warning
  Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!
  :::

## beforeUnmount

Called right before a component instance is to be unmounted.

- **타입**:

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  When this hook is called, the component instance is still fully functional.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## unmounted

Called after the component has been unmounted.

- **타입**:

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **세부 사항**:

  A component is considered unmounted after:

  - All of its child components have been unmounted.

  - All of its associated reactive effects (render effect and computed / watchers created during `setup()`) have been stopped.

  Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## errorCaptured

Called when an error propagating from a descendent component has been captured.

- **타입**:

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
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

## renderTracked <sup class="vt-badge dev-only" />

Called when a reactive dependency has been tracked by the component's render effect.

- **타입**:

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **참고**: [가이드 - 반응형 심화](/guide/extras/reactivity-in-depth.html)

## renderTriggered <sup class="vt-badge dev-only" />

Called when a reactive dependency triggers the component's render effect to be re-run.

- **타입**:

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

- **참고**: [가이드 - 반응형 심화](/guide/extras/reactivity-in-depth.html)

## activated

Called after the component instance is inserted into the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## deactivated

Called after the component instance is removed from the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components.html#keepalive).

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR 전용" />

Async function to be resolved before the component instance is to be rendered on the server.

- **타입**:

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **세부 사항**:

  If the hook returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.

  This hook is only called during server-side rendering can be used to perform server-only data fetching.

- **예제**:

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // component is rendered as part of the initial request
      // pre-fetch data on server as it is faster than on the client
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // if data is null on mount, it means the component
        // is dynamically rendered on the client. Perform a
        // client-side fetch instead.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **참고**: [가이드 - 서버 사이드 렌더링 (SSR)](/guide/scaling-up/ssr.html)
