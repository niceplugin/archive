# 목차

* [개요](#개요)
  * [시작하기](#시작하기)
  * [세부사항](#세부사항)
  * [예제](#예제)
  * [신조](#신조)
  * [페키지](#페키지)
  * [우리의 계획](#우리의-계획)
* [소개](#소개)
* [Spacebars templates](#Spacebars-templates)

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

> 역주: 2017년 5월 이후로 프로젝트 팀이 해체되어 더이상 진행되지 않으므로 아래 내용은 번역하지 아니함.


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

# 소개

How to use Blaze, Meteor's frontend rendering system, to build usable and maintainable user interfaces.

After reading this guide, you'll know:

1. How to use the Spacebars language to define templates rendered by the Blaze engine.
2. Best practices for writing reusable components in Blaze.
3. How the Blaze rendering engine works under the hood and some advanced techniques for using it.
4. How to test Blaze templates.

Blaze is Meteor's built-in reactive rendering library. Usually, templates are written in [Spacebars](../guide/spacebars.html), a variant of [Handlebars](http://handlebarsjs.com) designed to take advantage of [Tracker](https://github.com/meteor/meteor/tree/devel/packages/tracker), Meteor's reactivity system. These templates are compiled into JavaScript UI components that are rendered by the Blaze library.

Blaze is not required to build applications in Meteor---you can also easily use [React](http://react-in-meteor.readthedocs.org/en/latest/) or [Angular](http://www.angular-meteor.com) to develop your UI. However, this particular article will take you through best practices in building an application in Blaze, which is used as the UI engine in all of the other articles.

# Spacebars templates

Spacebars is a handlebars-like templating language, built on the concept of rendering a reactively changing *data context*. Spacebars templates look like simple HTML with special "mustache" tags delimited by curly braces: `{% raw %}{{ }}{% endraw %}`.

As an example, consider the `Todos_item` template from the Todos example app:

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

This template expects to be rendered with an object with key `todo` as data context (we'll see [below](../guide/reusable-components.html#Validate-data-context) how to enforce that). We access the properties of the `todo` using the mustache tag, such as `{% raw %}{{todo.text}}{% endraw %}`. The default behavior is to render that property as a string; however for some attributes (such as `checked={% raw %}{{todo.checked}}{% endraw %}`) it can be resolved as a boolean value.

Note that simple string interpolations like this will always escape any HTML for you, so you don't need to perform safety checks for XSS.

Additionally we can see an example of a *template helper*---`{% raw %}{{checkedClass todo}}{% endraw %}` calls out to a `checkedClass` helper defined in a separate JavaScript file. The HTML template and JavaScript file together define the `Todos_item` component:

```js
Template.Todos_item.helpers({
  checkedClass(todo) {
    return todo.checked && 'checked';
  }
});
```

In the context of a Blaze helper, `this` is scoped to the current *data context* at the point the helper was used. This can be hard to reason about, so it's often a good idea to instead pass the required data into the helper as an argument (as we do here).

Apart from simple interpolation, mustache tags can be used for control flow in the template. For instance, in the `Lists_show` template, we render a list of todos like this:

```html
  {{#each todo in todos}}
    {{> Todos_item (todoArgs todo)}}
  {{else}}
    <div class="wrapper-message">
      <div class="title-message">No tasks here</div>
      <div class="subtitle-message">Add new tasks using the field above</div>
    </div>
  {{/each}}
```

This snippet illustrates a few things:

 - The `{% raw %}{{#each .. in}}{% endraw %}` block helper which repeats a block of HTML for each element in an array or cursor, or renders the contents of the `{% raw %}{{else}}{% endraw %}` block if no items exist.
 - The template inclusion tag, `{% raw %}{{> Todos_item (todoArgs todo)}}{% endraw %}` which renders the `Todos_item` component with the data context returned from the `todosArg` helper.

You can read about the full syntax [in the Spacebars](../api/spacebars.html). In this section we'll attempt to cover some of the important details beyond just the syntax.

## Data contexts and lookup

We've seen that `{% raw %}{{todo.title}}{% endraw %}` accesses the `title` property of the `todo` item on the current data context. Additionally, `..` accesses the parent data context (rarely a good idea), `list.todos.[0]` accesses the first element of the `todos` array on `list`.

Note that Spacebars is very forgiving of `null` values. It will not complain if you try to access a property on a `null` value (for instance `foo.bar` if `foo` is not defined), but instead simply treats it also as null. However there are exceptions to this---trying to call a `null` function, or doing the same *within* a helper will lead to exceptions.

## Calling helpers with arguments

You can provide arguments to a helper like `checkedClass` by simply placing the argument after the helper call, as in: `{% raw %}{{checkedClass todo true 'checked'}}{% endraw %}`. You can also provide a list of named keyword arguments to a helper with `{% raw %}{{checkedClass todo noClass=true classname='checked'}}{% endraw %}`. When you pass keyword arguments, you need to read them off of the `hash` property of the final argument. Here's how it would look for the example we just saw:

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

Note that using keyword arguments to helpers is a little awkward, so in general it's usually easier to avoid them. This feature was included for historical reasons to match the way keyword arguments work in Handlebars.

You can also pass the output of a helper to a template inclusion or other helper. To do so, use parentheses to show precedence:

```html
{{> Todos_item (todoArgs todo)}}
```

Here the `todo` is passed as argument to the `todoArgs` helper, then the output is passed into the `Todos_item` template.

## Template inclusion

You "include" a sub-component with the `{% raw %}{{> }}{% endraw %}` syntax. By default, the sub-component will gain the data context of the caller, although it's usually a good idea to be explicit. You can provide a single object which will become the entire data context (as we did with the object returned by the `todoArgs` helper above), or provide a list of keyword arguments which will be put together into one object, like so:

```html
{{> subComponent arg1="value-of-arg1" arg2=helperThatReturnsValueOfArg2}}
```

In this case, the `subComponent` component can expect a data context of the form:

```js
{
  arg1: ...,
  arg2: ...
}
```

## Attribute Helpers

We saw above that using a helper (or data context lookup) in the form `checked={% raw %}{{todo.checked}}{% endraw %}` will add the checked property to the HTML tag if `todo.checked` evaluates to true. Also, you can directly include an object in the attribute list of an HTML element to set multiple attributes at once:

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

## Rendering raw HTML

Although by default a mustache tag will escape HTML tags to avoid [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting), you can render raw HTML with the triple-mustache: `{% raw %}{{{ }}}{% endraw %}`.

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

You should be extremely careful about doing this, and always ensure you aren't returning user-generated content (or escape it if you do!) from such a helper.

## Block Helpers

A block helper, called with `{% raw %}{{# }}{% endraw %}` is a helper that takes (and may render) a block of HTML. For instance, we saw the `{% raw %}{{#each .. in}}{% endraw %}` helper above which repeats a given block of HTML once per item in a list. You can also use a template as a block helper, rendering its content via the `Template.contentBlock` and `Template.elseBlock`. For instance, you could create your own `{% raw %}{{#if}}{% endraw %}` helper with:

```html
<template name="myIf">
  {{#if condition}}
    {{> Template.contentBlock}}
  {{else}}
    {{> Template.elseBlock}}
  {{/if}}
</template>

<template name="caller">
  {{#myIf condition=true}}
    <h1>I'll be rendered!</h1>
  {{else}}
    <h1>I won't be rendered</h1>
  {{/myIf}}
</template>
```

## Built-in Block Helpers

There are a few built-in block helpers that are worth knowing about:

### If / Unless

The `{% raw %}{{#if}}{% endraw %}` and `{% raw %}{{#unless}}{% endraw %}` helpers are fairly straightforward but invaluable for controlling the control flow of a template. Both operate by evaluating and checking their single argument for truthiness. In JS `null`, `undefined`, `0`, `''`, `NaN`, and `false` are considered "falsy", and all other values are "truthy".

```html
{{#if something}}
  <p>It's true</p>
{{else}}
  <p>It's false</p>
{{/if}}
```

### Each-in

The `{% raw %}{{#each .. in}}{% endraw %}` helper is a convenient way to step over a list while retaining the outer data context.

```html
{{#each todo in todos}}
  {{#each tag in todo.tags}}
    <!-- in here, both todo and tag are in scope -->
  {{/each}}
{{/each}}
```

### Let

The `{% raw %}{{#let}}{% endraw %}` helper is useful to capture the output of a helper or document subproperty within a template. Think of it just like defining a variable using JavaScript `let`.

```html
{{#let name=person.bio.firstName color=generateColor}}
  <div>{{name}} gets a {{color}} card!</div>
{{/let}}
```

Note that `name` and `color` (and `todo` above) are only added to scope in the template; they *are not* added to the data context. Specifically this means that inside helpers and event handlers, you cannot access them with `this.name` or `this.color`. If you need to access them inside a helper, you should pass them in as an argument (like we do with `(todoArgs todo)` above).

### Each and With

There are also two Spacebars built-in helpers, `{% raw %}{{#each}}{% endraw %}`, and `{% raw %}{{#with}}{% endraw %}`, which we do not recommend using (see [prefer using each-in](../guide/reusable-components.html#Prefer-lt-￼16-gt)). These block helpers change the data context within a template, which can be difficult to reason about.

Like `{% raw %}{{#each .. in}}{% endraw %}`, `{% raw %}{{#each}}{% endraw %}` iterates over an array or cursor, changing the data context within its content block to be the item in the current iteration. `{% raw %}{{#with}}{% endraw %}` simply changes the data context inside itself to the provided object. In most cases it's better to use `{% raw %}{{#each .. in}}{% endraw %}` and `{% raw %}{{#let}}{% endraw %}` instead, just like it's better to declare a variable than use the JavaScript `with` keyword.

## Chaining of Block Helpers
 
You can chain block helpers:

```html
{{#input isRadio}}
  <input type="radio" />
{{else input isCheckbox}}
  <input type="checkbox" />
{{else}}
  <input type="text" />
{{/foo}}
```

This is equivalent to:

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

## Strictness

Spacebars has a very strict HTML parser. For instance, you can't self-close a `div` (`<div/>`) in Spacebars, and you need to close some tags that a browser might not require you to (such as a `<p>` tag). Thankfully, the parser will warn you when it can't understand your code with an exact line number for the error.

## Escaping

To insert literal curly braces: `{% raw %}{{ }}{% endraw %}` and the like, add a pipe character, `|`, to the opening braces:

```
<!-- will render as <h1>All about {{</h1> -->
<h1>All about {{|</h1>

<!-- will render as <h1>All about {{{</h1> -->
<h1>All about {{{|</h1>
```
