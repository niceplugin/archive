---
title: 훅
---

# 훅 %{ #hooks }%

## whileWaiting()

- 설명: `whileWaiting()` 훅은 `waitOn()` 훅 이전에 트리거되어,
  "로딩중" 또는 관련 애니메이션을 표시/렌더링할 수 있습니다.
- 예제:
  ```js
  FlowRouter.route('/path', {
    name: 'pathName',
    whileWaiting() {
      this.render('loading')
    },
    waitOn(params) {
      return Meteor.subscribe('post', params._id)
    }
  })
  ```
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    whileWaiting( params: Object,
                  queryParams: Object ): void;
  }
  ```

## waitOn()

- 설명: `waitOn()` 훅은 `action()` 훅 이전에 트리거되어,
  템플릿을 렌더링하기 전에 필요한 데이터를 로드하는데 활용할 수 있습니다.
- 구독 예제:
  
  ```js
  FlowRouter.route('/post/:_id', {
    name: 'post',
    waitOn(params) {
      return [Meteor.subscribe('post', params._id), Meteor.subscribe('suggestedPosts', params._id)]
    }
  })
  ```
  
- *Tracker* 예제

  `waitOn` 훅 내에서 반응성 데이터 소스를 사용합니다.
  반응성 데이터 변경 시 `waitOn`을 다시 실행하려면,
  `Tracker.autorun`으로 래핑하고,
  Tracker Computation 객체 또는 Tracker Computation 객체의 *Array*를 반환합니다.
  
  참고: `waitOn`의 세 번째 인수는 `ready` 콜백입니다.
  
  ```js
  FlowRouter.route('/posts', {
    name: 'post',
    waitOn(params, queryParams, ready) {
      return Tracker.autorun(() => {
        ready(() => {
          return Meteor.subscribe('posts', search.get(), page.get())
        })
      })
    }
  })
  ```
  
- 배열로 보내는 *Trackers* 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'post',
    waitOn(params, queryParams, ready) {
      const tracks = []
      tracks.push(Tracker.autorun(() => {
        ready(() => {
          return Meteor.subscribe('posts', search.get(), page.get())
        })
      }))
  
      tracks.push(Tracker.autorun(() => {
        ready(() => {
          return Meteor.subscribe('comments', postId.get())
        })
      }))
      return tracks
    }
  })
  ```

- *Promises* 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    waitOn() {
      return new Promise((resolve, reject) => {
        loadPosts((err) => {
          (err) ? reject() : resolve()
        })
      })
    }
  })
  ```
  
- 배열로 보내는 *Promises* 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    waitOn() {
      return [
        new Promise({/*..*/}),
        new Promise({/*..*/}),
        new Promise({/*..*/})
      ]
    }
  })
  ```
  
- *Promise*를 활용한 Meteor 메서드 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    conf: {
      posts: false
    },
    action(params, queryParams, data) {
      this.render('layout', 'posts', data)
    },
    waitOn() {
      return new Promise((resolve, reject) => {
        Meteor.call('posts.get', (error, posts) => {
          if (error) {
            reject()
          } else {
            // `conf`를 공유 객체로 사용하여,
            // `data()` 훅에서 `action()` 훅`으로 전달합니다.
            this.conf.posts = posts
            resolve()
          }
        })
      })
    },
    data() {
      return this.conf.posts
    }
  })
  ```
  
- 동적 `import` 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    waitOn() {
      return import('/imports/client/posts.js')
    }
  })
  ```
  
- 배열을 사용한 동적 `import` 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    waitOn() {
      return [
        import('/imports/client/posts.js'),
        import('/imports/client/sidebar.js'),
        import('/imports/client/footer.js')
      ]
    }
  })
  ```
  
- 배열에 서로 다른 동적 `import`와 구독 예제:
  
  ```js
  FlowRouter.route('/posts', {
    name: 'posts',
    waitOn() {
      return [
        import('/imports/client/posts.js'),
        Meteor.subscribe('Posts')
      ]
    }
  })
  ```
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    waitOn( params: Object,
            queryParams: Object,
            ready: Function // Tracker를 사용한 작업이 준비(완료)되면 호출.
    ): Promise | Promise[] | Subscription | Subscription[] | Tracker | Tracker[];
  }
  ```

