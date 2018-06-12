# FlowRouter [![Build Status](https://travis-ci.org/kadirahq/flow-router.svg?branch=master)](https://travis-ci.org/kadirahq/flow-router) [![Stories in Ready](https://badge.waffle.io/kadirahq/flow-router.svg?label=doing&title=Activities)](http://waffle.io/kadirahq/flow-router)

FlowRouter는 Meteor용 클라이언트 라우터로 신중하게 설계되었다.

클라이언트 측 앱 라우팅을 수행하며 렌더링 처리는 하지않는 간단한 라우터입니다.

URL을 변경하거나 반응적으로 URL 데이터를 가지고 올 수 있도록 훌륭한 API를 제공합니다.
그러나 라우터 자체가 반응적이지는 않습니다.
가장 중요한 점은 FLowRouter는 최고의 라우팅 성능을 낼 수 있도록 초점을 두고 설계되었다는 것입니다.

> 이미 FLowRouter를 사용중이라면 [2.0 릴리즈 가이드](#migrating-into-20)를 참고하십시요.

## TOC

* [미티어 라우팅 가이드](#미티어-라우팅-가이드)
* [시작하기](#시작하기)
* [경로(라우터) 정의](#경로라우터-정의)
* [경로(라우터) 그룹화](#경로라우터-그룹화)
* [렌더링 및 레이아웃 관리](#렌더링-및-레이아웃-관리)
* [트리거 (Triggers)](#트리거-triggers)
* [찾을 수 없는 페이지 라우터 설정](#찾을-수-없는-페이지-라우터-설정)
* [API](#api)
* [Subscription(구독) 관리](#subscription구독-관리)
* [IE9 지원](#ie9-지원)
* [Hashbang URLs](#hashbang-urls)
* [Prefixed paths (경로 접두사)](#prefixed-paths-경로-접두사)
* [Add-ons](#add-ons)
* [Iron Router(아이언 라우터)와 다른점](#iron-router-아이언-라우터와-다른점)
* [Migrating into 2.0](#migrating-into-20)

## 미티어 라우팅 가이드

[Meteor Routing Guide](https://kadira.io/academy/meteor-routing-guide)는 **Routing** 및 **Meteor**에 관련된 주제에 대한 완벽한 가이드입니다.
FlowRouter를 올바르게 사용하는 방법과 **Blaze 그리고 React**와 함께 사용하는 방법에 대해 설명합니다.
또한 **서브스크립션(구독)**을 관리하고 뷰 계층에 **인증 논리**를 구현하는 방법을 보여줍니다.

[![Meteor Routing Guide](https://cldup.com/AxlPfoxXmR.png)](https://kadira.io/academy/meteor-routing-guide)

## 시작하기

FlowRouter를 나의 앱에 추가하는 방법:

~~~shell
meteor add kadira:flow-router
~~~

이제 라우터를 사용하는 코드를 짜봅시다.
(우선 `lib/router.js` 경로에 파일을 만듭니다.)

~~~js
FlowRouter.route('/blog/:postId', {
    action: function(params, queryParams) {
        console.log("성공~! 현재 postId: ", params.postId);
    }
});
~~~

그런 다음 브라우저 주소창에 `/blog/my-post-id`를 입력하거나 브라우저 개발자 콘솔에서 다음 명령을 호출하십시오.

~~~js
FlowRouter.go('/blog/my-post-id');
~~~

이 후 당신은 콘솔에 출력되는 메세지를 볼 수 있습니다.

## 경로(라우터) 정의

FlowRouter 라우트는 매우 단순하며 [Express](http://expressjs.com/)와 'Iron : Router'에서 모두 사용되는 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 문법을 기반으로합니다.

아래는 경로에 관한 간단한 문법입니다.

~~~js
FlowRouter.route('/blog/:postId', {
    // 현재 라우터(경로)에서 실행될 것들
    action: function(params, queryParams) {
        console.log("파람:", params);
        console.log("쿼리 파람:", queryParams);
    },
    name: "현재 라우터의 이름" // 선택사항
});
~~~

그리고나서 아래의 URL경를 방문하면 해당 라우터(위에서 설정한 코드)가 실행됩니다.

~~~js
FlowRouter.go('/blog/my-post?comments=on&color=dark');
~~~

당신이 해당 라우터에 접속한 후, 아래와 같이 콘솔에 메세지가 출력될 것입니다.

~~~
파람: {postId: "my-post"}
쿼리 파람: {comments: "on", color: "dark"}
~~~

단일 상호 작용의 경우 라우터는 한 번만 실행됩니다.
즉, 경로를 방문한 후 첫번째로 'triggers'를 호출하고 이어서 'subscriptions' 그리고 마지막으로 'action'을 호출합니다.
그런 다음 다시 이 경로로 방문하더라도 해당 메소드를 다시 호출하지 않습니다.

`client` 디렉토리(폴더) 어디서나 경로를 정의 할 수 있습니다.
그러나`lib` 디렉토리에 추가하는 것을 권장합니다.
그러면 `subscriptions`을 감지하여 'fast-render'를 할 수 있습니다.(이부분은 추후 설명합니다.)

### 경로(라우터) 그룹화


당신은 더 나은 라우터 구성을 위해 라우터를 그룹화 할 수 있습니다. 아래는 그 예입니다:

~~~js
var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    console.log('그룹화 트리거가 실행됨.');
  }]
});

// `/admin` 라우터(경로)를 컨트롤
adminRoutes.route('/', {
  action: function() {
    BlazeLayout.render('componentLayout', {content: 'admin'});
  },
  triggersEnter: [function(context, redirect) {
    console.log('/admin 트리거가 실행됨.');
  }]
});

// `/admin/posts` 라우터(경로)를 컨트롤
adminRoutes.route('/posts', {
  action: function() {
    BlazeLayout.render('componentLayout', {content: 'posts'});
  }
});
~~~

**`FlowRouter.group()`의 모든 옵션은 선택사항입니다.**

당신은 아래와 같이 라우터 그룹화를 중첩되게 만들수도 있다:

~~~js
var adminRoutes = FlowRouter.group({
    prefix: "/admin",
    name: "admin"
});

var superAdminRoutes = adminRoutes.group({
    prefix: "/super",
    name: "superadmin"
});

// /admin/super/post 컨트롤
superAdminRoutes.route('/post', {
    action: function() {

    }
});
~~~

당신은 현재 라우터(경로)에 적용된 그룹정보를 알 수 있습니다:

~~~js
FlowRouter.current().route.group.name
~~~

만약 현재 라우터(경로)가 접두사를 사용하지 않는 특별한 그룹일 경우 (예: *admin*, *public*, *loggedIn* ...), 상위 그룹의 이름을 조회할 수 있습니다.

~~~js
FlowRouter.current().route.group.parent.name
~~~

현재(current())에 관련된 모든 속성은 반응형(reactive)이 아닙니다.
하지만 `FlowRouter.watchPathChange()`를 사용(결합)하여 반응형으로 사용할 수 있습니다.

## 렌더링 및 레이아웃 관리

FlowRouter는 렌더링 또는 레이아웃 관리를 헨들링(조작 또는 컨트롤)하지 않습니다.
이것을 하기 위해서 당신은 아래와 같은 레이아웃 메니저를 사용해야 합니다:

  * [Blaze Layout for Blaze](https://github.com/kadirahq/blaze-layout)
  * [React Layout for React](https://github.com/kadirahq/meteor-react-layout)

그런 다음 라우터의 `action` 메서드에서 레이아웃 메니저를 호출할 수 있습니다.

~~~js
FlowRouter.route('/blog/:postId', {
    action: function(params) {
        BlazeLayout.render("mainLayout", {area: "blog"});
    }
});
~~~

## 트리거 (Triggers)

트리거는 FlowRouter를 사용하여 어떠한 라우터(경로)에 접속하기 전 또는 이탈 후에 어떠한 작업을 수행할 수 있습니다.

#### 라우터의 트리거 정의

아래는 라우터의 트리거를 정의하는 방법입니다:

~~~js
FlowRouter.route('/home', {
  // `action`을 실행하기 전에 호출된다.
  triggersEnter: [trackRouteEntry],
  action: function() {
    // 당신이 정의한 무엇인가를 실행한다.
  },
  // 다른 라우터로 이동할 때 호출되며, 이동 될 라우터가 실행되기 전에 실행된다.
  triggersExit: [trackRouteClose]
});

function trackRouteEntry(context) {
  // `context`는 `FlowRouter.current()`에 대한 객체입니다.
  Mixpanel.track("visit-to-home", context.queryParams);
}

function trackRouteClose(context) {
  Mixpanel.track("move-from-home", context.queryParams);
}
~~~

#### 그룹 라우터에서 트리거 정의

아래는 그룹을 정의할 때 트리거를 정의한 것입니다.

~~~js
var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [trackRouteEntry],
  triggersExit: [trackRouteEntry]
});
~~~

> 그룹 내 각각의 개별 경로(라우터)에도 트리거를 추가 할 수 있습니다.

#### 전역 트리거 정의

당신은 전역 트리거를 정의 할 수도 있습니다. 방법은 다음과 같습니다:

~~~js
FlowRouter.triggers.enter([cb1, cb2]);
FlowRouter.triggers.exit([cb1, cb2]);

// filtering
FlowRouter.triggers.enter([trackRouteEntry], {only: ["home"]});
FlowRouter.triggers.exit([trackRouteExit], {except: ["home"]});
~~~

위 두 예제에서 알 수 있듯이 'only'또는 'except'키워드를 사용하여 경로를 필터링 할 수 있습니다.
그러나 한 번에 `only`와 `except`를 모두 사용할 수는 없습니다.

> 만약 당신이 트리거와 설계결정에 대한 더 자세한 내용을 보려면 [여기](https://github.com/meteorhacks/flow-router/pull/59)를 방문하십시요.

#### 트리거로 리디렉션(Redirecting)

`enter` 또는 `exit` 트리거를 사용하여 다른 라우터로 리디렉션 할 수 있습니다.
그 방법은 다음과 같습니다:

~~~js
FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/some-other-path');
  }],
  action: function(_params) {
    throw new Error("이 부분은 실행되지 않습니다.");
  }
});
~~~

위에서 본 바와 같이 모든 트리거 메소드에는 리디렉션에 사용할 수 있는 함수를 두번째 인자로 전달합니다.
리디렉션이 (에러없이) 확실히 동작하기 위해서는 다음 몇몇을 준수해야 합니다.

* 리디렉션 시 반드시 URL을 명시해야 함
* 리디렉션은 반드시 동일한 이벤트 루프 사이클에서 실행되어야 함 (동기적(no async) 또는 트레커(Tracker) 내부에서 실행되어야 함)
* 리디렉션을 한 번에 여러번 호출(실행)해선 안됨

우리의 리디렉션 API에 대해 더 알아보고 싶다면 [여기](https://github.com/meteorhacks/flow-router/pull/172)를 방문하십시요.

#### 트리거를 사용하여 콜백을 정지시키기

경우에 따라서 당신은 트리거를 이용하여 해당 라우터 콜벡을 중지시켜야 할 필요성이 있을 수도 있습니다.
이것은 `enter` 트리거의 세번째 인자인 `stop` 함수를 사용하여 실행할 수 있습니다.
예를들어, 접두사(prefix)를 체크하고 경우에 따라서 `action`이 실행되기 전에 중지 할 수 있습니다.

```js
var localeGroup = FlowRouter.group({
  prefix: '/:locale?',
  triggersEnter: [localeCheck]
});

localeGroup.route('/login', {
  action: function (params, queryParams) {
    BlazeLayout.render('componentLayout', {content: 'login'});
  }
});

function localeCheck(context, redirect, stop) {
  var locale = context.params.locale;

  if (locale !== undefined && locale !== 'fr') {
    BlazeLayout.render('notFound');
    stop();
  }
}
```

> **참고**: `stop` 함수를 사용할 경우, 두번째 인자 `redirect` 함수를 사용하지 않더라도 반드시 명시해주어야 함.

## 찾을 수 없는 페이지 라우터 설정

찾을 수 없는 페이지(404 not found)에 대한 라우터 설정은 아래처럼 하면 됩니다:
You can configure Not Found routes like this:

~~~js
FlowRouter.notFound = {
    // 여기에 등록된 `subscriptions`은 `Fast Render`가 지원되지 않습니다.
    subscriptions: function() {

    },
    action: function() {

    }
};
~~~

## API

FlowRouter에는 라우터를 탐색하고 반응적으로 정보를 얻는데 도움이 되는 많은 API가 있습니다.

#### FlowRouter.getParam(paramName);

URL로부터 파라미터를 가지고 옴. **[반응형 메서드]**

~~~js
// 라우터 설정: /apps/:appId
// url: /apps/this-is-my-app

var appId = FlowRouter.getParam("appId");
console.log(appId); // "this-is-my-app"
~~~

#### FlowRouter.getQueryParam(queryStringKey);

쿼리파람의 값을 가지고 옴 **[반응형 메서드]**

~~~js
// 라우터 설정: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

var color = FlowRouter.getQueryParam("color");
console.log(color); // "red"
~~~

#### FlowRouter.path(pathDef, params, queryParams)

경로를 설정하는 함수. `params`와 `queryParams`는 선택사항.

`params`와 `queryParams`에 들어간 특수문자는 URL 형식으로 인코딩 됨.

~~~js
var pathDef = "/blog/:cat/:id";
var params = {cat: "met eor", id: "abc"};
var queryParams = {show: "y+e=s", color: "black"};

var path = FlowRouter.path(pathDef, params, queryParams);
console.log(path); // "/blog/met%20eor/abc?show=y%2Be%3Ds&color=black"
~~~

만약 `params` 또는 `queryParams`를 지정하지 않았었다면, `pathDef` 값만 반환합니다.

##### 경로(pathDef) 대신 라우터네임 사용하기

경로 대신 라우터네임을 사용할 수 있습니다.
FlowRouter는 `pathDef`갑에 부합하는 라우터를 찾은 후 선택합니다.
아래 예제를 참조하십시요.

~~~js
FlowRouter.route("/blog/:cat/:id", {
    name: "blogPostRoute",
    action: function(params) {
        //...
    }
})

var params = {cat: "meteor", id: "abc"};
var queryParams = {show: "yes", color: "black"};

// 첫번째 인자로 경로가 아닌 라우터네임을 전달함
var path = FlowRouter.path("blogPostRoute", params, queryParams);
console.log(path); // "/blog/meteor/abc?show=yes&color=black"
~~~

#### FlowRouter.go(pathDef, params, queryParams);

`FlowRouter.path` 메서드에 인자를 전달하는 것과 동일하게 인자를 전달하면 해당 경로로 리디렉션한다.

아래처럼 사용하면 됩니다.

~~~js
FlowRouter.go("/blog");
~~~


#### FlowRouter.url(pathDef, params, queryParams)

`FlowRouter.path`와 비슷하지만, 절대 url을 제공합니다. (뒤에서 `Meteor.absoluteUrl`에 대해 다룹니다.)

#### FlowRouter.setParams(newParams)

현제 경로의 파람을 `newParams`으로 변경후 해당 경로로 리디렉션한다.

~~~js
// 라우터 설정: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

FlowRouter.setParams({appId: "new-id"});
// 이후 사용자는 아래 주석과 같은 경로로 리디렉션 됨
//      /apps/new-id?show=yes&color=red
~~~

#### FlowRouter.setQueryParams(newQueryParams)

`FlowRouter.setParams`과 비슷하지만, `newQueryParams` 쿼리파람 형식이어야 한다.

아래처럼 쿼리파람의 값을 `null`로 설정할 경우 해당하는 쿼리파람을 삭제한다.

~~~js
FlowRouter.setQueryParams({삭제할쿼리파람키: null});
~~~

#### FlowRouter.getRouteName()

라우터네임을 조회한다. **[반응형]**

~~~js
Tracker.autorun(function() {
  var routeName = FlowRouter.getRouteName();
  console.log("현재 라우터의 이름: ", routeName);
});
~~~

#### FlowRouter.current()

라우터의 현재 상태를 조회한다. **(주의: 반응형 아님)**
반응형으로 사용하고 싶을 경우 `FlowRouter.watchPathChange()`를 사용하십시요.

실행시 아래와 같은 객체를 반환한다:

~~~js
// 라우터 설정: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

var current = FlowRouter.current();
console.log(current);

// 출력되는 결과(객체)
// {
//     path: "/apps/this-is-my-app?show=yes&color=red",
//     params: {appId: "this-is-my-app"},
//     queryParams: {show: "yes", color: "red"}
//     route: {pathDef: "/apps/:appId", name: "name-of-the-route"}
// }
~~~

#### FlowRouter.watchPathChange()

경로 변경을 **반응형**으로 감지하도록 합니다.
만약 당신이 `FlowRouter.getQueryParam()`와 같은 API를 사용하여 파람 또는 쿼리파람을 반응형으로 조회해야 할 경우 아래와 같이 사용하면 됩니다.

~~~js
Tracker.autorun(function() {
  FlowRouter.watchPathChange();
  var currentContext = FlowRouter.current();
});
~~~

#### FlowRouter.withReplaceState(fn)

일반적으로 라우터 변경은 `FlowRouter.go` 또는 `FlowRouter.setParams`와 같은 API를 통해 이루어 지며, 변경된 URL 항목은 브라우저 히스토리에 추가됩니다.
아래 코드는 그 예입니다.

~~~js
FlowRouter.setParams({id: "the-id-1"});
FlowRouter.setParams({id: "the-id-2"});
FlowRouter.setParams({id: "the-id-3"});
~~~

이제 당신은 브라우저의 뒤로가기 버튼을 두번 누를 수 있습니다.
이것은 사용자가 뒤로가기 버튼을 눌러 앱의 이전 상태를 볼 것으로 예상되므로 정상적인 동작입니다.

하지만 어떠한 경우에 당신은 이러하 동작을 원치 않을 수 있습니다.
브라우저 히스토리에 추가되길 원치 않는다면, 아래와 같은 문법을 사용하면 됩니다.

~~~js
FlowRouter.withReplaceState(function() {
  FlowRouter.setParams({id: "the-id-1"});
  FlowRouter.setParams({id: "the-id-2"});
  FlowRouter.setParams({id: "the-id-3"});
});
~~~

이제 브라우저 히스토리에 기록되지 않습니다.
`FlowRouter.setParams`처럼 `FlowRouter.withReplaceState` 내에 어떠한 FlowRouter API라도 사용할 수 있습니다.

> `withReplaceState`라고 이름지은 이유는 replaceState 기능 내에 API 들이 사용되기 때문입니다. [API 상태 및 히스토리](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)에 대해 자세 알아보기.

#### FlowRouter.reload()

FLowRouter의 라우터들은 멱등성(idempotent) 입니다.
즉, `FlowRouter.go()`를 이용하여 같은 URL을 한번에 여러번 호출 하더라도 라우터는 최초 한번만 실행 됩니다.
경로를 직접 클릭하는 경우도 마찬가지 입니다.

그렇기 때문에 정말 리로드를 원할 경우, 이 API를 사용해야 합니다.

> 멱등성: 연산을 여러번 적용하더라도 결과가 달라지지 않는 성질

#### FlowRouter.wait() 그리고 FlowRouter.initialize()

기본적으로 FLowRouter는 `Meteor.startup()`에서 라우팅 프로세서를 초기화 합니다.
이 기능은 거의 모든 앱에서 작동합니다.
하지만 일부 앱은 사용자 정의 초기화 후 FLowRouter를 초기화 해야 할 필요성이 있을 수 있습니다.

그럴때 `FlowRouter.wait()`를 사용합니다.
이것은 자바스크립트 파일 내에서 직접 호출해야 합니다.
이후 준비가 되면 `FlowRouter.initialize()`를 호출합니다.

예:

~~~js
// file: app.js
FlowRouter.wait();
WhenEverYourAppIsReady(function() {
  FlowRouter.initialize();
});
~~~

더 자세한 정보는 [issue #180](https://github.com/meteorhacks/flow-router/issues/180)에서 확인하십시요.

#### FlowRouter.onRouteRegister(cb)

이 API는 add-on 개발자를 위해 설계되었습니다.
등록된 라우터를 수신하고 FlowRouter에 사용자 정의 기능을 추가할 수 있습니다.
이것은 서버와 클라이언트 모두에서 작동합니다.

~~~js
FlowRouter.onRouteRegister(function(route) {
  // route 객체로 무엇이든 할 수 있습니다.
  console.log(route);
});
~~~

예를 들어 사용자가 다음과 같이 경로를 정의했다고 가정해 보겠습니다:

~~~js
FlowRouter.route('/blog/:post', {
  name: 'postList',
  triggersEnter: [function() {}],
  subscriptions: function() {},
  action: function() {},
  triggersExit: [function() {}],
  customField: 'customName'
});
~~~

그러면 콘솔로 출력되는 route 객체는 다음과 같습니다:

~~~js
{
  pathDef: '/blog/:post',
  name: 'postList',
  options: {customField: 'customName'}
}
~~~

따라서 이것은 우리가 기본적으로 사용하는 FlowRouter.route 객체가 아닙니다.

## Subscription(구독) 관리

Subscription 관리의 경우 [Template/Component level subscriptions](https://kadira.io/academy/meteorrorouting-guide/content/subscriptions-and-data-management)을 따르는 것이 좋습니다.
[guide](https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management)를 방문하십시오.

FlowRouter는 자체적인 subscription 등록 메커니즘이 있습니다.
우리는 3.0 버전에서 이것을 제거할 예정입니다.
그러나 'Fast-Render'를 앱에 구현하기 가장 간편한 방법이므로 2.x 버전에서 이것을 제거하거나 비추천 하진 않습니다.
3.0 버전에서는 'Fast-Render'와 'Server Side Render'에 대한 지원이 향상되었습니다.

> 역주: FlowRouter 프로젝트는 2017년 5월 15일 지원이 공식 중단되어 최종버전은 2.x 인 것 같다.

FlowRouter는 오직 subscription 등록만 처리합니다.
subscription이 준비되었는지 기다리지 않습니다.
subscription을 등록하는 방법입니다.

~~~js
FlowRouter.route('/blog/:postId', {
    subscriptions: function(params, queryParams) {
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));
    }
});
~~~

또는 아래처럼 글로벌 subscriptions을 등록할 수 있습니다:

~~~js
FlowRouter.subscriptions = function() {
  this.register('myCourses', Meteor.subscribe('courses'));
};
~~~

이러한 모든 글로벌 subscription은 모든 라우터에서 실행됩니다.
따라서 글로벌 subscription을 등록할 때에는 작명에 특히 주의 하십시요.

subscription 등록후에, 아래와 같이 이것을 반응적으로 채크할수 있습니다:

~~~js
Tracker.autorun(function() {
    console.log("myPost가 준비 되었나?:", FlowRouter.subsReady("myPost"));
    console.log("모든 subscriptions가 준비 되었나?:", FlowRouter.subsReady());
});
~~~

따라서 템플릿 헬퍼 내부에서 `FlowRouter.subsReady`를 사용하여 로딩상태 여부에 따라 특정 행동을 지정 할 수 있습니다.

### FlowRouter.subsReady()에서 콜백함수 사용하기

때로는 이벤트 헨들러와 같이 `autorun`을 사용할 수 없는 곳에서 `FlowRouter.subsReady()`를 사용해야 할 때도 있습니다.
이러한 경우의 문제는 `Flowrouter.subsReady()` 내에서 콜백 API를 사용하여 해결할 수 있습니다.

~~~js
Template.myTemplate.events({
   "click #id": function(){
      FlowRouter.subsReady("myPost", function() {
         // 실행될 코드
      });
  }
});
~~~

> Arunoda는 [FlowRouter와 Subscription 메니저](https://meteorhacks.com/flow-router-and-subscription-management.html)라는 블로그 포스터에서 Subscription 내 FlowRouter 내 [this](https://meteorhacks.com/flow-router-and-subscription-management.html#subscription-management)에 대해 더 자세하게 토론하였습니다.

> 그는 다음과 같이 앱을 만드는 방법을 보여줍니다.

>![FlowRouter's Subscription Management](https://cldup.com/esLzM8cjEL.gif)

#### Fast Render

FlowRouter는 [Fast Render](https://github.com/meteorhacks/fast-render)를 지원합니다.

- `meteor add meteorhacks:fast-render`
- `router.js` 파일을 공유되는 위치에 두십시요. `lib/router.js`를 추천합니다.

subscription 등록 내부에서 `isClient` 블럭으로 Fast-Render 지원을 제외할 수 있습니다.

~~~js
FlowRouter.route('/blog/:postId', {
    subscriptions: function(params, queryParams) {
        // Fast Render를 사용합니다.
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));

        // Fast Render를 사용하지 않습니다.
        if(Meteor.isClient) {
            this.register('data', Meteor.subscribe('bootstrap-data');
        }
    }
});
~~~

#### Subscription 캐싱

[Subs Manager](https://github.com/meteorhacks/subs-manager)를 이용하여 클라이언트에서 subscription을 캐싱할 수 있습니다.
우리는 그것이 작동할 수 있도록 특별히 무엇인가 만들어두진 않았습니다.
이것은 다른 라우터에서도 작동합니다.

## IE9 지원

FlowRouter는 IE9를 지원합니다.
하지만 대부분의 앱에서 필요로 하지 않기 때문에 **HTML5 history polyfill**을 지원하진 않습니다.

만약 IE9에서 **HTML5 history polyfill** 지원이 필요할 경우 아래 페키지를 설치하십시요.

~~~shell
meteor add tomwasd:history-polyfill
~~~

## Hashbang URLs

`mydomain.com/#!/mypath`과 같은 해시뱅 URLs를 사용하려면 아래 코드처럼 `initialize` 함수의 옵션중 `hashbang`을 `true`로 설정합니다:

~~~js
// file: app.js
FlowRouter.wait();
WhenEverYourAppIsReady(function() {
  FlowRouter.initialize({hashbang: true});
});
~~~

## Prefixed paths (경로 접두사)

원문:

In cases you wish to run multiple web application on the same domain name, you’ll probably want to serve your particular meteor application under a sub-path (eg `example.com/myapp`). In this case simply include the path prefix in the meteor `ROOT_URL` environment variable and FlowRouter will handle it transparently without any additional configuration.

번역문:

동일한 도메인에서 여러 웹앱을 실행하고자 하는 경우(예: example.com/myapp), 해당 하위 경로에서 지정한 meteor 앱을 제공하고 싶을 것입니다.
이러한 경우에는 `ROOT_URL`이라는 환경변수와 FlowRouter에 경로 접두사를 추가하면, 추가적인 구성없이 처리됩니다.

## Add-ons

라우터는 앱의 기본 페키지입니다.
[useraccounts](http://useraccounts.meteor.com/)와 같은 다른 프로젝트는 FlowRouter를 지원합니다.
그렇지 않으면 실제 프로젝트에서 FlowRouter를 사용하기 어렵습니다.
지금은 많은 [페키지가 FlowRouter를 지원](https://kadira.io/blog/meteor/addon-packages-for-flowrouter)하기 시작했습니다.

따라서 FlowRouter에서도 원하는 패키지를 사용할 수 있습니다.
그렇지 않은 경우 FlowRouter로 변환하기 쉬운 [프로세스](https://kadira.io/blog/meteor/addon-packages-for-flowrouter#what-if-project-xxx-still-doesn-t-support-flowrouter-)가 있습니다.

**Add-on API**

원문:

We have also released a [new API](https://github.com/kadirahq/flow-router#flowrouteronrouteregistercb) to support add-on developers.
With that add-on packages can get a notification, when the user created a route in their app.

If you've more ideas for the add-on API, [let us know](https://github.com/kadirahq/flow-router/issues).

번역:

우리는 에드온 개발자를 위해 [새로운 API](https://github.com/kadirahq/flow-router#flowrouteronrouteregistercb) 지원합니다.
이 부가기능의 페키지를 사용하면 사용자가 라우터를 생성할 때 알람을 받을 수 있습니다.

만약 당신이 에드온 API에 대한 더 좋은 아이디어가 있다면 [우리에게 알려주십시요](https://github.com/kadirahq/flow-router/issues).

## Iron Router(아이언 라우터)와 다른점

FlowRouter와 Iron Router는 두개의 다른점이 있습니다.
Iron Router는 라우팅, 서브스크립션, 렌더링, 레이아웃 메니저(routing, subscriptions, rendering, layout management)와 같이 모든 기능을 갖춘 솔루션을 제공합니다.

FLowRouter는 UI 퍼포먼스에 중점을 둔 최소한의 솔루션입니다.

그 차이점에 대해 좀 더 자세히 알아봅시다.

### Rendering(렌더링)

FlowRouter는 렌더링을 처리하지 않습니다.
라우터에서 렌더링을 분리하면 [Blaze Layout](https://github.com/kadirahq/blaze-layout)과 같은 렌더링 프레임워크를 사용하여 Blaze의 동적 템플릿(Dynamic Templates)과 같은 것들을 활용할 수 있습니다.
렌더링이 실행되는 시점은 라우터의 `action`이 실행될 때 입니다.
우리는 [React](https://github.com/kadirahq/meteor-react-layout)에 대한 레이아웃 메니저도 가지고 있습니다.

### Subscriptions(서브스크립션 === 구독)

FlowRouter에서는 템플릿/컴포넌트 레이아웃 서브스크립션을 사용하는 것이 좋습니다.
그러나 라우터 계층에서 라우팅을 수행해야 할 경우 [서브스크립션 등록](#subscription구독-관리) 메커니즘이 있습니다.
이것을 활용하여 FlowRouter는 서브스크립션(완료)를 기다리지 않고도 레이아웃을 보여줄 수 있습니다.

### Reactive Content

Iron Router에서는 라우터 내부에서 반응형 컨텐츠를 사용할 수 있지만, 모든 후크 또는 메소드는 예측할 수없는 방식으로 재실행 될 수 있습니다.
FlowRouter는 반응적인 데이터 소스가 처음 호출 될 때 한번만 실행되도록 제한합니다.

우리는 라우터는 단순히 사용자의 액션이라 생각합니다.
렌더링 레이아웃 내에서 반응적 컨텐츠를 작업할 수 있습니다.

### router.current()는 좋지 않습니다.

`Router.current()`는 좋지 않습니다.
왜일까요?
아래 예제를 살펴봅시다.

~~~
// 앱에 다음과 같은 경로가 있다고 가정해 봅시다.
/apps/:appId/:section
~~~

이제, 우리는 URL에서 `appId`를 얻으려고 합니다.
그러면 Iron Router에서는 아래와 같은 코드를 사용해야 합니다.

~~~js
Templates['foo'].helpers({
    "someData": function() {
        var appId = Router.current().params.appId;
        return doSomething(appId);
    }
});
~~~

이번에는 라우터(경로)에서 `:section` 부분을 변경했다고 칩시다.
그러면 위 헬퍼 `someData`는 다시 실행됩니다.
만약 URL에 쿼리파람을 추가하게 되도 역시 다시 실행됩니다.
왜냐하면 `Router.current()`가 라우터(URL)이 변경됨을 감지하기 때문입니다.
하지만 `appId` 값은 변경되지 않았습니다.

이러한 이유로 앱은 계속해서 다시 실행되고 다시 렌더링 됩니다.
이렇게 되면 앱에서는 예측하지 못한 렌더링이 발생하게 됩니다.

FLowRouter는 이러한 문제를 해결하기 위해 `Router.getParam()` API를 제공합니다.
아래는 그 사용 예입니다:

~~~js
Templates['foo'].helpers({
    "someData": function() {
        var appId = FlowRouter.getParam('appId');
        return doSomething(appId);
    }
});
~~~

### 데이터 컨텍스트 없음

원문:

FlowRouter does not have a data context.
Data context has the same problem as reactive `.current()`.
We believe, it'll possible to get data directly in the template (component) layer.

번역:

FlowRouter는 데이터 컨텍스트가 없습니다.
데이터 컨텍스트는 반응형 `.current()`와 같은 문제가 있습니다.
우리는 템플릿 계층에서 데이터를 가지고 올 수 있다고 믿습니다.


### Fast Render 내장 지원

FlowRouter는 [Fast Render](https://github.com/meteorhacks/fast-render)를 내장 지원합니다.
단지 Fast Render를 추가하기만 하면 동작합니다.
라우터에서 무엇인가 변경할 필요가 없습니다.

좀 더 자세한 정보는 [여기](#fast-render)에서 확인하십시요.

### Server Side Routing (서버 사이드 라우팅)

FlowRouter는 클라이언트 측 라우터이며, 서버측에서 라우팅에 대해 전혀 지원하지 않습니다.
하지만 Fast Render의 지원으로 `subscriptions`을 서버에서 활성화 할 수 있습니다.

#### 이러한 이유

Meteor는 서버에서 직접 HTML을 전송하는 전통적인 프레임워크가 아닙니다.
Meteor는 특수하게 세팅한 HTML을 클라이언트에 보내야 합니다.
그렇기 때문에 당신은 직접 클라이언트에 무엇인가를 보낼 수 없습니다.

또한, 서버에서는 클라이언트 측과 다른 무엇인가를 찾아야 합니다.
아래는 몇가지 예입니다:

* 서버에서는 해더를 처리해야 합니다.
* 서버에서는 `GET`, `POST` 등과 같은 메소드를 처리해야 합니다.
* 서버에는 쿠키가 있습니다.

그렇기 때문에 [`meteorhacks:picker`](https://github.com/meteorhacks/picker)과 같은 전용 서버 사이드 라우터를 사용해야 합니다.
이것은 커넥트와 익스프레스 미들웨어를 지원하며 사용하기 위한 문법이 쉽습니다.

### Server Side Rendering (서버 사이드 렌더링 === SSR)

FlowRouter 3.0은 SSR을 지원할 예정입니다.
우리는 이미 개발에 착수하였으며 [`ssr`](https://github.com/meteorhacks/flow-router/tree/ssr) 브런치에서 확인 가능합니다.

FlowRouter 3.0 will have server side rendering support.
We've already started the initial version and check our [`ssr`](https://github.com/meteorhacks/flow-router/tree/ssr) branch for that.

이것은 매우 유용하며 Kadira의 <https://kadira.io>는 이미 이것을 사용하고 있습니다.

### 초기 로딩 개선 지원

Meteor는 렌더링하기 전에 모든 JS 및 다른 리소스가 로드 될 때까지 기다립니다.
이것이 문제입니다.
3.0 버전에서는 SSR 지원으로 이것을 해결할 것입니다.

## Migrating into 2.0

버전 2.0으로의 마이그레이션은 쉽고 이미 2.0 기능과 API를 사용하고 있기 때문에 애플리케이션 코드를 변경할 필요가 없습니다.
2.0에서는 이름을 변경하고 일부 비추천 API를 삭제했습니다.

다음은 앱을 2.0으로 이전하는 단계입니다.

#### 새로운 FlowRouter 페키지 사용하기

* 이제 FlowRouter는 `kadira:flow-router`입니다.
* 그러므로 `meteor remove meteorhacks:flow-router`라고 입력하여 `meteorhacks:flow-router`를 제거합니다.
* 그리고나서 `meteor add kadira:flow-router`라고 입력하여 `kadira:flow-router`를 설치합니다.

#### FlowLayout을 BlazeLayout로 변경하기

* 우리는 FlowLayout을 [BlazeLayout](https://github.com/kadirahq/blaze-layout)으로 개명하였습니다.
* 그러므로 `meteorhacks:flow-layout`를 지우고 `kadira:blaze-layout`를 추가합니다.
* 따라서 `FlowLayout.render()` 대신 `BlazeLayout.render()`를 사용해야 합니다.

#### 비추천 API 사용 중지하기

* 미들웨어를 지원하지 않으므로 트리거를 사용하십시요.
* `.reactiveCurrent()`라는 API는 이제 없으므로 `.watchPathChange()`를 대신 사용하십시요.
* 이전에는 `FlowRouter.current().params.query`과 같은 방식으로 쿼리파람에 접근 할 수 있었습니다.
하지만 지금은 `FlowRouter.current().queryParams`를 사용하여 접근해야 합니다.