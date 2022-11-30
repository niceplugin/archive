---
title: 코어 메서드
---

# 코어 메서드 %{ #core-methods }%

## route()

- 설명: 경로 선언
- 예제:
  ```js
  import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

  FlowRouter.route('/blog', {
    name: 'blogName',
    action() { /* ... */ }
  })
  
  FlowRouter.route('/blog/_id', {
    name: 'blogPost',
    action() { /* ... */ }
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    route(
      path: path,
      options: {
        name: routeName,
        [hookKey: string]: Function, //사용 가능한 모든 훅 (훅 API 참조)
        [propKey: string]: any       // 경로 호출 내에서 사용할 수 있는 모든 속성
      },
    ): Route
  }
  
  type path = string
  type routeName = string 
  interface Route { /* ... */ }
  ```
- 존재하지 않는 페이지 만들기
  ```js
  FlowRouter.route('*', {
    action() { /* 404 not found 페이지 보여주기 */ }
  });
  ```

## group()

- 설명: 더 나은 경로 구성을 위한 경로 그룹화
- 예제:
  ```js
  import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
  
  const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
  });
  
  // 경로: /admin/ route
  adminRoutes.route('/', {
    name: 'adminIndex',
    action() { /* ... */ }
  });
  
  // 경로: /admin/posts
  adminRoutes.route('/posts', {
    name: 'adminPosts',
    action() { /* ... */ }
  });
  ```
- 타입:
  ```ts
  interface FlowRouter {
    group( options?: options ): Group
  }
  
  type routeName = string
  type prefixPath = string
  type options = {
    name?: routeName,
    prefix?: prefixPath,
    [hookKey: string]: Function, //사용 가능한 모든 훅 (훅 API 참조)
    [propKey: string]: any       // 경로 호출 내에서 사용할 수 있는 모든 속성
  }
  interface Group { /* ... */ }
  ```
- 그룹 이름 가져오기:
  ```js
  FlowRouter.current().route.group.name
  ```
  
  중첩된 그룹인 경우, 아래처럼 상위 그룹의 이름을 가져올 수 있습니다:
  ```js
  FlowRouter.current().route.group.parent.name
  ```

## go()

- 설명: 경로 또는 해당 이름의 경로로 이동
- 예제:
  ```js
  import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

  FlowRouter.go('/blog')          // 경로로 이동 - /blog
  FlowRouter.go('blogName')       // 'blogName'이라는 이름의 경로로 이동 - /blog
  FlowRouter.go('blogPost',       // /blog/post_id
                { _id: 'post_id' })
  FlowRouter.go('blogPost',       // /blog/post_id?commentId=123
                { _id: 'post_id' },
                { commentId: '123' })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    go(
      path: path | routeName,
      params?: { [key: string]: string },
      query_params?: { [key: string]: string }
    ): void
  }
  
  type path = string
  type routeName = string 
  ```

## render()

- 설명: 이 메서드는 훅 API 내부에서만 사용할 수 있습니다.
  :::info
  이 메서드는 `templating`과 `blaze` 또는 `blaze-html-templates` 페키지가 설치되어 있어야지만 사용할 수 있습니다.
  :::
- 레이아웃을 사용하는 예제:
  ```js
  this.render(layout, template, data, callback)
  ```
- 레이아웃을 사용하지 않는 예제:
  ```js
  this.render(template, data, callback)
  ```
- 타입:
  ```ts
  interface Route {
    render(
      // 레이아웃에서는 `{{> yield }}`를 한 번 사용할 수 있습니다.
      // 이 스페이스 문법은 테그로 감싸줘야 정상적으로 작동합니다.
      layout: templateName | Blaze.Template,
  
      // 레이아웃을 사용하지 않은 경우, 템플릿은 `<body>` 내부에 렌더링 될 것입니다.
      template: templateName | Blaze.Template,
  
      // `template`와 `layout`모두에서 사용될 `data` 컨텍스트 입니다.
      data?: { [key: string]: string },
  
      // 템플릿이 렌더링되고 DOM에 배치된 후 트리거되는 콜백입니다.
      // 이 콜백에는 컨텍스트가 없습니다.
      callback?: Function,
    ):void
  }
  
  type templateName = string
  interface Template extends Blaze { /* ... */ }
  ```

