# ExtendableEvent

## ExtendableEvent.waitUntil()

`extendableEvent.waitUntil()`메소드는 이벤트 디스패처에게 작업이 진행 중임을 알려줍니다.
또한 해당 작업의 성공 여부를 감지하는 데 사용될 수 있습니다.
서비스 워커에서 `waitUntil()`은 약속이 완료 될 때까지 작업이 진행 중임을 브라우저에 알리고, 해당 작업을 완료하려는 경우 서비스 워커를 종료하지 않아야합니다.

`service workers`의 `install`이벤트는 `waitUntil()`을 사용하여 작업이 완료 될 때까지 서비스 워커를 `installing`단계로 유지합니다.
`waitUntil()`에 전달 된 약속이 거부되면 설치는 실패한 것으로 간주되며 설치 서비스 작업자는 삭제됩니다.
이는 주로 서비스 작업자가 종속 된 모든 코어 캐시가 성공적으로 채워질 때까지 설치되지 않은 것으로 간주되도록하는 데 사용됩니다.

`service workers`의 `activate`이벤트는 `waitUntil()`에 전달 된 약속이 해결 될 때까지 `fetch`및 `push`와 같은 기능적 이벤트를 버퍼링하기 위해 `waitUntil()`을 사용합니다.
이를 통해 서비스 워커는 데이터베이스 스키마를 업데이트하고 오래된 `caches`를 삭제할 시간을 가지므로 다른 이벤트는 완전히 업그레이드 된 상태에 의존 할 수 있습니다.

`waitUntil()`메소드는 이벤트 콜백 내에서 초기에 호출되어야하지만 이후 모든 약속이 전달 될 때까지 여러 번 호출 될 수 있습니다.

### Syntax

```javascript
event.waitUntil(promise)
```

**Parameters**

- Promise

**Return Value**

- none