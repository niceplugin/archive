---
title: 공용
---

# 공용 %{ #template-common }%

## registerHelper()

모든 템플릿에서 접근할 수 있는 전역 헬퍼를 정의합니다.

- 예제:
  ```js
  Template.registerHelper('myHelperName', function() { /* ... */ })
  ```

- 타입:
  ```ts
  interface Template {
    registerHelper(
      globalHelperName: string,
      helperFunction: Function
    )
  }
  ```

## instance()

현재 템플릿 헬퍼, 이벤트 헨들러, 콜백 또는 `autorun`의 템플릿 인스턴스 입니다.
없을 경우 `null`을 반환합니다.

- 예제:
  ```js
  Template.__templateName__.helper({
    myHelperName(arguments) {
      console.log(Template.instance())
      return 123
    }
  })
  ```

## currentData()

- 설명: `onCreated`, `onRendered` 또는 `onDestroyed` 콜백 내에서 템플릿의 데이터 컨텍스트를 반환합니다.
  이벤트 핸들러 내에서 이 이벤트 핸들러가 정의된 템플릿의 데이터 컨텍스트를 반환합니다.
  헬퍼 내에서 헬퍼가 사용된 DOM 노드의 데이터 컨텍스트를 반환합니다.

  결과에 반응적 종속성을 설정합니다.

## parentData()

- 설명: 현재 데이터 컨텍스트를 포함하는 상위 데이터 컨텍스트에 액세스합니다.

- 타입:
  ```ts
  interface Template {
    parentData(numLevels: numLevels): DataContext
  }
  type numLevels = number // 현재 데이터 컨텍스트로부터 접근할 곳까지의 깊이입니다. 기본값은 1입니다.
  ```

## body

- 설명: `<body>` 태그를 나타내는 템플릿 객체입니다.

- 타입:
  ```js
  Template.__templateName__.events({
    'click button'() {
      console.log(Template.body)
    },
  })
  ```
