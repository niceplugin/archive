---
title: 서버 커넥션
---

# 서버 커넥션 %{ #server-connections }%

## status()

- 사용: 클라이언트
- 설명: 현재 연결 상태를 가져오는 반응형 데이터 소스입니다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  console.log(Meteor.status())
  ```
- 타입:
  ```ts
  interface Meteor {
    status(): $status;
  }
  
  type $status = {
    connected: boolean,   // 현재 서버와 연결되어 있는지 여부
  
    retryCount: number,   // 연결이 끊어진 이후 클라이언트가 다시 연결을 시도한 횟수
  
    status: 'connected'   // 연결됨
          | 'connecting'  // 연결중
          | 'failed'      // 연결 실패
          | 'waiting'     // 대기중
          | 'offline',    // 사용자가 연결을 끊음
   
    reason?: string       // failed 상태일 경우, 연결 실패 이유에 대한 설명
  
    retryTime?: Number    // waiting 상태일 경우, 다음 재연결 시도 시각
  }
  ```

## reconnect()

- 사용: 클라이언트
- 설명: 클라이언트가 서버에 연결되지 않은 경우, 즉시 강제 재연결을 시도합니다.
  이미 연결된 상태이면, 이 메서드는 아무 작업도 수행하지 않습니다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  Meteor.reconnect()
  ```
- 타입:
  ```ts
  interface Meteor {
    reconnect(): void;
  }
  ```

## disconnect()

- 사용: 클라이언트
- 설명: 클라이언트에서 서버로부터의 연결을 끊어 모든 실시간 업데이트가 중지됩니다.

  이 동안 컬렉션에 대한 업데이트를 수신하지 않으며, 메서드 호출이 대기상태가 됩니다.

  실시간 업데이트가 필요하지 않을 때, 모바일 장치의 배터리를 절약하는데 사용할 수 있습니다.

  [`reconnect()`](#reconnect)를 사용하여 재연결을 할 수 있습니다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  Meteor.disconnect()
  ```
- 타입:
  ```ts
  interface Meteor {
    disconnect(): void;
  }
  ```

## onConnection()

- 사용: 서버
- 설명: 새로운 DDP 연결이 이루어질 때 호출할 콜백을 등록합니다.
- 예제:
  ```js
  import { Meteor } from 'meteor/meteor'

  // Meteor.onConnection( callback )
  Meteor.onConnection((connection) =>{
    // code...
  })
  ```
- 타입:
  ```ts
  interface Meteor {
    onConnection( callback: ( $connection ) => void ): void;
  }
  
  interface $connection {
    id: string,             // 이 연결에 대한 전역 고유 ID
  
    close: Function,        // 이 DDP 연결을 닫습니다.
                            // 클라이언트는 언제나 다시 연결을 시도할 수 있으며,
                            // 새로운 id를 부여받습니다.
  
    onClose: Function,      // 연결이 닫힐경우 호출할 콜백을 등록합니다.
                            // 연결이 이미 종료된 경우, 등록된 콜백은 즉시 호출됩니다.
  
    clientAddress: string,  // 클라이언트 IP 주소
          // 프록시 서버 뒤에 Meteor 서버가 실행되는 경우,
          // 올바른 IP 주소를 얻기 위해 HTTP_FORWARD_COUNT 환경변수를 설정해야 합니다.
          // HTTP_FORWARD_COUNT를 서버 앞의 프록시 수를 나타내는 정수로 설정합니다.
          // 예를 들어 Meteor 서버가 하나의 프록시 뒤에 있을 때 이 값을 1로 설정합니다.
  
    httpHeaders: Object     // HTTP를 통한 연결은 허용된 HTTP 헤더를 포함합니다.
          // Meteor의 기본 구현은  Sockjs 구현과 같습니다.
          // 쿠키는 이 전송의 보안 위험이 있으므로 헤더에서 의도적으로 제외됩니다.
          // 자세한 내용과 대안은 SockJS 설명서를 참조하십시오.
  }
  ```
  참고: [SockJS 설명서](https://github.com/sockjs/sockjs-node#authorisation)

:::info
현재 클라이언트가 일시적으로 인터넷 연결이 끊긴 후,
서버에 다시 연결할 때마다 새로운 연결로 인식됩니다.
따라서 새 연결 ID가 지정되며, OnConnection 콜백이 호출됩니다.
:::

## DDP.connect()

- 사용: 클라이언트/서버
- 설명: 다른 Meteor 앱의 서버에 연결하여 해당 문서 세트를 구독하고 메서드를 호출합니다.
- 예제:
  ```js
  import { DDP } from 'meteor/ddp-client'

  DDP.connect()
  ```
- 타입:
  ```ts
  interface $DDP {
    connect( url: string ): $provide;
  }
  
  interface $provide {  // 아래 구성은 원래 API와 동일하게 동작하지만,
                        // Meteor. 이 아닌 이것을 참조해야 합니다.
                        // 자세한 것은 아래 info 단락을 참고.
    subscribe: Meteor.subscribe,
    call: Meteor.call,
    apply: Meteor.apply,
    methods: Meteor.methods,
    status: Meteor.status,
    reconnect: Meteor.reconnect,
    disconnect: Meteor.disconnect
  }
  ```
  - 참고: <br>
  [Meteor.subscribe] - 링크 작업중 <br>
  [Meteor.call] - 링크 작업중 <br>
  [Meteor.apply] - 링크 작업중 <br>
  [Meteor.methods] - 링크 작업중 <br>
  [Meteor.status](#status) <br>
  [Meteor.reconnect](#reconnect) <br>
  [Meteor.disconnect](#disconnect)

[//]: # (todo: link)

  :::info
  기본적으로 클라이언트는 로드된 서버에 연결을 엽니다.
  `Meteor.subscribe`, `Meteor.status`, `Meteor.call` 및 `Meteor.apply`를 실행하면,
  다시 기본 서버에 대한 연결을 사용합니다.
  :::

## DDP.onReconnect()

- 사용: 클라이언트/서버
- 설명: 재연결 시, 첫 번째 단계로 호출할 콜백 함수를 등록합니다.
- 예제:
  ```js
  import { DDP } from 'meteor/ddp-client'

  Meteor.onReconnect(( $provide ) => {
    // code...
  })
  ```
- 타입:
  ```ts
  interface $DDP {
    onReconnect( callback: ( $provide ) => void ): void;
  }
  
  // $provide는 바로 위 섹션 DDP.connect()에서 정의한 객체임
  ```
  - 참고: [DDP.connect()](#ddp-connect)