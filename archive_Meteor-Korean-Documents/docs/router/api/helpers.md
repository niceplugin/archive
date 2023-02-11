---
title: Header
---

# Header %{ #helpers }%

## isActiveRoute

- 설명: 제공된 라우트 `name`이 현재 활성 라우트의 `name`과 일치하는지 확인. <br>

  `active`인 문자열 또는 `false`를 반환합니다.
  [상세 정보](#isnotactivepath)

## isActivePath

- 설명: 제공된 라우트가 현재 활성 라우트의 `path`와 일치하는지 확인.

  `active`인 문자열 또는 `false`를 반환합니다.
  [상세 정보](#isnotactivepath)

## isNotActiveRoute

- 설명: 제공된 라우트 `name`이 현재 활성 라우트의 `name`과 일치하지 않는지 확인

  `disabled`인 문자열 또는 `false`를 반환합니다.
  [상세 정보](#isnotactivepath)

## isNotActivePath

- 설명: 제공된 라우트가 현재 활성 라우트의 `path`와 일치하지 않는지 확인.

  `disabled`인 문자열 또는 `false`를 반환합니다.
  
- 예제:
  ```html
  <li class="{{ isNotActivePath '/home' }}">...</li>
  <li class="{{ isNotActivePath path='/home' }}">...</li>
  <li class="{{ isNotActivePath regex='home|dashboard' }}">...</li>
  {{# if isNotActivePath '/home' }}
    <span>'/home'이 현재 경로의 경로가 아닌 경우에만 표시</span>
  {{/ if }}
  {{# if isNotActivePath regex='^\\/products' }}
    <span>현재 경로의 경로가 '/products'로 시작하지 않는 경우에만 표시</span>
  {{/ if }}
  
  <li class="{{ isNotActivePath class='is-disabled' path='/home' }}">...</li>
  <li class="{{ isNotActivePath '/home' class='is-disabled' }}">...</li>
  ```
  
- 인수: (선택사항) `isNotActivePath`, `isNotActiveRoute`, `isActivePath` 및 `isActiveRoute` 헬퍼에서 인수로 사용할 수 있습니다.
  ```ts
  type isNotActivePath = (
    argument: routeName | path | regex | options
  ) => false | option.class
  
  type routeName = string
  type path = string
  type regex = string | RegExp
  type option = {
    routeName,
    path,
    regex,
    class: string // 적용할 클레스 이름 (기본값: active 또는 disabled)
  }
  ```
  
## pathFor

- 설명: 라우트의 경로를 만드는 데 사용됩니다.

  [상세 정보](#urlfor)

## urlFor

라우트에 대한 절대 URL을 생성하는 데 사용됩니다.
첫 번째 파라미터는 "라우트 정의" 또는 라우트에 할당한 `name`일 수 있습니다.
그런 다음 경로를 구성하는 데 필요한 파라미터를 전달할 수 있습니다.
쿼리 파라미터는 `query`로 전달할 수 있습니다.
해시 기능은 `hash` 속성을 통해 지원됩니다.

- 예제:
  ```html
  {{pathFor '/post/:id' id=123}} <!-- /post/123 -->  
  {{urlFor '/post/:id' id=123}} <!-- http://localhost:3000/post/123 -->  
  <a href="{{urlFor '/post/:id' id=_id}}">게시물 링크</a>
  <a href="{{urlFor 'postRouteName' id=_id}}">게시물 링크</a>
  <a href="{{urlFor '/post/:id/comments/:cid' id=_id cid=comment._id}}">게시물의 댓글 링크</a>
  <a href="{{urlFor '/post/:id/comments/:cid' id=_id hash=comment._id}}">댓글 이동 위치</a>
  <a href="{{urlFor '/post/:id/comments/:cid' id=_id cid=comment._id query='back=yes&more=true'}}">쿼리 파라미터를 가진 게시물의 댓글 링크</a>
  ```

- 타입:
  ```ts
  type urlFor = ( path: pathConfig | pathName,
                   params?: params) => string;
  
  type pathConfig = string
  type pathName = string
  type params = {
    [key: string]: string, // 파라미터
    query?: string,
    hash?: string
  }
  ```

## param

- 설명: URL의 해당 파라미터 값을 반환합니다.

- 예제:
  ```html
  <div>게시글의 ID는 <em>{{param 'id'}}</em> 입니다.</div>
  ```

- 타입:
  ```ts
  type param = ( paramKey: string ) => string | void;
  ```

## queryParam

- 설명: URL의 해당 파라미터 값을 반환합니다.

- 예제:
  ```html
  <div>게시글의 "User" 쿼리는 <em>{{queryParam 'user'}}</em> 입니다.</div>
  ```

- 타입:
  ```ts
  type queryParam = ( query: string ) => string | void;
  ```

## currentRouteName

- 설명: 현재 라우트의 `name`을 반환합니다.

- 예제:
  ```html
  <p>이 라우트의 이름은 {{ currentRouteName }}입니다.</p>
  ```

- 타입:
  ```ts
  type currentRouteName = () => string;
  ```

## currentRouteOption

- 설명: 현재 라우트의 옵션(커스텀 속성을 포함)을 반환합니다.

- 예제:
  ```js
  FlowRouter.route('name', {
    name: 'routeName',
    action() {
      this.render('layoutTemplate', 'main')
    },
    myOption: "myOptionValue"
  })
  ```

  ```html
  <p>이 라우트의 커스텀 옵션 "myOption"는 {{ currentRouteOption }}입니다.</p>
  ```

- 타입:
  ```ts
  type currentRouteOption = () => string;
  ```

## RouterHelpers Class

:::warning
이것은 템플릿에서 사용하는 헬퍼가 아닙니다. 혼동하지 마십시오.
:::

- 설명: 템플릿에서 사용하는 라우터 헬퍼를 JS 코드에서 참조할 수 있게 해줍니다.

- 예제:
```js
import { RouterHelpers } from 'meteor/ostrio:flow-router-extra'

RouterHelpers.name('home')
// 현재 경로의 이름이 'home'이면 true를 반환합니다.
RouterHelpers.name(new RegExp('home|dashboard'))
// 현재 경로 이름에 'home' 또는 'dashboard'가 포함되어 있으면 true를 반환합니다.
RouterHelpers.name(/^products/)
// 현재 경로의 이름이 'products'로 시작하면 true를 반환합니다.
RouterHelpers.path('/home')
// 현재 경로의 경로가 '/home'이면 true를 반환합니다.
RouterHelpers.path(new RegExp('users'))
// 현재 경로의 경로에 'users'가 포함되어 있으면 true를 반환합니다.
RouterHelpers.path(/\/edit$/i)
// 현재 경로의 경로가 대소문자를 구분하지 않고,
// '/edit'로 끝나는 경우 true를 반환합니다.

RouterHelpers.pathFor('/post/:id', {id: '12345'})

RouterHelpers.configure({
  activeClass: 'active',
  caseSensitive: true,
  disabledClass: 'disabled',
  regex: 'false'
})
```














