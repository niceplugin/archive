# 임시목차

- FlowRouter
  - .route(path, obj)
    - path: string
    - obj
      - name: string
      - action: function(param, queryParam) {}
        - param: object
        - queryParam: object
      - triggersEnter: array
        - array: [function, function ... function]
          - function(context, redirect, stop) {}
            - context: object === FlowRouter.current()
            - redirect: function(url, param, queryParam) { needs to be done in sync! }
            - stop: function() { stop routing }
      - triggersExit: array
        - array: [function, function ... function]
      - subscriptions: function(param, queryParam) {}
        - param: object
        - queryParam: object
  - .group(obj)
    - obj
      - prefix: string
      - name: string
      - triggersEnter: array
      - triggersExit: array
  - .triggers
    - .enter(arr, option)
      - arr: [function, function ... function]
      - option: object
        - object-key: only, except
        - object-value: array
          array: ['path1', 'path2' ... 'path_n']
    - .exit(arr, option)
  - .notFound
  - .subscriptions
    - = function (path)
      - path: string
  - .subsReady(name, callback)
  - .withReplaceState(func)
  - .watchPathChange()
  - .current()
  - .reload()
  - .wait()
  - .initialize()
  - .path(pathDef, params, queryParams)
  - .go(pathDef, params, queryParams)
  - .url(pathDef, params, queryParams)
  - .getParam(paramName)
  - .getQueryParam(queryStringKey)
  - .getRouteName()
  - .setParam(newParamName)
  - .setQueryParam(newQueryParam)

# 라우터 함수 실행되는 순서

1. Flowrouter.triggers enter
1. FlowRouter.group triggersEnter
1. FlowRouter.route triggersEnter
1. Flowrouter subscriptions
1. FlowRouter.group subscriptions
1. FlowRouter.route subscriptions
1. FlowRouter.route action
1. Template onCreated
1. Template autorun // 설명1
1. Template helpers
1. Template onRendered
1. // 라우터 경로 변경 발생 //
1. Flowrouter.triggers exit
1. FlowRouter.route triggersExit // 설명2
1. FlowRouter.group triggersExit
1. Flowrouter.triggers enter
1. FlowRouter.group triggersEnter
1. FlowRouter.route triggersEnter
1. Flowrouter subscriptions
1. FlowRouter.group subscriptions
1. FlowRouter.route subscriptions
1. FlowRouter.route action
1. // 다른 템플릿을 렌더링 할 경우 //
1. Template onDestroyed // 설명3
1. Other Template onCreated
1. Other Template autorun
1. Other Template helpers
1. Other Template onRendered

> 설명1<br>
> `onCreated` 내에서 `autorun`을 선언했을 경우 위 순소를 따른다.<br>
> `onRendered` 내에서 `autorun`을 선언했을 경우<br>
> `onCreated > helpers > onRendered > autorun > helpers`와 같이 실행된다. (해당 `helpers`가 `autorun` 내에서 리셋되는 리엑티브 타입의 무엇인가를 참조할 경우)<br>
> 따라서 `autorun`은 `onCreated` 내에서 선언하여야 한다.

> 설명2<br>
> 유일하게 `FlowRouter.route`가 `FlowRouter.group` 보다 먼저 실행되는 구간임을 주의하자.

> 설명3<br>
> 보다시피 `onDestroyed`는 이미 다른 라우터로 변경 된 후 `Other Template onCreated` 직전에 실행된다.<br>
> 따라서 FlowRouter 정보에 의존하는 코드를 실행해야 할 경우 `Flowrouter.triggers exit` 또는 `triggersExit`를 활용해야 한다.