## waitOnResources()

- 설명: `.waitOnResources()` 훅은 `.action()` 훅은 전에 트리거되어,
  템플릿을 렌더링하기 전에 필요한 파일, 이미지, 글꼴을 로드할 수 있습니다.

- 이미지 사전 로드 예제:
  ```js
  FlowRouter.route('/images', {
    name: 'images',
    waitOnResources() {
      return {
        images:[
          '/imgs/1.png',
          '/imgs/2.png',
          '/imgs/3.png'
        ]
      };
    },
  })
  ```
  
- 전역 이미지 사전 로드 예제:

  배경 이미지 및 기타 전역적으로 사용되는 리소스를 사전 로드하는데 유용합니다.
  ```js
  FlowRouter.globals.push({
    waitOnResources() {
      return {
        images: [
          '/imgs/background/jpg',
          '/imgs/icon-sprite.png',
          '/img/logo.png'
        ]
      }
    }
  })
  ```
  
- 리소스 사전 로드 예제:

  이 방법은 __cacheble__ 리소스에 대해서만 작동하며,
  URL이 캐시할 수 없는 리소스(*동적 리소스*)를 사전 로드 하는 것은 의미가 없습니다.

  *이미지와 기타 리소스가 분리되는 이유는 다음과 같은 차이점이 있어서 입니다.*
  - 이미지는 `Image()` 생성자를 통해 사전 로드 할 수 있음
  - 다른 모든 리소스는 `XMLHttpRequest`를 사용하여 리소스를 캐시함
  
  그렇기 때문에 요청된 URL이 캐시 가능한 응답을 반환하는지 확인하는 것이 중요합니다.
  
  ```js
  FlowRouter.route('/', {
    name: 'index',
    waitOnResources() {
      return {
        other:[
          '/fonts/OpenSans-Regular.eot',
          '/fonts/OpenSans-Regular.svg',
          '/fonts/OpenSans-Regular.ttf',
          '/fonts/OpenSans-Regular.woff',
          '/fonts/OpenSans-Regular.woff2'
        ]
      }
    }
  })
  ```

- 전역 리소스 사전 로드 예제:

  글꼴 및 기타 전역적으로 사용되는 리소스를 미리 가져오는데 유용합니다.
  ```js
  FlowRouter.globals.push({
    waitOnResources() {
      return {
        other:[
          '/fonts/OpenSans-Regular.eot',
          '/fonts/OpenSans-Regular.svg',
          '/fonts/OpenSans-Regular.ttf',
          '/fonts/OpenSans-Regular.woff',
          '/fonts/OpenSans-Regular.woff2'
        ]
      }
    }
  })
  ```

- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    waitOnResources( params: Object,
                     queryParams: Object
    ): { images?: url[], other?: url[] };
  }
  
  type url = string
  ```

## endWaiting()

- 설명: `endWaiting()` 훅은 `waitOn()` 및 `waitOnResources()` 훅의 모든 리소스가 준비된 직후에 트리거됩니다.
  
- 예제:
  ```js
  FlowRouter.route('/', {
    name: 'index',
    endWaiting() { /* ... */ }
  })
  ```
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    endWaiting(): void;
  }
  ```

## data()

- 설명: `data()` 훅은 `waitOn()` 및 `waitOnResources()` 훅의 모든 리소스가 준비된 직후에 트리거됩니다.
  
- 기본 예제:
  ```js
  FlowRouter.route('/post/:_id', {
    name: 'post',
    waitOn(params) {
      return Meteor.subscribe('post', params._id);
    },
    data(params, qs) {
      return PostsCollection.findOne({_id: params._id});
    }
  });
  ```
  
- *템플릿*에 데이터 전달하는 예제:
  ```js
  FlowRouter.route('/post/:_id', {
    name: 'post',
    action(params, qs, post) {
      this.render('_layout', 'post', { post });
    },
    waitOn(params) {
      return Meteor.subscribe('post', params._id);
    },
    data(params, qs) {
      return PostsCollection.findOne({_id: params._id});
    }
  });
  ```
  
  ```html
  <template name="post">
    <h1>{{post.title}}</h1>
    <p>{{post.text}}</p>
  </template>
  ```
  
