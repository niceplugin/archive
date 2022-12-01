---
title: 선언문
---

# 선언문 %{ #template-declarations }%

:::info
아래에서 표기하는 `Template$`은 `__myTemplateName__.html`과 같이 이미 템플릿을 선언하여,
`Template.__myTemplateName__`을 의미합니다.
:::

## events()

- 설명: 이 템플릿에 대한 이벤트 헨들러를 등록합니다.

  핸들러 함수는 이벤트에 대한 정보를 가진 객체 `event`와 핸들러가 정의된 템플릿의 `instance` 두 개의 인자를 수신한다.
  핸들러는 또한 이벤트를 처리하는 현재 엘리먼트의 컨텍스트에 따라 `this`에서 일부 추가 컨텍스트 데이터를 수신합니다.
  템플릿에서 엘리먼트의 컨텍스트는 해당 엘리먼트가 발생하는 데이터 컨텍스트이며,
  이는 `#with` 및 `#each`와 같은 블록 헬퍼에 의해 결정됩니다.

- 예제:
  ```js
  Template$.events({
    // 템플릿 내 어떤 엘리먼트든지 클릭 시 실행
    'click'(event, instance) { /* ... */ },
    
    // 'accept' 클래스가 있는 엘리먼트를 클릭 시 실행
    'click .accept'(event, instance) { /* ... */ },
    
    // 'accept' 클래스가 있는 엘리먼트를 클릭하거나 포커스 시 실행
    'click .accept, focus .accept'(event, instance) { /* ... */ },
    'click/focus .accept'(event, instance) { /* ... */ },
    
    // 'accept' 클래스가 있는 엘리먼트를 클릭하거나 포커스 또는 키를 누를 경우 실행
    'click .accept, focus .accept, keypress'(event, instance) { /* ... */ },
    'click/focus .accept, keypress'(event, instance) { /* ... */ }
  })
  ```