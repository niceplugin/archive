# BlazeLayout (kadira:blaze-layout) [![Build Status](https://travis-ci.org/kadirahq/blaze-layout.svg?branch=master)](https://travis-ci.org/kadirahq/blaze-layout)

> 이 프로젝트는 **meteorhacks:flow-layout**으로 알려져 있습니다.
FlowLayout과 동일하지만 이름이 다릅니다. (개명됨)

### Meteor를 위한 Blaze 레이아웃 메니저

Blaze 용으로 설계된 레이아웃 메니저 입니다.
이것은 FlowRouter와 함께 사용하기 위해 만들어 졌지만, FlowRouter 없이 단독으로 사용가능합니다.
이것은 매우 간단한 레이아웃 메니저 입니다.
이것은 다음과 같은 일으 합니다:

* UI에 레이아웃 템플릿을 렌더링 할 수 있습니다.
* 레이아웃에 데이터를 전달할 수 있습니다.
* 레이아웃에서 필요한 부분만 다시 렌더링 할 수 있습니다.
* 여러 레이아웃을 한 번에 사용할 수 있습니다.

## 사용법

우선 아래와 같이 BlazeLayout을 성치합니다:

~~~
meteor add kadira:blaze-layout
~~~

그리고 나서 아래와 같이 몇 개의 템플릿을 만듭니다.

~~~html
<template name="layout1">
  {{> Template.dynamic template=top}}
  {{> Template.dynamic template=main}}
</template>

<template name="header">
  <h1>이부분은 해더 템플릿입니다.</h1>
</template>

<template name="postList">
  <h2>여기는 포스트 리스트가 출력될 템플릿입니다.</h2>
</template>

<template name="singlePost">
  <h2>이곳은 포스트 하나만 출력될 템플릿입니다.</h2>
</template>
~~~

이제 당신은 아래와 같이 레이아웃을 렌더링 할 수 있습니다:

~~~js
BlazeLayout.render('layout1', { top: "header", main: "postList" });
~~~

그러면 아래와 같은 결과물을 얻게 됩니다:

~~~html
  <h1>이부분은 해더 템플릿입니다.</h1>
  <h2>여기는 포스트 리스트가 출력될 템플릿입니다.</h2>
~~~

아래와 같이 다시 레이아웃을 렌더링 할 수 있습니다.

~~~js
BlazeLayout.render('layout1', { top: "header", main: "singlePost" });
~~~

`main` 부분만 변경되었기 때문에 `top` 부분은 다시 렌더링 되지 않습니다.
HTML 결과물은 다음과 같습니다:

~~~html
  <h1>이부분은 해더 템플릿입니다.</h1>
  <h2>이곳은 포스트 하나만 출력될 템플릿입니다.</h2>
~~~

### 여러개의 템플릿 렌더링

마찬가지로 여러개의 템플릿을 만들고 서로를 전환할 수 있습니다.
하지만 레이아웃을 변경하면 UI 전체가 다시 렌더링 됩니다.

그러므로 가능하면 한번에 최소한의 레이아웃만 사용하는게 좋습니다.

### 다른 Root Node 설정

기본적으로 BlaazeLayout은 `id="__blaze-root"`를 가진 DOM 엘리먼트 내에서 렌더링 합니다.
경우에 따라서 이것을 변경하거나 `<body>` 내에서 바로 렌더링 할 필요가 있을 수 있습니다.

아래는 이러한 경우 루트노드를 설정하는 방법입니다:

~~~js
// 이 코드를 당신의 클라이언트 측 JS 파일 중 하나에 최상단에 표기합니다.
BlazeLayout.setRoot('body');
~~~

메서드 인자로는 CSS 셀렉터, DOM Node, jQuery 객체를 사용할 수 있습니다.