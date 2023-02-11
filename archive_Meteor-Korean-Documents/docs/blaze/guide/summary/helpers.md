---
title: 헬퍼 사용하기
---

# 헬퍼 %{ #helpers }%

우리는 어떤 데이터 값의 변경사항을 감시하고,
변경된 값이 자동으로 웹 페이지에 업데이트 되기를 바랍니다.
그러한 코드를 작성하는 것은 매우 번거로운 일이기 때문에,
우리대신 앞으로 비서가 그 일을 할 것입니다.

템플릿마다 하나의 비서 그룹이 존재하며,
여기에는 수많은 비서들을 등록할 수 있고,
비서들은 매우 많은 것들을 관리합니다.

이 비서를 Blaze에서는 헬퍼(helper)라고 부릅니다.

## 선행 조건 %{ #precondition }%

Meteor는 불러온 템플릿을 가지고 있다가 웹 페이지에 보여줘야 할 때,
템플릿에서는 특별한 이벤트를 불러올 수 있습니다.

우리는 템플릿이 웹 페이지에 보여지기 위해 DOM에 생성되었을 때,
실행되는 `onCreated`라는 이벤트를 사용할 것입니다.

우선 `counter.html`라는 새로운 HTML 템플릿과 `counter.js` 파일을 만들어 봅시다:
```html
<template name="counter">
  <hr>
  <button>버튼</button>
  <p>남성 홍길동씨는 버튼을 999번 클릭하였습니다.</p>
</template>
```
```js
import { Template } from 'meteor/templating'
// 주석 1
import './counter.html'

// counter 템플릿이 DOM에 생성되었을 때, 콜백 함수가 실행됩니다.
Template.counter.onCreated(function() {
  // 주석 2
})

// 주석 3

// 주석 5
```

이제 `main.js`에서 카운터 JS를 불러오고:
```js
// 위에 두 코드는 유지하세요.
import './counter.js'
```

`main.html`의 `<!-- 주석 2 -->`를 아래와 같이 변경합니다:
```html
  {{> counter }}
  {{> counter }}
```

이제 브라우저에 새로운 템플릿이 보여야 합니다.
물론 아직 아무 작동도 하지는 않습니다.

## 반응형 변수 만들기 %{ #create-reactive-variables }%

헬퍼는 `var` 또는 `let`으로 선언한 변수가 바뀌는 것을 알아차리지 못합니다.

Meteor에서는 이러한 헬퍼를 위해 특별히 `ReactiveVar` 라는 것을 만들었습니다.
이것을 사용하기 위해 `counter.js` 파일의 `// 주석 1`을 다음과 같은 코드로 변경합니다:

```js
import { ReactiveVar } from 'meteor/reactive-var'
```

이제 `onCreated` 콜백 함수 내부에서 헬퍼가 인지할 수 있는 반응형 변수를 생성해봅시다.
`counter.js` 파일의 `// 주석 2`를 다음과 같은 코드로 변경합니다:

```js
  this.counted = new ReactiveVar(0)
```

:::info
보통 Meteor 프로젝트에는 기본적으로 `ReactiveVar`가 설치되어 있지만,
수동으로 설치가 필요할 경우 아래와 같이 설치합니다:
```shell
meteor add reactive-var
```
:::

우리는 이제 숫자 `0` 값을 가지고 있는 `counted`라는 새로운 반응형 변수를 만들었습니다.

여기서 `this`는 새로 생성된 템플릿의 인스턴스입니다.
인스턴스는 새로 생성된 템플릿만의 공간이라고 생각할 수 있습니다.

`this`가 반드시 인스턴스를 가리켜야하므로,
`onCreated`의 콜백 함수는 화살표 함수를 사용해서는 안되는 것입니다.

이제 헬퍼가 `counted` 반응형 변수를 사용할 수 있게 설정해 봅시다.

## 헬퍼 사용하기 %{ #use-helper }%

템플릿의 `onCreated`를 사용하기 위해 코드를 작성한 것처럼,
`helpers`라는 코드도 작성합니다.
`counter.js`에서 `// 주석 3`을 다음과 같은 코드로 변경합니다:
```js
Template.counter.helpers({
  // 주석 4
})
```

잘 살펴보면 `helpers`는 하나의 빈 객체를 인자로 받았습니다.
이 객체는 템플릿 범위 내에서 사용할 수많은 헬퍼를 등록 및 관리할 수 있는 그룹입니다.

우선 `this.counted` 반응형 변수를 핼퍼로 등록해 봅시다.
`counter.js`에서 `// 주석 4`를 다음과 같은 코드로 변경합니다:
```js
  countedNumber() {
    // 이곳에서는 this로 이 템플릿의 인스턴스를 가져올 수 없습니다.
    // 대신 counter 핼퍼 내부에서 Template.instance()를 호출하면,
    // 이 템플릿의 인스턴스를 반환합니다.
    return Template.instance().counted.get()
  }
```

우리는 이제 `countedNumber`라는 헬퍼를 등록했습니다. 야호!
:::info
`counted` 반응형 변수는 일반 변수와 달라서,
그 값을 세팅할 때에는 `.set( value )`를
그 값을 조회할 때에는 `.get()`을 사용해야 합니다.
:::

이제 헬퍼를 사용할 때입니다.
`counter.html` 템플릿의 `<p> ... </p>` 라인을 다음과 같이 변경해 봅시다:
```html
<p>남성 홍길동씨는 버튼을 {{ countedNumber }}번 클릭하였습니다.</p>
```

"999"라는 숫자가 "0"으로 바뀌었다면 성공입니다!

> 우리는 이번 섹션에서 다음과 같은 것을 배웠습니다:
> 1. 반응형 변수란 무엇인가
> 2. 반응형 변수는 어떻게 조작하는가
> 3. 헬퍼란 무엇인가
> 4. 헬퍼는 어떻게 등록하는가
> 5. 헬퍼는 템플릿에 어떻게 사용하는가
> 6. 템플릿의 인스턴스란 무엇인가

하지만 여전히 버튼을 눌러도 숫자는 변하지 않습니다.
다음 섹션에서는 이벤트를 등록하는 방법을 알아보고,
숫자가 변경되도록 만들어 봅시다.



















