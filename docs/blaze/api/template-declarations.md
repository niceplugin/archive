---
title: 선언
---

# 선언 %{ #template-declarations }%

## events()

- 설명: 이 템플릿에 대한 이벤트 헨들러를 등록합니다.

  핸들러 함수는 이벤트에 대한 정보를 가진 객체 `event`와 핸들러가 정의된 템플릿의 `instance` 두 개의 인자를 수신한다.
  핸들러는 또한 이벤트를 처리하는 현재 엘리먼트의 컨텍스트에 따라 `this`에서 일부 추가 컨텍스트 데이터를 수신합니다.
  템플릿에서 엘리먼트의 컨텍스트는 해당 엘리먼트가 발생하는 데이터 컨텍스트이며,
  이는 `#with` 및 `#each`와 같은 블록 헬퍼에 의해 결정됩니다.

- 예제:
  ```js
  Template.__templateName__.events({
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

## helpers()

- 설명: 이 템플릿에서 사용할 수 있는 헬퍼를 정의합니다.
  헬퍼는 인자를 받을 수 있습니다.

  헬퍼는 내부적으로 `Tracker.autorun`을 실행하므로,
  반응형 정보가 변경되면 다시 실행됩니다.

- 예제:
  ```js
  Template.__templateName__.helper({
    myHelperName(arguments) {
      console.log(arguments)
      return 123
    }
  })
  ```

## onCreated()

- 설명: 이 템플릿 인스턴스를 생성한 후 실행할 콜백 함수를 등록합니다.

  생성된 템플릿 인스턴스 내에서 단 한번만 실행됩니다.
  콜백 내에서 `this`는 이 템플릿의 인스턴스 객체입니다.
  이 객체에 설정한 속성은 `onRendered` 및 `onDestroyed` 메서드에서 호출되는 콜백과 이벤트 핸들러에서 조회할 수 있습니다.

  ```js
  Template.__templateName__.onCreated(function() {
    console.log(this)
  })
  ```

## onRendered()

- 설명: 이 템플릿을 DOM에 삽입한 후 실행할 콜백 함수를 등록합니다.

  이 템플릿 인스턴스 내에서 단 한번만 실행됩니다.

  템플릿이 렌더링 되었으므로, DOM 노드를 검색할 수 있습니다.
  따라서 렌더링 후 DOM 초기 조작 로직을 작성하기 좋은 위치입니다.

  인스턴스를 초기화 하려면 `onCreated` 내 콜백에서 에서 해야 하며,
  정리하려면 `onDestroyed` 내 콜백에서 해야 합니다.

  ```js
  Template.__templateName__.onRendered(function() {
    console.log(this)
  })
  ```

## onDestroyed()

- 설명: 이 템플릿이 DOM에서 제거된 후 실행할 콜백 함수를 등록합니다.

  이 템플릿 인스턴스 내에서 단 한번만 실행됩니다.

  여기에 등록하는 콜백은 이 템플릿 외부와 연계된 어떠한 것을 정리하거나 실행취소하기 좋은 위치입니다.

  ```js
  Template.__templateName__.onDestroyed(function() {
    console.log(this)
  })
  ```
