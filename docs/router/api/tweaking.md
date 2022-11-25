---
title: 변경
---

# 변경 %{ #tweaking }%

## wait()와 initialize() %{ #wait-and-initialize }%

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