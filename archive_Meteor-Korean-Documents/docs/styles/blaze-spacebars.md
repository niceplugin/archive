---
title: Blaze와 Spacebars
---

# Blaze & Spacebars %{ #blaze-spacebars }%

## Blaze 파일 구조 %{ #blaze-file-structure }%

`hello` 템플릿을 만든다고 가정하면 다음과 같은 구조가 나와야 한다.
```js
// hello
//  - hello.html
//  - index.js
//  - helloEvents.js
//  - helloHelpers.js
//  - helloOnRendered.js
//  - helloOnCreated.js
//  - helloOnDestroyed.js
```
각각의 파일은 다음과 같습니다.
```html
<template name="hello">
  {{!-- 템플릿 내용 --}}
</template>
```
```js
// index.js

// 사용하지 않는 스크립트 파일은 주석처리하여
// 약간의 트리쉐이킹 효과를 얻을 수 있다.
import 'hello.html'
import 'helloEvents.js'
import 'helloHelpers.js'
import 'helloOnCreated.js'
import 'helloOnRendered.js'
import 'helloOnDestroyed.js'
```
```js
// helloEvents.js
import { Template } from 'meteor/templating'

Template.hello.events({
})
```
<div style="text-align: center">- 중략 -</div>

```js
// helloOnDestroyed.js
import { Template } from 'meteor/templating'

Template.hello.onDestroyed({
})
```
각각의 파일로 나뉜 이유는 용도별 구분을 명확히 하기 위해서이고,
폴더내에 넣은 이유는 하나의 템플릿에 나오는 많은 파일을 그룹화 하고,
`import '/...path.../hello'`와 같이 호출하기 위함이다.

## 콧수염 간격 %{ #mustache-gap }%

콧수염 문법이라 불리는 `{​{ }}` 블럭은 시작과 끝에 1 스페이스 간격을 가지도록 한다.
`>`, `!` 접두어가 있는 경우, 이후에 1 스페이스 간격을 둔다.

단, `!--`, `#`, `/` 와 같이 특수한 접두어가 뒤에는 스페이스 간격을 붙이지 않으며,
닫는 블럭문의 경우 끝나는 콧수염에 스페이스 간격을 두지 않는다.

이러한 이유는 가독성을 위함이다.

```html
<!-- ❌ 비추 -->
<p>{{text}}</p>
<div>{{>myTemplate}}</div>
{{#if some}}
  <p>{{text2}}</p>
{{/if }}
```
```html
<!-- ✅ 추천 -->
<p>{{ text }}</p>
<div>{{> myTemplate }}</div>
{{#if some }}
  <p>{{ text2 }}</p>
{{/if}}
```

## 반복문 %{ #each }%

반복문은 반드시 프로퍼티를 표기하여 블럭 내부에서 명확한 참조를 할 수 있도록 한다.

```html
<!-- ❌ 비추 -->
<ul>
  {{#each people}}
  <li>{{name}}</li>
  {{/each}}
</ul>
```
```html
<!-- ✅ 추천 -->
<ul>
  {{#each person in people}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```

## 들여쓰기 %{ #general-formatting }%

범위를 가지는 블럭은 부모 엘리먼트로부터 들여쓰기를 한다.
블럭 내부의 엘리먼트도 들여쓰기 합니다.

이것은 블럭문을 HTML 취급하여 가독성을 높이기 위함이다.

```html
<!-- ❌ 비추 -->
<h1>{{ title }}</h1>
{{#each item in list }}
<div class="post">
  <h3>{{ item.title }}</h3>
  <div class="post-content">
  {{ item.content }}
  </div>
</div>
{{/each}}
```
```html
<!-- ✅ 추천 -->
<h1>{{ title }}</h1>
{{#each item in list }}
  <div class="post">
    <h3>{{ item.title }}</h3>
    <div class="post-content">
      {{ item.content }}
    </div>
  </div>
{{/each}}
```

## 주석

Blaze 템플릿을 사용할 때에는 HTML 주석을 사용하지 않는다.
HTML 주석은 렌더링 되지만, Spacebars 주석은 렌더링 되지 않기 때문이다.

```html
<!-- ❌ 비추 -->
<!-- 이것은 렌더링 될 주석입니다. -->
```
```html
<!-- ✅ 추천 -->
{{! 렌더링 되지 않는 한 줄 주석입니다. }}
{{!--
  렌더링 되지 않는 다중 줄이 가능한
  주석입니다.
--}}
```