## reload()

- 설명: FlowRouter 경로는 멱등적입니다.
  따라서 동일한 URL에 대해 `FlowRouter.go()`를 여러 번 호출하더라도,
  첫 번째 실행에서만 활성화됩니다.
  경로를 직접 클릭하는 경우에도 마찬가지입니다.

  따라서 경로를 다시 로드해야 하는 경우, 이 메서드를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.reload()
  ```

- 타입:
  ```ts
  interface FlowRouter {
    reload(): void;
  }
  ```

## refresh() ⚠️
:::warning
정확한 사용법 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/refresh.md)
:::

- 설명: 구독, 템플릿 렌더링 및 모든 경로의 훅과 정의를 강제로 다시 실행합니다.
  템플릿 로직이 경로의 훅에 따라 달라지는 경우에 유용합니다.
- 예제:  ```js
  FlowRouter.refresh('layout', 'template')
  ```

- 타입:
  ```ts
  interface FlowRouter {
    refresh(
      layout: routeName,
      template: routeName,
    ): void
  }
  
  type routeName = string 
  ```

## pathRegExp ⚠️

:::warning
레거시 여부 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/pathRegExp.md)
:::

## decodeQueryParamsOnce ⚠️

:::warning
레거시 여부 확인 필요 [원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/decodeQueryParamsOnce.md)
:::

## getParam()

- 설명: URL에서 파라미터 정보를 가져오는데 사용하는 반응형 함수입니다.
- 예제:
  ```js
  FlowRouter.getParam(paramName)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getParam(paramName: string): string
  }
  ```

## getQueryParam()

- 설명: 쿼리 문자열에서 정보를 가져오는데 사용하는 반응형 함수입니다.
- 예제:
  ```js
  FlowRouter.getQueryParam(queryKey)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getQueryParam(queryKey: string): string
  }
  ```

## setParams()

- 설명: 현재 경로의 파라미터를 새 값으로 변경하고, 새 경로로 다시 라우팅 합니다.
- 예제:
  ```js
  FlowRouter.setParams(params)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    setParams(params: Object): true
  }
  ```

## setQueryParams()

- 설명: 쿼리 문자열을 추가 또는 수정하거나, `null`을 입력하여 삭제할 수 있습니다.
- 예제:
  ```js
  FlowRouter.setQueryParams(queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    setQueryParams(queryParams: queryParams): true
  }
  
  type queryParams = { [key: string]: string | null }
  ```

## url()

- 설명: 이 앱을 가리키는 절대 URL을 생성합니다.
  `Meteor.absoluteUrl` API와 동일합니다.
- 예제:
  ```js
  FlowRouter.url(path, params, queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    url(path: path,
        params?: Object,
        queryParams?: Object): url
  }
  
  type routeName = string
  type path = string | routeName
  type url = string
  ```

## path()

- 설명: 라우트 경로를 생성합니다.
- 예제:
  ```js
  FlowRouter.path(path, params, queryParams)
  ```
- 타입:
  ```ts
  interface FlowRouter {
    path(path: path,
        params?: Object,
        queryParams?: Object): url
  }
  
  type routeName = string
  type path = string | routeName
  type url = string
  ```

## current()

- 설명: 라우터의 현재 상태를 가져옵니다.
  이 API는 반응형이 아니므로,
  경로의 변경 사항을 확인해야 하는 경우,
  `FlowRouter.watchPathChange()`를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.current()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    current(): currentRoute;
  }
  
  type currentRoute = {
    path: string,
    params: Object,
    queryParams: Object,
    route: {
      pathDef: string,
      name: string
    }
  }
  ```

## getRouteName()

- 설명: 경로명을 가져오는데 사용하며, 반응성 입니다.
- 예제:
  ```js
  FlowRouter.getRouteName()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    getRouteName(): string;
  }
  ```

## watchPathChange()

