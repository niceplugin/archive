---
title: 스페이스바 템플릿 사용하기
---

:::warning
Blaze를 접하기 전, 최소한의 HTML, JS 지식을 보유하고 있어야 합니다.

이 튜토리얼은 Blaze를 처음 접하는 분들에게 대략적인 맥락을 알리기 위한 것입니다.

따라서 Meteor 앱 제작, HTML, JS 작성에 권장되는 보편적인 스타일 가이드라인에 위배될 수 있습니다.
:::

# 스페이스바 템플릿 %{ #spacebars-templates }%

스페이스바 템플릿은 HTML에 '콧수염(mustache)'이라는 별칭의 `{​{ }}` 문법을 사용합니다.

콧수염은 반응적으로 변화하는 데이터 컨텍스트를 동적으로 렌더링하는 컨트롤러 역할을 합니다.

이게 전부 입니다! 그러니 가벼운 마음으로 가이드를 읽어 봅시다.

## 선행 조건 %{ #precondition }%

원활한 가이드 진행을 위해서 독자는 간단하게 가이드 환경과 동일하게 세팅해 봅시다.
원하는 디렉토리에 다음과 같이 프로젝트를 생성합니다.

```shell
meteor create --blaze myapp
```

`myapp` 디렉토리가 생겼을 것입니다.
이것은 Meteor 프로젝트의 루트(root) 디렉토리입니다.

:::tip
이 가이드에서 가리키거나 생성해야 하는 파일은 모두 루트 디렉토리 내의 `/client` 디렉토리에서 이루어집니다.
:::

우선 `main.html`의 모든 코드를 지우고, 아래와 같이 말끔하게 바꿔봅시다:
```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meteor with Blaze</title>
</head>

<body>
<div id="app">
  <!-- 주석 1 -->
  <!-- 주석 2 -->
  <!-- 주석 3 -->
  <!-- 주석 4 -->
  <!-- 주석 5 -->
</div>
</body>
```

`main.js`의 모든 코드를 지우고, 아래와 같이 바꿉니다:
```js
import './main.html'
```

`main.css`는 신경쓰지 맙시다.
이제 아래와 같이 명령줄로 Meteor를 실행해봅시다:
```shell
meteor run
```
애러없이 정상적으로 Meteor가 실행되었다면 `http://localhost:3000/` 로 접속해 봅시다.
`main.js`는 `main.html`을 불러와서 웹 브라우저에 보여줄 것입니다.
물론 우리는 아직 아무것도 만들지 않았기 때문에 하얀 빈 페이지만 노출될 것입니다.

## 템플릿 만들기 %{ #create-template }%

이제 본격적으로 템플릿을 만들어 봅시다. 아래와 같이 `helloWorld.html`과 `helloWorld.js` 파일을 생성합니다:
```html
<template name="helloWorld">
  <p>Hello world! 그리고 반갑다 Blaze!</p>
</template>
```
```js
import './helloWorld.html'
```

`<template/>` 태그에서 `name` 속성은 템플릿의 이름을 정의하기 때문에 매우 중요합니다.
우리는 지금 "helloWorld"라는 이름으로 템플릿을 만들었습니다.

하지만 여전히 웹브라우저에는 아무런 변화가 없습니다.
만든 템플릿을 화면에 불러오지 않았기 때문입니다.

`main.js`의 두 번째 줄에 `helloWorld.js`를 불러오는 코드를 작성해 봅시다:
```js
import './helloWorld.js'
```

`helloWorld.js`는 `helloWorld.html` 템플릿 파일을 불러옵니다.
그리고 `main.js`는 `helloWorld.js`를 불러옵니다.

`main.js`는 웹에서 무엇인가를 하기 위해 가장 마지막에 실행되는 파일입니다.
따라서 Meteor는 "helloWorld" 템플릿을 불러와서 어딘가에 가지고 있습니다.

`main.html`에서 `<!-- 주석 1 -->` 주석 코드를 다음과 같이 바꿔봅시다:
```html
  {{> helloWorld }}
  {{> helloWorld }}
```
브라우저 화면에 "helloWorld" 템플릿이 2번 출력됬습니다. 와~우!

> 우리는 이번 섹션에서 다음과 같은 것을 배웠습니다:
> 1. 템플릿이란 무엇인가
> 2. 템플릿 작성법
> 3. 템플릿 불러오기
> 4. 템플릿 적용하기
> 5. 템플릿 재사용하기

이제 `main.html`에서 `{​{> helloWorld }}` 코드는 한 줄만 남기고 다음 섹션으로 넘어갑시다.
