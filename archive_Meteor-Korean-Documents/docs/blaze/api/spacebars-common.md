---
title: Spacebars
---

# Spacebars %{ #spacebars-common }%

스페이스바는 [핸들바](https://handlebarsjs.com/)에서 영감을 받은 Meteor 언어입니다.
핸들바의 사상과 문법을 일부 공유하지만,
컴파일 시 반응형 Meteor 템플릿을 생성하도록 수정되었습니다.

## `{​{ }}` 이중 중괄호 테그 %{ #double-braces-tag }%

- 설명: 기본적으로 이중 중괄호 태그 내부의 값은 문자열로 평가됩니다.
  `null`. `undefined` 또는 `false` 일 경우, 아무것도 표기되지 않습니다.

  헬퍼에서 반환되는 값은 순수 문자열 입니다(11`&lt;`가 아닌, `<`).
  이중 중괄호 태그 내에서는 HTML 태그가 들어가 SafeString하므로 안전합니다.

- 속성 값으로서의 사용 예제:<br>
  HTML 속성 값의 일부 또는 전부일 수 있습니다.
  ```html
  <input type="checkbox" class="checky {{moreClasses}}" checked={{isChecked}}>
  ```

- 동적 속성으로 사용 예제:
  ```html
  <div {{attrs}}>...</div>
  <input type=checkbox {{isChecked}}>
  ```

  테그 속성 값은 객체여야 합니다.
  어떻게 변환 되는지는 아래 표를 참고하십시오:

  |              헬퍼 반환 값               |        HTML 변환 값        |
  |:-----------------------:|:-----------------------:|
  |        `""`, `null` 또는 `{}`        |           없음            |
  |   `checked` 또는 `{ checked: "" }`   |        `checked`        |
  |  `{checked: "", 'class': "foo"}`   |  `checked class="foo"`  |
  | `{checked: false, 'class': "foo"}` |      `class="foo"`      |
  |       `"checked class=foo"`        | 애러: 문자열은 속성명이 될 수 없습니다. |


  여러 동적 속성 태그를 다른 속성과 결합할 수 있습니다.
  
  ```html
  <div id=foo class={{myClass}} {{attrs1}} {{attrs2}}>...</div>
  ```
  
  동적 속성 태그의 속성은 일반 속성 뒤에 왼쪽에서 오른쪽으로 결합되며,
  이후 속성 값은 이전 속성 값을 덮어씁니다.<br>
  동일한 속성에 대한 여러 값은 어떤 방식으로도 병합되지 않으므로,
  `attrs1`이 `class` 속성에 대한 값을 지정하면,
  `{myClass}}`을 덮어씁니다.
  항상 스페이스바는 `myClass`, `attrs1` 또는 `attrs2` 중 하나라도 반응적으로 변경될 경우,
  요소의 속성을 재계산합니다.

## `{​{​{ }}}` 삼중 중괄호 태그 %{ #triple-braced-tags }%

- 설명: 삼중 중괄호 태그는 원시 HTML을 템플릿에 삽입하는데 사용됩니다.

  삽입된 HTML은 균형 잡힌(유효한) HTML 태그로 구성되어야 합니다.
  예를 들어, `</div><div>`를 삽입하여, 기존 `div`를 닫고 새 `div`를 열 수 없습니다.

  이 템플릿 태그는 속성이나 HTML 시작 태그에 사용할 수 없습니다.

- 예제:
  ```html
  <div class="snippet">
    {{{snippetBody}}}
  </div>
  ```

## `{​{> }}` 템플릿 포함 태그 %{ #inclusion-tags }%

- 설명: 태그를 사용한 현재 위치에 지정한 템플릿을 삽입하여 인스턴스화 합니다.
  파라미터를 전달할 수 있습니다.

  단순히 템플릿 이름을 전달하는 대신,
  템플릿 객체 또는 템플릿 객체를 반화하는 함수를 전달할 수도 있습니다.

  템플릿 반환 함수에 파라미터를 전달할 경우,
  인자는 데이터 컨텍스트가 되지 않고,
  함수의 파라미터로 전달됩니다.

- 예제:
  ```html
  {{> templateName }}
  {{> templateName dataObject }}
  ```