- 설명: 라우터의 변경 사항을 반응적으로 관찰합니다.
  단순히 `params` 또는 `query`를 가져와야 하는 경우,
  `FlowRouter.current()`를 사용해야 합니다.
- 예제:
  ```js
  FlowRouter.watchPathChange()
  ```
- 타입:
  ```ts
  interface FlowRouter {
    watchPathChange(): currentRoute;
  }
  
  type currentRoute = {
    path: string,
    params: Object,
    queryParams: Object,
    route: {
      pathDef: string,
      name: string
    }
  }
  ```

## withReplaceState()

- 설명: 일반적으로 `FlowRouter.go` 또는 `FlowRouter.setParams()`와 같이 경로를 변경하는 모든 API는
  변경된 URL 항목을 브라우저 히스토리에 추가합니다.

  그러면 사용자는 브라우저의 뒤로가기 버튼을 누를 수 있습니다.
  사용자가 뒤로 버튼을 클릭하면 앱의 이전 페이지를 볼 수 있기 때문에 이는 정상적인 동작입니다.

  그러나 서비스를 제공하는 입장에서 때때로 이러한 작동을 원치 않을 수 있습니다.
  브라우저 히스토리에 항목이 남지 않게 하려면 아래 예제와 같이 이 메서드를 활용해야 합니다.
- 예제:
  ```js
  FlowRouter.withReplaceState(() => {
    FlowRouter.setParams({ id: '123' })
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    withReplaceState( callback: Function ): void;
  }
  ```

## wait() & initialize() %{ #wait-and-initialize }%

- 설명: 기본적으로 FlowRouter는 `Meteor.startup()` 콜백에서 라우팅 프로세스를 초기화합니다.
  이러한 방식은 대부분의 앱에서 동일합니다.
  그러나 일부 앱은 커스텀 초기화가 있어 FlowRouter가 그 후에 초기화 되어야 할 수도 있습니다.

  이 메서드는 FlowRouter의 초기화를 대기시킵니다.

  앱의 커스텀 초기화가 끝나고 준비가 완료된 후,
  `FlowRouter.initialize()`를 호출합니다.
- 예제:
  ```js
  FlowRouter.wait()
  WhenEverYourAppIsReady(() => {
    FlowRouter.initialize( options )
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    wait(): void;
    initialize(options: options): void;
  }
  
  type options = {
    hashbang: boolean, // domain.com/#/ 와 같은 해시뱅 URL 활성화. 기본값: false
    page?: {
      click: boolean  // false 경우, <a href> 태그는 FlowRouter를 사용하지 않고,
                      // 브라우저의 기본 페이지 로드 방식을 사용할 것입니다.
                      // react-router 작동방식과 동일하며, 클릭 시 FlowRouter를 호출하도록
                      // <Link/> 컴포넌트를 만들 수 있습니다.
                      // 이렇게 하면 링크를 더 잘 제어할 수 있습니다. 기본값: true
                      // 다른 옵션은 page.js 문서에서 찾을 수 있습니다.
    }
  }
  ```
- 참고: [page.js 옵션과 관련된 문서](https://github.com/visionmedia/page.js#pageoptions)

## onRouteRegister() ⚠️

:::warning
레거시 메서드로 판단됨. 최초 1회만 작동하며, 매 경로 변경시 호출되지 않음.

[원본 링크](https://github.com/veliovgroup/flow-router/blob/master/docs/api/onRouteRegister.md)
:::

- 설명: 이 메서드는 애드온 개발자를 위해 특별히 설계되었습니다.
  등록된 모든 경로를 수신하므로, FlowRouter에 커스텀 기능을 추가할 수 있습니다.

  이것은 서버와 클라이언트 모두에서 동일하게 작동합니다.
- 예제:
  ```js
  FlowRouter.onRouteRegister((route) => {
    // 라우트 객체로 무엇이든 할 수 있음
    console.log(route)
  })
  ```
- 타입:
  ```ts
  interface FlowRouter {
    withReplaceState( callback: (route: object) => void ): void;
  }
  ```

