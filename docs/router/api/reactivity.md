---
title: 반응형
---

# 반응형 %{ #reactivity }%

## watchPathChange()

- 설명: 라우터의 변경 사항을 반응적으로 관찰합니다.
  단순히 `params` 또는 `query`를 가져와야 하는 경우,
  `FlowRouter.current()`를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.watchPathChange()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    watchPathChange(): currentRoute;
  }
  
  type currentRoute = {
    path: string,
    params: Object,
    queryParams: Object,
    route: {
      pathDef: string,
      name: string
    }
  }
  ```

## withReplaceState()

- 설명: 일반적으로 `FlowRouter.go` 또는 `FlowRouter.setParams()`와 같이 경로를 변경하는 모든 API는
  변경된 URL 항목을 브라우저 히스토리에 추가합니다.

  그러면 사용자는 브라우저의 뒤로가기 버튼을 누를 수 있습니다.
  사용자가 뒤로 버튼을 클릭하면 앱의 이전 페이지를 볼 수 있기 때문에 이는 정상적인 동작입니다.

  그러나 서비스를 제공하는 입장에서 때때로 이러한 작동을 원치 않을 수 있습니다.
  브라우저 히스토리에 항목이 남지 않게 하려면 아래 예제와 같이 이 메서드를 활용해야 합니다.
- 예제:
  ```js
  FlowRouter.withReplaceState(() => {
    FlowRouter.setParams({ id: '123' })
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    withReplaceState( callback: Function ): void;
  }
  ```