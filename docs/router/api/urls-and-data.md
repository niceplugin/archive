---
title: URLs와 데이터
---

# URLs와 데이터 %{ #urls-and-data }%

## url()

- 설명: 이 앱을 가리키는 절대 URL을 생성합니다.
  `Meteor.absoluteUrl` API와 동일합니다.
- 예제:
  ```js
  FlowRouter.url(path, params, queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    url(path: path,
        params?: Object,
        queryParams?: Object): url
  }
  
  type routeName = string
  type path = string | routeName
  type url = string
  ```

## path()

- 설명: 라우트 경로를 생성합니다.
- 예제:
  ```js
  FlowRouter.path(path, params, queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    path(path: path,
        params?: Object,
        queryParams?: Object): url
  }
  
  type routeName = string
  type path = string | routeName
  type url = string
  ```

## current()

- 설명: 라우터의 현재 상태를 가져옵니다.
  이 API는 반응형이 아니므로,
  경로의 변경 사항을 확인해야 하는 경우,
  `FlowRouter.watchPathChange()`를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.current()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    current(): currentRoute;
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

## getRouteName()

- 설명: 경로명을 가져오는데 사용하며, 반응성 입니다.
- 예제:
  ```js
  FlowRouter.getRouteName()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getRouteName(): string;
  }
  ```