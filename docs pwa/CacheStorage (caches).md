# CacheStorage

`CacheStorage`인터페이스(메서드)는 `Cache`객체의 저장소를 참조할 수 있게 합니다.

인터페이스:
- `ServiceWorker`, `window` 또는 `다른 유형의 작업자`가 액세스 할 수 있는 모든 캐시(이름을 지어 생성한)의 마스터 디렉토리(최상위 경로)를 제공합니다.
- 문자열 이름을 해당하는 `Cache`객체에 매핑합니다.

전역 속성(`global property`)인 `caches`를 통해 `CacheStorage`에 액세스 할 수 있습니다.

## CacheStorage.open()

`CacheStorage`인터페이스의 `open()`메소드는 `cacheName`과 일치하는 `Cache`오브젝트로 해석되는 `Promise`를 리턴합니다.

지정된 `Cache`가 존재하지 않으면 해당 `cacheName`을 사용하여 새 캐시가 작성되고이 새 `Cache`오브젝트로 해석되는 `Promise`가 리턴됩니다.

### Syntax

```javascript
caches.open(cacheName).then(function(cache) {
  // cache를 이용해 무엇인가를 할 수 있다.
});
```

**Parameters**

- cacheName:

  오픈하려는 케시네임 (문자열)

**Return Value**

- 요청한 `Cache`객체를 반환하는 `Promise`.