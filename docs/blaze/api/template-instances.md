---
title: 인스턴스
---

# 인스턴스 %{ #template-instances }%

아래에서 언급되는 `TemplateInstance`는 `onCreated`, `onRendered`, `onDestroyed`
또는 이벤트나 헬퍼에서 실행한 `Template.instance()`에서 반환된 템플릿 인스턴스를 가리킵니다.

주의할 것은 `onCreated`, `onDestroyed`에서 참조하는 인스턴스에는 DOM이 존재하지 않기 때문에,
아래 메서드들을 정상적으로 사용할 수 없다는 것입니다.

## findAll()

- 설명: 이 템플릿 인스턴스에서 [셀렉터](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)와 일치하는 모든 엘리먼트를 찾아 배열로 반환합니다.

- 예제:
  ```js
  TemplateInstance.findAll('.btn')
  ```

## $()

- 설명: 이 템플릿 인스턴스에서 셀렉터와 일치하는 모든 엘리먼트를 찾아 jQuery 객체로 반환합니다.

  이 템플릿과 그 하위 템플릿 내에서만 검색이 이루어 집니다.

- 예제:
  ```js
  TemplateInstance.$('.btn')
  ```

## find()

- 설명: 이 템플릿 인스턴스에서 셀렉터와 일치하는 하나의(첫 번째) 엘리먼트를 찾아 반환하거나,
  없는 경우 `null`을 반환합니다..

  이 템플릿과 그 하위 템플릿 내에서만 검색이 이루어 집니다.

- 예제:
  ```js
  TemplateInstance.find('.btn')
  ```

## firstNode() & lastNode()

- 설명: 이 템플릿 인스턴스에서 최상위(root) 첫 번째 또는 마지막 DOM 노드를 반환합니다.

  `firstNode`와 `lastNode`는 DOM에 렌더링 된 템플릿의 범위를 나타냅니다.
  두 노드는 동일한 부모 노드를 가리키는 형제 노드이거나, 단일 노드일 수 있습니다.

- 예제:
  ```js
  TemplateInstance.firstNode()
  TemplateInstance.lastNode()
  ```

## data()

- 설명: 이 템플릿 인스턴스에서 호출한 시점에서의 데이터 컨텍스트 입니다.

  이 속성은 템플릿 수준에서의 데이터 컨텍스트에 대한 액세스를 제공합니다.
  템플릿이 다시 렌더링될 때마다 업데이트되며, 읽기 전용으로 반응형이 아닙니다.

- 예제:
  ```js
  TemplateInstance.data()
  ```

## autorun()

- 설명: `Tracker.autorun`의 템플릿 버전입니다.

  `onCreated` 또는 `onRendered` 콜백에서 `this.autorun`을 사용하여,
  DOM 또는 템플릿 인스턴스를 반응적으로 업데이트할 수 있습니다.
  이 콜백 내에서 `Template.currentData()`를 사용하여 템플릿 인스턴스의 반응형 데이터 컨텍스트에 접근할 수 있습니다.
  템플릿이 파괴(destroyed)되면 이 콜백은 자동으로 중지됩니다.

  `template.view.autorun`와 동일합니다.

- 예제:
  ```js
  TemplateInstance.autorun(function() {
    // 반응형 데이터가 변경될 때마다 실행할 로직이 해당 반응형 데이터와 함께 여기에 있는 경우,
    // 반응형 데이터가 변경될 때마다 이 콜백이 실행될 것입니다.
  })
  ```

## subscribe()

- 설명: `Meteor.subscribe`의 템플릿 버전입니다.

  `onCreated` 콜백에서 `this.subscribe`을 사용하여,
  템플릿에 의존하는 데이터를 구독할 수 있습니다.

  `this.subscribe`로 호출된 모든 구독이 준비되면,
  `true`를 반환하는 함수 `Template.instance().subscriptionsReady()`가 있습니다.

  템플릿의 HTML 내에서 빌트인 헬퍼 `Template.subscriptionsReady`를 사용할 수 있습니다.
  이것은 템플릿이 구독 데이터에 의존할 때 템플릿에 로딩을 표시하기 쉽게 합니다.

- 기본 예제:
  ```js
  Template.__templateName__.onCreated(function () {
    // onCreated 콜백 내에서 this.subscribe를 사용하십시오.
    this.subscribe("notifications");
  });
  ```
  
  ```html
  <template name="__templateName__">
    {{#if Template.subscriptionsReady}}
      {{! 모든 데이터가 준비되면 표시됩니다 }}
      {{#each notifications}}
        {{> notification}}
      {{/each}}
    {{else}}
      Loading...
    {{/if}}
  </template>
  ```

- 구독이 데이터 컨텍스트에 따라 달라지는 예제:

  ```js
  Template.__templateName__.onCreated(function () {
    // 반응형 데이터 컨텍스트를 사용하여 구독을 하는 방법
    this.autorun(() => {
      var dataContext = Template.currentData();
      this.subscribe("comments", dataContext.postId);
    });
  });
  ```
  
  ```html
  <template name="__parentName__">
    {{#with post}}
      {{> comments postId=_id}}
    {{/with}}
  </template>
  ```

- 타입:
  ```ts
  interface TemplateInstance {
    subscribe(
      subscribeName: string,
      parameter?: Object,
      option?: onReady | Options
    ):void;
  }
  
  type onReady = () => {}
  type Options = {
      onReady: onReady,
      onStop: (error?) => {}
  }
  ```

## subscriptionsReady()

- 설명: `TemplateInstance.subscribe`의 준비 상태를 불린 값으로 리턴합니다.

- 예제:
  ```js
  Template.__templateName__.onRendered(function() {
    console.log( this.subscriptionsReady() )
  })
  ```

## view()

- 설명: 이 템플릿을 생성하는 [View](https://www.blazejs.org/api/blaze.html#Blaze-View) 객체입니다.
