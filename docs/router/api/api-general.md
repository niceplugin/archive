---
title: 일반적인 메서드
---

# 일반적인 메서드 %{ #api-general }%

## route()

- 설명: 경로 선언
- 예제:
  ```js
  import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

  FlowRouter.route('/blog', {
    name: 'blogName',
    action() { /* ... */ } })
  
  FlowRouter.route('/blog/_id', {
    name: 'blogPost',
    action() { /* ... */ } })
  ```
- 타입:
  ```ts
  declare module FlowRouter {
    route: (
      path: path,
      options: {
        name: routeName,
        [hookKey in string]?: Function, //사용 가능한 모든 훅 (훅 API 참조)
        [propKey in string]?: any       // 경로 호출 내에서 사용할 수 있는 모든 속성
      },
    ): Route => {}
  }
  
  type path = string
  type routeName = string 
  declare module Route { /* ... */ }
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
  declare module FlowRouter {
    group: ( options?: options ): Group => { /* ... */ }
  }
  
  type routeName = string
  type prefixPath = string
  type options = {
    name?: routeName,
    prefix?: prefixPath,
    [hookKey in string]?: Function, //사용 가능한 모든 훅 (훅 API 참조)
    [propKey in string]?: any       // 경로 호출 내에서 사용할 수 있는 모든 속성
  }
  declare module Group { /* ... */ }
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
  declare module FlowRouter {
    go: (
      path: path | routeName,
      params?: { [key in string]: string },
      query_params?: { [key in string]: string }
    ):void => { /* ... */ }
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
  declare module Route {
    render: (
      layout: templateName | Blaze.Template,
      template: templateName | Blaze.Template,
  
      // `template`와 `layout`모두에서 사용될 `data` 컨텍스트 입니다.
      data?: { [key in string]: string },
  
      // 템플릿이 렌더링되고 DOM에 배치된 후 트리거되는 콜백입니다.
      // 이 콜백에는 컨텍스트가 없습니다.
      callback?: Function,
    ):void => { /* ... */ }
  }
  
  type templateName = string
  declare module Blaze.Template { /* ... */ }
  ```

