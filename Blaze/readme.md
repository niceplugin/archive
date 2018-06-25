# 목차

**개요**
* [개요](#개요)
  * [시작하기](#시작하기)
  * [세부사항](#세부사항)
  * [예제](#예제)
  * [신조](#신조)
  * [페키지](#페키지)
  * [우리의 계획](#우리의-계획)
  
**가이드**
* [소개](#소개)
* [Spacebars templates](#스페이스바-템플릿)
  * [데이터 구조 및 조회](#데이터-구조-및-조회)
  * [헬퍼에 인자 사용하기](#헬퍼에-인자-사용하기)
  * [template 추가하기](#template-추가하기)
  * [헬퍼를 이용한 속성 설정](#헬퍼를-이용한-속성-설정)
  * [html로 렌더링하기](#html로-렌더링하기)
  * [블럭 핼퍼](#블럭-핼퍼)
  * [내장된 블록 핼퍼](#내장된-블록-핼퍼)
  * [block helpers 연결](#block-helpers-연결)
  * [엄격함](#엄격함)
  * [무효화](#무효화)
* [Blaze에서 재사용가능한 컨포넌트](#blaze에서-재사용가능한-컨포넌트)
  * [데이터 구조 유효성검사](#데이터-구조-유효성검사)
  * [템플릿에 데이터 컨텍스트 추가하기](#템플릿에-데이터-컨텍스트-추가하기)
  * [`{{#each .. in}}`추천](#each--in-추천)
  * [헬퍼로 데이터 전달하기](#헬퍼로-데이터-전달하기)
  * [템플릿 인스턴스 사용하기](#템플릿-인스턴스-사용하기)
  * [상태에 따른 reactive dict 사용하기](#상태에-따른-reactive-dict-사용하기)
  * [인스턴스에 함수 추가하기](#인스턴스에-함수-추가하기)
  * [템플릿 인스턴스에 DOM 범위 지정하기](#템플릿-인스턴스에-dom-범위-지정하기)
  * [이벤트 맵에서 `.js-` 셀렉터 사용하기](#이벤트-맵에서-js--셀렉터-사용하기)
  * [템플릿 인자로 HTML 컨텐츠 전달하기](#템플릿-인자로-html-컨텐츠-전달하기)
  * [콜백 전달하기](#콜백-전달하기)
  * [`onRendered()`에서 제3자 라이브러리 사용하기](#onrendered에서-제3자-라이브러리-사용하기)
* [Blaze로 스마트 컴포넌트(구성요소) 작성하기](#blaze로-스마트-컴포넌트구성요소-작성하기)
  * [`onCreated`에서 서브스크립션](#oncreated에서-서브스크립션)
  * [헬퍼에서 추출(Fetch)하기](#헬퍼에서-추출fetch하기)
* [Blaze에서 코드 재사용하기](#blaze에서-코드-재사용하기)
  * [구성](#구성)
  * [라이브러리](#라이브러리)
  * [글로벌 헬퍼](#글로벌-헬퍼)
* [Blaze 이해하기](#blaze-이해하기)
  * [리렌더링(Re-rendering)](#리렌더링re-rendering)
  * [리렌더링 제어하기](#리렌더링-제어하기)
  * [속성 헬퍼](#속성-헬퍼)
  * [탐색 순서](#탐색-순서)
  * [Blaze와 빌드 시스템](#blaze와-빌드-시스템)
  * [뷰(view)란 무엇입니까?](#뷰view란-무엇입니까)
* [라우터](#라우터)
  * [Iron Router](#iron-router)
  * [Flow Router](#flow-router)
  * [Flow Router Extra](#flow-router-extra)

**API**
* [Templates](#templates)
* [Blaze](#blaze)
* [Spacebars](#spacebars)

***

# 개요

Blaze는 반응형 HTML 템플릿으로 UI를 만드는 강력한 라이브러리 입니다.
전통적인 템플릿과 jQuery을 조합하여 사용하는 것과 비교하여, Blaze는 데이터의 변경사항을 감지하고 DOM을 조작할 "업데이트 로직"이 앱 내에 필요없습니다.
대신 [트레커](https://docs.meteor.com/api/tracker.html)의 "반응형"이나 [미니몽고](https://docs.meteor.com/api/collections.html)의 데이터베이스 커서를 이용하여 {{#if}}나 {{#each}}와 같은 익숙한 문법으로 DOM을 조작합니다.

## 시작하기

현재 Blaze는 Meteor 전용 페키지 입니다.
조만간 npm에서 Blaze를 만나볼 수 있으며, 당신의 작업물에 이것을 사용할 수 있습니다.

새로만든 각각의 Meteor 프로젝트에 Blaze가 설치되어 있습니다. (`blaze-html-templates`라는 페키지 명으로 되어 있음)

## 세부사항

원문:

Blaze has two major parts:

* A template compiler that compiles template files into JavaScript code that runs against the Blaze runtime library.
Moreover, Blaze provides a compiler toolchain (think LLVM) that can be used to support arbitrary template syntaxes.
The flagship template syntax is Spacebars, a variant of Handlebars, but a community alternative based on Jade is already in use by many apps.

* A reactive DOM engine that builds and manages the DOM at runtime, invoked via templates or directly from the app, which features reactively updating regions, lists, and attributes; event delegation; and many callbacks and hooks to aid the app developer.

Blaze is sometimes compared to frameworks like React, Angular, Ember, Polymer, Knockout, and others by virtue of its advanced templating system.
What sets Blaze apart is a relentless focus on the developer experience, using templating, transparent reactivity, and interoperability with existing libraries to create a gentle learning curve while enabling you to build world-class apps.

번역:

Blaze에는 두 개의 주요사항이 있습니다:

* Blaze는 이 라이브러리가 실행될 때 템플릿 파일을 자바스크립트 코드로 컴파일 하는 컴파일러 입니다.
또한 Blaze는 임의 템플릿 구문을 사용할 수 있도록 컴파일러 툴체인(LLVM이라고도 함)을 제공합니다.
기본적인 템플릿 구문은 Handlebars에서 파생된 Spacebars라는 구분을 사용하며, 이미 많은 앱들이 Jade를 기반으로 하는 템플릿 대용으로 많이 사용합니다.

* 반응형 DOM 엔진은 템플릿이나 엡에 의해 호출될 때 실행됩니다.
앱 개발자는 수많은 콜백과 후크를 이용하여 특정부분, 리스트, 속성이 대표적인 반응적인 업데이트 할 수 있습니다.

Blaze의 진보된 템플릿 시스템은 때때로 React, Angular, Ember, Polymer, Knockout과 같은 프레임 워크들과 비교됩니다.
Blaze는 템플릿 사용, 직관적인 반응형, 기존 사용중인 라이브러리와의 상호 운용성으로 개발자 경험을 끊임없이 집중하여 글로벌적인 수준의 앱 제작을 할 수 있게 합니다.

## 예제

"Leaderboard"라는 예제에 두개의 스페이스바 템플릿이 있습니다.
이 템플릿은 플레이어와 점수에 대한 리스트를 표시합니다.

```html
<template name="leaderboard">
  <ol class="leaderboard">
    {{#each players}}
      {{> player}}
    {{else}}
      {{> no_players}}
    {{/each}}
  </ol>
</template>

<template name="player">
  <li class="player {{selected}}">
    <span class="name">{{name}}</span>
    <span class="score">{{score}}</span>
  </li>
</template>

<template name="no_players">
  <li class="no-players">
    No players available
  </li>
</template>
```

템플릿 내에 `{{name}}`와 `{{score}}`는 데이터 컨텍스트(현재 플레이어)이며, `players`와 `selected`는 헬퍼 함수입니다.
헬퍼 함수와 이벤트 헨들러는 자바스크립트에서 정의됩니다:

```javascript
Template.leaderboard.helpers({
  players: function () {
    // 미니몽고의 Players라는 컬렉션에 쿼리문을 수행하여 반응적인 결과를 얻습니다.
    return Players.find({}, { sort: { score: -1, name: 1 } });
  }
});

Template.player.events({
  'click': function () {
    // 플레이어를 선택하여 클릭할 경우
    Session.set("selectedPlayer", this._id);
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this._id) ? "selected" : '';
  }
});
```

원문:

No additional UI code is necessary to ensure that the list of players stays up-to-date, or that the "selected" class is added and removed from the LI elements as appropriate when the user clicks on a player.

Thanks to a powerful template language, it doesn't take much ceremony to write a loop, include another template, or bind an attribute (or part of an attribute).
And thanks to Tracker's transparent reactivity, there's no ceremony around depending on reactive data sources like the database or Session; it just happens when you read the value, and when the value changes, the DOM will be updated in a fine-grained way.

번역:

플레이어 목록을 최신 상태로 유지하거나 사용자가 플레이어를 클릭 할 때 적절한 "LI"요소에서 "selected"클래스가 추가되고 제거되도록하기 위해 추가 UI 코드가 필요하지 않습니다.

고맙게도 강력한 템플릿 언어 덕분에 루프를 작성하거나, 다른 템플릿을 포함하거나 속성을 바인딩 하는 등의 구차한 작업이 필요하지 않습니다.
Tracker의 직관적인 반응형 덕분에 데이터베이스나 세션을 반응형으로 만들기위한 추가 작업이 필요없이 단순히 값을 읽어올때 변경된 값이 있으면 알아서 DOM을 업데이트 합니다.


## Principles

### 쉬운 학습

원문:

Many factors go into making Blaze easy to pick up and use, including the other principles below.
In general, we prefer APIs that lead to simple and obvious-looking application code, and we recognize that developers have limited time and energy to learn new and unfamiliar terms and syntaxes.

It may sound obvious to "keep it simple" and prioritize the developer experience when creating a system for reactive HTML, but it's also challenging, and we think it's not done often enough! We use feedback from the Meteor community to ensure that Blaze's features stay simple, understandable, and useful.

번역:

Blaze를 시작하기 위해 많은 개념이나 용어를 알 필요는 없습니다.
웹 개발자로서 우리는 이미 HTML, CSS, JavaScript 기술을 공부하는 학생입니다.
Blaze는 어떤 새로운 서적 없이도 기존의 지식을 적용할 수 있습니다.

일반적으로 우리는 단순명료하게 사용할 수 있는 API를 선호하며, 새로운 익숙하지 않은 용어와 구문을 익히기 위해 시간과 노력을 들이는것이 현실적으로 힘들다는 것을 알고 있습니다.

반응형 HTML 시스템을 만들때 "간단하게"유지할 수 있도록 개발자 경험을 우선적으로 고려하고 있습니다.
우리는 Meteor 커뮤니티의 피드백을 통해 더욱 노력할 것입니다.

### 직관적인 반응형

Blaze는 [Tracker](https://docs.meteor.com/api/tracker.html)라는 라이브러리를 사용하여 템플릿의 헬퍼가 재 계산 할 때 자동적으로 추적합니다.
예를들어 클라이언트 측 데이터베이스에서 헬퍼가 어떠한 값을 읽었다면, 값이 변경될 때 헬퍼는 자동적으로 재계산합니다.

이것이 의미하는 바는, DOM 업데이트를 할 시기를 명시적으로 선언할 필요가 없이 데이터 바인딩만 하면 된다는 것입니다.
반응형이 무엇인지 Tracker가 어떻게 동작하는지 몰라도 됩니다.
결론적으로 다른 접근방식 보다 고민할거리와 타이핑할것이 줄어든다는 것입니다.

### 깔끔한 템플릿

Blaze는 다른 프레임워크를 사용한 개발자도 깨끗하고 읽기 쉽도록 Handlebars 및 Jade와 같은 익숙하고 대중적인 템플릿 구문을 사용합니다.

좋은 템플릿 언어는 "템플릿 지시문"이 HTML로부터 명확하게 구분되어야 하며 HTML의 구조에 따라 제약성을 가져서는 안됩니다.
이러한 조건은 템플릿을 쉽게 익히고, 읽기 쉽고, CSS로 쉽게 스타일링 하고, DOM과 쉽게 연관시킬 수 있게 합니다.

반대로, 일부 최신 프레임 워크에서는 템플릿을 HTML로 다시 작성하거나(Angular, Polymer) JavaScript로만 대체하려고 합니다(React).

이러한 접근방식은 템플릿의 구조나 실제 DOM과 그렇지 않은 요소 또는 둘 다를 모호하게 만듭니다.
또한 템플릿은 일반적으로 최적화된 방법으로 컴파일되어 있으므로 원시템플릿 소스코드를 브라우저에서 분석 할 수 있는지 여부는 중요하지 않습니다.
그러나 템플릿을 읽고, 쓰고, 유지관리하는 개발자 경험은 대단히 중요합니다.

### 플러그인 상호 운용성

웹 개발자는 종종 HTML, JavaScript, CSS로 만든 작은 결과물을 서로 공유하거나 라이브러리, 위젯 또는 jQuery 플러그인으로 게시합니다.
또는 동영상,지도 및 기타 제 3자 콘텐츠를 퍼가려고합니다.

미번역 부분:

Blaze doesn't assume it owns the whole DOM, and it tries to make as few assumptions as possible about the DOM outside of its updates.
It hooks into jQuery's clean-up routines to prevent memory leaks, and it preserves classes, attributes, and styles added to elements by jQuery or any third-party library.

While it's certainly possible for Blaze and jQuery to step on each other's toes if you aren't careful, there are established patterns for keeping the peace, and Blaze developers rightfully expect to be able to use the various widgets and enhancements cooked up by the broader web community in their apps.

### 다른 라이브러리와의 비교

Blaze는 Backbone 또는 다른 라이브러리보다 훨씬 적은 재 렌더링을 수행하며, 한 페이지에서 여러개의 템플릿이 독립적으로 업데이트 될 수 없는 "nested view" 문제로 고심하지 않아도 됩니다.
또한 Blaze는 트래커를 사용하여 다시 렌더링 해야 할 시기를 자동으로 결정합니다.

원문:

Compared to Ember, Blaze offers finer-grained, automatic DOM updates.
Because Blaze uses Tracker's transparent reactivity, you don't have to perform explicit "data-binding" to get data into your template, or declare the data dependencies of each template helper.

번역:

Blaze는 Ember 보다 정교하고 자동적인 DOM 업데이트를 제공합니다.
Blaze는 트레커의 직관적인 반응성을 사용하기 때문에 "데이터 바인딩"을 사용하여 템플릿으로 데이터를 가져오거나 각 템플릿 헬퍼에 종속성을 선언 할 필요가 없습니다.

Blaze는 Angular 및 Polymer 보다 쉽게 학습할 수 있으며 개념이 단순하고 템플릿 문법과 HTML 구분이 깔끔하여 더 좋습니다.
또한 Blaze는 "미래지향적 브라우저"가 아닌 현시점의 브라우저를 대상으로 설계되었습니다.

원문:

Compared to React, Blaze emphasizes HTML templates rather than JavaScript component classes.
Templates are more approachable than JavaScript code and easier to read, write, and style with CSS.
Instead of using Tracker, React relies on a combination of explicit "setState" calls and data-model diffing in order to achieve efficient rendering.

번역:

JavaScript 코드로 구성요소를 짜내는 React와 비교하여 Blaze는 HTML템플릿을 강조합니다.
JavaScript 코드보다 HTML템플릿이 가독성, 수정, CSS수정 등이 더 쉽습니다.
React는 트레커를 사용하지 않으므로 대신 효율적인 렌더링을 구현하기 위해 "setState" 호출 및 다른 데이터 모델 조합에 의존합니다.

## 페키지

* blaze
* blaze-tools
* html-tools
* htmljs
* spacebars
* spacebars-compiler

*****

> 역주: 2017년 5월 이후로 프로젝트 팀이 해체되어 더이상 진행되지 않으므로 아래의 "우리의 계획"섹션은 번역하지 아니함.

## 우리의 계획

### Components (구성요소)

Blaze는 재사용 가능한 UI 컴포넌트를 만들기 위한 더 좋은 패턴을 얻을 것입니다.
템플릿은 이미 재사용 가능한 구성 요소로 제공됩니다.
앞으로의 개선사항은 다음에 중점을 둡니다:

* Argument handling (역주: 매개변수의 값 핸들링)
* Local reactive state (지역적인 반응형 상태)
* "Methods" that are callable from other components and have side effects, versus the current "helpers" which are called from the template language and are "pure"
* Scoping and the lookup chain
* Inheritance and configuration (상속과 구성)

### 양식

원본:

Most applications have a lot of forms, where input fields and other widgets are used to enter data, which must then be validated and turned into database changes.
Server-side frameworks like Rails and Django have well-honed patterns for this, but client-side frameworks are typically more lacking, perhaps because they are more estranged from the database.

Meteor developers have already found ways and built packages to deal with forms and validation, but we think there's a great opportunity to make this part of the core, out-of-the-box Meteor experience.

번역:

대부분의 앱에는 입력 필드 및 기타 위젯을 사용하여 데이터를 입력하는 양식이 많습니다.
그런 다음 유효성을 검사하고 데이터베이스에 있는 정보를 변경합니다.
Rails나 Django와 같은 서버 측 프레임워크는 이를 위해 잘 정돈 된 패턴을 가지고 있지만 클라이언트 측 프레임워크는 일반적으로 데이터베이스와 거리가 멀기때문에 잘 정돈 된 패턴이 부족합니다.

Meteor 개발자는 이미 양식과 유효성 검사를 처리 할 수 있는 방법과 패키지를 찾았지만(?), Meteor의 핵심 부분의 기능을 구현할 수있는 좋은 기회라 생각합니다.

### 모바일과 애니메이션

원문:

Blaze will cater to the needs of the mobile web, including enhanced performance and patterns for touch and other mobile interaction.

We'll also improve the ease with which developers can integrate animated transitions into their apps.

번역:

Blaze는 터치 및 기타 모바일 상호 작용을 위해 향상된 성능 및 패턴을 내포하여 모바일 웹의 요구를 충족시켜줍니다.

또한 개발자가 애니메이션 전환을 앱에서 할 수 있도록 편의성을 향상시킬 것 입니다.

### 템플릿 내에서 JavaScript 표현방법

We plan to support JavaScript expressions in templates.
This will make templates more expressive, and it will further shorten application code by eliminating the need for a certain class of one-line helpers.

The usual argument against allowing JavaScript expressions in a template language is one of "separation of concerns" -- separating business logic from presentation, so that the business logic may be better organized, maintained, and tested independently.
Meanwhile, even "logicless" template languages often include some concessions in the form of microsyntax for filtering, querying, and transforming data before using it.
This special syntax (and its extension mechanisms)
must then be learned.

While keeping business logic out of templates is indeed good policy, there is a large class of "presentation logic" that is not really separable from the concerns of templates and HTML, such as the code to calculate styles and classes to apply to HTML elements or to massage data records into a better form for templating purposes.
In many cases where this code is short, it may be more convenient or more readable to embed the code in the template, and it's certainly better than evolving the template syntax in a direction that diverges from JavaScript.

Because templates are already precompiled to JavaScript code, there is nothing fundamentally difficult or inelegant about allowing a large subset of JavaScript to be used within templates (see e.g.
the project
Ractive.js).

### Other Template Enhancements

Source maps for debugging templates.
Imagine seeing your template code in the browser's debugger! Pretty slick.

True lexical scoping.

Better support for pluggable template syntax (e.g.
Jade-like templates).
There is already a Jade package in use, but we should learn from it and clarify the abstraction boundary that authors of template syntaxes are programming against.

### Pluggable Backends (don't require jQuery)

While Blaze currently requires jQuery, it is architected to run against other "DOM backends" using a common adaptor interface.
You should be able to use Zepto, or some very small shim if browser compatibility is not a big deal for your application for some reason.
At the moment, no such adaptors besides the jQuery one have been written.

The Blaze team experimented with dropping jQuery and talking directly to "modern browsers," but it turns out there is about 5-10K of code at the heart of jQuery that you can't throw out even if you don't care about old browsers or supporting jQuery's app-facing API, which is required just to bring browsers up to the modest expectations of web developers.

### Better Stand-alone Support

Blaze will get better support for using it outside of Meteor, such as regular stand-alone builds.

## 리소스

* [Templates API](../api/templates.html)
* [Blaze API](../api/blaze.html)
* [Spacebars syntax](../api/spacebars.html)

> 역주: 원본 깃허브에서도 이 링크는 모두 끊겨있는 상태이다.

***

# 소개

Meteor의 프론트 엔드 렌더링 시스템 인 Blaze를 사용하여 사용 가능하고 관리 가능한 사용자 인터페이스를 구축하는 방법.

이 가이드를 읽으면 다음을 알 수 있습니다.

1. Spacebars 언어를 사용하여 Blaze 엔진으로 템플릿을 렌더링하는 방법.
2. Blaze에서 재사용 가능한 컴포넌트를 작성하는 모범 사례.
3. Blaze 렌더링 엔진이 내부적으로 작동하는 방식과 이를 사용하는 몇 가지 고급 기술.
4. Blaze 템플릿을 테스트하는 방법.

Blaze는 Meteor에 내장 된 반응형 렌더링 라이브러리입니다.
일반적으로 템플릿은 [Spacebars](#Spacebars-templates)로 작성되며, Meteor의 반응형 시스템인 [Tracker](https://github.com/meteor/meteor/tree/devel/packages/tracker)를 활용하도록 설계된 [Handlebars](http://handlebarsjs.com)의 변형입니다.
이러한 템플릿은 Blaze 라이브러리에서 렌더링되어 JavaScript UI 컴포넌트(구성요소)로 컴파일됩니다.

원문:

Blaze is not required to build applications in Meteor---you can also easily use [React](http://react-in-meteor.readthedocs.org/en/latest/) or [Angular](http://www.angular-meteor.com) to develop your UI. However, this particular article will take you through best practices in building an application in Blaze, which is used as the UI engine in all of the other articles.

번역:

Blaze는 Meteor에서 앱으로 빌드 할 필요가 없으며 [React](http://react-in-meteor.readthedocs.org/en/latest/)나 [Angular](http://www.angular-meteor.com)를 사용하여 UI를 쉽게 개발할 수 있습니다.
그러나 이 섹션에서는 Blaze에서 앱을 빌드하는 모범 사례를 안내합니다.
다른 모든 섹션에서 UI 엔진으로 사용합니다.

# 스페이스바 템플릿

스페이스바는 반응형으로 변하는 데이터 컨텍스트를 렌더링하는 핸들바와 같은 템플릿 언어 입니다.
스페이스바 템플릿은 중괄호로 구분지어놓은 간단한 HTML 테그같아 보입니다: `{{}}`

Todos라는 앱의 `todos_item`이라는 템플릿 예제를 봅시다:

```html
<template name="Todos_item">
  <div class="list-item {{checkedClass todo}} {{editingClass editing}}">
    <label class="checkbox">
      <input type="checkbox" checked={{todo.checked}} name="checked">
      <span class="checkbox-custom"></span>
    </label>

    <input type="text" value="{{todo.text}}" placeholder="Task name">
    <a class="js-delete-item delete-item" href="#">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>
```

이 템플릿은 `todo`라는 키값의 데이터 컨텍스트를 렌더링 할 때 하나의 오브젝트화 하였음을 예상할 수 있습니다.
(어떻게 동작하는지는 [여기](#데이터-구조-유효성검사)를 참조)
우리는 `{{todo.text}}`와 같이 중괄호 테그를 사용하여 `todo`의 속성(properties)에 접근할 수 있습니다.
기본적으로 속성을 문자열로 렌더링 하지만 (`checked={{todo.checked}}`와 같은)일부 속성은 Boolean값으로 해석합니다.

이처럼 문자열은 항상 HTML을 이스케이프 처리하므로 XSS에 대한 안전성 검사를 수행할 필요가 있습니다.

또한 템플릿 헬퍼를 예를들어보면, `{{checkedClass todo}}`는 벌도로 JavaScript 파일에서 헬퍼가 정의한 `checkedClass`를 호출합니다.
`Todos_item`의 구조를 HTML 템플릿과 JavaScript 파일이 같이 정의한다:

```js
Template.Todos_item.helpers({
  checkedClass(todo) {
    return todo.checked && 'checked';
  }
});
```

Blaze 헬퍼에서의 `this`는 현재 헬퍼가 쓰여진 곳의 데이터 컨텍스트(구조) 범위입니다.
이러한 점때문에 `this`를 추적하기 어려울 수 있으므로 필요한 정보는 인수로 전달하는 것이 좋습니다.

단순 사용과는 별개로 중괄호 태그는 템플릿의 흐름을 제어할 수 있습니다.
`Lists_show` 템플릿에서 `todos`의 리스트를 렌더링 하는 것을 예로 들어봅시다:

```html
  {{#each todo in todos}}
    {{> Todos_item (todoArgs todo)}}
  {{else}}
    <div class="wrapper-message">
      <div class="title-message">작업할 것이 없습니다.</div>
      <div class="subtitle-message">새 작업을 추가해주세요.</div>
    </div>
  {{/each}}
```

위 짤막한 예제는 다음과 같은 사항을 보여줍니다:

- `{{#each .. in}}`블럭은 배열 또는 커서를 루프하여 각각을 HTML 엘리먼트로 렌더링하며 항목이 없는 경우 `{{else}}`블럭을 실행(렌더링)합니다.
- 템플릿 내 `{{> Todos_item (todoArgs todo)}}` 부분은 `Todos_item`헬퍼가 반환하는 데이터 컨텍스트를 렌더링 합니다.

[이곳](#spacebars)에서 Spacebars의 전체적인 문법을 읽어볼 수 있습니다.
이 섹션에서는 문법 외에도 중요한 세부사항 몇가지를 다루려 합니다.

## 데이터 구조 및 조회

우리는 `{{todo.title}}`이 현재 `todo`라는 데이터 구조의 `title`이라는 프로퍼티에 접근한 것임을 봤습니다.
또한 `..`는 상위(부모) 데이터 구조에 접근하는 것이며(드물지만 획기적으로 쓰일때가 있다), `list.todos.[0]`은 `list`의 `todos`라는 배열의 첫번째 원소에 접근하는 것입니다.

Spacebars는 `null`을 매우 관대하게 혀용합니다.
만약 정의되지 않은 `foo`에서 `foo.bar`를 시도할 경우, 이것을 단순히 null로 처리하므로 오류가 나지 않습니다.
하지만 `null`을 함수로서 호출하여 사용하려고 할 경우네는 예외(오류메세지)를 발생시킵니다.

## 헬퍼에 인자 사용하기

`{{checkedClass todo true 'checked'}}`처럼 헬퍼를 호출한 다음 인자를 지정할 수 있습니다.
`{{checkedClass todo noClass=true classname='checked'}}`처럼 이름을 키워드로 하는 많은 인자를 지정할 수도 있습니다.
키워드 인자를 전달할 때에는 `hash` 속성을 통해 읽어야 합니다.
어떻게 하는지 여기 그 예제가 있습니다:

```js
Template.Todos_item.helpers({
  checkedClass(todo, options) {
    const classname = options.hash.classname || 'checked';
    if (todo.checked) {
      return classname;
    } else if (options.hash.noClass) {
      return `no-${classname}`;
    }
  }
});
```

일반적으로 헬퍼에서 키워드 인자를 사용하는 것은 익숙치 않기 때문에 기피하게 됩니다.
이 기능은 handlebar 템플릿에서 작동하는 방식이기에 포함되어 있습니다.

> 역주:
> 헬퍼에 일반적인 인자(a)와 키워드 인자(b)를 동시에 전달할 경우에는 아래와 같이 항상 a는 b앞에 위치해야 하는 순서를 지켜야 한다.
> 그렇지 않을 경우 애러가 발생한다.
> ```{{나의헬퍼 a a a b b b}}```
> 그리고 헬퍼측에서 인자를 받을 때 여러개의 b 경우는 하나의 인자로 받아 `b.hash.키워드`와 같이 조회한다.
> ```function 나의헬퍼 (a1, a2, a3, b) { }```

출력된 헬퍼는 다른 템플릿이나 헬퍼로 전달할 수 있습니다.
이러한 방법을 사용하려면 괄호를 사용하여 우선순위를 정해야 합니다.

```html
{{> Todos_item (todoArgs todo)}}
```
`todo`를 `todoArgs`라는 헬퍼에 인자로 전달하고 그 결과값을 `Todos_item`이라는 템플릿으로 전달합니다.

## Template 추가하기

`{{> }}`문법을 통하여 하위 구성요소(템플릿)을 추가할 수 있습니다.
기본적으로 하위 구성요소는 호출자(부모)의 데이터 컨텍스트를 가지고 올 수 있지만, 대개는 명시적이어야 합니다.
위의 `todoArgs todo`와 같이 헬퍼에 의해 반환된 하나의 객체를 단일 데이터 컨텍스트로 제공 할 수 있습니다.
또는 아래와 같이 키워드 인수목록을 데이터 컨텍스트로 제공 할 수 있습니다.

```html
{{> mySubTemplate1 'it`s string!'}}
{{> mySubTemplate2 myStr="my string" myNum=123}}
```

이러할 경우 각각의 서브템플릿의 헬퍼에서는 다음과 같이 데이터 컨텍스트를 참조할 수 있습니다:

```js
Template.mySubTemplate1.helpers({
  myHelper() {
    // 콘솔로그에 단일 객체가 출력된다. 아래는 원시데이터 문자열이 아닌 문자열 객체가 출력된다.
    console.log(this) // String: 'it`s string!'
    return
  }
});
Template.mySubTemplate2.helpers({
  myHelper() {
    // 콘솔로그에 키템플릿이 받은 워드 인수를 키와 값으로 하는 객체가 출력된다.
    console.log(this) // {myStr: "my string", myNum: 123}
    return
  }
});
```

## 헬퍼를 이용한 속성 설정

위의 첫번째 [예제](#spacebars-templates)에서 `checked={{todo.checked}}`부분은 `todo.checked`가 `true`일 경우 HTML에 `checked` 속성을 추가합니다.
또는 여러 개의 속성을 한번에 설정해야 한다면 다음과 같은 방법을 사용 할 수 있습니다:

```html
<a {{attributes}}>My Link</a>
```

```js
Template.foo.helpers({
  attributes() {
    return {
      class: 'A class',
      style: {background: 'blue'}
    };
  }
});
```

## HTML로 렌더링하기

기본적으로 중괄호 태그는 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)를 방지하기 위해 HTML태그를 이스케이프하지만, HTML로 렌더링 할 필요가 있을 경우 `{{{  }}}`와 같이 중괄호가 한번 더 들어간 태그를 이용할 수 있습니다.

그러나 이 작업을 할 때에는 항상 주의해야 합니다.

```html
{{{myHtml}}}
```

```js
Template.foo.helpers({
  myHtml() {
    return '<h1>This H1 will render</h1>';
  }
});
```

## 블럭 핼퍼

`{{# }}`와 함께 쓰이는 헬퍼를 블럭핼퍼라고 부르며 이것은 HTML을(또는 렌더링할 어떠한 것이든) 블럭화 합니다.
예를들어 우리는 앞서 헬퍼가 가지고 있는 리스트에서 하나하나의 HTML을 `{{#each .. in}}`을 통해 블럭화 하여 반복하는 것을 보았습니다.
또한 `Template.contentBlock`, `Template.elseBlock`를 사용하여 블럭헬퍼를 렌더링 할 수 있습니다.
예를들어 `{{#if}}`를 통해 자신만의 헬퍼를 만들 수 있습니다:

```html
<!--
커스텀 블록 헬퍼로 사용할 템플릿을 정의 한다.
여기에서는 커스텀 블록 헬퍼의 이름을 'myIf'로 하였다.
이곳에서 'foo'라는 인자는 커스텀 블록 헬퍼를 사용하는 템플릿에서
'foo'라는 이름(키워드)을 가진 키워드 인수로 전달하였기 때문이다.
-->
<template name="myIf">
  {{#if foo}}
    {{> Template.contentBlock}}
  {{else}}
    {{> Template.elseBlock}}
  {{/if}}
</template>

<template name="caller">
  {{#myIf foo=true}}
    <h1>I'll be rendered!</h1>
  {{else}}
    <h1>I won't be rendered</h1>
  {{/myIf}}
</template>
```

## 내장된 블록 핼퍼

아래는 알아야 할 기본 내장된 블록 핼퍼입니다:

### If / Unless

`{{#if}}`와 `{{#unless}}`는 매우 간단하지만 템플릿 흐름을 제어하는데 매우 중요한 헬퍼입니다.
이 둘은 하나의 인자에 대해서 boolean 값을 판단합니다.
JavaScript에서 `null`, `undefined`, `0`, `''`, `NaN`, `false`를 `false`로 판단하며, 그 외의 값은 `true`로 판단합니다.

```html
{{#if something}}
  <p>It's true</p>
{{else}}
  <p>It's false</p>
{{/if}}
```

> 역주: `{{#unless}}`는 'if not' 의미로 동작합니다.

### Each-in

`{{#each .. in}}`헬퍼는 외부 데이터 구조를 유지하면서 리스트를 넘기는 편리한 방법입니다.

```html
{{#each todo in todos}}
  {{#each tag in todo.tags}}
    <!-- 이곳에는 'todo'와 'tag' 모두 사용가능합니다. -->
  {{/each}}
{{/each}}
```

### Let

`{{#let }}`은 해당 탬플릿에서 사용할 속성을 정의하는 것입니다.
JavaScript에서 사용하는 `let`과 유사합니다:


```html
{{#let name=person.bio.firstName color=generateColor}}
  <div>{{name}}(은)는 {{color}}카드를 받았다!</div>
{{/let}}
```

`name`과 `color`는 해당 템플릿 상에서만 존재하며 데이터 컨텍스트에는 없습니다.
즉, 헬퍼와 이벤트 헨들러에서 `this.name` 또는 `this.color`로 조회할 수 없다는 뜻입니다.
만약 헬퍼 내에서 이것들을 조회해야 할 필요가 있을경우, 반드시 인자로 전달해야 합니다.(앞서 보았던 `todoArgs todo`처럼)

### Each와 With

이 두 헬퍼는 스페이스바의 기본 헬퍼이지만, 우리는 이것을 사용하는 것을 추천하지 않습니다([`each-in`](#each--in-추천)사용 추천).
이 블록 핼퍼들은 데이터 컨텍스트를 변형시키기 때문에 추적이 어려울 수 있습니다.

`{{#each .. in}}`처럼 `{{#each}}`는 커서나 배열을 반복하면서 현재 반복된 항목의 내용으로 데이터 컨텍스트를 변경합니다.
`{{#with}}`는 단순히 제공된 객체를 내부 데이터 컨텍스트로 변경합니다.
대부분의 경우 `{{#with}}`를 사용하는 것보다 `{{#each .. in}}`이나 `{{#let}}`을 사용하는 것이 좋습니다.

## Block Helpers 연결
 
아래처럼 블록 헬퍼를 연결하여 사용할 수 있습니다:

```html
{{#input isRadio}}
  <input type="radio" />
{{else input isCheckbox}}
  <input type="checkbox" />
{{else}}
  <input type="text" />
{{/foo}}
```

이것은 아래와 동일합니다:

```html
{{#input isRadio}}
  <input type="radio" />
{{else}}
  {{#input isCheckbox}}
    <input type="checkbox" />
  {{else}}
    <input type="text" />
  {{/input}}
{{/input}}
```

## 엄격함

스페이스바는 매우 엄격하게 HTML을 파싱하는 파서가 있습니다.
예를들어 `div`처럼 단일 닫힘 테그가 아닌 테그가 `<div/>`와 같이 쓰였다면, 고맙게도 파서는 이러한 오류를 발생시키며 어디으 몇번째 줄에 그러한 오류가 발생했는지 알려줍니다.

## 무효화

`{{ }}`를 HTML로 표시하고 싶다면, 여는 괄호 다음 `|`를 입력합니다:


```
<!-- 이것은 <h1>중괄호 예제1 {{}}</h1> 처럼 렌더링 될 것이다 -->
<h1>중괄호 예제1 {{|}}</h1>

<!-- 이것은 <h1>중괄호 예제2 {{{}}}</h1> 처럼 렌더링 될 것이다 -->
<h1>중괄호 예제2 {{{|}}}</h1>
```

***

# Blaze에서 재사용가능한 컨포넌트

Meteor 가이드 [UI/UX](https://guide.meteor.com/ui-ux.html#smart-components) 섹션에서 명확하고 최소한의 방법으로 재사용 가능한 구성요소를 만드는 것이 장점이라고 했습니다.

템플릿 기반의 간단한 렌더링 엔진인 Blaze는 React나 Angular와는 달리 이러한 원칙을 적용하지는 않았지만, Blaze 구성 요소를 작성할 때 몇 가지 규칙을 따르면 대부분의 동일한 이점을 누릴 수 있습니다.
이 섹션에서는 재사용 가능한 Blaze 구성 요소를 작성하기위한 "모범 사례"에 대해 간략히 설명합니다.

앞으로의 예제들은 Todos라는 예제 앱의 `List_show`라는 컴포넌트를 참조할 것입니다.

## 데이터 구조 유효성검사

원문:

In order to ensure your component always gets the data you expect, you should validate the data context provided to it.
This is just like validating the arguments to any Meteor Method or publication, and lets you write your validation code in one place and then assume that the data is correct.

You can do this in a Blaze component's onCreated() callback, like so:

번역:

구성 요소가 항상 원하는 데이터를 가져 오려면 제공되는 데이터 컨텍스트의 유효성을 검사해야합니다.
이것은 Meteor Method 또는 publication의 한 곳에서 유효성 검사를 하는것과 동일하며 이 후 데이터가 올바른 것으로 가정합니다.

아래와 같이 Blaze의 구성요소인 `onCreated()`콜백에서 작업할 수 있습니다.

```js
Template.Lists_show.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      list: {type: Function},
      todosReady: {type: Boolean},
      todos: {type: Mongo.Cursor}
    }).validate(Template.currentData());
  });
});
```

`autorun()`을 사용하여 데이터 컨텍스트가 바뀔때마다 유효성 검사를 할 수 있습니다.

## 템플릿에 데이터 컨텍스트 추가하기

관계성이 있는 객체를 `{{> Todos_item todo}}`처럼 템플릿의 데이터 컨텍스트로 제공하는 것이 좋습니다.
이 때, `{{> Todos_item todo=todo}}`처럼 명시적으로 이름을 지정해주는 것이 좋습니다.
이에 대해서는 두 개의 이유가 있습니다.

1. 하위 구성요소에서 데이터를 사용할 때, `{{todo.title}}`로 참조하는 것이 `{{title}}`보다 훨씬 더 명확합니다.
2. 많은 인자를 전달 할 때 보다 더 융통성 있습니다.

원문:

For instance, in the case of the `Todos_item` sub-component, we need to provide two extra arguments to control the editing state of the item, which would have been a hassle to add if the item was used with a single `todo` argument.

Additionally, for better clarity, always explicitly provide a data context to an inclusion rather than letting it inherit the context of the template where it was rendered:

번역:

`Todos_item`에서 무엇인가를 조작하기 위해 두 개의 인수가 제공되어야 한다고 가정해 봅시다.
이 때 단지 `todo`라고 인자를 전달해서 사용중 이었다면 인수를 추가하는데 번거로움이 있습니다.

또한 명확성을 위해 데이터 컨텍스트를 상속받는 템플릿을 렌더링 할 때 데이터 컨텍스트는 명시적이여야 합니다.

```html
<!-- 좋지못함: 데이터 컨텍스트가 상속되었지만, 그곳에 무엇이 있는지 아무도 모른다! -->
{{> myTemplate}}

<!-- 명시적으로 빈 데이터 컨텍스트를 전달 -->
{{> myTemplate ""}}
```

## `{{#each .. in}}` 추천

원문:

For similar reasons to the above, it's better to use `{{#each todo in todos}}` rather than the older `{{#each todos}}`.
The second sets the entire data context of its children to a single `todo` object, and makes it difficult to access any context from outside of the block.

The only reason not to use `{{#each .. in}}` would be because it makes it difficult to access the `todo` symbol inside event handlers.
Typically the solution to this is to use a sub-component to render the inside of the loop:

번역:

위와 같은 이유로 `{{#each todos}}`보다 `{{#each todo in todos}}`를 사용하는 것이 더 좋습니다.
`todo` 객체의 자식을 하나의 데이터 컨텍스트로 세팅하며, 이것은 현재 블럭 밖에서 이것을 조회하기 어렵게 만듭니다.

`{{#each .. in}}`을 사용하지 않는 유일한 이유는 이벤트 헨들러에서 `todo`의 심볼에 접근하기 어렵기 때문입니다.
일반적으로이를 해결하려면 하위 구성 요소를 사용하여 루프 내부를 렌더링합니다:

```html
{{#each todo in todos}}
  {{> Todos_item todo=todo}}
{{/each}}
```

이제 `Todos_item`의 이벤트 헨들러나 헬퍼 내에서 `this.todo`로 참조할 수 있습니다.

## 헬퍼로 데이터 전달하기

원문:

Rather than accessing data in helpers via `this`, it's better to pass the arguments in directly from the template.
So our `checkedClass` helper takes the `todo` as an argument and inspects it directly, rather than implicitly using `this.todo`.
We do this for similar reasons to why we always pass arguments to template inclusions, and because "template variables" (such as the iteratee of the `{{#each .. in}}` helper) are not available on `this`.

번역:

`this`를 통해 헬퍼의 데이터를 조회하는 대신, 템플릿에 인자를 명시적으로 전달하는게 더 좋습니다.
그래서 우리의 `checkedClass` 도우미는 `todo`를 인수로 사용하고 암묵적으로 `this.todo`를 사용하지 않고 직접 검사합니다.
"템플릿 변수"에서 `this` 사용이 가능하지 않기 때문에 템플릿에 항상 인자를 전달하는 작업을 수행합니다.

## 템플릿 인스턴스 사용하기

Blaze의 간단한 API가 반드시 컴포넌트 화 된 접근 방식을 권장하지는 않습니다.
템플릿 인스턴스를 내부 기능 및 상태를 저장하는 편리한 위치로 사용할 수 있습니다.
템플릿 인스턴스는 Blaze의 라이프 사이클 콜백 내에서 `this`를 통해 액세스 할 수 있으며 이벤트 핸들러와 도우미에서 `Template.instance()`로 액세스 할 수 있습니다.
또한 이벤트 핸들러에 두 번째 인수로 전달됩니다.

이 컨텍스트에서 이름을 `instance`로 지정하고 모든 관련 도우미의 맨 위에 지정하는 것이 좋습니다.
예를 들면 :

```js
Template.Lists_show.helpers({
  todoArgs(todo) {
    const instance = Template.instance();
    return {
      todo,
      editing: instance.state.equals('editingTodo', todo._id),
      onEditingChange(editing) {
        instance.state.set('editingTodo', editing ? todo._id : false);
      }
    };
  }
});

Template.Lists_show.events({
  'click .js-cancel'(event, instance) {
    instance.state.set('editingTodo', false);
  }
});
```

## 상태에 따른 reactive dict 사용하기

[`reactive-dict`](https://atmospherejs.com/meteor/reactive-dict)페키지를 사용하면 간단한 반응형 키-값으로 dict를 정의할 수 있습니다.
구성요소에 내부 상태를 연결하는 편리한 방법입니다.
우리는 `onCreated`의 콜백에 `state`라는 dict를 정의하고 그것을 템플릿 인스턴스에 추가합니다:

```js
Template.Lists_show.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    editing: false,
    editingTodo: false
  });
});
```

`stats`라는 dict가 만들어지면 헬퍼나 이벤트 헨들러에서 조회 수정이 가능합니다.

## 인스턴스에 함수 추가하기

만약 여러 이벤트 헨들러에서 사용되어야 하는 함수가 있을 경우, `onCreated()`의 콜백함수에서 템플릿 인스턴스에 직접 함수를 추가하는 것이 좋습니다.

```js
import {
  updateName,
} from '../../api/lists/methods.js';

Template.Lists_show.onCreated(function() {
  this.saveList = () => {
    this.state.set('editing', false);

    updateName.call({
      listId: this.data.list._id,
      newName: this.$('[name=name]').val()
    }, (err) => {
      err && alert(err.error);
    });
  };
});
```

이제 이벤트 헨들러에서 함수를 호출할 수 있습니다:

```js
Template.Lists_show.events({
  'submit .js-edit-form'(event, instance) {
    event.preventDefault();
    instance.saveList();
  }
});
```

## 템플릿 인스턴스에 DOM 범위 지정하기

jQeury의 `$()`를 이용하여 글로벌적으로 DOM을 탐색하는 것은 좋지 않습니다.
이러한 방법은 현재 컨포넌트와 상관없는 것을 선택할 수 있습니다.

원문:
Also, it limits your options on rendering *outside* of the main document (see testing section below).


번역:
또한 메인 다큐먼트의 렌더링 옵션을 제한합니다.

대신, Blaze는 현재 템플릿 인스턴트 내에서 검색조회를 할 수 있는 방법을 제공합니다.
일반적으로 `onRendered()`콜백에서 `Template.instance().$()` 또는 `this.$()`로 DOM을 조작할 수 있습니다.
예를들어, 사용자가 todo 버튼을 클릭하였을때 `<input>`엘리먼트가 포커스 되길 원한다면:

```js
Template.Lists_show.events({
  'click .js-todo-add'(event, instance) {
    instance.$('.js-todo-new input').focus();
  }
});
```

### 역주: 이번 섹션은 잘못 된 것이다.

이번 섹션에서는 클라이언트 측에서의 더 나은 퍼포먼스를 위해 위와 같이 말하였지만 실험결과 잘못된 것이라 판단된다.

```html
<template name="foo">
	<div id="foo">
		<h1>h1</h1>
		<p>p1</p>
		<p>p2</p>
		<p>p3</p>
		<h1>h1</h1>
		<p>p1</p>
		<p>p2</p>
		<p>p3</p>
	</div>
</template>
```

```js
Template.foo.onRendered(function() {
  var i;
console.log(this);
i = 100000;
console.time('this.find');
while (i--) {
  this.find('p');
}
console.timeEnd('this.find');
i = 100000;
console.time('this.$');
while (i--) {
  this.$('p');
}
console.timeEnd('this.$');
i = 100000;
console.time('$');
while (i--) {
  $('p');
}
console.timeEnd('$');
i = 100000;
console.time('document.querySelectorAll');
while (i--) {
  document.querySelectorAll('p');
}
console.timeEnd('document.querySelectorAll');
i = 100000;
console.time('this.firstNode.querySelectorAll');
while (i--) {
  this.firstNode.querySelectorAll('p');
}
return console.timeEnd('this.firstNode.querySelectorAll');
});
```

결과는 직접 실행해보자. 참고로 `this.$()`보다 `$()`가 두배가량 빠르다. (애써 생각해서 넣어놓은 빌트인 메서드가 무쓸모라는 소리)

## 이벤트 맵에서 `.js-` 셀렉터 사용하기

JS파일에 이벤트 맵을 설정할 때 이벤트가 첨부되는 템플릿 요소를 선택(select)해야 합니다.
요소의 스타일을 지정하는데 사용되고 있는 CSS 클레스를 사용하는대신 이벤트헨들러에서 셀렉터로 사용할 특별한 클레스명을 사용하는 것이 좋습니다.
관례적으로 `js-`로 시작하는 클레스 명은 Javascript에서 사용하고 있음을 나타냅니다.
예를들어 `.js-todo-add`와 같이 명시하고 셀렉터로 사용하는 방법이 있습니다.

> 역주: 이벤트 핸들러 추가시 `'click .btn'`같은 경우 `.btn`은 버튼에 대한 기본 스타일을 입히기 위해 부트스트렙에서 사용하는 클레스명이다.(부트스트랩을 사용중이라 가정함)
> 그러므로 `'click .js-btn'`과 같이 사용할 경우 부트스트랩을 사용하지 않게되어 `.btn`을 제거하더라도 개발에 혼선의 여지가 없게된다.
> 즉, Blaze에서는 이러한 방식을 추천한다는 말이지 꼭 `.js-***`과 같이 사용할 필요는 없다.

## 템플릿 인자로 HTML 컨텐츠 전달하기

만약 하위 구성요소로 콘텐츠를 전달해야 하는 경우 사용자 정의 [블럭 헬퍼](#블럭-핼퍼)를 사용하여 콘텐츠 블럭을 제공할 수 있습니다.
보다 더 유연한 방법이 필요할 경우 일반적으로 구성 요소의 이름(템플릿명)을 인수로 제공하는 것이 가장 좋습니다.
그러면 하위 구성요소는 아래의 방법을 사용하여 해당 구성요소를 렌더링 할 수 있습니다.

```html
{{> Template.dynamic templateName dataContext}}
```

이 방법은 [`kadira:blaze-layout`](https://atmospherejs.com/kadira/blaze-layout)페키지가 작동하는 방식입니다. (한국어 docs는 [여기](#https://github.com/niceplugin/translation/tree/master/BlazeLayout))

## 콜백 전달하기

만약 상위 계층으로 구성요소를 전달해야 할 필요가 있을경우, 하위 구성요소가 콜백을 호출 할 수 있도록 하는 것이 가장 좋습니다.

원본:

For instance, only one todo item can be in the editing state at a time, so the `Lists_show` component manages the state of which is edited. When you focus on an item, that item needs to tell the list's component to make it the "edited" one. To do that, we pass a callback into the `Todos_item` component, and the child calls it whenever the state needs to be updated in the parent:

역주:

번역하지 아니함.
이 부분은 부모 템플릿에서 자식 탬플릿으로 인자를 전달하고 자식 템플릿에서 해당 매개변수를 조작하면 (자식에게 인자로 전달했던)부모 템플릿에 있던 값이 변경된다는 소리임.
단, 전달한 인자가 원시데이터일 경우 참조가 아닌 할당으로 되기 때문에 인자를 전달할 때에는 객체 형식으로 전달 해야 함.
예를 들어 숫자(원시데이터)를 인자로 전달 하고 싶을 경우, 일반 변수에 할당하지 아니하고 ReactiveVar라는 일종의 반응형 객체에 래핑하여 인자로 전달하는 것을 추천.

```html
{{> Todos_item (todoArgs todo)}}
```

```js
Template.Lists_show.helpers({
  todoArgs(todo) {
    const instance = Template.instance();
    return {
      todo,
      editing: instance.state.equals('editingTodo', todo._id),
      onEditingChange(editing) {
        instance.state.set('editingTodo', editing ? todo._id : false);
      }
    };
  }
});

Template.Todos_item.events({
  'focus input[type=text]'() {
    this.onEditingChange(true);
  }
});
```

## `onRendered()`에서 제3자 라이브러리 사용하기

위에서 언급했듯이 `onRendered()`콜백은 컴포넌트가 처음 렌더링 되어 DOM에 추가된 후 *한번만 호출되므로*, 일반적으로 제3자 라이브러리를 호출하기 적당합니다(예를들어 jQuery 플러그인 호출).

경우에따라서는 데이터가 준비될 때까지 기다려야 할 수도 있습니다(일반적으로 이러한 경우에는 하위 컴포넌트를 사용하는 것이 적합합니다).
그렇게 하기위해 `onRendered()`콜백에 `autorun`을 설정할 수 있습니다.
예를들어 `Lists_show_page`컴포넌트에서 서브스크립션(subscription)이 완료될 때까지 화면을 숨기고 싶다면:

```js
Template.Lists_show_page.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // app-body.js에 정의된 화면 실행 화면 컨트롤
      AppLaunchScreen.listRender.release();
    }
  });
});
```

# Blaze로 스마트 컴포넌트(구성요소) 작성하기

일부 구성요소는 자신의 데이터 컨텍스트에 외부의 무엇인가를 참조시켜야 할 수 있습니다.(예를 들어 서버측의 서브스크립션이나 기타 데이터를 클라이언트의 저장소로)
[데이터로드](https://guide.meteor.com/data-loading.html#patterns) 및 [UI](https://guide.meteor.com/ui-ux.html#smart-components) 섹션에서 설명한 것처럼 스마트 구성 요소를 사용하는 방법을 신중하게 고려해야합니다.

모든 재사용 가능한 구성요소는 스마트 구성요소에 적용됩니다.

## `onCreated`에서 서브스크립션

`onCreated` 콜백에서 서버의 퍼블리케이션(publication)을 서브스크립션 해야 합니다.
Todos라는 예제 앱의 `Lists_show_page`템플릿에서 `todos.inList`라는 퍼블리케이션을 FlowRouter의 현재 param값 `_id`를 기반으로 서브스크립션 하였습니다:

```js
Template.Lists_show_page.onCreated(function() {
  this.getListId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('todos.inList', this.getListId());
  });
});
```

`Meteor.subscribe()` 대신 `this.subscribe()`를 사용하면 서브스크립션이 준비되었을때 컴포넌트는 변화여부를 자동적으로 추적하기 시작합니다.
우리는 이러한 정보를 HTML 템플릿의 기본 내장헬퍼인 `{{Template.subscriptionsReady}}`나 `instance.subscriptionsReady()`을 통해 알 수 있습니다.

이 컴포넌트는 글로벌 클라이언트 사이드의 저장소인 `FlowRouter`를 이 인스턴스 메소드인 `getListId()`의 콜벡함수로 감싸고 있다.
이 인스턴스 메소드는 `listIdArray`라는 헬퍼 또는 `onCreated` 내부의 `autorun`에 의해 호출된다.

```js
Template.Lists_show_page.helpers({
  // #each를 통해 'list'라는 템플릿이 지워지거나 생깁니다.
  // 이것은 시각적인 효과에서도 중요합니다.
  listIdArray() {
    const instance = Template.instance();
    const listId = instance.getListId();
    return Lists.findOne(listId) ? [listId] : [];
  },
});
```

## 헬퍼에서 추출(Fetch)하기

원문:

As described in the [UI/UX article](https://guide.meteor.com/ui-ux.html#smart-components), you should fetch data in the same component where you subscribed to that data. In a Blaze smart component, it's usually simplest to fetch the data in a helper, which you can then use to pass data into a reusable child component. For example, in the `Lists_show_page`:

번역:

[UI/UX 섹션](https://guide.meteor.com/ui-ux.html#smart-components)에서 언급한대로, 서브스크립션한 데이터를 동일한 구성요소에 추출해야 합니다.
Blaze 스마트 구성요소에서는 일반적으로 헬퍼에서 데이터를 가져오는 것이 가장 간단합니다.
그런 다음 재사용 가능한 하위 구성요소로 데이터를 전달하는 데 사용할 수 있습니다.
예를 들어 `Lists_show_page`에서:

```html
{{> Lists_show_page (listArgs listId)}}
```

`listArgs`라는 헬퍼는 우리가 서브스크립션한 데이터를 추출합니다.

```js
Template.Lists_show_page.helpers({
  listArgs(listId) {
    const instance = Template.instance();
    return {
      todosReady: instance.subscriptionsReady(),
      // 원문:
      // We pass `list` (which contains the full list, with all fields, as a function
      // because we want to control reactivity. When you check a todo item, the
      // `list.incompleteCount` changes. If we didn't do this the entire list would
      // re-render whenever you checked an item. By isolating the reactiviy on the list
      // to the area that cares about it, we stop it from happening.
      // 번역:
      // 우리는 반응을 제어하기를 원하기 때문에 전체 목록을 모든 필드와 함께 포함하는`list`를 함수로 전달합니다.
      // 'todo'항목을 체크하면`list.incompleteCount`가 바뀝니다.
      // 이 작업을 수행하지 않으면 항목을 검사 할 때마다 전체 목록이 다시 렌더링됩니다.
      // 목록에있는 반응을 관심있는 영역으로 격리시킴으로써 우리는 그것이 일어나지 않도록합니다.
      list() {
        return Lists.findOne(listId);
      },
      // 원문:
      // By finding the list with only the `_id` field set, we don't create a dependency on the
      // `list.incompleteCount`, and avoid re-rendering the todos when it changes
      // 번역:
      // `_id` 필드만 설정된리스트를 찾음으로써 우리는`list.incompleteCount`에 의존성을
      // 생성하지않고 변경될 때 todos를 다시 렌더링하는 것을 피합니다
      todos: Lists.findOne(listId, {fields: {_id: true}}).todos()
    };
  }
});

```

# Blaze에서 코드 재사용하기

서로 관련이없는 두 구성요소간에 코드를 재사용하려는 경우가 일반적입니다.
Blaze에서 이 작업을 수행하는 주요 두 방법을 소개합니다.

## 구성


가능한 경우 일반적으로 두 구성요소의 재사용 가능한 부분을 추출하여 독립화 하는 것이 가장 좋습니다.
이를 위해 기능을 새롭고 더 작은 구성요소로 공유해야합니다.
[재사용 가능한 구성요소](#blaze에서-사용가능한-컨포넌트)에 대한 패턴을 따르는 경우, 이 기능이 필요한 모든 곳에서이 하위 구성요소를 재사용하는 것이 간단해야합니다.

앱의 많은 부분에서 "esc"키를 누르면 `<input>`에서 blur(포커싱해제)되도록 되어있다고 가정해 봅시다.
만약 당신이 자동완성 기능을 만들었거나 원한다면, `autocompleteInput`템플릿 안에 `blurringInput`을 작성할 수 있습니다:

```html
<template name="autocompleteInput">
  {{> blurringInput name=name value=currentValue onChange=onChange}}
</template>
```

```js
Template.autocompleteInput.helpers({
  currentValue() {
    // 어떤 로직(코드)을 실행하여 자동완성의 현재 텍스트 값을 리턴합니다.
  },
  onChange() {
    // 이것은 `autocompleteInput`의 템플릿 인스턴스 입니다.
    const instance = Template.instance();
    // 원문:
    // The second argument to this function is the template instance of the `blurringInput`.
    // 번역:
    // 이 함수의 두 번째 인자는`blurringInput`의 템플릿 인스턴스입니다.
    return (event) => {
      // input의 현재 값을 읽어 반환합니다.
    };
  }
});
```

`blurringInput`를 유연하고 재사용 가능하게 만들었으므로, `autocompleteInput` 내에서 이 기능을 다시 만들지 않아도 됩니다.

> 역주: 무슨말을 하려는지는 알겠는데 이 섹션을 재대로 해석하진 못하겠다...

## 라이브러리

원문:

It's usually best to keep your view layer as thin as possible and contain a component to whatever specific task it specifically needs to do. If there's heavy lifting involved (such as complicated data loading logic), it often makes sense to abstract it out into a library that simply deals with the logic alone and doesn't deal with the Blaze system at all.

For example, if a component requires a lot of complicated [D3](http://d3js.org) code for drawing graphs, it's likely that that code itself could live in a separate module that's called by the component. That makes it easier to abstract the code later and share it between various components that need to all draw graphs.

번역:

일반적으로 뷰 레이어를 가능한 한 얇게 유지하고 구체적으로 수행해야하는 특정 작업에 구성요소를 포함하는 것이 가장 좋습니다.
복잡한 작업(예: 복잡한 데이터로드 논리)이 있을 경우 로직을 단독으로 처리하고 Blaze 시스템을 전혀 다루지 않는 라이브러리로 추상화하는 것이 좋습니다.

예를들어, 구성요소에 그래프를 그리는데 복잡한 [D3](http://d3js.org)코드가 많이 필요한 경우 코드 자체가 구성요소에서 호출하는 별도의 모듈에 있을 가능성이 큽니다.
따라서 나중에 코드를 추상화하고 그래프를 그릴 필요가 있는 다양한 구성요소간에 쉽게 코드를 공유 할 수 있습니다.

## 글로벌 헬퍼

여러 템플릿에서 공유해야하는 헬퍼가 있을 경우 전역 스페이스바 헬퍼를 씁니다.
이것은 `Template.registerHelper()`메서드를 통해 만들 수 있습니다.
예를 들어 다음과 같이 할 수 있습니다.

```js
Template.registerHelper('shortDate', (date) => {
  return moment(date).format("MMM do YY");
});
```

```html
<template name="myBike">
  <dl>
   <dt>Date registered</dt>
   <dd>{{shortDate bike.registeredAt}}</dd>
 </dl>
</template>
```

# Blaze 이해하기

Blaze는 매우 직관적인 렌더링 시스템이지만 복잡한 작업을 수행하려고 할 때 알아야 할 몇 가지 단점과 복잡성이 있습니다.

## 리렌더링(Re-rendering)

블레이즈는 리렌더링 하는 것에 불투명합니다.
Tracker와 Blaze는 궁극적으로 모든 데이터 변경을 완전히 반영하는 "궁극적인 일관성"시스템으로 설계되었습니다.
그러나 사용 방법에 따라 약간의 재실행이나 재 렌더링이 필요할 수 있습니다.
구성요소가 리렌더링 될 때를 신중하게 제어하려고 했다면 실망스러울 수 있습니다.

첫번째로 고려해야 할 점은 '정말로 구성요소가 리렌더링 되는 것을 제어할 필요가 있는가'? 입니다.
Blaze는 최적화 되어있으므로 일반적으로 구성요소의 리렌더링 여부는 고려할 필요가 없습니다.
당신의 헬퍼를 실행하여 렌더링 되는 부분이 가볍다고 확신할 경우 이것은 걱정할 필요가 없습니다.

원문:

The main thing to understand about how Blaze re-renders is that re-rendering happens at the level of helpers and template inclusions.
Whenever the *data context* of a component changes, it necessarily must re-run *all* helpers and data accessors (as `this` within the helper is the data context and thus will have changed).

번역:

Blaze는 헬퍼와 템플릿을 포함하는 단계에서 리렌더링이 일어난다는 점을 이해하는 것이 중요합니다.
구성요소의 데이터 컨텍스트가 변경될 때마다 *반드시 모든 헬퍼와 데이터 접근자를 다시 실행*합니다(헬퍼 내의 `this`는 데이터 컨텍스트이므로 변경 될 것입니다).

또한 반응형 데이터 소스를 참조하고 있는 특정 헬퍼들은 그 값이 변경될 때마다 다시 실행됩니다.

원문:

You can often work out *why* a helper has re-run by tracing the source of the reactive invalidation:

번역:

헬퍼가 반응형이 무효화된 소스임에도 다시 실행하는 이유는 다음과 같습니다:

```js
Template.myTemplate.helpers({
  helper() {
    // 원문:
    // When this helper is scheduled to re-run, the `console.trace` will log a stack trace of where
    // the invalidation has come from (typically a `changed` message from some reactive variable).
    // 번역:
    // 이 헬퍼가 다시 실행될 예정이라면 `console.trace`이 무효가 발생한 곳의 스택을 추적 기록할 것입니다.
    Tracker.onInvalidate(() => console.trace());
  }
});
```

## 리렌더링 제어하기

헬퍼나 하위 구성요소를 실행하는데 드는 비용이 비싸거나 자주 재실행 되야 하지만 시각적인 효과가 없다면(미미하다면), 좀 더 세밀하게 반응형 데이터 소스를 만들어 사용하여 불필요한 재실행을 막을 수 있습니다.
[`peerlibrary:computed-field`](https://atmospherejs.com/peerlibrary/computed-field)페키지는 이러한 페턴을 구상하는데 도움을 줍니다.

## 속성 헬퍼

원문:

Setting tag attributes via helpers (e.g. `<div {{attributes}}>`) is a neat tool and has some precedence rules that make it more useful.
Specifically, when you use it more than once on a given element, the attributes are composed (rather than the second set of attributes simply replacing the first).
So you can use one helper to set one set of attributes and a second to set another.
For instance:

번역:

`<div {{attributes}}>`처럼 헬퍼를 통해 엘리먼트의 속성을 설정하는 것은 깔끔한 방법이며 이것을 더 유용하게 만들어 줍니다.
특히 하나 이상의 속성을 엘리먼트에 구성할 수 있습니다.
다시 설정되어 리턴되는 속성값은 단순히 이전 속성값을 대체합니다.
따라서 하나의 헬퍼를 사용하여 첫번째 속성세트를 설정하고 두번째 속성세트를 설정할 수 있습니다.
예를들면:

```html
<template name="myTemplate">
  <div id="my-div" {{classes 'foo' 'bar'}} {{backgroundImageStyle 'my-image.jpg'}}>My div</div>
</template>
```

```js
Template.myTemplate.helpers({
  classes(names) {
    return {class: names.map(n => `my-template-${n}`)};
  },
  backgroundImageStyle(imageUrl) {
    return {
      style: {
        backgroundImage: `url(${imageUrl})`
      }
    };
  }
});
```

> 역주: 이 섹션 이해 못함

## 탐색 순서

Blaze의 또 다른 복잡한 주제는 탐색입니다.
`{{something}}`을 쓰면 Blaze에서는 다음과 같은 순서대로 탐색을 실행합니다.

1. 현재 구성요소에 정의된 헬퍼
2. 현재 범위에서 바인딩 된 것 (예 :`{{#let}}` 또는 `{{#each in}}`)
3. 템플릿 이름
4. 글로벌 헬퍼
5. 현재 데이터 컨텍스트의 필드

## Blaze와 빌드 시스템

[build system](https://guide.meteor.com/build-tool.html#blaze)글에서 언급했듯이, [`blaze-html-templates`](https://atmospherejs.com/meteor/blaze-html-templates)패키지는 소스 코드에서 `.html` 파일을 검색하고, `<template name="templateName">`태그들을 선택합니다.
그리고 그것들을 JavaScript 파일로 컴파일하여 함수로 정의하고 `Template.templateName` 심볼에 포함시킵니다.

즉, Blaze 템플릿을 렌더링 할 때 클라이언트에서 `.html`파일로 정의한 스페이스바 콘텐츠에 해당하는 함수를 실행하는 것입니다.

## 뷰(view)란 무엇입니까?

Blaze의 가장 핵심 개념 중 하나인 '뷰'는 템플릿의 반응적 렌더링 영역을 나타내는 구축영역입니다.
뷰는 반응형을 추적하고 검색하며, 데이터가 변경 될 때 적절하게 다시 렌더링하기 위해 화면 뒤에서 작동하는 장치입니다.
뷰는 Blaze에서 리렌더링 되는 단위입니다.
뷰 트리를 사용하여 랜더링 된 구성요소 계층을 처리할 수도 있습니다.
그러나 구성요소간 원활한 통신을 위하여 이 방법보다는 콜백, 템플릿 인자, 글로벌 데이터 저장소를 사용하는 것이 좋습니다.

더 많은 정보는 [Blaze View](../api/blaze.html#Blaze-View)에서 볼 수 있습니다.

# 라우터

블레이즈 템플릿의 렌더링을 지원하는 라우팅 패키지 목록입니다.

## Iron Router

Meteor를 위해 특별히 설계된 *클라이언트 및 서버* 측 라우터.

Iron Router를 추가하려면, `iron:router`패키지를 설치하십시오

```js
meteor add iron:router
```

Iron Router가 제공하는 모든 기능에 대한 자세한 내용은 [Iron Router Guide](https://iron-meteor.github.io/iron-router/)를 참조하십시오.

## Flow Router

Meteor용으로 신중하게 설계된 *클라이언트* 측 라우터.

Flow Router를 추가하려면, `kadira:flow-router`패키지를 설치하십시오.

```js
meteor add kadira:flow-router
```

Flow Router가 제공하는 모든 기능에 대한 자세한 내용은 [Iron Router Guide](https://github.com/kadirahq/flow-router)를 참조하십시오.
한국어 가이드는 [여기](https://github.com/niceplugin/translation/tree/master/flowRouter)를 참조하십시오.

## Flow Router Extra

원문:

Carefully extended flow-router with wait On and template context.

번역:

withOn과 템플릿 문법을 신중하게 확장시킨 Flow Router.

Flow Router Extra를 추가하려면, `ostrio:flow-router-extra`패키지를 설치하십시오.

```js
meteor add ostrio:flow-router-extra
```

Flow Router Extra가 제공하는 모든 기능에 대한 자세한 내용은 [Flow Router Documentation](https://github.com/VeliovGroup/flow-router#flowrouter-extra)를 참조하십시오.

***

# Templates

Meteor의 템플릿 API 문서입니다.

당신이 HTML 파일에 `<template name="foo"> ... </template>`과 같이 작성하면, Meteor에서 `Template.foo`라고 이름지은 "template object"를 생성합니다.
템플릿 이름에는 하이픈(-) 및 기타 특수문자를 사용할 수 없습니다.

동일한 템플릿이 한 페이지에서 여러번 쓰일 수 있으며, 이러한 경우를 템플릿 인스턴스라고 합니다.
생성하여 문서에 추가 할 때부터 문서에서 빼내어 파괴할 때까지가 템플릿 인스턴스의 라이프 사이클 입니다.
Meteor는 템플릿 인스턴스가 제거되거나 교체된 경우 이를 정리할지 결정하는 단계를 관리합니다
(원문: Meteor manages these stages for you, including determining when a template instance has been removed or replaced and should be cleaned up).
당신은 데이터를 템플릿 인스턴스에 연결할 수 있으며, 문서의 DOM 노드를 조회할 수 있습니다.

템플릿 그리고 그 사용법에 대한 자세한 내용은 [Spacebars](#spacebars)와 [Blaze](#introduction) 글을 참고하십시오.

## Template.\_name\_

아래에 나열된 섹션들은 위에서 설명한 `Template.foo`라고 이름지은 템플릿 오브젝트를 `Template._name_`이라고 하였을 때,
`Template._name_.events()`처럼 템플릿 오브젝트 뒤에 사용할 수 있는 메서드에 대한 목록입니다.

### `.events(callback)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 477](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L477)

**인자:**

- callback (eventMap type): 이 템플릿에 연결할 이벤트 헨들러

**설명:**

이 템플릿의 인스턴스에 대한 이벤트 헨들러를 선언하십시오.
기존 이벤트 처리기에 새 이벤트 처리기를 추가하므로 여러 개를 호출 할 수 있습니다.

`eventMap` 타입과 Meteor에서 이벤트 헨들러가 작동하는 방식에 대한 자세한 설명은 [eventMap](#eventmap)을 참조하십시오.

#### eventMap

이벤트멥은 프로퍼티를 가지는 하나의 객체로, 이벤트 헨들이 프로퍼티가 되며 실행할 함수가 값이 됩니다.
프로퍼티는 다음과 같은 형식중 하나로 이루어져 있습니다.

- **eventtype**
<br>`'click'`과 같은 이벤트 유형을 말하며, `'touchend/mouseup/keyup'`과 같이 슬레쉬로 구분할 수 있습니다.

- **eventtype selector**
<br> css 셀렉터에 해당하는 엘리먼트에 일치합니다.

- **event1, event2**
<br>
같은 함수를 가지는 서로 다른 이벤트와 셀렉터를 쉼표를 구분할 수 있습니다.

이벤트 헨들러 함수는 두 개의 인자를 받습니다.
`event`는 이벤트에 관한 정보를 가진 객체이고, `instance`는 헨들러에 정의 된 템플릿의 [`Template.instance()`](#templateinstance)입니다.

원문:

The handler also receives some additional context data in `this`, depending on the context of the current element handling the event.
In a template, an element's context is the data context where that element occurs, which is set by block helpers such as `#with` and `#each`.

번역:

또한 헨들러는 이벤트를 처리하는 현재 요소의 컨텍스트에 따라 `this`에 추가되는 데이터 컨텍스트를 수신합니다.
템플릿에서 엘리먼트 컨텍스트는 `#with`나 `#each`와 같이 블럭 헬퍼로 설정한 데이터 컨텍스트입니다.

예제:

```js
{
  // 어떠한 엘리먼트라도 클릭할 경우
  'click'(event, instance) {
    console.log(event); // 이벤트 객체
    console.log(instance); // 템플릿 객체
    console.log(Template.instance() === instance); // true
    console.log(this); // 현재 탬플릿의 데이터 컨텍스트
    console.log(instance.data === this); // true
  },

  // 클레스 네임에 'accept'가 포함되어 있는 엘리먼트 클릭시
  'click .accept'(event, instance) { ... },

  // 클레스 네임에 'accept'가 포함되어 있는 엘리먼트를 클릭하거나 포커스 했을 시
  'click .accept, focus .accept'(event, instance) { ... }
  'click/focus .accept'(event, instance) { ... }

  // 클레스 네임에 'accept'가 포함되어 있는 엘리먼트를 클릭하거나 포커스 했을 시
  // 또는 엘리먼트에 상관없이 키보드를 눌렀을 경우
  'click .accept, focus .accept, keypress'(event, instance) { ... }
  'click/focus .accept, keypress'(event, instance) { ... }

}
```

대부분의 이벤트는 엘리먼트를 시작으로 문서트리를 버블링 합니다.
예를들어, `click p`는 `<p>`태그 내에서 클릭이 이루어진다면 해당 태그 내에 `<a>, <span>`등 어떠한 것을 클릭하여 감지합니다.
이벤트를 발생시킨 엘리먼트는 `target` 속성으로 알 수 있으며, 이벤트 헨들러에 명시한 셀렉터에 해당하는 엘리먼트는 `currentTarget`으로 알 수 있습니다.

```js
{
  'click p'(event) {
    console.log(event.currentTarget); // 항상 p를 가리킴
    console.log(event.target); // p를 포함한 p 내부에 이벤트를 발생시킨 최초의 엘리먼트 (p 또는 a, span 등)
  }
}
```

하나의 셀렉터로 여러개의 엘리먼트가 메치된다면 이벤트는 버블 형식으로 실행됩니다.
만약 셀렉터가 지정되지 않았을 경우 이벤트는 헨들에 해당하는 엘리먼트에서 한번만 실행 됩니다.

```html
<template name="foo">
  <div id="div1">div1
    <div id="div2">div2
      <div id="div3">div3
        <div id="div4">div4
        </div>
      </div>
    </div>
  </div>
</template>
```

```js
Template.foo.events({
  'click'(event) {
    // 예를들어 '<div id="div4">'를 클릭할 경우
    // 셀렉터가 명시되어 있지 않으므로 해당 엘리먼트를 기준으로
    // 1회만 실행되므로 콘솔로그는 '<div id="div4">'로 한번만 찍힌다.
    console.log(event.currentTarget);
  },
  'click div'(event) {
    // 예를들어 '<div id="div4">'를 클릭할 경우
    // 조건에 부합하는 엘리먼트가 여러개 이므로 버블링이 발생한다.
    // 따라서 'div4 > div3 > div2 > div1' 순으로 이벤트 핸들러를 호출하며
    // 결과적으로 해당 순서에 맞게 콘솔로그가 4회 찍히게 된다.
    console.log(event.currentTarget);
  }
})
```

헨들러의 이벤트 객체에서 사용할 수 있는 메서드 및 프로퍼티는 다음과 같습니다(표에서는 메서드 및 프로퍼티를 'prop'라고 표기함):

|prop|타입|설명|
|----|---|---|
|type|string|'click', 'keyup'과 같은 이벤트 타입|
|target|DOM Element|이벤트를 발생시킨 요소|
|currentTarget|DOM Element|현재 이벤트를 처리하는 요소로 이것은 이벤트 맵의 셀렉터와 일치합니다.|
|which|number|마우스 이벤트의 경우 마우스 버튼번호(1=왼쪽, 2=중간, 3=오른쪽), 키 이벤트의 경우 문자 또는 키코드(keyCode)|
|stopPropagation()||해당 이벤트 맵에 한하여 이벤트 버블링을 중지시킵니다.|
|stopImmediatePropagation()||번역: 전체 이밴트 맵에서 이벤트 버블링을 중지시킴.<br>원문: Prevent all additional event handlers from being run on this event, including other handlers in this event map, handlers reached by bubbling, and handlers in other event maps.|
|preventDefault()||예를들어 링크를 클릭하면 페이지를 이동하는 것처럼 브라우저가 기본적으로 이벤트에 응답하는 어떠한 행동을 무효화 시킵니다.|
|isPropagationStopped()||이 이벤트가 `stopPropagation()`을 실행하였는지 여부를 반환합니다.|
|isImmediatePropagationStopped()||이 이벤트가 `stopImmediatePropagation()`을 실행하였는지 여부를 반환합니다.|
|isDefaultPrevented()||이 이벤트가 `preventDefault()`을 실행하였는지 여부를 반환합니다.|

이벤트 헨들러에서 `false`를 리턴하는 것은 `stopImmediatePropagation()`와 `preventDefault()`를 호출한 것과 동일합니다.

이벤트 타입과 용도는 다음과 같습니다:

|타입|용도|
|---|---|
|click|어떠한 엘리먼트이든 마우스로 클릭하는 경우. 일부 엘리먼트는 키보드 컨트롤로도 이 이벤트를 발생시킵니다(예를들어 포커스 된 `<a>`테그를 키보드 엔터키로 누를 경우).|
|dblclick|더블클릭|
|focus<br>blur|포커스를 얻거나 잃을 경우. 이 이벤트는 버블이 생기지 않습니다.|
|change|체크박스 또는 라디오 버튼의 상태가 변경될 때. 텍스트 필드의 경우 필드값을 변경하고 blur 또는 키이벤트(`<input type="text">`테그의 경우 엔터를 칠 경우)를 사용하였을 때.|
|mouseenter<br>mouseleave|(마우스를 포함하여)포인터가 엘리먼트 내에 들어오거나 나갈경우. 이 이벤트는 버블이 생기지 않습니다.|
|mousedown<br>mouseup|마우스의 버튼을 누르거나 땔 경우|
|keydown<br>keypress<br>keyup|키보드 키를 누르거나 땔 경우. `keypress`의 경우 텍스트 필드에서 타이핑(키를 누르는 것)을 감지하는데 편리합니다. 하지만 `keydown` 및 `keyup`의 경우 방향키를 포함한 특수키(esc같은)도 감지할 수 있습니다.|

다른 DOM event들도 사용할 수 있지만 위에 명시된 이벤트들은 모든 브라우저에서 동일하게 작동하도록 Meteor에서 특별히 신경썼습니다.

### `.helpers(helpers)`

**사용영역:** 클라이언트

**코드라인**: [blaze/template.js, line 443](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L443)

**인자:**

- helpers (object): 각 헬퍼 명을 함수명으로 하는 하나의 객체

**설명:**

설명 내용

원문: Each template has a local dictionary of helpers that are made available to it,
and this call specifies helpers to add to the template's dictionary.

번역: 각 템플릿에는 헬퍼 객체가 있습니다.

예제:

```js
Template.myTemplate.helpers({
  foo() {
    return Session.get("foo");
  }
});
```

이제 `<template name="myTemplate">`템플릿에서 `{{foo}}`를 통해 해당 헬퍼를 호출 할 수 있습니다.

원문: Helpers can accept positional and keyword arguments:

번역: 헬퍼는 키워드 인자를 받을 수 있습니다.

```js
Template.myTemplate.helpers({
  displayName(firstName, lastName, keyword) {
    var prefix = keyword.hash.title ? keyword.hash.title + " " : "";
    return prefix + firstName + " " + lastName;
  }
});
```

그런 다음 템플릿에서 헬퍼를 아래와 같이 호출할 수 있습니다:

```
{{displayName "John" "Doe" title="President"}}
```

스페이스바의 헬퍼에 대해 더 많은 정보는 [여기](#spacebars)를 참조하십시오.

원문: Under the hood, each helper starts a new [`Tracker.autorun`](http://docs.meteor.com/api/tracker.html#Tracker-autorun).

번역: 후드 아래에서 각 헬퍼는 새로운 [`Tracker.autorun`](http://docs.meteor.com/api/tracker.html#Tracker-autorun)을 시작합니다.

반응형의 종속성이 변경될 경우 헬퍼는 다시 실행됩니다.
헬퍼는 데이터 컨텍스트, 전달된 인자 및 실행중에 조회되는 기타 데이터 소스에 의존합니다.

모든 템플릿에서 사용 가능한 글로벌 헬퍼를 만드려면 [`Template.registerHelper`](#templateregisterHelper)를 참조하십시오.

### `.onRendered(callback)`

**사용영역:** 클라이언트

**코드라인**:

**설명:**

설명 내용

**인자:**

Callbacks added with this method are called once when an instance of
Template.*myTemplate* is rendered into DOM nodes and put into the document for
the first time.

In the body of a callback, `this` is a [template instance](../api/templates.html#Template-instances)
object that is unique to this occurrence of the template and persists across
re-renderings. Use the `onCreated` and `onDestroyed` callbacks to perform
initialization or clean-up on the object.

Because your template has been rendered, you can use functions like
[`this.findAll`](../api/templates.html#Blaze-TemplateInstance-findAll) which look at its DOM nodes.

This can be a good place to apply any DOM manipulations you want, after the
template is rendered for the first time.

```html
<template name="myPictures">
  <div class="container">
    {{#each pictures}}
      <img class="item" src="/{{.}}"/>
    {{/each}}
  </div>
</template>
```

```js
Template.myPictures.onRendered(function () {
  // Use the Packery jQuery plugin
  this.$('.container').packery({
    itemSelector: '.item',
    gutter: 10
  });
});
```

### `.onCreated(callback)`

**사용영역:** 클라이언트

**코드라인**:

**설명:**

설명 내용

**인자:**

Callbacks added with this method are called before your template's logic is
evaluated for the first time. Inside a callback, `this` is the new [template
instance](#Template-instances) object. Properties you set on this object will be
visible from the callbacks added with `onRendered` and `onDestroyed` methods and
from event handlers.

These callbacks fire once and are the first group of callbacks to fire.
Handling the `created` event is a useful way to set up values on template
instance that are read from template helpers using `Template.instance()`.

```js
Template.myPictures.onCreated(function () {
  // set up local reactive variables
  this.highlightedPicture = new ReactiveVar(null);
  
  // register this template within some central store
  GalleryTemplates.push(this);
});
```

### `.onDestroyed(callback)`

**사용영역:** 클라이언트

**코드라인**:

**설명:**

설명 내용

**인자:**

These callbacks are called when an occurrence of a template is taken off
the page for any reason and not replaced with a re-rendering.  Inside
a callback, `this` is the [template instance](../api/templates.html#Template-instances) object
being destroyed.

This group of callbacks is most useful for cleaning up or undoing any external
effects of `created` or `rendered` groups. This group fires once and is the last
callback to fire.

```js
Template.myPictures.onDestroyed(function () {
  // deregister from some central store
  GalleryTemplates = _.without(GalleryTemplates, this);
});
```


## Template instances

A template instance object represents an occurrence of a template in
the document.  It can be used to access the DOM and it can be
assigned properties that persist as the template is reactively updated.

Template instance objects are found as the value of `this` in the
`onCreated`, `onRendered`, and `onDestroyed` template callbacks, and as an
argument to event handlers.  You can access the current template instance
from helpers using [`Template.instance()`](../api/templates.html#Template-instance).

In addition to the properties and functions described below, you can assign
additional properties of your choice to the object. Use the
[`onCreated`](../api/templates.html#Template-onCreated) and [`onDestroyed`](../api/templates.html#Template-onDestroyed)
methods to add callbacks performing initialization or clean-up on the object.

You can only access `findAll`, `find`, `firstNode`, and `lastNode` from the
`onRendered` callback and event handlers, not from `onCreated` and
`onDestroyed`, because they require the template instance to be in the DOM.

Template instance objects are `instanceof Blaze.TemplateInstance`.

{% apibox "Blaze.TemplateInstance#findAll" %}

`template.findAll` returns an array of DOM elements matching `selector`.

{% apibox "Blaze.TemplateInstance#$" %}

`template.$` returns a [jQuery object](http://api.jquery.com/Types/#jQuery) of
those same elements. jQuery objects are similar to arrays, with
additional methods defined by the jQuery library.

The template instance serves as the document root for the selector. Only
elements inside the template and its sub-templates can match parts of
the selector.

{% apibox "Blaze.TemplateInstance#find" %}

Returns one DOM element matching `selector`, or `null` if there are no
such elements.

The template instance serves as the document root for the selector. Only
elements inside the template and its sub-templates can match parts of
the selector.

{% apibox "Blaze.TemplateInstance#firstNode" %}

The two nodes `firstNode` and `lastNode` indicate the extent of the
rendered template in the DOM.  The rendered template includes these
nodes, their intervening siblings, and their descendents.  These two
nodes are siblings (they have the same parent), and `lastNode` comes
after `firstNode`, or else they are the same node.

{% apibox "Blaze.TemplateInstance#lastNode" %}

{% apibox "Blaze.TemplateInstance#data" %}

This property provides access to the data context at the top level of
the template.  It is updated each time the template is re-rendered.
Access is read-only and non-reactive.

{% apibox "Blaze.TemplateInstance#autorun" %}

You can use `this.autorun` from an [`onCreated`](../api/templates.html#Template-onCreated) or
[`onRendered`](../api/templates.html#Template-onRendered) callback to reactively update the DOM
or the template instance.  You can use `Template.currentData()` inside
of this callback to access reactive data context of the template instance.
The Computation is automatically stopped when the template is destroyed.

Alias for `template.view.autorun`.

{% apibox "Blaze.TemplateInstance#subscribe" %}

You can use `this.subscribe` from an [`onCreated`](../api/templates.html#Template-onCreated) callback
to specify which data publications this template depends on. The subscription is
automatically stopped when the template is destroyed.

There is a complementary function `Template.instance().subscriptionsReady()`
which returns true when all of the subscriptions called with `this.subscribe`
are ready.

Inside the template's HTML, you can use the built-in helper
`Template.subscriptionsReady`, which is an easy pattern for showing loading
indicators in your templates when they depend on data loaded from subscriptions.

Example:

```js
Template.notifications.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("notifications");
});
```

```html
<template name="notifications">
  {{#if Template.subscriptionsReady}}
    <!-- This is displayed when all data is ready. -->
    {{#each notifications}}
      {{> notification}}
    {{/each}}
  {{else}}
    Loading...
  {{/if}}
</template>
```

Another example where the subscription depends on the data context:

```js
Template.comments.onCreated(function () {
  // Use this.subscribe with the data context reactively
  this.autorun(() => {
    var dataContext = Template.currentData();
    this.subscribe("comments", dataContext.postId);
  });
});
```

```html
{{#with post}}
  {{> comments postId=_id}}
{{/with}}
```

Another example where you want to initialize a plugin when the subscription is
done:

```js
Template.listing.onRendered(function () {
  var template = this;
  
  template.subscribe('listOfThings', () => {
    // Wait for the data to load using the callback
    Tracker.afterFlush(() => {
      // Use Tracker.afterFlush to wait for the UI to re-render
      // then use highlight.js to highlight a code snippet
      highlightBlock(template.find('.code'));
    });
  });
});
```

{% apibox "Blaze.TemplateInstance#view" %}

{% apibox "Template.registerHelper" %}

{% apibox "Template.instance" %}

{% apibox "Template.currentData" %}

{% apibox "Template.parentData" %}

For example, `Template.parentData(0)` is equivalent to `Template.currentData()`.  `Template.parentData(2)`
is equivalent to `{{../..}}` in a template.

{% apibox "Template.body" %}

You can define helpers and event maps on `Template.body` just like on
any `Template.myTemplate` object.

Helpers on `Template.body` are only available in the `<body>` tags of
your app.  To register a global helper, use
[Template.registerHelper](../api/templates.html#Template-registerHelper).
Event maps on `Template.body` don't apply to elements added to the
body via `Blaze.render`, jQuery, or the DOM API, or to the body element
itself.  To handle events on the body, window, or document, use jQuery
or the DOM API.

{% apibox "Template.dynamic" %}

`Template.dynamic` allows you to include a template by name, where the name
may be calculated by a helper and may change reactively.  The `data`
argument is optional, and if it is omitted, the current data context
is used. It's also possible, to use `Template.dynamic` as a block helper
(`{{#Template.dynamic}} ... {{/Template.dynamic}}`)

For example, if there is a template named "foo", `{{> Template.dynamic
template="foo"}}` is equivalent to `{{> foo}}` and
`{{#Template.dynamic template="foo"}} ... {{/Template.dynamic}}`
is equivalent to `{{#foo}} ... {{/foo}}`.

# Blaze

Documentation of how to use Blaze, Meteor's reactive rendering engine.

Blaze is the package that makes reactive templates possible.
You can use the Blaze API directly in order to render templates programmatically
and manipulate "Views," the building blocks of reactive templates.

{% apibox "Blaze.render" %}

When you render a template, the callbacks added with
[`onCreated`](../api/templates.html#Template-onCreated) are invoked immediately, before evaluating
the content of the template.  The callbacks added with
[`onRendered`](../api/templates.html#Template-onRendered) are invoked after the View is rendered and
inserted into the DOM.

The rendered template
will update reactively in response to data changes until the View is
removed using [`Blaze.remove`](#Blaze-remove) or the View's
parent element is removed by Meteor or jQuery.

{% pullquote warning %}
If the View is removed by some other mechanism
besides Meteor or jQuery (which Meteor integrates with by default),
the View may continue to update indefinitely.  Most users will not need to
manually render templates and insert them into the DOM, but if you do,
be mindful to always call [`Blaze.remove`](#Blaze-remove) when the View is
no longer needed.
{% endpullquote %}

{% apibox "Blaze.renderWithData" %}

`Blaze.renderWithData(Template.myTemplate, data)` is essentially the same as
`Blaze.render(Blaze.With(data, function () { return Template.myTemplate; }))`.

{% apibox "Blaze.remove" %}

Use `Blaze.remove` to remove a template or View previously inserted with
`Blaze.render`, in such a way that any behaviors attached to the DOM by
Meteor are cleaned up.  The rendered template or View is now considered
["destroyed"](../api/templates.html#Template-onDestroyed), along with all nested templates and
Views.  In addition, any data assigned via
jQuery to the DOM nodes is removed, as if the nodes were passed to
jQuery's `$(...).remove()`.

As mentioned in [`Blaze.render`](#Blaze-render), it is important to "remove"
all content rendered via `Blaze.render` using `Blaze.remove`, unless the
parent node of `renderedView` is removed by a Meteor reactive
update or with jQuery.

`Blaze.remove` can be used even if the DOM nodes in question have already
been removed from the document, to tell Blaze to stop tracking and
updating these nodes.

{% apibox "Blaze.getData" %}

{% apibox "Blaze.toHTML" %}

Rendering a template to HTML loses all fine-grained reactivity.  The
normal way to render a template is to either include it from another
template (`{{> myTemplate}}`) or render and insert it
programmatically using `Blaze.render`.  Only occasionally
is generating HTML useful.

Because `Blaze.toHTML` returns a string, it is not able to update the DOM
in response to reactive data changes.  Instead, any reactive data
changes will invalidate the current Computation if there is one
(for example, an autorun that is the caller of `Blaze.toHTML`).

{% apibox "Blaze.toHTMLWithData" %}

{% apibox "Blaze.View" %}

Behind every template or part of a template &mdash; a template tag, say, like `{{foo}}` or `{{#if}}` &mdash; is
a View object, which is a reactively updating region of DOM.

Most applications do not need to be aware of these Views, but they offer a
way to understand and customize Meteor's rendering behavior for more
advanced applications and packages.

You can obtain a View object by calling [`Blaze.render`](#Blaze-render) on a
template, or by accessing [`template.view`](../api/templates.html#Blaze-TemplateInstance-view) on a template
instance.

At the heart of a View is an [autorun](https://docs.meteor.com/api/tracker.html#Tracker-autorun) that calls the View's
`renderFunction`, uses the result to create DOM nodes, and replaces the
contents of the View with these new DOM nodes.  A View's content may consist
of any number of consecutive DOM nodes (though if it is zero, a placeholder
node such as a comment or an empty text node is automatically supplied).  Any
reactive dependency established by `renderFunction` causes a full recalculation
of the View's contents when the dependency is invalidated.  Templates, however,
are compiled in such a way that they do not have top-level dependencies and so
will only ever render once, while their parts may re-render many times.

When a `Blaze.View` is constructed by calling the constructor, no hooks
are fired and no rendering is performed.  In particular, the View is
not yet considered to be "created."  Only when the View is actually
used, by a call to `Blaze.render` or `Blaze.toHTML` or by inclusion in
another View, is it "created," right before it is rendered for the
first time.  When a View is created, its `.parentView` is set if
appropriate, and then the `onViewCreated` hook is fired.  The term
"unrendered View" means a newly constructed View that has not been
"created" or rendered.

The "current View" is kept in [`Blaze.currentView`](#Blaze-currentView) and
is set during View rendering, callbacks, autoruns, and template event
handlers.  It affects calls such as [`Template.currentData()`](../api/templates.html#Template-currentData).

The following properties and methods are available on Blaze.View:

<dl class="objdesc">
{% dtdd name:"name" type:"String" id:"view_name" %}
  The name of this type of View.  View names may be used to identify
particular kinds of Views in code, but more often they simply aid in
debugging and comprehensibility of the View tree.  Views generated
by Meteor have names like "Template.foo" and "if".
{% enddtdd %}

{% dtdd name:"parentView" type:"View or null" id:"view_parentview" %}
  The enclosing View that caused this View to be rendered, if any.
{% enddtdd %}

{% dtdd name:"isCreated" type:"Boolean" id:"view_iscreated" %}
  True if this View has been called on to be rendered by `Blaze.render`
  or `Blaze.toHTML` or another View.  Once it becomes true, never
  becomes false again.  A "created" View's `.parentView` has been
  set to its final value.  `isCreated` is set to true before
  `onViewCreated` hooks are called.
{% enddtdd %}

{% dtdd name:"isRendered" type:"Boolean" id:"view_isrendered" %}
  True if this View has been rendered to DOM by `Blaze.render` or
  by the rendering of an enclosing View.  Conversion to HTML by
  `Blaze.toHTML` doesn't count.  Once true, never becomes false.
{% enddtdd %}

{% dtdd name:"isDestroyed" type:"Boolean" id:"view_isdestroyed" %}
  True if this View has been destroyed, such as by `Blaze.remove()` or
  by a reactive update that removes it.  A destroyed View's autoruns
  have been stopped, and its DOM nodes have generally been cleaned
  of all Meteor reactivity and possibly dismantled.
{% enddtdd %}

{% dtdd name:"renderCount" type:"Integer" id:"view_rendercount" %}
  The number of times the View has been rendered, including the
  current time if the View is in the process of being rendered
  or re-rendered.
{% enddtdd %}

{% dtdd name:"autorun(runFunc)" id:"view_autorun" %}
  Like [`Tracker.autorun`](https://docs.meteor.com/api/tracker.html#Tracker-autorun), except that the autorun is
  automatically stopped when the View is destroyed, and the
  [current View](#Blaze-currentView) is always set when running `runFunc`.
  There is no relationship to the View's internal autorun or render
  cycle.  In `runFunc`, the View is bound to `this`.
{% enddtdd %}

{% dtdd name:"onViewCreated(func)" id:"view_onviewcreated" %}
  If the View hasn't been created yet, calls `func` when the View
  is created.  In `func`, the View is bound to `this`.

  This hook is the basis for the [`created`](../api/templates.html#Template-onCreated)
  template callback.
{% enddtdd %}

{% dtdd name:"onViewReady(func)" id:"view_onviewready" %}
  Calls `func` when the View is rendered and inserted into the DOM,
  after waiting for the end of
  [flush time](https://docs.meteor.com/api/tracker.html#Tracker-afterFlush).  Does not fire if the View
  is destroyed at any point before it would fire.
  May fire multiple times (if the View re-renders).
  In `func`, the View is bound to `this`.

  This hook is the basis for the [`rendered`](../api/templates.html#Template-onRendered)
  template callback.
{% enddtdd %}

{% dtdd name:"onViewDestroyed(func)" id:"view_onviewdestroyed" %}
  If the View hasn't been destroyed yet, calls `func` when the
  View is destroyed.  A View may be destroyed without ever becoming
  "ready."  In `func`, the View is bound to `this`.

  This hook is the basis for the [`destroyed`](../api/templates.html#Template-onDestroyed)
  template callback.
{% enddtdd %}

{% dtdd name:"firstNode()" type:"DOM node" id:"view_firstnode" %}
The first node of the View's rendered content.  Note that this may
be a text node.  Requires that the View be rendered.
If the View rendered to zero DOM nodes, it may be a placeholder
node (comment or text node).  The DOM extent of a View consists
of the nodes between `view.firstNode()` and `view.lastNode()`,
inclusive.
{% enddtdd %}

{% dtdd name:"lastNode()" type:"DOM node" id:"view_lastnode" %}
The last node of the View's rendered content.

See [`firstNode()`](#view_firstnode).
{% enddtdd %}

{% dtdd name:"template" type:"Template" id:"view_template" %}
For Views created by invoking templates, the original Template
object.  For example, `Blaze.render(Template.foo).template === Template.foo`.
{% enddtdd %}

{% dtdd name:"templateInstance()" type:"Template instance" id:"view_templateinstance" %}
For Views created by invoking templates,
returns the [template instance](../api/templates.html#Template-instances) object for this
particular View.  For example, in a [`created`](../api/templates.html#Template-onCreated)
callback, `this.view.templateInstance() === this`.

Template instance objects have fields like `data`, `firstNode`, and
`lastNode` which are not reactive and which are also not automatically
kept up to date.  Calling `templateInstance()` causes these fields to
be updated.

{% enddtdd %}

</dl>

{% apibox "Blaze.currentView" nested:true %}

The "current view" is used by [`Template.currentData()`](../api/templates.html#Template-currentData) and
[`Template.instance()`](../api/templates.html#Template-instance) to determine
the contextually relevant data context and template instance.

{% apibox "Blaze.getView" nested:true %}

If you don't specify an `element`, there must be a current View or an
error will be thrown.  This is in contrast to
[`Blaze.currentView`](#Blaze-currentView).

{% apibox "Blaze.With" nested:true %}

Returns an unrendered View object you can pass to `Blaze.render`.

Unlike `{{#with}}` (as used in templates), `Blaze.With` has no "else" case, and
a falsy value for the data context will not prevent the content from
rendering.

{% apibox "Blaze.If" nested:true %}

Returns an unrendered View object you can pass to `Blaze.render`.

Matches the behavior of `{{#if}}` in templates.

{% apibox "Blaze.Unless" nested:true %}

Returns an unrendered View object you can pass to `Blaze.render`.

Matches the behavior of `{{#unless}}` in templates.

{% apibox "Blaze.Each" nested:true %}

Returns an unrendered View object you can pass to `Blaze.render`.

Matches the behavior of `{{#each}}` in templates.

{% apibox "Blaze.Template" %}

Templates defined by the template compiler, such as `Template.myTemplate`,
are objects of type `Blaze.Template` (aliased as `Template`).

In addition to methods like `events` and `helpers`, documented as part of
the [Template API](../api/templates.html), the following fields and methods are
present on template objects:

<dl class="objdesc">

{% dtdd name:"viewName" type:"String" id:"template_viewname" %}
  Same as the constructor argument.
{% enddtdd %}

{% dtdd name:"renderFunction" type:"Function" id:"template_renderfunction" %}
  Same as the constructor argument.
{% enddtdd %}

{% dtdd name:"constructView()" id:"template_constructview" %}
  Constructs and returns an unrendered View object.  This method is invoked
  by Meteor whenever the template is used, such as by `Blaze.render` or by
  `{{> foo}}` where `foo` resolves to a Template object.

  `constructView()` constructs a View using `viewName` and `renderFunction`
  as constructor arguments, and then configures it as a template
  View, setting up `view.template`, `view.templateInstance()`, event maps, and so on.
{% enddtdd %}

</dl>

{% apibox "Blaze.isTemplate" %}

## Renderable Content

A value is *renderable content* if it is one of the following:

* A [template object](../api/templates.html) like `Template.myTemplate`
* An unrendered [View](../api/blaze.html#Blaze-View) object, like the return value of `Blaze.With`
* `null` or `undefined`

> Internally, renderable content includes objects representing HTML tags
as well, but these objects are not yet part of the officially-supported,
public API.

# Spacebars

Documentation of Meteor's `spacebars` package.

Spacebars is a Meteor template language inspired by
[Handlebars](http://handlebarsjs.com/).  It shares some of the spirit and syntax
of Handlebars, but it has been tailored to produce reactive Meteor templates
when compiled.

## Getting Started

A Spacebars template consists of HTML interspersed with template tags, which are
delimited by `{{` and `}}` (two curly braces).

```html
<template name="myPage">
  <h1>{{pageTitle}}</h1>

  {{> nav}}

  {{#each posts}}
    <div class="post">
      <h3>{{title}}</h3>
      <div class="post-content">
        {{{content}}}
      </div>
    </div>
  {{/each}}
</template>
```

As illustrated by the above example, there are four major types of template
tags:

* `{{pageTitle}}` - Double-braced template tags are used to insert a string of
  text.  The text is automatically made safe.  It may contain any characters
  (like `<`) and will never produce HTML tags.

* `{{> nav}}` - Inclusion template tags are used to insert another template by
  name.

* `{{#each}}` - Block template tags are notable for having a block of content.
  The block tags `#if`, `#each`, `#with`, and `#unless` are built in, and it is
  also possible define custom ones.  Some block tags, like `#each` and `#with`,
  establish a new data context for evaluating their contents.  In the above
  example, `{{title}}` and `{{content}}` most likely refer to properties of the
  current post (though they could also refer to template helpers).

* `{{{content}}}` - Triple-braced template tags are used to insert raw HTML.  Be
  careful with these!  It's your job to make sure the HTML is safe, either by
  generating it yourself or sanitizing it if it came from a user input.

## Reactivity Model


Spacebars templates update reactively at a fine-grained level in response to
changing data.

Each template tag's DOM is updated automatically when it evaluates to a new
value, while avoiding unnecessary re-rendering as much as possible.  For
example, a double-braced tag replace its text node when its text value changes.
An `#if` re-renders its contents only when the condition changes from truthy to
falsy or vice versa.

## Identifiers and Paths


A Spacebars identifier is either a JavaScript identifier name or any string
enclosed in square brackets (`[` and `]`).  There are also the special
identifiers `this` (or equivalently, `.`) and `..`.  Brackets are required to
use one of the following as the first element of a path: `else`, `this`, `true`,
`false`, and `null`.  Brackets are not required around JavaScript keywords and
reserved words like `var` and `for`.

A Spacebars path is a series of one or more identifiers separated by either `.`
or `/`, such as `foo`, `foo.bar`, `this.name`, `../title`, or `foo.[0]` (numeric indices must be enclosed in brackets).

## Name Resolution

The first identifier in a path is resolved in one of two ways:

* Indexing the current data context.  The identifier `foo` refers to the `foo`
  property of the current data context object.

* As a template helper.  The identifier `foo` refers to a helper function (or
  constant value) that is accessible from the current template.

Template helpers take priority over properties of the data context.

If a path starts with `..`, then the *enclosing* data context is used instead of
the current one.  The enclosing data context might be the one outside the
current `#each`, `#with`, or template inclusion.

## Path Evaluation

When evaluating a path, identifiers after the first are used to index into the
object so far, like JavaScript's `.`.  However, an error is never thrown when
trying to index into a non-object or an undefined value.

In addition, Spacebars will call functions for you, so `{{foo.bar}}` may be
taken to mean `foo().bar`, `foo.bar()`, or `foo().bar()` as appropriate.

## Helper Arguments

An argument to a helper can be any path or identifier, or a string, boolean, or
number literal, or null.

Double-braced and triple-braced template tags take any number of positional and
keyword arguments:

```html
{{frob a b c verily=true}}
```
calls:
```js
frob(a, b, c, Spacebars.kw({verily: true}))
```

`Spacebars.kw` constructs an object that is `instanceof Spacebars.kw` and whose
`.hash` property is equal to its argument.

The helper's implementation can access the current data context as `this`.

## Inclusion and Block Arguments

Inclusion tags (`{{> foo}}`) and block tags (`{{#foo}}`) take a single
data argument, or no argument.  Any other form of arguments will be interpreted
as an *object specification* or a *nested helper*:

* **Object specification**: If there are only keyword arguments, as in `{{#with
  x=1 y=2}}` or `{{> prettyBox color=red}}`, the keyword arguments will be
  assembled into a data object with properties named after the keywords.

* **Nested Helper**: If there is a positional argument followed by other
  (positional or keyword arguments), the first argument is called on the others
  using the normal helper argument calling convention.

## Template Tag Placement Limitations

Unlike purely string-based template systems, Spacebars is HTML-aware and
designed to update the DOM automatically.  As a result, you can't use a template
tag to insert strings of HTML that don't stand on their own, such as a lone HTML
start tag or end tag, or that can't be easily modified, such as the name of an
HTML element.

There are three main locations in the HTML where template tags are allowed:

* At element level (i.e. anywhere an HTML tag could go)
* In an attribute value
* In a start tag in place of an attribute name/value pair

The behavior of a template tag is affected by where it is located in the HTML,
and not all tags are allowed at all locations.

### Double-braced Tags

A double-braced tag at element level or in an attribute value typically evalutes
to a string.  If it evalutes to something else, the value will be cast to a
string, unless the value is `null`, `undefined`, or `false`, which results in
nothing being displayed.

Values returned from helpers must be pure text, not HTML.  (That is, strings
should have `<`, not `&lt;`.)  Spacebars will perform any necessary escaping if
a template is rendered to HTML.

### SafeString

If a double-braced tag at element level evalutes to an object created with
`Spacebars.SafeString("<span>Some HTML</span>")`, the HTML is inserted at the
current location.  The code that calls `SafeString` is asserting that this HTML
is safe to insert.

## In Attribute Values

A double-braced tag may be part of, or all of, an HTML attribute value:

```html
<input type="checkbox" class="checky {{moreClasses}}" checked={{isChecked}}>
```

An attribute value that consists entirely of template tags that return `null`,
`undefined`, or `false` is considered absent; otherwise, the attribute is
considered present, even if its value is empty.

### Dynamic Attributes

A double-braced tag can be used in an HTML start tag to specify an arbitrary set
of attributes:

```html
<div {{attrs}}>...</div>

<input type=checkbox {{isChecked}}>
```

The tag must evaluate to an object that serves as a dictionary of attribute name
and value strings.  For convenience, the value may also be a string or null.  An
empty string or null expands to `{}`.  A non-empty string must be an attribute
name, and expands to an attribute with an empty value; for example, `"checked"`
expands to `{checked: ""}` (which, as far as HTML is concerned, means the
checkbox is checked).

To summarize:

<table>
  <thead>
    <tr><th>Return Value</th><th>Equivalent HTML</th></tr>
  </thead>
  <tbody>
    <tr><td><code>""</code> or <code>null</code> or <code>{}</code></td></tr>
    <tr><td><code>"checked"</code> or <code>{checked: ""}</code></td><td><code>checked</code></td></tr>
    <tr><td><code>{checked: "", 'class': "foo"}</code></td><td><code>checked  class=foo</code></td></tr>
    <tr><td><code>{checked: false, 'class': "foo"}</code></td><td><code>class=foo</code></td></tr>
    <tr><td><code>"checked class=foo"</code></td><td>ERROR, string is not an attribute name</td></tr>
  </tbody>
</table>

You can combine multiple dynamic attributes tags with other attributes:

```html
<div id=foo class={{myClass}} {{attrs1}} {{attrs2}}>...</div>
```

Attributes from dynamic attribute tags are combined from left to right, after
normal attributes, with later attribute values overwriting previous ones.
Multiple values for the same attribute are not merged in any way, so if `attrs1`
specifies a value for the `class` attribute, it will overwrite `{{myClass}}`.
As always, Spacebars takes care of recalculating the element's attributes if any
of `myClass`, `attrs1`, or `attrs2` changes reactively.


## Triple-braced Tags

Triple-braced tags are used to insert raw HTML into a template:

```html
<div class="snippet">
  {{{snippetBody}}}
</div>
```

The inserted HTML must consist of balanced HTML tags.  You can't, for example,
insert `"</div><div>"` to close an existing div and open a new one.

This template tag cannot be used in attributes or in an HTML start tag.

## Inclusion Tags

An inclusion tag takes the form `{{> templateName}}` or `{{> templateName
dataObj}}`.  Other argument forms are syntactic sugar for constructing a data
object (see Inclusion and Block Arguments).

An inclusion tag inserts an instantiation of the given template at the current
location.  If there is an argument, it becomes the data context, much as if the
following code were used:

```html
{{#with dataObj}}
  {{> templateName}}
{{/with}}
```

Instead of simply naming a template, an inclusion tag can also specify a path
that evalutes to a template object, or to a function that returns a template
object.

Note that the above two points interact in a way that can be surprising!
If `foo` is a template helper function that returns another template, then
`{{>foo bar}}` will _first_ push `bar` onto the data context stack _then_ call
`foo()`, due to the way this line is expanded as shown above. You will need to
use `Template.parentData(1)` to access the original context. This differs
from regular helper calls like `{{foo bar}}`, in which `bar` is passed as a
parameter rather than pushed onto the data context stack.

## Function Returning a Template

If an inclusion tag resolves to a function, the function must return a template
object or `null`.  The function is reactively re-run, and if its return value
changes, the template will be replaced.

## Block Tags

Block tags invoke built-in directives or custom block helpers, passing a block
of template content that may be instantiated once, more than once, or not at all
by the directive or helper.

```html
{{#block}}
  <p>Hello</p>
{{/block}}
```

Block tags may also specify "else" content, separated from the main content by
the special template tag `{{else}}`.

A block tag's content must consist of HTML with balanced tags.

Block tags can be used inside attribute values:

```html
<div class="{{#if done}}done{{else}}notdone{{/if}}">
  ...
</div>
```

You can chain block tags:

```html
{{#foo}}
  <p>Foo</p>
{{else bar}}
  <p>Bar</p>
{{else}}
  <p></p>
{{/foo}}
```

This is equivalent to:

```html
{{#foo}}
  <p>Foo</p>
{{else}}
  {{#bar}}
    <p>Bar</p>
  {{else}}
    <p></p>
  {{/bar}}
{{/foo}}
```

## If/Unless

An `#if` template tag renders either its main content or its "else" content,
depending on the value of its data argument.  Any falsy JavaScript value
(including `null`, `undefined`, `0`, `""`, and `false`) is considered false, as
well as the empty array, while any other value is considered true.

```html
{{#if something}}
  <p>It's true</p>
{{else}}
  <p>It's false</p>
{{/if}}
```

`#unless` is just `#if` with the condition inverted.

## With

A `#with` template tag establishes a new data context object for its contents.
The properties of the data context object are where Spacebars looks when
resolving template tag names.

```html
{{#with employee}}
  <div>Name: {{name}}</div>
  <div>Age: {{age}}</div>
{{/with}}
```

We can take advantage of the object specification form of a block tag to define
an object with properties we name:

```html
{{#with x=1 y=2}}
  {{{getHTMLForPoint this}}}
{{/with}}
```

If the argument to `#with` is falsy (by the same rules as for `#if`), the
content is not rendered.  An "else" block may be provided, which will be
rendered instead.

If the argument to `#with` is a string or other non-object value, it may be
promoted to a JavaScript wrapper object (also known as a boxed value) when
passed to helpers, because JavaScript traditionally only allows an object for
`this`.  Use `String(this)` to get an unboxed string value or `Number(this)` to
get an unboxed number value.

## Each

An `#each` template tag takes a sequence argument and inserts its content for
each item in the sequence, setting the data context to the value of that item:

```html
<ul>
{{#each people}}
  <li>{{name}}</li>
{{/each}}
</ul>
```

The newer variant of `#each` doesn't change the data context but introduces a
new variable that can be used in the body to refer to the current item:

```html
<ul>
{{#each person in people}}
  <li>{{person.name}}</li>
{{/each}}
</ul>
```

The argument is typically a Meteor cursor (the result of `collection.find()`,
for example), but it may also be a plain JavaScript array, `null`, or
`undefined`.

An "else" section may be provided, which is used (with no new data
context) if there are zero items in the sequence at any time.

You can use a special variable `@index` in the body of `#each` to get the
0-based index of the currently rendered value in the sequence.

### Reactivity Model for Each

When the argument to `#each` changes, the DOM is always updated to reflect the
new sequence, but it's sometimes significant exactly how that is achieved.  When
the argument is a Meteor live cursor, the `#each` has access to fine-grained
updates to the sequence -- add, remove, move, and change callbacks -- and the
items are all documents identified by unique ids.  As long as the cursor itself
remains constant (i.e. the query doesn't change), it is very easy to reason
about how the DOM will be updated as the contents of the cursor change.  The
rendered content for each document persists as long as the document is in the
cursor, and when documents are re-ordered, the DOM is re-ordered.

Things are more complicated if the argument to the `#each` reactively changes
between different cursor objects, or between arrays of plain JavaScript objects
that may not be identified clearly.  The implementation of `#each` tries to be
intelligent without doing too much expensive work. Specifically, it tries to
identify items between the old and new array or cursor with the following
strategy:

1. For objects with an `_id` field, use that field as the identification key
2. For objects with no `_id` field, use the array index as the identification
   key. In this case, appends are fast but prepends are slower.
3. For numbers or strings, use their value as the identification key.

In case of duplicate identification keys, all duplicates after the first are
replaced with random ones. Using objects with unique `_id` fields is the way to
get full control over the identity of rendered elements.

## Let

The `#let` tag creates a new alias variable for a given expression. While it
doesn't change the data context, it allows to refer to an expression (helper,
data context, another variable) with a short-hand within the template:

```html
{{#let name=person.bio.firstName color=generateColor}}
  <div>{{name}} gets a {{color}} card!</div>
{{/let}}
```

Variables introduced this way take precedence over names of templates, global
helpers, fields of the current data context and previously introduced
variables with the same name.

## Custom Block Helpers

To define your own block helper, simply declare a template, and then invoke it
using `{{#someTemplate}}` (block) instead of `{{> someTemplate}}` (inclusion)
syntax.

When a template is invoked as a block helper, it can use `{{>
Template.contentBlock}}` and `{{> Template.elseBlock}}` to include the block
content it was passed.

Here is a simple block helper that wraps its content in a div:

```html
<template name="note">
  <div class="note">
    {{> Template.contentBlock}}
  </div>
</template>
```

You would invoke it as:

```html
{{#note}}
  Any content here
{{/note}}
```

Here is an example of implementing `#unless` in terms of `#if` (ignoring for the
moment that `unless` is a built-in directive):

```html
<template name="unless">
  {{#if this}}
    {{> Template.elseBlock}}
  {{else}}
    {{> Template.contentBlock}}
  {{/if}}
</template>
```

Note that the argument to `#unless` (the condition) becomes the data context in
the `unless` template and is accessed via `this`.  However, it would not work
very well if this data context was visible to `Template.contentBlock`, which is
supplied by the user of `unless`.

Therefore, when you include `{{> Template.contentBlock}}`, Spacebars hides the
data context of the calling template, and any data contexts established in the
template by `#each` and `#with`.  They are not visible to the content block,
even via `..`.  Put another way, it's as if the `{{> Template.contentBlock}}`
inclusion occurred at the location where `{{#unless}}` was invoked, as far as
the data context stack is concerned.

You can pass an argument to `{{> Template.contentBlock}}` or `{{>
Template.elseBlock}}` to invoke it with a data context of your choice.  You can
also use `{{#if Template.contentBlock}}` to see if the current template was
invoked as a block helper rather than an inclusion.

## Comment Tags

Comment template tags begin with `{{!` and can contain any characters except for
`}}`.  Comments are removed upon compilation and never appear in the compiled
template code or the generated HTML.

```html
{{! Start of a section}}
<div class="section">
  ...
</div>
```

Comment tags also come in a "block comment" form.  Block comments may contain
`{{` and `}}`:

```html
{{!-- This is a block comment.
We can write {{foo}} and it doesn't matter.
{{#with x}}This code is commented out.{{/with}}
--}}
```

Comment tags can be used wherever other template tags are allowed.

## Nested sub-expressions

Sometimes an argument to a helper call is best expressed as a return value of
some other expression. For this and other cases, one can use parentheses to
express the evaluation order of nested expressions.

```html
{{capitalize (getSummary post)}}
```

In this example, the result of the `getSummary` helper call will be passed to
the `capitalize` helper.

Sub-expressions can be used to calculate key-word arguments, too:

```html
{{> tmpl arg=(helper post)}}
```

## HTML Dialect

Spacebars templates are written in [standard
HTML](http://developers.whatwg.org/syntax.html) extended with
additional syntax (i.e. template tags).

Spacebars validates your HTML as it goes and will throw a compile-time
error if you violate basic HTML syntax in a way that prevents it from
determining the structure of your code.

Spacebars is not lenient about malformed markup the way a web browser
is.  While the latest HTML spec standardizes how browsers should
recover from parse errors, these cases are still not valid HTML.  For
example, a browser may recover from a bare `<` that does not begin a
well-formed HTML tag, while Spacebars will not.  However, gone are the
restrictions of the XHTML days; attribute values do not have to
quoted, and tags are not case-sensitive, for example.

You must close all HTML tags except the ones specified to have no end
tag, like BR, HR, IMG and INPUT.  You can write these tags as `<br>`
or equivalently `<br/>`.

The HTML spec allows omitting some additional end tags, such as P and
LI, but Spacebars doesn't currently support this.

## Top-level Elements in a `.html` file

Technically speaking, the `<template>` element is not part of the Spacebars
language. A `foo.html` template file in Meteor consists of one or more of the
following elements:

* `<template name="myName">` - The `<template>` element contains a Spacebars
  template (as defined in the rest of this file) which will be compiled to the
  `Template.myName` component.

* `<head>` - Static HTML that will be inserted into the `<head>` element of the
  default HTML boilerplate page. Cannot contain template tags. If `<head>` is
  used multiple times (perhaps in different files), the contents of all of the
  `<head>` elements are concatenated.

* `<body>` - A template that will be inserted into the `<body>` of the main
  page.  It will be compiled to the `Template.body` component. If `<body>` is
  used multiple times (perhaps in different files), the contents of all of the
  `<body>` elements are concatenated.

## Escaping Curly Braces

To insert a literal `{{`, `{{{`, or any number of curly braces, put a
vertical bar after it.  So `{{|` will show up as `{{`, `{{{|` will
show up as `{{{`, and so on.