- 다른 훅에서의 데이터:

  `data` 훅에서 반환된 값은 다른 모든 훅에 세 번째 인수로 전달되고,
  `triggersEnter` 훅에서만 네 번째 인수로 전달됩니다.
  ```jsx
  FlowRouter.route('/post/:_id', {
    name: 'post',
    data(params) {
      return PostsCollection.findOne({_id: params._id});
    },
    triggersEnter: [(context, redirect, stop, data) => {
      console.log(data);
    }]
  });
  ```
  
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    data( params: Object,
          queryParams: Object
    ): Mongo.Cursor | Object | Object[] | false | null | void;
  }
  
  interface Cursor extends Mongo {}
  ```

## onNoData()

- 설명: `data()` 훅이 `falsy` 값을 반환하는 경우,
  `action()` 대신 `onNoData()` 훅이 트리거됩니다.
  
  예를 들어 이 훅 내에서 JS 로직을 실행하여,
  404 템플릿을 렌더링하거나 사용자를 다른 곳으로 리디렉션합니다.
  
- 예제:
  ```js
  FlowRouter.route('/post/:_id', {
    name: 'post',
    data(params) {
      return PostsCollection.findOne({_id: params._id});
    },
    onNoData(params, qs){
      this.render('_layout', '_404');
    }
  });
  ```
  
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    onNoData( params: Object,
              queryParams: Object
    ): void;
  }
  ```

## triggersEnter()

- 설명: 이것은 실제로 훅은 아니며 `action()`이 실행되기 직전에 호출됩니다. 
  
- 리디렉트 예제:
  ```js
  FlowRouter.route('/', {
    name: 'index',
    triggersEnter: [(context, redirect) => {
      redirect('/other/route');
    }]
  });
  ```
  
- 전역 등록 예제:
  ```js
  FlowRouter.triggers.enter([callback1, callback2]);
  ```
  
  이것을 응용하여 새로운 라우트로 이동할 때마다 스크롤 탑 기능을 만들수 있습니다:

  ```js
  const scrollToTop = () => {
    (window.scroll || window.scrollTo || function (){})(0, 0);
  };
  
  FlowRouter.route('/', {
    name: 'index',
    triggersEnter: [scrollToTop]
  });
  
  // 모든 경로에 적용됨:
  FlowRouter.triggers.enter([scrollToTop]);
  ```
  
- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    triggersEnter( callback[] ): void;
  }
  
  type callback = (arguments) => {}
  type arguments = {
    context: Route, // FlowRouter.current() 객체
    redirect: Function,
    stop: Function,
    data: Data // data()에서 전달받은 데이터
  }
  ```

## action()

- 설명: `action()` 훅은 페이지가 경로로 이동한 직후에 트리거됩니다.

- 예제:
  ```js
  FlowRouter.route('/post/:_id', {
    name: 'post',
    action() { /* ... */ }
  });
  ```

- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    action( params: Object,
            queryParams: Object,
            data: Data // data()에서 전달받은 데이터
    ): void;
  }
  ```

## triggersExit()

- 설명: 다른 경로로 이동하기로 결정한 경우,
  다음 경로가 시작되기 전에 호출됩니다.

- 예제:
  ```js
  const trackRouteEntry = (context) => {
    // 컨텍스트는 `FlowRouter.current()` 입니다.
    console.log("visit-to-home", context.queryParams);
  };
  
  const trackRouteClose = (context) => {
    console.log("move-from-home", context.queryParams);
  };
  
  FlowRouter.route('/home', {
    // action 시작 전 호출됨
    triggersEnter: [trackRouteEntry],
    action() { /* ... */ },
    // 다른 경로로 이동하기로 결정할 때 호출
    // 그러나 다음 경로가 시작되기 전에 호출
    triggersExit: [trackRouteClose]
  });
  ```
  
- 전역 예제:
  ```js
  FlowRouter.triggers.exit([callback1, callback2]);
  ```

- 타입:
  ```ts
  interface routeOption extends FlowRouter {
    triggersExit( callback[] ): void;
  }
  
  type callback = (arguments) => {}
  type arguments = {
    context: Route, // FlowRouter.current() 객체
  }
  ```