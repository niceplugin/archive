---
title: 조작
---

# 조작 %{ #manipulation }%

## getParam()

- 설명: URL에서 파라미터 정보를 가져오는데 사용하는 반응형 함수입니다.
- 예제:
  ```js
  FlowRouter.getParam(paramName)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getParam(paramName: string): string
  }
  ```

## getQueryParam()

- 설명: 쿼리 문자열에서 정보를 가져오는데 사용하는 반응형 함수입니다.
- 예제:
  ```js
  FlowRouter.getQueryParam(queryKey)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getQueryParam(queryKey: string): string
  }
  ```

## setParams()

- 설명: 현재 경로의 파라미터를 새 값으로 변경하고, 새 경로로 다시 라우팅 합니다.
- 예제:
  ```js
  FlowRouter.setParams(params)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    setParams(params: Object): true
  }
  ```

## setQueryParams()

- 설명: 쿼리 문자열을 추가 또는 수정하거나, `null`을 입력하여 삭제할 수 있습니다.
- 예제:
  ```js
  FlowRouter.setQueryParams(queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    setQueryParams(queryParams: queryParams): true
  }
  
  type queryParams = { [key in string]: string | null }
  ```