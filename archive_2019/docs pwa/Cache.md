# Cache

`Cache`인터페이스는 예를 들어 `ServiceWorker`수명주기의 일부로 캐시 된 `요청 / 응답`오브젝트 쌍에 대한 스토리지 메커니즘을 제공합니다. `Cache`인터페이스는 작업자뿐만 아니라 창(window) 범위에도 노출됩니다. 서비스 워커 스펙에 정의되어 있어도 서비스 워커와 함께 사용할 필요는 없습니다.

원점에는 이름이 지정된 `Cache`개체가 여러 개있을 수 있습니다. 스크립트 (예 : `ServiceWorker`)가 `Cache`업데이트를 처리하는 방식을 구현해야합니다. `Cache`의 항목은 명시 적으로 요청하지 않으면 업데이트되지 않습니다. 삭제하지 않으면 만료되지 않습니다. `CacheStorage.open ()`을 사용하여 특정 이름의 `Cache`오브젝트를 연 다음 `Cache`메소드를 호출하여 `Cache`를 유지하십시오.

또한 캐시 항목을 정기적으로 제거해야합니다. 각 브라우저에는 지정된 출처가 사용할 수있는 캐시 스토리지 양에 대한 제한이 있습니다. 캐시 할당량 사용량 추정치는 `StorageEstimate`API를 통해 제공됩니다. 브라우저는 디스크 공간을 관리하기 위해 최선을 다하지만 원점의 캐시 스토리지를 삭제할 수 있습니다. 브라우저는 일반적으로 원점에 대한 모든 데이터를 삭제하지 않습니다. 캐시를 이름으로 버전 화하고 안전하게 작동 할 수있는 스크립트 버전의 캐시만 사용하십시오. 자세한 정보는 이전 캐시 삭제를 참조하십시오.

## Cache.addAll()

`Cache`의 `addAll()`메소드(인터페이스)는 URL 배열을 가져 와서 검색 한 후 결과 캐시를 주어진 캐시에 추가합니다. 검색 중에 작성된 요청 오브젝트는 저장된 응답 조작의 키가됩니다.

### SyntaxSection

```javascript
const requests = ['/example.html', '/example.css', '/example.js'];
cache.addAll(requests).then(function() {
  // 요청한 값(requests)이 캐시에 추가되었습니다.
});
```

**Parameters**

- requests:

  캐시에 추가하고 추후 불러오고 싶은(`fetch`) URL 문자열로 이루어진 배열

**Return Value**

- 무효값(`void`)을 반환하는 `Promise`.