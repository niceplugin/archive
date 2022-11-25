---
title: 코어
---

# 코어 %{ #core }%

## isClient

- 사용: 클라이언트/서버
- 설명: 클라이언트 환경에서 실행중이다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.isClient)
  ```
- 타입:
  ```ts
  interface Meteor {
    isClient: boolean;
  }
  ```

## isServer

- 사용: 클라이언트/서버
- 설명: 서버 환경에서 실행중이다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.isServer)
  ```
- 타입:
  ```ts
  interface Meteor {
    isServer: boolean;
  }
  ```

## isCordova

- 사용: 클라이언트/서버
- 설명: Cordova 모바일 환경에서 실행 중이다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.isCordova)
  ```
- 타입:
  ```ts
  interface Meteor {
    isCordova: boolean;
  }
  ```

## isDevelopment

- 사용: 클라이언트/서버
- 설명: 개발 환경에서 실행 중이다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.isDevelopment)
  ```
- 타입:
  ```ts
  interface Meteor {
    isDevelopment: boolean;
  }
  ```

## isProduction

- 사용: 클라이언트/서버
- 설명: 프로덕션 환경에서 실행 중이다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.isProduction)
  ```
- 타입:
  ```ts
  interface Meteor {
    isProduction: boolean;
  }
  ```

## settings

- 사용: 클라이언트/서버
- 설명: `meteor run` 또는 `meteor deploy` 명령어 뒤에 `--settings` 옵션을 전달하여, 배포관련 구성 옵션이 설정됩니다.
       이 변수는 위 구성 정보를 객체로 리턴하며, 객체 내 `public` 속성은 클라이언트와 서버 모두에서 접근 가능합니다.
       그 외 다른 모든 속성은 서버에서만 접근 가능합니다.

  그 활용 방법을 좀 더 상세하게 알아봅시다.
  프로젝트 디렉토리의 `private`에 `settings.json` 파일을 생성하고, 다음과 같이 작성합니다:

  ```json
  {
    "a": 1,
    "b": true,
    "public": {
      "c": "string",
      "d": [3, 6, 9]
    }
  }
  ```
  이제 아래 예제 코드를 각 클라이언트와 서버에서만 실행되는 JS 파일에 작성합니다.
  `meteor run` 명령어 뒤에 `--settings` 옵션을 써넣고 JSON 파일의 경로를 가리켜 미티어를 실행해 봅시다.

  ```shell
  meteor run --settings ./private/settings.json
  ```
  
  클라이언트 콘솔에는 `settings` 객체 내 `public` 객체밖에 없어 `c`와 `d`에만 접근이 가능합니다.
  하지만 서버 콘솔에는 `settings` 객체 내 `a`와 `b`에 접근할 수 있을 것입니다.

- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.settings)
  ```
- 타입:
  ```ts
  interface Meteor {
    settings: {
      public: Object
      [key in string]?: any 
    }
  }
  ```

## release

- 사용: 클라이언트/서버
- 설명:  프로젝트가 빌드된 릴리스의 이름을 포함하는 문자열입니다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.release) // 'METEOR@2.x.x'
  ```
- 타입:
  ```ts
  interface Meteor {
    release: string;
  }
  ```

## startup()

- 사용: 클라이언트/서버
- 설명: 클라이언트 또는 서버가 시작될 때 코드를 실행합니다.
- 인자:
  - func: 시작시 실행할 콜백 함수
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  // Meteor.startup( callback )
  Meteor.startup(() => {
    // code...
  })
  ```
- 타입:
  ```ts
  interface Meteor {
    startup( callback: Function ): any;
  }
  ```

## defer()

- 사용: 클라이언트/서버
- 설명: 백그라운드에서 비동기적으로 콜백 함수가 실행되도록 합니다.
- 인자:
  - func: 실행될 함수
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  // Meteor.defer( callback )
  Meteor.defer(() => {
    // code...
  })
  ```
- 타입:
  ```ts
  interface Meteor {
    defer( callback: Function ): any;
  }
  ```

## absoluteUrl()

- 사용: 레거시로 판단되나 미티어에서 제공하는 [공식 강의](https://youtu.be/6RRVU0-Vvm8?t=469)가 있음.

[//]: # (todo: 재확인 필요)

## wrapAsync()

- 사용: 레거시