# ServiceWorkerGlobalScope

## ServiceWorkerGlobalScope: oninstall (event)

`ServiceWorkerGlobalScope`인터페이스의 `oninstall` 속성은 `install`이벤트가 발생할 때마다 (서비스 워커가 설치될 때) 발생하는 이벤트 핸들러입니다. 활성화(`activate`) 전에 발생합니다.

## ServiceWorkerGlobalScope.onactivate (event)

`ServiceWorkerGlobalScope`인터페이스의 `onactivate` 속성은 `activate`이벤트가 발생할 때마다 (서비스 워커가 활성화 될 때) 발생하는 이벤트 핸들러입니다. 서비스 워커가 제어 할 페이지를 새로 고치면 설치 후 발생합니다.

## ServiceWorkerGlobalScope.skipWaiting()

`ServiceWorkerGlobalScope`의 `skipWaiting()`메소드는 대기중(`waiting`)인 서비스워커가 활성화(`active`) 되도록합니다.

### SyntaxSection

```javascript
ServiceWorkerGlobalScope.skipWaiting().then(function() {
  // 무언가를 할 수 있다.
});
```

**Return Value**

- 무효값(`void`)을 반환하는 `Promise`.

### Example

`self.skipWaiting()`은 서비스 워커 실행 중 언제라도 호출 할 수 있지만 새로 설치 한 서비스 워커가 `waiting`상태에 있을 경우에만 영향을 미칩니다. 따라서 `InstallEvent`핸들러 내부에서 `self.skipWaiting()`을 호출하는 것이 일반적입니다.

다음 예제는 이미 활성화 된 서비스 워커가 있는지 여부에 관계없이 새로 설치된 서비스 워커가 `active`상태로 진행되도록합니다.

```javascript
self.addEventListener('install', function(event) {
  // skipWaiting()에 의해 반환되는 promise는 무시해도 됩니다..
  self.skipWaiting();

  // event.waitUntil() 내부에 
  //서비스 워커 설치에 필요한 로직을 구성하십시오.
});
```