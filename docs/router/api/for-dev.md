---
title: 애드온 개발용
---

# 애드온 개발용 %{ #for-dev }%

## onRouteRegister()

:::warning
레거시 메서드로 판단됨. 최초 1회만 작동하며, 매 경로 변경시 호출되지 않음.

[원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/onRouteRegister.md)
:::

- 설명: 이 메서드는 애드온 개발자를 위해 특별히 설계되었습니다.
  등록된 모든 경로를 수신하므로, FlowRouter에 커스텀 기능을 추가할 수 있습니다.

  이것은 서버와 클라이언트 모두에서 동일하게 작동합니다.
- 예제:
  ```js
  FlowRouter.onRouteRegister((route) => {
    // 라우트 객체로 무엇이든 할 수 있음
    console.log(route)
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    withReplaceState( callback: (route: object) => void ): void;
  }
  ```