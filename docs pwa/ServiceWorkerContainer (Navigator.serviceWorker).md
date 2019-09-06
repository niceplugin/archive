# Navigator

## Navigator.serviceWorker

`Navigator.serviceWorker`는 읽기 전용으로 `ServiceWorkerContainer` 객체를 반환하며 이는 등록, 제거, 업그레이드 및 `ServiceWorker`와의 통신에 대한 액세스를 제공합니다.

# ServiceWorkerContainer

`ServiceWorkerContainer`인터페이스는 서비스 워커를 등록, 등록 취소 및 업데이트하고 서비스 워커 상태 및 등록에 액세스하는 기능을 포함하여 네트워크 에코 시스템의 전체 단위로 서비스 워커를 나타내는 오브젝트를 제공합니다.

가장 중요한 것은 서비스 워커를 등록하는 데 사용되는 `ServiceWorkerContainer.register()`메소드와 현재 페이지가 능동적으로 제어되는지 여부를 결정하는 데 사용되는 `ServiceWorkerContainer.controller`속성을 노출하는 것입니다.

## ServiceWorkerContainer.register()

`ServiceWorkerContainer`의 인터페이스(메소드)인 `register()`는 지정된 `scriptURL`에 대한 `ServiceWorkerRegistration`을 작성하거나 업데이트합니다.

성공하면 서비스 워커 등록은 제공된 스크립트 URL을 범위에 연결하며,이 범위는 탐색 일치에 사용됩니다. 제어 된 페이지에서 이 메소드를 무조건 호출 할 수 있습니다. 즉, 활성화 된 등록이 있는지 먼저 확인할 필요가 없습니다.

범위의 의미와 사용을 둘러싼 혼란이 자주 있습니다. 서비스 워커는 자신의 위치보다 넓은 범위를 가질 수 없으므로 기본값보다 좁은 범위(`scope`)가 필요한 경우에만 범위 옵션을 사용하십시오.

### SyntaxSection

```javascript
ServiceWorkerContainer.register(scriptURL, options)
  .then(function(ServiceWorkerRegistration) {
    // ServiceWorkerRegistration를 컨트롤 하는 무언가를 할 수 있습니다.
  });
```

**ParametersSection**

- scriptURL:

  등록할 서비스 워커 스크립트의 URL(문자열)입니다. 등록 된 서비스 워커 파일은 유효한 JavaScript MIME 유형이어야 합니다.

- options (선택):

  객체로 전달될 옵션입니다. 현재 사용가능한 옵션은 다음과 같습니다.
  
  - scope: 서비스 워커의 등록 범위를 정의하는 URL을 나타내는 `USVString`. 즉, 서비스 워커가 제어 할 수있는 URL 범위. 일반적으로 상대 URL입니다. 응용 프로그램의 기본 URL을 기준으로합니다. 기본적으로 서비스 워커 등록의 범위 값은 서비스 워커 스크립트가있는 디렉토리로 설정됩니다. 작동 방식에 대한 자세한 내용은 [예제 섹션](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Examples)을 참조하십시오.

**Return Value**

- `ServiceWorkerRegistration`객체를 반환하는 `Promise`.