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
  * [html로 랜더링하기](#html로-랜더링하기)
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
  * [리랜더링(Re-rendering)](#리랜더링re-rendering)
  * [리랜더링 제어하기](#리랜더링-제어하기)
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
  * [`Template._name_`](#template_name_)
    * [`.events(callback)`](#eventscallback)
    * [`.helpers(helpers)`](#helpershelpers)
    * [`.onRendered(callback)`](#onrenderedcallback)
    * [`.onCreated(callback)`](#oncreatedcallback)
    * [`.onDestroyed(callback)`](#ondestroyedcallback)
  * [`Template.instances()`](#templateinstances)
    * [`.findAll(selector)`](#findallselector)
    * [`.$(selector)`](#selector)
    * [`.find(selector)`](#findselector)
    * [`.firstNode`](#firstnode)
    * [`.lastNode`](#lastnode)
    * [`.data`](#data)
    * [`.autorun(runFunc)`](#autorunrunfunc)
    * [`.subscribe(name, [arg1, arg2, ...], [options])`](#subscribename-arg1-arg2--options)
    * [`.view`](#view)
  * [`Template.registerHelper(name, function)`](#templateregisterhelpername-function)
  * [`Template.currentData()`](#templatecurrentdata)
  * [`Template.parentData(numLevels)`](#templateparentdatanumlevels)
  * [`Template.body`](#templatebody)
  * [`{{> Template.dynamic template=template [data=data]}}`](#-templatedynamic-templatetemplate-datadata)
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

Blaze는 Backbone 또는 다른 라이브러리보다 훨씬 적은 재 랜더링을 수행하며, 한 페이지에서 여러개의 템플릿이 독립적으로 업데이트 될 수 없는 "nested view" 문제로 고심하지 않아도 됩니다.
또한 Blaze는 트래커를 사용하여 다시 랜더링 해야 할 시기를 자동으로 결정합니다.

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
React는 트레커를 사용하지 않으므로 대신 효율적인 랜더링을 구현하기 위해 "setState" 호출 및 다른 데이터 모델 조합에 의존합니다.

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

Meteor의 프론트 엔드 랜더링 시스템 인 Blaze를 사용하여 사용 가능하고 관리 가능한 사용자 인터페이스를 구축하는 방법.

이 가이드를 읽으면 다음을 알 수 있습니다.

1. Spacebars 언어를 사용하여 Blaze 엔진으로 템플릿을 랜더링하는 방법.
2. Blaze에서 재사용 가능한 컴포넌트를 작성하는 모범 사례.
3. Blaze 랜더링 엔진이 내부적으로 작동하는 방식과 이를 사용하는 몇 가지 고급 기술.
4. Blaze 템플릿을 테스트하는 방법.

Blaze는 Meteor에 내장 된 반응형 랜더링 라이브러리입니다.
일반적으로 템플릿은 [Spacebars](#Spacebars-templates)로 작성되며, Meteor의 반응형 시스템인 [Tracker](https://github.com/meteor/meteor/tree/devel/packages/tracker)를 활용하도록 설계된 [Handlebars](http://handlebarsjs.com)의 변형입니다.
이러한 템플릿은 Blaze 라이브러리에서 랜더링되어 JavaScript UI 컴포넌트(구성요소)로 컴파일됩니다.

원문:

Blaze is not required to build applications in Meteor---you can also easily use [React](http://react-in-meteor.readthedocs.org/en/latest/) or [Angular](http://www.angular-meteor.com) to develop your UI. However, this particular article will take you through best practices in building an application in Blaze, which is used as the UI engine in all of the other articles.

번역:

Blaze는 Meteor에서 앱으로 빌드 할 필요가 없으며 [React](http://react-in-meteor.readthedocs.org/en/latest/)나 [Angular](http://www.angular-meteor.com)를 사용하여 UI를 쉽게 개발할 수 있습니다.
그러나 이 섹션에서는 Blaze에서 앱을 빌드하는 모범 사례를 안내합니다.
다른 모든 섹션에서 UI 엔진으로 사용합니다.

# 스페이스바 템플릿

스페이스바는 반응형으로 변하는 데이터 컨텍스트를 랜더링하는 핸들바와 같은 템플릿 언어 입니다.
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

이 템플릿은 `todo`라는 키값의 데이터 컨텍스트를 랜더링 할 때 하나의 오브젝트화 하였음을 예상할 수 있습니다.
(어떻게 동작하는지는 [여기](#데이터-구조-유효성검사)를 참조)
우리는 `{{todo.text}}`와 같이 중괄호 테그를 사용하여 `todo`의 속성(properties)에 접근할 수 있습니다.
기본적으로 속성을 문자열로 랜더링 하지만 (`checked={{todo.checked}}`와 같은)일부 속성은 Boolean값으로 해석합니다.

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
`Lists_show` 템플릿에서 `todos`의 리스트를 랜더링 하는 것을 예로 들어봅시다:

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

- `{{#each .. in}}`블럭은 배열 또는 커서를 루프하여 각각을 HTML 엘리먼트로 랜더링하며 항목이 없는 경우 `{{else}}`블럭을 실행(랜더링)합니다.
- 템플릿 내 `{{> Todos_item (todoArgs todo)}}` 부분은 `Todos_item`헬퍼가 반환하는 데이터 컨텍스트를 랜더링 합니다.

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

## HTML로 랜더링하기

기본적으로 중괄호 태그는 [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)를 방지하기 위해 HTML태그를 이스케이프하지만, HTML로 랜더링 할 필요가 있을 경우 `{{{  }}}`와 같이 중괄호가 한번 더 들어간 태그를 이용할 수 있습니다.

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

`{{# }}`와 함께 쓰이는 헬퍼를 블럭핼퍼라고 부르며 이것은 HTML을(또는 랜더링할 어떠한 것이든) 블럭화 합니다.
예를들어 우리는 앞서 헬퍼가 가지고 있는 리스트에서 하나하나의 HTML을 `{{#each .. in}}`을 통해 블럭화 하여 반복하는 것을 보았습니다.
또한 `Template.contentBlock`, `Template.elseBlock`를 사용하여 블럭헬퍼를 랜더링 할 수 있습니다.
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
<!-- 이것은 <h1>중괄호 예제1 {{}}</h1> 처럼 랜더링 될 것이다 -->
<h1>중괄호 예제1 {{|}}</h1>

<!-- 이것은 <h1>중괄호 예제2 {{{}}}</h1> 처럼 랜더링 될 것이다 -->
<h1>중괄호 예제2 {{{|}}}</h1>
```

***

# Blaze에서 재사용가능한 컨포넌트

Meteor 가이드 [UI/UX](https://guide.meteor.com/ui-ux.html#smart-components) 섹션에서 명확하고 최소한의 방법으로 재사용 가능한 구성요소를 만드는 것이 장점이라고 했습니다.

템플릿 기반의 간단한 랜더링 엔진인 Blaze는 React나 Angular와는 달리 이러한 원칙을 적용하지는 않았지만, Blaze 구성 요소를 작성할 때 몇 가지 규칙을 따르면 대부분의 동일한 이점을 누릴 수 있습니다.
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

또한 명확성을 위해 데이터 컨텍스트를 상속받는 템플릿을 랜더링 할 때 데이터 컨텍스트는 명시적이여야 합니다.

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
일반적으로이를 해결하려면 하위 구성 요소를 사용하여 루프 내부를 랜더링합니다:

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
또한 메인 다큐먼트의 랜더링 옵션을 제한합니다.

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
그러면 하위 구성요소는 아래의 방법을 사용하여 해당 구성요소를 랜더링 할 수 있습니다.

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

위에서 언급했듯이 `onRendered()`콜백은 컴포넌트가 처음 랜더링 되어 DOM에 추가된 후 *한번만 호출되므로*, 일반적으로 제3자 라이브러리를 호출하기 적당합니다(예를들어 jQuery 플러그인 호출).

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
      // 이 작업을 수행하지 않으면 항목을 검사 할 때마다 전체 목록이 다시 랜더링됩니다.
      // 목록에있는 반응을 관심있는 영역으로 격리시킴으로써 우리는 그것이 일어나지 않도록합니다.
      list() {
        return Lists.findOne(listId);
      },
      // 원문:
      // By finding the list with only the `_id` field set, we don't create a dependency on the
      // `list.incompleteCount`, and avoid re-rendering the todos when it changes
      // 번역:
      // `_id` 필드만 설정된리스트를 찾음으로써 우리는`list.incompleteCount`에 의존성을
      // 생성하지않고 변경될 때 todos를 다시 랜더링하는 것을 피합니다
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

Blaze는 매우 직관적인 랜더링 시스템이지만 복잡한 작업을 수행하려고 할 때 알아야 할 몇 가지 단점과 복잡성이 있습니다.

## 리랜더링(Re-rendering)

블레이즈는 리랜더링 하는 것에 불투명합니다.
Tracker와 Blaze는 궁극적으로 모든 데이터 변경을 완전히 반영하는 "궁극적인 일관성"시스템으로 설계되었습니다.
그러나 사용 방법에 따라 약간의 재실행이나 재 랜더링이 필요할 수 있습니다.
구성요소가 리랜더링 될 때를 신중하게 제어하려고 했다면 실망스러울 수 있습니다.

첫번째로 고려해야 할 점은 '정말로 구성요소가 리랜더링 되는 것을 제어할 필요가 있는가'? 입니다.
Blaze는 최적화 되어있으므로 일반적으로 구성요소의 리랜더링 여부는 고려할 필요가 없습니다.
당신의 헬퍼를 실행하여 랜더링 되는 부분이 가볍다고 확신할 경우 이것은 걱정할 필요가 없습니다.

원문:

The main thing to understand about how Blaze re-renders is that re-rendering happens at the level of helpers and template inclusions.
Whenever the *data context* of a component changes, it necessarily must re-run *all* helpers and data accessors (as `this` within the helper is the data context and thus will have changed).

번역:

Blaze는 헬퍼와 템플릿을 포함하는 단계에서 리랜더링이 일어난다는 점을 이해하는 것이 중요합니다.
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

## 리랜더링 제어하기

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

즉, Blaze 템플릿을 랜더링 할 때 클라이언트에서 `.html`파일로 정의한 스페이스바 콘텐츠에 해당하는 함수를 실행하는 것입니다.

## 뷰(view)란 무엇입니까?

Blaze의 가장 핵심 개념 중 하나인 '뷰'는 템플릿의 반응적 랜더링 영역을 나타내는 구축영역입니다.
뷰는 반응형을 추적하고 검색하며, 데이터가 변경 될 때 적절하게 다시 랜더링하기 위해 화면 뒤에서 작동하는 장치입니다.
뷰는 Blaze에서 리랜더링 되는 단위입니다.
뷰 트리를 사용하여 랜더링 된 구성요소 계층을 처리할 수도 있습니다.
그러나 구성요소간 원활한 통신을 위하여 이 방법보다는 콜백, 템플릿 인자, 글로벌 데이터 저장소를 사용하는 것이 좋습니다.

더 많은 정보는 [Blaze View](../api/blaze.html#Blaze-View)에서 볼 수 있습니다.

# 라우터

블레이즈 템플릿의 랜더링을 지원하는 라우팅 패키지 목록입니다.

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

**코드라인**: [blaze/template.js, line 78](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L78)

**인자:**

- callback (function): 콜백용으로 추가되는 함수

**설명:**

이 메서드에 추가된 콜벡 함수는 템플릿 인스턴스에서 한번만 호출됩니다.
템플릿은 DOM 노드로 랜더링 된 다음 처음으로 문서에 삽입됩니다.

콜백 내에서 `this`는 템플릿의 리랜더링과 관계없이 유일한 [템플릿 인스턴스](#templateinstance)입니다.

템플릿이 랜더링 되었기 때문에 DOM 노드를 탐색하는 [`this.findAll()`](#findall)과 같은 메서드를 사용할 수 있습니다.

템플릿을 처음 랜더링 한 후에 DOM을 조작하기 용이한 시점입니다..

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
  // 랜더링이 된 다음이므로 이제 jQuery 플러그인을 사용합니다.
  this.$('.container').packery({
    itemSelector: '.item',
    gutter: 10
  });
});
```

### `.onCreated(callback)`

**사용영역:** 클라이언트

**코드라인**: [blaze/template.js, line 65](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L65)

**인자:**

- callback (function): 콜백용으로 추가되는 함수

**설명:**

이 메서드에 추가된 콜벡함수는 템플릿 로직이 처음 실행되기 전에 호출됩니다.
콜백 내의 `this`는 새로운 [템플릿 인스턴스](#templateinstance) 객체입니다.
(이 시점에서) 이 객체에 추가하는 프로퍼티들은 `onRendered`, `onDestroyed` 및 이벤트 헨들러의 콜벡에서 접근할 수 있습니다.

원문: These callbacks fire once and are the first group of callbacks to fire.
Handling the `created` event is a useful way to set up values on template
instance that are read from template helpers using `Template.instance()`.

번역: 이 콜백은 한번만 실행되며 콜백그룹의 첫번째 입니다.
`created` 이벤트는 템플릿 인스턴스를 설정하기에 매우 유용하며, `Template.instance()`를 사용하여 템플릿 헬퍼가 읽습니다.

```js
Template.myPictures.onCreated(function () {
  // 지역 반응형 변수를 설정합니다.
  this.highlightedPicture = new ReactiveVar(null);
  
  // 원문: register this template within some central store
  // 번역: 중앙 저장소에 템플릿을 추가합니다.
  GalleryTemplates.push(this);
});
```

### `.onDestroyed(callback)`

**사용영역:** 클라이언트

**코드라인**: [blaze/template.js, line 91](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L91)

**인자:**

- callback (function): 콜백용으로 추가되는 함수

**설명:**

이 콜백은 어떤 이유로든 템플릿이 페이지에서 제거되고 다시 랜더링으로 대체되지 않을 때 호출됩니다.
콜백 안에서 'this'는 파괴된 [템플릿 인스턴스](#templateinstance) 객체입니다.

이 콜백은 `created`, `rendered`에서 설정한 어떠한 효과를 정리하거나 취소하는데 유용한 시점입니다.
이 콜백은 한 번만 실행되는 마지막 콜백입니다.

```js
Template.myPictures.onDestroyed(function () {
  // 원문: deregister from some central store
  // 번역: 중앙 저장소에 템플릿을 제거합니다.
  GalleryTemplates = _.without(GalleryTemplates, this);
});
```

## `Template.instances()`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 505](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L505)

**설명:**

템플릿 인스턴스 객체는 문서의 템플릿 내에서 생깁니다.
이것은 DOM을 조회할 때 사용할 수 있으며, 템플릿이 반응형으로 업데이트 되더라도 이것의 프로퍼티는 유지됩니다.

템플릿 인스턴스 객체는 `onCreated`, `onRendered`, `onDestroyed`에서는 `this`로 이벤트 헨들러에서는 두번째 인자로 접근할 수 있습니다.
`Template.instance()`를 사용하여 헬퍼에서 현재 탬플릿의 인스턴스에 접근할 수도 있습니다.

아래 세부섹션별로 나열된 속성 및 함수 외에도 추가 속성을 개체에 지정할 수 있습니다.
[`onCreated`](#oncreatedcallback) 또는 [`onDestroyed`](#ondestroyedcallback)메서드의 콜백을 사용하여 객체에 사용자 속성을 초기화 또는 정리 작업을 할 수 있습니다.

`.findAll()`, `.find()`, `.firstNode`, `.lastNode`는 오직 `onRendered`에서만 사용 가능합니다.
`onCreated`와 `onDestroyed`는 템플릿 인스턴스에 DOM이 없으므로 사용할 수 없습니다.

템플릿 인스턴스 객체는 `instanceof Blaze.TemplateInstance`입니다.

### `.findAll(selector)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 304](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L304)

**인자:**

- selector (string): 템플릿 컨텐츠 내에 매치시킬 CSS 셀렉터.

**설명:**

이 템플릿 인스턴스에서 `selector`와 일치하는 모든 DOM 엘리먼트를 반환합니다.

### `.$(selector)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 291](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L291)

**인자:**

- selector (string): 템플릿 컨텐츠 내에 매치시킬 CSS 셀렉터.

**설명:**

이 템플릿 인스턴스에서 `selector`와 일치하는 모든 엘리먼트를 jQuery 객체로 반환합니다.

`template.$`은 같은 요소의 [jQuery 객체](http://api.jquery.com/Types/#jQuery)를 반환합니다.
jQuery 객체는 배열과 비슷하며 jQuery 라이브러리에 의해 정의 된 추가 메서드가 있습니다.

템플릿과 하위 템플릿에 해당하는 범위에서만 셀렉터로 조회할 수 있습니다.

### `.find(selector)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 314](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L314)

**인자:**

- selector (string): 템플릿 컨텐츠 내에 매치시킬 CSS 셀렉터.

**설명:**

이 템플릿 인스턴스에서 `selector`와 처음 일치하는 하나의 DOM 엘리먼트를 반환합니다.

템플릿과 하위 템플릿에 해당하는 범위에서만 셀렉터로 조회할 수 있습니다.

### `.firstNode`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 254](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L254)

**설명:**

이 템플릿 인스턴스 첫번째 DOM 노드를 나타냅니다.

`firstNode`와 `lastNode`는 이 템플릿 인스턴스의 DOM 범위를 나타냅니다.
이 두 노드는 형제관계이므로 부모가 같으며 `lastNode`는 `firstNode`뒤에 옵니다.
그렇지 않을 경우 두 노드는 하나의 노드를 가리키는 것입니다.

### `.lastNode`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 264](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L264)

**설명:** 이 템플릿 인스턴스 마지막 DOM 노드를 나타냅니다.

### `.data`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 161](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L161)

**설명:**

인스턴스의 최신 데이터 컨텍스트를 나타냅니다.

이 속성은 해당 템플릿의 최상위 레벨에 있는 데이터 컨텍스트를 조회합니다.
템플릿이 리랜더링 될 때마다 업데이트 됩니다.
이 조회는 읽기 전용이며 반응형이 아닙니다.

### `.autorun(runFunc)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 324](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L324)

**인자:**

- runFunc (function): Tracker에서 실행할 함수.

[`onCreated`](../api/templates.html#Template-onCreated) 또는 [`onRendered`](../api/templates.html#Template-onRendered)의 콜백에서 `this.autorun()`을 사용하여 반응적으로 DOM이나 템플릿 인스턴스를 업데이트 할 수 있습니다.
이 콜백 내부에서 `Template.currentData()`를 사용하여 템플릿 인스턴스의 데이터 컨텍스트를 반응적으로 조회할 수 있습니다.
템플릿이 삭제되면 연산이 중지됩니다.

`template.view.autorun`의 별칭입니다.

### `.subscribe(name, [arg1, arg2, ...], [options])`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 347](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L347)

**인자:**

- name (string): 서브스크립션의 이름입니다. 서버의 `publish()`를 콜하는 이름과 일치합니다.

- arg1, arg2, ... (any): 서버의 퍼블리셔에 전달될 인자들 입니다.

- options

  - onReady (function): [Meteor.subscript](https://docs.meteor.com/api/pubsub.html#Meteor-subscribe)로 전달할 것.

  - onStop (function): [Meteor.subscript](https://docs.meteor.com/api/pubsub.html#Meteor-subscribe)로 전달할 것.

  - connection ([DDP Connection](https://docs.meteor.com/api/connections.html#DDP-connect)): 서브스크립션을 만들 커넥션.

**설명:**

템플릿이 파괴될때([destroyed](#ondestroyedcallback)) 사라질 [`Meteor.subscribe`](https://docs.meteor.com/api/pubsub.html#Meteor-subscribe)을 가리킵니다.

[`onCreated()`](#oncreatedcallback)의 콜백에서 `this.subscribe()`를 사용하여 템플릿에 의존하는 데이터 퍼블리케이션을 만들 수 있습니다.
템플릿이 삭제되면 서브스크립션은 중지됩니다.

`this.subscribe`으로 호출된 모든 서브스크립션이 준비되면 true를 리턴하는 `Template.instance().subscriptionsReady()`라는 함수가 보조적으로 있습니다.

HTML 템플릿 내에는 `Template.subscriptionsReady`라는 기본 내장 헬퍼가 있습니다.
이것을 이용하여 서브스크립션 완료 여부에 따른 템플릿 노출이 가능합니다.

예를들어:

```js
Template.notifications.onCreated(function () {
  // onCreated 내에서 this.subscribe을 사용합니다.
  this.subscribe("notifications");
});
```

```html
<template name="notifications">
  {{#if Template.subscriptionsReady}}
    <!-- 모든 데이터가 준비되면 표시됩니다. -->
    {{#each notifications}}
      {{> notification}}
    {{/each}}
  {{else}}
    Loading...
  {{/if}}
</template>
```

데이터 컨텍스트에 의존하는 서브스크립션 사용에 대한 예:

```js
Template.comments.onCreated(function () {
  // 반응적 데이터 구조에 맞춰 갱신되는 this.subscribe을 사용합니다.
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

서브스크립션이 완료되었을 때 플러그인을 초기화 하는 예:

```js
Template.listing.onRendered(function () {
  var template = this;
  
  template.subscribe('listOfThings', () => {
    // 콜백을 사용하여 데이터 로드가 완료될 때까지 기다립니다.
    Tracker.afterFlush(() => {
      // Tracker.afterFlush를 사용하여 UI가 리렌더될 때까지 기다린 후
      // highlight.js를 실행시켜 코드스니펫을 활성화 합니다.
      highlightBlock(template.find('.code'));
    });
  });
});
```

### `.view`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 243](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L243)

**설명:**

원문: The [View](http://blazejs.org/api/blaze.html#Blaze-View) object for this invocation of the template.

번역: 이 템플릿을 호출 할 때 [View](http://blazejs.org/api/blaze.html#Blaze-View) 객체입니다.

## `Template.registerHelper(name, function)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 556](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L556)

**설명:** 모든 템플릿에서 사용할 수 있는 헬퍼 함수를 정의합니다.

## `Template.currentData()`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 537](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L537)

**설명:**

- `onCreated`, `onRendered`, `onDestroyed`의 콜백 내에서 템플릿의 데이터 컨텍스트를 반환합니다.

- 이벤트 헨들러 내부에서 헨들러가 정의된 데이터 컨텍스트를 반환합니다.

- 헬퍼 내에서 헬퍼가 사용된 DOM 노드의 데이터 컨텍스트를 반환합니다.

이 메서드의 결과는 반응형으로 동작합니다.

## `Template.parentData(numLevels)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 546](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L546)

**인자:**

- numLevels (number(integer)):

**설명:**

원문:

Accesses other data contexts that enclose the current data context.

For example, `Template.parentData(0)` is equivalent to `Template.currentData()`.
`Template.parentData(2)` is equivalent to `{{../..}}` in a template.

번역:

현재 데이터 컨텍스트를 포함하는 다른 데이터 컨텍스트에 액세스합니다.

예를 들어, `Template.parentData(0)`는 `Template.currentData()`와 같습니다.
`Template.parentData(2)`는 템플릿의 `{{../..}}`과 같습니다.

## `Template.body`

**사용영역:** 클라이언트

**코드라인:** [templating-runtime/templating.js, line 47](https://github.com/meteor/blaze/blob/master/packages/templating-runtime/templating.js#L47)

**설명:**

`<body>` 태그를 나타내는 탬플릿 객체입니다.

`Template._name_`과 마찬가지로 `Template.body`에 헬퍼나 이벤트 맵을 정의할 수 있습니다.

`Template.body`에 등록된 헬퍼는 `<body>`테그애서만 사용 가능합니다.
글로벌 헬퍼를 사용하고 싶다면 [`Template.registerHelper()`](#templateregisterhelpernamefunction)를 사용하십시요.
`Template.body`의 이벤트 맵은 `Blaze.render`, jQuery, DOM API, 에 의해 추가되는 엘리먼트나 `<body>` 자체에는 적용되지 않습니다.
`<body>`나 window 또는 document에 대한 직접적인 이벤트 헨들러 추가는 jQuery 또는 DOM API를 사용하십시요.

## `{{> Template.dynamic template=template [data=data]}}`

**사용영역:** 템플릿(templates)

**코드라인:** [templating-runtime/dynamic.js, line 3](https://github.com/meteor/blaze/blob/master/packages/templating-runtime/dynamic.js#L3)

**인자:**

- template (string): 템플릿의 이름

- data (object): *선택적*. 해당 템플릿에 들어갈 데이터 컨텍스트

**설명:**

`Template.dynamic`는 첫번째 인자로 템플릿 이름을 전달하여 템플릿을 반응형(동적)으로 변환할 수 있습니다.
`data`인자는 *선택적*이므로 생략가능하며, 생략할 경우 현재 데이터 컨텍스트가 적용됩니다.
`Template.dynamic`는 블록 헬퍼이므로 `{{#Template.dynamic}} ... {{/Template.dynamic}}`와 같이 사용할 수도 있습니다.

예를들어 "foo"라는 이름의 템플릿이 있다면, `{{> Template.dynamic template="foo"}}`는 `{{> foo}}`와 같습니다.
`{{#Template.dynamic template="foo"}} ... {{/Template.dynamic}}`와 같이 사용하였다면 이것은 `{{#foo}} ... {{/foo}}`로 사용한 것과 같습니다.

# Blaze

Meteor의 반응형 랜더링 엔진인 Blaze에 대해 다룹니다.

Blaze는 반응형 템플릿을 만드는 페키지 입니다.
Blaze API를 사용하여 프로그레밍 적으로 템플릿을 구성하고 반응적으로 "View(보여지는 부분)"를 컨트롤 할 수 있습니다.

## `.render(template *or* View, parentNode, [nextNode], [parentView])`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 609](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L609)

**인자:**

- template *or* View (Blaze.Template or Blaze.View): 랜더링 할 템플릿 또는 뷰 객체.
<br>템플릿의 경우 뷰 객체가 생성됩니다.
<br>뷰의 경우 랜더링 된 뷰이어야 합니다.

- parentNode (DOM Node): 랜더링 된 템플릿의 부모가 될 노드이어야 하며, 이것은 반드시 엘리먼트 노드 이어야 합니다.

- nextNode (DOM Node): *선택적*. 사용할 경우 반드시 'parentNode'의 자식 노드이어야 합니다.
이 노드는 'templateOrView' 뒤에 위치합니다.

- parentView (Blaze.View): *선택적*. 사용할 경우 랜더링 된 뷰의 부모 뷰가 됩니다.

**설명:**

템플릿 또는 뷰를 DOM 노드에 랜더링하여 삽입하면 `Blaze.remove()`로 전달될 수 있는 랜더링 된 뷰가 반환됩니다.

템플릿을 랜더링 할 때 `onCreated`의 콜백을 실행 한 후 현재 템플릿을 평가합니다.
`onRendered`의 콜백은 뷰가 랜더링 된 후 DOM에 삽입되고 나서 실행됩니다.

랜더링 된 템플릿은 `Blaze.remove()`에 의해 뷰가 제거되거나, Meteor 또는 jQuery에 의해 뷰의 부모 엘리먼트가 제거될 때까지 데이터 변경에 반응적으로 업데이트 됩니다.

> Meteor 또는(기본적으로 Meteor와 통합되는)다른 메커니즘을 통해 뷰가 제거된 경우 뷰는 무한정으로 계속 업데이트될 수 있습니다.
> 대부분의 사용자는 템플릿을 수동으로 랜더링하여 DOM에 삽입할 필요가 없지만, 수동으로 랜더링 할 경우에는 뷰가 더 이상 필요하지 않을 때 항상 `Blaze.remove`로 제거하십시오.

## `.renderWithData(template or View, data, parentNode, [nextNode], [parentView])`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 660](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L660)

**인자:**

- template *or* View (Blaze.Template or Blaze.View): 랜더링 할 템플릿 또는 뷰 객체.

- data (object or function): 사용할 데이터 컨텍스트 객체 또는 그 값을 리턴할 함수. 함수를 사용할 경우 반응형으로 다시 실행됩니다.

- parentNode (DOM Node): 랜더링 된 템플릿의 부모가 될 노드이어야 하며, 이것은 반드시 엘리먼트 노드 이어야 합니다.

- nextNode (DOM Node): *선택적*. 사용할 경우 반드시 'parentNode'의 자식 노드이어야 합니다.
이 노드는 'templateOrView' 뒤에 위치합니다.

- parentView (Blaze.View): *선택적*. 사용할 경우 랜더링 된 뷰의 부모 뷰가 됩니다.

**설명:**

데이터 컨텍스트를 사용하여 템플릿 또는 뷰를 DOM노드에 추가합니다.
그렇지 않으면 Blaze.render와 동일합니다.

`Blaze.renderWithData(Template.myTemplate, data)`는 `Blaze.render(Blaze.With(data, function () { return Template.myTemplate; }))`와 기본적으로 동일하게 동작합니다.

## `.remove(renderedView)`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 672](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L672)

**인자:**

- renderedView (Blaze.View): `Blaze.render()`또는 `Blaze.renderWithData()`의 반환 값 또는 `Blaze.Template.instance().view`.
템플릿 이벤트 핸들러 내에서 `Blaze.remove(Template.instance().view)`를 호출하면 템플릿뿐만 아니라 뷰도 파괴되고 템플릿 핸들러인 `onDestroyed`가 트리거 됩니다.

**설명:**

DOM에 랜더링 된 뷰를 제거하여 모든 반응 업데이트 및 이벤트 수신기를 중지합니다.
또한 뷰에 연결된 `Blaze.Template.instance()`를 소멸(destroys)시킵니다.

`Blaze.remove()`를 사용하면 템플릿 또는 `Blaze.render()`에 의해 삽입된 뷰가 삭제되며, Meteor가 DOM에 연결된 동작을 정리합니다.
이제 랜더링 됬던 템플릿 또는 뷰는 [소멸됨](#ondestroyedcallback)으로 간주됩니다.
뿐만 아니라, jQuery에 의해 DOM에 추가된 노드들도 모두 삭제됩니다(jQuery로 `$(...).remove()`를 사용한 것처럼).

[`Blaze.render()`](#rendertemplateorview-parentnode-nextnode-parentview)에서 언급한 바와 같이, `Blaze.render()`에 의해 랜더링 된 컨텐츠를 `Blaze.remove()` 또는 랜더링 된 뷰의 부모 노드 제거를 통하여 삭제하는 것은 중요합니다.
`Blaze.remove()`는 DOM 노드가 이미 문서에서 제거되었음에도 Blaze가 이 노드를 추적 및 업데이트 하려고 하는 문제를 중단시키는데 사용할 수 있습니다.

## `.getData([element or View])`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 738](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L738)

**인자:**

- element or View (DOM Element or Blaze.View): Meteor 또는 뷰에서 랜더링 된 엘리먼트.

**설명:**

현재 데이터 컨텍스트 또는 Meteor 템플릿에서 특정 DOM요소 또는 뷰를 랜더링 할 때 사용된 데이터 컨텍스트를 반환합니다.

## `.toHTML(template or View)`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 693](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L693)

**인자:**

- template or View (Blaze.Template or Blaze.View): HTML을 생성할 템플릿 또는 뷰 객체

**설명:**

템플릿 또는 뷰 객체를 랜더링하여 HTML형식의 문자열 값으로 변환합니다.
그러므로 반응형 기능을 활용할 수 없습니다.
템플릿 또는 뷰를 랜더링하는 일반적인 방법은 `{{> myTemplate}}`과 같이 템플릿 내에서 랜더링 할 탬플릿을 호출하거나 `Blaze.render()`를 사용합니다.
`.toHTML()`은 드물게 HTML로 변환해야 할 경우에만 유용합니다.

원문:

Instead, any reactive data changes will invalidate the current Computation if there is one
(for example, an autorun that is the caller of `Blaze.toHTML`).

번역:

`Blaze.toHTML()`은 문자열을 반환하기 때문에 반응형 데이터 변화에 따라 DOM을 업데이트할 수 없다.
대신, 어떠한 반응형 데이터라도 변경이 일어나면 현재 계산은 무효화됩니다(예:`Blaze.toHTML`의 호출자인 오토런).

## `.toHTMLWithData(template or View, data)`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 705)](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L705)

**인자:**

- template or View (Blaze.Template or Blaze.View): HTML을 생성할 템플릿 또는 뷰 객체

- data (object or function): 사용할 데이터 컨텍스트 객체 또는 그 값을 리턴할 함수.

**설명:** 데이터 컨텍스트와 함께 템플릿 또는 뷰를 랜더링 합니다. 그 외에는 `Blaze.toHTML`과 동일합니다.

## `new Blaze.View([name], renderFunction)`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 43](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L43)

**인자:**

- name (string): 선택적. `View.name` 뷰 이름.

- renderFunction (functuin): 랜더링 가능한 내용을 반환하는 함수입니다.
이 함수는 View에 바인딩됩니다.

**설명:**

DOM에서 반응형 영역을 나타낼 뷰 객체의 생성자입니다.

모든 또는 일부 템플릿 내에는 반응형으로 업데이트 되는 DOM 영역인 `{{foo}}`나 `{{#if}}`와 같은 테그가 있습니다.

대부분의 앱은 이러한 뷰를 인식할 필요가 없지만, 고급 앱 및 패키지에서 Meteor의 랜더링 동작을 이해하고 사용자 정의할 수 있는 방법을 제공합니다.

템플릿에서 [`Blaze.render`](#rendertemplate-or-view-parentnode-nextnode-parentview)를 호출하거나 템플릿 인스턴스에서[`view`](view)에 액세스 하여 뷰 객체를 얻을 수 있습니다.

뷰의 중심에는 뷰의 "renderfunction"을 호출하고 그 결과로 DOM 노드를 생성한 다음 뷰의 내용을 이 새로운 DOM노드로 대체하는 [autorun](https://docs.meteor.com/api/tracker.html#Tracker-autorun)이 있습니다.
뷰의 내용은 원하는 만큼의 DOM 노드로 구성될 수 있습니다(0인 경우 주석 또는 빈 텍스트 노드와 같은 자리표시자 노드가 자동으로 제공됨).
"renderfunction"에 의해 설정된 반응적 종속성은 종속성이 무효화될 때 뷰의 내용을 완전히 재계산합니다.
그러나 템플릿은 최상위 종속성이 없는 방식으로 컴파일되므로 한번만 랜더링 되며, 템플릿의 구성요소는 여러번 리랜더링 될 수 있다.

원문:

When a `Blaze.View` is constructed by calling the constructor, no hooks
are fired and no rendering is performed.  In particular, the View is
not yet considered to be "created."  Only when the View is actually
used, by a call to `Blaze.render` or `Blaze.toHTML` or by inclusion in
another View, is it "created," right before it is rendered for the
first time.  When a View is created, its `.parentView` is set if
appropriate, and then the `onViewCreated` hook is fired.  The term
"unrendered View" means a newly constructed View that has not been
"created" or rendered.

번역:

생성자를 호출하여 'Blaze.View'를 생성하면 후크가 실행되지 않고 랜더링이 수행되지 않습니다.
특히 뷰는 아직 "생성 된"것으로 간주되지 않습니다.
뷰가 실제로 사용될 때만, `Blaze.render()` 또는 `Blaze.toHTML()`를 호출하거나 다른 뷰에 포함함으로써, 처음 랜더링되기 바로 전에 "생성"됩니다.
뷰가 생성되면 적절할 경우 `.parentView`가 설정되고 `onViewCreated` 훅이 실행됩니다.
"랜더링되지 않은 뷰"란 "생성 된"또는 랜더링되지 않은 새로 생성 된 뷰를 의미합니다.

"현재 뷰"는 [`Blaze.currentView`](#)에 보관되며 뷰 랜더링, 콜백, autorun 및 템플릿 이벤트 헨들러 중에 설정됩니다.
[`Template.currentData()`](#)와 같은 호출에 영향을줍니다.

Blaze.View에서 사용할 수 있는 프로퍼티와 메서드는 다음과 같습니다(이 표의 설명은 해석이 정확하지 않으므로 원문 참조가 필요할 경우 [여기](http://blazejs.org/api/blaze.html#view_name)를 방문):

|prop|type|설명|
|----|----|---|
|`name`|string|뷰의 이름은 코드 사용시 특정 뷰를 식별하는데 사용할 수 있지만, 보통 뷰 트리의 이해나 디버깅 용도로 더 자주 쓰입니다. Meteor에서 생성된 뷰는 'Template.foo'나 'if' 같은 이름입니다.|
|`parentView`|View or null|랜더링 된 이 뷰를 감싸고 있는 상위 뷰를 나타냅니다(존재할 경우).|
|`isCreated`|boolean|이 뷰가 `Blaze.render` 또는 `Blaze.toHTML` 또는 다른 뷰에 의해 랜더링되도록 되어있는 경우는 true를 반환합니다. 한번 정해진 값은 변경되지 않습니다. "생성 된"뷰의 `.parentView`가 최종 값으로 설정됩니다. `onViewCreated`훅이 호출되기 전에 `isCreated`가 true로 설정됩니다.|
|`isRendered`|boolean|`Blaze.render` 또는 이것을 감싸고 있는 상위 뷰에의해 랜더링 된 뷰일경우 true를 반환합니다. `Blaze.toHTML`에 의해 HTML로 랜더링 된 경우는 포함되지 않습니다. 한번 정해진 값은 변경되지 않습니다.|
|`isDestroyed`|boolean|이 뷰가 반응형에 의해 삭제되거나 `Blaze.remove()`를 사용하여 삭제하였을 경우 true를 반환합니다. 소멸된 뷰의 autorun은 중지되며, 이것의 DOM 노드는 Meteor의 반응형에서 제거됩니다.|
|`renderCount`|number(int)|뷰가 현재시점을 포함하여 랜더링 또는 리랜더링 되었던 횟수를 반환합니다.|
|`autorun(func)`||[`Tracker.autorun`](https://docs.meteor.com/api/tracker.html#Tracker-autorun)처럼, 뷰가 소멸되면 autorun이 자동으로 중지됩니다. `runFunc`가 실행될 때 [`.currentView`](#)는 항상 설정됩니다. View의 내부 자동 실행 또는 랜더링주기와 아무런 관련이 없습니다. `runFunc`내에서 뷰는 `this`에 바인딩됩니다.|
|`onViewCreated(func)`||이 뷰가 아직 생성된 적이 없다면 뷰를 생성할 때 `func`를 호출합니다. `func` 내에서 뷰는 `this`로 바인딩 되어있습니다. 이 훅은 [`created`](../api/templates.html#Template-onCreated)의 기초입니다.|
|`onViewReady(func)`||뷰가 랜더링되어 DOM에 삽입될 때, [flush time](https://docs.meteor.com/api/tracker.html#Tracker-afterFlush)가 끝나길 기다린 후 `func`를 호출합니다. (뷰가 리랜더링 될 경우) 여러번 재실행 될 수 있습니다. `func`에서 뷰는 `this`에 바인딩 됩니다. 이 훅은 [`rendered`](../api/templates.html#Template-onRendered)의 기초입니다.|
|`onViewDestroyed(func)`||뷰가 아직 소멸되지 않았다면 뷰가 소멸될 때 `func`를 호출합니다. 뷰는 'ready'가 되지 않고 소멸될 수 있습니다. `func`에서 뷰는 `this`에 바인딩 됩니다. 이 훅은 [`destroyed`](../api/templates.html#Template-onDestroyed)의 기초입니다.|
|`firstNode()`|DOM node|랜더링 된 뷰의 첫번째 노드를 반환합니다. 이 노드는 텍스트 노드일 수 있습니다. 만약 뷰에 랜더링 된 DOM 노드가 없다면 해당 위치에 (빈)텍스트노드 또는 주석 노드가 위치할 수 있습니다. 뷰의 범위는 `view.firstNode()`와 `view.lastNode()` 사이의 범위로 구성됩니다.|
|`lastNode()`|DOM node|뷰에서 랜더링 된 마지막 노드를 반환합니다.|
|`template`|Template|템플릿의 호출로 작성된 뷰일 경우 해당 탬플릿 객체를 반환합니다. 예: `Blaze.render(Template.foo).template === Template.foo`|
|`templateInstance()`|Template Instance|템플릿에 의해 생성된 뷰일 경우 특정 뷰에 대한 [Template Instance](../api/templates.html#Template-instances)를 반환합니다. 예: [`onCreated`](#oncreatedcallback)에서 `this.view.templateInstance() === this`<br> 템플릿 인스턴스 객체는 `data`, `firstNode`, `lastNode`와 같은 필드를 가지지만 반응형이 아니므로 자동으로 최신상태로 유지되진 않습니다. `templateInstance()`를 호출할 경우 필드가 업데이트 됩니다.|

### `.currentView`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 527](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L527)

**설명:**

현재 탬플릿 핼퍼, 이벤트 헨들러, 콜백 또는 오토런에 해당하는 뷰입니다.
어떠한 것에도 해당하지 않을경우 `null`을 반환합니다.

`currentView`는 [`Template.currentData()`](../api/templates.html#Template-currentData) 및 [`Template.instance()`](../api/templates.html#Template-instance)에서 컨텍스트 및 관련 데이터를 결정하는 데 사용됩니다.

### `.getView([element])`

**사용영역:** 클라이언트

**코드라인:** [blaze/view.js, line 776](https://github.com/meteor/blaze/blob/master/packages/blaze/view.js#L776)

**인자:**

- element (DOM Element): 선택적. 인자(엘리먼트)가 지정된 경우 해당 인자를 감싸고 있는 뷰를 반환합니다.<br>
인자를 전달하지 않을 경우 반드시 현재 뷰나 에러를 반환합니다. 이것은 [`Blaze.currentView`](#currentview)와는 대조적입니다.

### `.With(data, contentFunc)`

**사용영역:** 클라이언트

**코드라인:** [blaze/builtins.js, line 13](https://github.com/meteor/blaze/blob/master/packages/blaze/builtins.js#L13)

**인자:**

- data (Object or Function): 데이터 컨텍스트로 사용할 객체 또는 그러한 객체를 반환할 함수.

- contentFunc (Function): 반응적으로 실행될 함수.

**설명:**

`Blaze.render`에 인자로 전달할 수 있는 렌더링 되지 않은 뷰 객체를 반환합니다.

템플릿에서 사용되는 `{{#with}}`와는 달리 `Blaze.With`는 'else'케이스가 없으며, 데이터 컨텍스트에 대한 `falsy`값은 내용을 렌더링하는 것을 방지합니다.

### `.If(conditionFunc, contentFunc, [elseFunc])`

**사용영역:** 클라이언트

**코드라인:** [blaze/builtins.js, line 73](https://github.com/meteor/blaze/blob/master/packages/blaze/builtins.js#L73)

**인자:**

- conditionFunc (Function): 반응적으로 다시 실행될 함수. 결과값이 '참'이면 `contentFunc` 아니면 `elseFunc`가 실행됩니다.

- contentFunc (Function): [렌더링 가능한 컨텐츠](#)를 반환하는 함수.

- elseFunc (Function): 선택적. [렌더링 가능한 컨텐츠](#)를 반환하는 함수. `elseFunc`가 제공되지 않을 경우 'else'의 경우 보여지는 컨텐츠는 없습니다.

**설명:**

`Blaze.render`에 인자로 전달할 수 있는 렌더링 되지 않은 뷰 객체를 반환합니다.

### `.Unless(conditionFunc, contentFunc, [elseFunc])`

**사용영역:** 클라이언트

**코드라인:** [blaze/builtins.js, line 98](https://github.com/meteor/blaze/blob/master/packages/blaze/builtins.js#L98)

**인자:**

- conditionFunc (Function): 반응적으로 다시 실행될 함수. 결과값이 '거짓'이면 `contentFunc` 아니면 `elseFunc`가 실행됩니다.

- contentFunc (Function): [렌더링 가능한 컨텐츠](#)를 반환하는 함수.

- elseFunc (Function): 선택적. [렌더링 가능한 컨텐츠](#)를 반환하는 함수. `elseFunc`가 제공되지 않을 경우 'else'의 경우 보여지는 컨텐츠는 없습니다.

**설명:**

`Blaze.render`에 인자로 전달할 수 있는 렌더링 되지 않은 뷰 객체를 반환합니다.

### `.Each(argFunc, contentFunc, [elseFunc])`

**사용영역:** 클라이언트

**코드라인:** [blaze/builtins.js, line 122](https://github.com/meteor/blaze/blob/master/packages/blaze/builtins.js#L122)

**인자:**

- argFunc (Function): 반응적으로 다시 실행될 함수. 이 함수는 아래 두 옵션중 하나를 반환 할 수 있습니다.

  - `_variable`, `_sequence` 필드를 가진 객체. 각 항목은 `_sequence`에 따라 지정되며 커서, 배열, null 또는 undefined 일 수 있습니다. 각 body에서 `_variable`필드에 지정된 이름을 사용하여 시퀀스에서 현재 항목을 가져올 수 있습니다.

  - 오브젝트에 랩핑되지 않은 순서 (커서, 배열, null 또는 undefined). 각 본문 내에서 현재 항목이 데이터 컨텍스트로 설정됩니다.

- contentFunc (Function): [렌더링 가능한 컨텐츠](#)를 반환하는 함수.

- elseFunc (Function): 시퀀스에 항목이 없을 경우 표시 할 [렌더링 가능한 컨텐츠](#)를 반환하는 함수입니다.

**설명:**

각 항목을 `contentFunc`로 실행시켜 렌더링 가능한 컨텐츠를 반환합니다.

`Blaze.render`에서 렌더링 할 수 있는 뷰 객체를 반환합니다.

템플릿에서 `{{#each}}`와 동일하게 작동합니다.

## `new Blaze.Template([viewName], renderFunction)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 16](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L16)

**인자:**

- viewName (string): 선택적. 이 템플릿에서 생성한 뷰의 이름입니다.

- renderFunction (Function): [렌더링 가능한 컨텐츠](#)를 반환하는 함수. 이 함수는이 템플릿에 의해 생성 된 뷰의 `renderFunction`으로 사용됩니다.

**설명:**

특정의 이름과 내용으로 뷰를 구축하기 위해서 사용되는, Template의 생성자입니다.

`Template.myTemplate`처럼 템플릿 컴파일러에 의해 정의 된 템플릿은 `Blaze.Template`(보통 `Template`이라 불리는) 타입의 객체입니다.

[templates API](#templates)의 일부로 문서화 된`events`와`helpers`와 같은 메소드 외에도, 템플릿 객체에는 다음과 같은 필드와 메소드가 있습니다 :

|prop|type|설명|
|----|----|---|
|`viewName`|string|생성자의 인자와 동일합니다.|
|`renderFunction`|function|생성자의 인자와 동일합니다.|
|`constructView()`||렌더링 되지 않은 뷰 객체를 생성(construct)하여 리턴합니다. 이 메소드는 Meteor에 의해 `Blaze.render`나 `{{> foo}}`와 같이 템플릿이 사용될 때마다 호출됩니다.<br>구성자 인수로 `viewName`과 `renderFunction`을 사용하여 뷰를 구성한다. 그런 다음 `View.template`, `view.templateInstance()`, 이벤트 맵 등을 설정하여 템플릿 뷰로 구성합니다.|

## `.isTemplate(value)`

**사용영역:** 클라이언트

**코드라인:** [blaze/template.js, line 61](https://github.com/meteor/blaze/blob/master/packages/blaze/template.js#L61)

**인자:**

- value (any): 설정할 값.

**설명:** `value`가 `Template.myTemplate`와 같은 템플릿 객체이면 true를 반환합니다.

## 렌더링 가능한 컨텐츠

값이 다음 중 하나에 해당하는 경우 **렌더링 가능한 컨텐츠**입니다:

- `Template.myTemplate`과 같은 [템플릿 객체](#templates)

- `Blaze.With`의 반환값처럼, 렌더링 되지 않은 [뷰 객체](#new-blazeviewname-renderfunction)

- `null` 또는 `undefined`

> 내부적으로 렌더링 가능한 컨텐츠에는 HTML 태그를 나타내는 객체도 포함되지만, 이러한 객체는 아직까지는 공식적으로 지원되는 공개 API의 일부는 아닙니다.

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
