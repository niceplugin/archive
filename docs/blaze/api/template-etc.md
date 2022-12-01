---
title: 기타
---

# 기타 %{ #template-etc }%

## Template.subscriptionsReady

- 용도: 헬퍼

- 설명: 이것은 `Template.instance().subscripe()`이 준비 되었는지 여부를 반환합니다.

- 예제:
  ```html
  <template name="__template_name__">
    {{#if Template.subscriptionsReady }}
      <p>구독이 준비됨</p>
    {{else}}
      <p>로딩중</p>
    {{/if}}
  </template>
  ```

## Template.dynamic

- 용도: 스페이스바 문법

- 설명: 전달받은 템플릿 이름에 따라 동적으로 템플릿을 렌더링 합니다.

- 인수:
  - template: 전달할 템플릿 이름
  - data: 선택사항이며, 템플릿에 포함할 데이터 컨텍스트입니다.

- 예제:
  ```html
  {{> Template.dynamic template=templateName [data=myData] }}
  ```


















