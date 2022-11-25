---
title: 대안책
---

# 대안책 %{ #workarounds }%

## reload()

- 설명: FlowRouter 경로는 멱등적입니다.
  따라서 동일한 URL에 대해 `FlowRouter.go()`를 여러 번 호출하더라도,
  첫 번째 실행에서만 활성화됩니다.
  경로를 직접 클릭하는 경우에도 마찬가지입니다.

  따라서 경로를 다시 로드해야 하는 경우, 이 메서드를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.reload()
  ```
  
- 타입:
  ```ts
  interface FlowRouter {
    reload(): void;
  }
  ```

## refresh()

:::warning
정확한 사용법 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/refresh.md)
:::

- 설명: 구독, 템플릿 렌더링 및 모든 경로의 훅과 정의를 강제로 다시 실행합니다.
  템플릿 로직이 경로의 훅에 따라 달라지는 경우에 유용합니다.
- 예제:
  ```js
  FlowRouter.refresh('layout', 'template')
  ```

- 타입:
  ```ts
  interface FlowRouter {
    refresh(
      layout: routeName,
      template: routeName,
    ): void
  }
  
  type routeName = string 
  ```

## pathRegExp

:::warning
레거시 여부 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/pathRegExp.md)
:::

## decodeQueryParamsOnce

:::warning
레거시 여부 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/decodeQueryParamsOnce.md)
:::













