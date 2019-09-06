# ServiceWorkerRegistration

`ServiceWorkerRegistration`는 서비스 워커 등록을 나타냅니다. 동일한 출처를 공유하는 하나 이상의 페이지를 제어하기 위해 서비스 워커를 등록합니다.

서비스 워커 등록의 수명은 해당 서비스 워커 클라이언트의 수명 내에서 이를 나타내는 `ServiceWorkerRegistration`개체의 수명을 초과합니다. 브라우저는 활성 `ServiceWorkerRegistration`오브젝트의 지속적 목록을 유지 보수합니다.