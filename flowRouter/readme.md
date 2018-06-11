# FlowRouter [![Build Status](https://travis-ci.org/kadirahq/flow-router.svg?branch=master)](https://travis-ci.org/kadirahq/flow-router) [![Stories in Ready](https://badge.waffle.io/kadirahq/flow-router.svg?label=doing&title=Activities)](http://waffle.io/kadirahq/flow-router)

FlowRouter는 Meteor용 클라이언트 라우터로 신중하게 설계되었다.

클라이언트 측 앱 라우팅을 수행하며 렌더링 처리는 하지않는 간단한 라우터입니다.

URL을 변경하거나 반응적으로 URL 데이터를 가지고 올 수 있도록 훌륭한 API를 제공합니다.
그러나 라우터 자체가 반응적이지는 않습니다.
가장 중요한 점은 FLowRouter는 최고의 라우팅 성능을 낼 수 있도록 초점을 두고 설계되었다는 것입니다.

> 이미 FLowRouter를 사용중이라면 [2.0 릴리즈 가이드](#migrating-into-20)를 참고하십시요.

## TOC

* [미티어 라우팅 가이드](#meteor-routing-guide)
* [시작하](#getting-started)
* [경로(라우터) 정의](#routes-definition)
* [경로(라우터) 그룹화](#group-routes)
* [렌더링 및 레이아웃 관리](#rendering-and-layout-management)
* [트리거 (Triggers)](#triggers)
* [찾을 수 없는 페이지 라우터 설정](#not-found-routes)
* [API](#api)
* [Subscription Management](#subscription-management)
* [IE9 Support](#ie9-support)
* [Hashbang URLs](#hashbang-urls)
* [Prefixed paths](#prefixed-paths)
* [Add-ons](#add-ons)
* [Difference with Iron Router](#difference-with-iron-router)
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

이제 라우터를 사용하는 코드를 짜봅시다. (우선 `lib/router.js` 경로에 파일을 만듭니다.)

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

라우터네임을 가지고 온다. **[반응형]**

~~~js
Tracker.autorun(function() {
  var routeName = FlowRouter.getRouteName();
  console.log("현재 라우터의 이름: ", routeName);
});
~~~

#### FlowRouter.current()

Get the current state of the router. **This API is not reactive**.
If you need to watch the changes in the path simply use `FlowRouter.watchPathChange()`.

This gives an object like this:

~~~js
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

var current = FlowRouter.current();
console.log(current);

// prints following object
// {
//     path: "/apps/this-is-my-app?show=yes&color=red",
//     params: {appId: "this-is-my-app"},
//     queryParams: {show: "yes", color: "red"}
//     route: {pathDef: "/apps/:appId", name: "name-of-the-route"}
// }
~~~

#### FlowRouter.watchPathChange()

Reactively watch the changes in the path. If you need to simply get the params or queryParams use dedicated APIs like `FlowRouter.getQueryParam()`.

~~~js
Tracker.autorun(function() {
  FlowRouter.watchPathChange();
  var currentContext = FlowRouter.current();
  // do anything with the current context
  // or anything you wish
});
~~~

#### FlowRouter.withReplaceState(fn)
Normally, all the route changes made via APIs like `FlowRouter.go` and `FlowRouter.setParams()` add a URL item to the browser history. For example, run the following code:

~~~js
FlowRouter.setParams({id: "the-id-1"});
FlowRouter.setParams({id: "the-id-2"});
FlowRouter.setParams({id: "the-id-3"});
~~~

Now you can hit the back button of your browser two times. This is normal behavior since users may click the back button and expect to see the previous state of the app.

But sometimes, this is not something you want. You don't need to pollute the browser history. Then, you can use the following syntax.

~~~js
FlowRouter.withReplaceState(function() {
  FlowRouter.setParams({id: "the-id-1"});
  FlowRouter.setParams({id: "the-id-2"});
  FlowRouter.setParams({id: "the-id-3"});
});
~~~

Now, there is no item in the browser history. Just like `FlowRouter.setParams`, you can use any FlowRouter API inside `FlowRouter.withReplaceState`.

> We named this function as `withReplaceState` because, replaceState is the underline API used for this functionality. Read more about [replace state & the history API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).

#### FlowRouter.reload()

FlowRouter routes are idempotent. That means, even if you call `FlowRouter.go()` to the same URL multiple times, it only activates in the first run. This is also true for directly clicking on paths.

So, if you really need to reload the route, this is the API you want.

#### FlowRouter.wait() and FlowRouter.initialize()

By default, FlowRouter initializes the routing process in a `Meteor.startup()` callback. This works for most of the apps. But, some apps have custom initializations and FlowRouter needs to initialize after that.

So, that's where `FlowRouter.wait()` comes to save you. You need to call it directly inside your JavaScript file. After that, whenever your app is ready call `FlowRouter.initialize()`.

eg:-

~~~js
// file: app.js
FlowRouter.wait();
WhenEverYourAppIsReady(function() {
  FlowRouter.initialize();
});
~~~

For more information visit [issue #180](https://github.com/meteorhacks/flow-router/issues/180).

#### FlowRouter.onRouteRegister(cb)

This API is specially designed for add-on developers. They can listen for any registered route and add custom functionality to FlowRouter. This works on both server and client alike.

~~~js
FlowRouter.onRouteRegister(function(route) {
  // do anything with the route object
  console.log(route);
});
~~~

Let's say a user defined a route like this:

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

Then the route object will be something like this:

~~~js
{
  pathDef: '/blog/:post',
  name: 'postList',
  options: {customField: 'customName'}
}
~~~

So, it's not the internal route object we are using.

## Subscription Management

For Subscription Management, we highly suggest you to follow [Template/Component level subscriptions](https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management). Visit this [guide](https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management) for that.

FlowRouter also has it's own subscription registration mechanism. We will remove this in version 3.0. We don't remove or deprecate it in version 2.x because this is the easiest way to implement FastRender support for your app. In 3.0 we've better support for FastRender with Server Side Rendering.

FlowRouter only deals with registration of subscriptions. It does not wait until subscription becomes ready. This is how to register a subscription.

~~~js
FlowRouter.route('/blog/:postId', {
    subscriptions: function(params, queryParams) {
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));
    }
});
~~~

We can also register global subscriptions like this:

~~~js
FlowRouter.subscriptions = function() {
  this.register('myCourses', Meteor.subscribe('courses'));
};
~~~

All these global subscriptions run on every route. So, pay special attention to names when registering subscriptions.

After you've registered your subscriptions, you can reactively check for the status of those subscriptions like this:

~~~js
Tracker.autorun(function() {
    console.log("Is myPost ready?:", FlowRouter.subsReady("myPost"));
    console.log("Are all subscriptions ready?:", FlowRouter.subsReady());
});
~~~

So, you can use `FlowRouter.subsReady` inside template helpers to show the loading status and act accordingly.

### FlowRouter.subsReady() with a callback

Sometimes, we need to use `FlowRouter.subsReady()` in places where an autorun is not available. One such example is inside an event handler. For such places, we can use the callback API of `FlowRouter.subsReady()`.

~~~js
Template.myTemplate.events({
   "click #id": function(){
      FlowRouter.subsReady("myPost", function() {
         // do something
      });
  }
});
~~~

> Arunoda has discussed more about Subscription Management in FlowRouter in [this](https://meteorhacks.com/flow-router-and-subscription-management.html#subscription-management) blog post about [FlowRouter and Subscription Management](https://meteorhacks.com/flow-router-and-subscription-management.html).

> He's showing how to build an app like this:

>![FlowRouter's Subscription Management](https://cldup.com/esLzM8cjEL.gif)

#### Fast Render
FlowRouter has built in support for [Fast Render](https://github.com/meteorhacks/fast-render).

- `meteor add meteorhacks:fast-render`
- Put `router.js` in a shared location. We suggest `lib/router.js`.

You can exclude Fast Render support by wrapping the subscription registration in an `isClient` block:

~~~js
FlowRouter.route('/blog/:postId', {
    subscriptions: function(params, queryParams) {
        // using Fast Render
        this.register('myPost', Meteor.subscribe('blogPost', params.postId));

        // not using Fast Render
        if(Meteor.isClient) {
            this.register('data', Meteor.subscribe('bootstrap-data');
        }
    }
});
~~~

#### Subscription Caching

You can also use [Subs Manager](https://github.com/meteorhacks/subs-manager) for caching subscriptions on the client. We haven't done anything special to make it work. It should work as it works with other routers.

## IE9 Support

FlowRouter has IE9 support. But it does not ship the **HTML5 history polyfill** out of the box. That's because most apps do not require it.

If you need to support IE9, add the **HTML5 history polyfill** with the following package.

~~~shell
meteor add tomwasd:history-polyfill
~~~

## Hashbang URLs

To enable hashbang urls like `mydomain.com/#!/mypath` simple set the `hashbang` option to `true` in the initialize function:

~~~js
// file: app.js
FlowRouter.wait();
WhenEverYourAppIsReady(function() {
  FlowRouter.initialize({hashbang: true});
});
~~~

## Prefixed paths

In cases you wish to run multiple web application on the same domain name, you’ll probably want to serve your particular meteor application under a sub-path (eg `example.com/myapp`). In this case simply include the path prefix in the meteor `ROOT_URL` environment variable and FlowRouter will handle it transparently without any additional configuration.

## Add-ons

Router is a base package for an app. Other projects like [useraccounts](http://useraccounts.meteor.com/)  should have support for FlowRouter. Otherwise, it's hard to use  FlowRouter in a real project. Now a lot of packages have [started to support FlowRouter](https://kadira.io/blog/meteor/addon-packages-for-flowrouter).

So, you can use your your favorite package with FlowRouter as well. If not, there is an [easy process](https://kadira.io/blog/meteor/addon-packages-for-flowrouter#what-if-project-xxx-still-doesn-t-support-flowrouter-) to convert them to FlowRouter.

**Add-on API**

We have also released a [new API](https://github.com/kadirahq/flow-router#flowrouteronrouteregistercb) to support add-on developers. With that add-on packages can get a notification, when the user created a route in their app.

If you've more ideas for the add-on API, [let us know](https://github.com/kadirahq/flow-router/issues).

## Difference with Iron Router

FlowRouter and Iron Router are two different routers. Iron Router tries to be a full featured solution. It tries to do everything including routing, subscriptions, rendering and layout management.

FlowRouter is a minimalistic solution focused on routing with UI performance in mind. It exposes APIs for related functionality.

Let's learn more about the differences:

### Rendering

FlowRouter doesn't handle rendering. By decoupling rendering from the router it's possible to use any rendering framework, such as [Blaze Layout](https://github.com/kadirahq/blaze-layout) to render with Blaze's Dynamic Templates. Rendering calls are made in the the route's action. We have a layout manager for [React](https://github.com/kadirahq/meteor-react-layout) as well.

### Subscriptions

With FlowRouter, we highly suggest using template/component layer subscriptions. But, if you need to do routing in the router layer, FlowRouter has [subscription registration](#subscription-management) mechanism. Even with that, FlowRouter never waits for the subscriptions and view layer to do it.

### Reactive Content

In Iron Router you can use reactive content inside the router, but any hook or method can re-run in an unpredictable manner. FlowRouter limits reactive data sources to a single run; when it is first called.

We think that's the way to go. Router is just a user action. We can work with reactive content in the rendering layer.

### router.current() is evil

`Router.current()` is evil. Why? Let's look at following example. Imagine we have a route like this in our app:

~~~
/apps/:appId/:section
~~~

Now let's say, we need to get `appId` from the URL. Then we will do, something like this in Iron Router.

~~~js
Templates['foo'].helpers({
    "someData": function() {
        var appId = Router.current().params.appId;
        return doSomething(appId);
    }
});
~~~

Let's say we changed `:section` in the route. Then the above helper also gets rerun. If we add a query param to the URL, it gets rerun. That's because `Router.current()` looks for changes in the route(or URL). But in any of above cases, `appId` didn't get changed.

Because of this, a lot parts of our app get re-run and re-rendered. This creates unpredictable rendering behavior in our app.

FlowRouter fixes this issue by providing the `Router.getParam()` API. See how to use it:

~~~js
Templates['foo'].helpers({
    "someData": function() {
        var appId = FlowRouter.getParam('appId');
        return doSomething(appId);
    }
});
~~~

### No data context

FlowRouter does not have a data context. Data context has the same problem as reactive `.current()`. We believe, it'll possible to get data directly in the template (component) layer.

### Built in Fast Render Support

FlowRouter has built in [Fast Render](https://github.com/meteorhacks/fast-render) support. Just add Fast Render to your app and it'll work. Nothing to change in the router.

For more information check [docs](#fast-render).

### Server Side Routing

FlowRouter is a client side router and it **does not** support server side routing at all. But `subscriptions` run on the server to enable Fast Render support.

#### Reason behind that

Meteor is not a traditional framework where you can send HTML directly from the server. Meteor needs to send a special set of HTML to the client initially. So, you can't directly send something to the client yourself.

Also, in the server we need look for different things compared with the client. For example:

* In the server we have to deal with headers.
* In the server we have to deal with methods like `GET`, `POST`, etc.
* In the server we have Cookies.

So, it's better to use a dedicated server-side router like [`meteorhacks:picker`](https://github.com/meteorhacks/picker). It supports connect and express middlewares and has a very easy to use route syntax.

### Server Side Rendering

FlowRouter 3.0 will have server side rendering support. We've already started the initial version and check our [`ssr`](https://github.com/meteorhacks/flow-router/tree/ssr) branch for that.

It's currently very usable and Kadira already using it for <https://kadira.io>

### Better Initial Loading Support

In Meteor, we have to wait until all the JS and other resources send before rendering anything. This is an issue. In 3.0, with the support from Server Side Rendering we are going to fix it.

## Migrating into 2.0

Migrating into version 2.0 is easy and you don't need to change any application code since you are already using 2.0 features and the APIs. In 2.0, we've changed names and removed some deprecated APIs.

Here are the steps to migrate your app into 2.0.

#### Use the New FlowRouter Package
* Now FlowRouter comes as `kadira:flow-router`
* So, remove `meteorhacks:flow-router` with : `meteor remove meteorhacks:flow-router`
* Then, add `kadira:flow-router` with `meteor add kadira:flow-router`

#### Change FlowLayout into BlazeLayout
* We've also renamed FlowLayout as [BlazeLayout](https://github.com/kadirahq/blaze-layout).
* So, remove `meteorhacks:flow-layout` and add `kadira:blaze-layout` instead.
* You need to use `BlazeLayout.render()` instead of `FlowLayout.render()`

#### Stop using deprecated Apis
* There is no middleware support. Use triggers instead.
* There is no API called `.reactiveCurrent()`, use `.watchPathChange()` instead.
* Earlier, you can access query params with `FlowRouter.current().params.query`. But, now you can't do that. Use `FlowRouter.current().queryParams` instead.
