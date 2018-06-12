# 목차

* [개요](#개요)
  * 시작하기(#시작하기)

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

# 플러그인 상호 운용성.

웹 개발자는 종종 HTML, JavaScript, CSS로 만든 작은 결과물을 서로 공유하거나 라이브러리, 위젯 또는 jQuery 플러그인으로 게시합니다.
또는 동영상,지도 및 기타 제 3자 콘텐츠를 퍼가려고합니다.

미번역 부분:

Blaze doesn't assume it owns the whole DOM, and it tries to make as few assumptions as possible about the DOM outside of its updates.
It hooks into jQuery's clean-up routines to prevent memory leaks, and it preserves classes, attributes, and styles added to elements by jQuery or any third-party library.

While it's certainly possible for Blaze and jQuery to step on each other's toes if you aren't careful, there are established patterns for keeping the peace, and Blaze developers rightfully expect to be able to use the various widgets and enhancements cooked up by the broader web community in their apps.

## 다른 라이브러리와의 비교

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

## 우리의 계획

### Components (구성요소)

Blaze는 재사용 가능한 UI 컴포넌트를 만들기 위한 더 좋은 패턴을 얻을 것입니다.
템플릿은 이미 재사용 가능한 구성 요소로 제공됩니다.
앞으로의 개선사항은 다음에 중점을 둡니다:

* 
* 
* 
* 
* 

Blaze will get better patterns for creating reusable UI components.
Templates already serve as reusable components, to a point.
Improvements will focus on:

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

### Mobile and Animation

Blaze will cater to the needs of the mobile web, including enhanced performance and patterns for touch and other mobile interaction.

We'll also improve the ease with which developers can integrate animated transitions into their apps.

### JavaScript Expressions in Templates

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

# Resources

* [Templates API](../api/templates.html)
* [Blaze API](../api/blaze.html)
* [Spacebars syntax](../api/spacebars.html)

# 페키지

* blaze
* blaze-tools
* html-tools
* htmljs
* spacebars
* spacebars-compiler
