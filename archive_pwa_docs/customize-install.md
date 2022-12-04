# 나만의 인앱 설치 경험을 제공하는 방법

많은 브라우저를 사용하여 **PWA**의 사용자 인터페이스 내에서 직접 **PWA** 설치를 활성화하고 홍보 할 수 있습니다.
설치 기능을 활용하면 사용자가 모바일 또는 PC에 **PWA**를 쉽게 설치할 수 있습니다.
**PWA**를 설치하면 사용자의 런처에 추가되며 앱처럼 실행할 수 있습니다.

브라우저에서 제공하는 설치 환경 외에도,
앱 내에서 직접 사용자 지정 설치를 제공 할 수 있습니다.

설치를 권유할지 여부를 고려할 때 사용자가 일반적으로 **PWA**를 사용하는 패턴을 생각하는 것이 가장 좋습니다.
가령 일주일에 여러번 **PWA**를 사용하는 사용자 그룹이 있는 경우,
설치 후 스마트폰 홈 화면 또는 PC의 시작 메뉴에서 앱을 바로 실행하는 편리함을 누릴 수 있습니다.
`standalone` 또는 `minimal-ui` 모드로 설치된 앱의 경우,
브라우저 도구 모음이 제거되어 생긴 화면의 추가 공간의 이점도 제공합니다.

## 설치 권유

**PWA**를 설치할 수 있음을 표시하고 사용자 지정 인앱 설치 과정을 제공하려면:

- `beforeinstallprompt` 이벤트 수신하기.
- 나중에 설치 흐름을 트리거하는 데 사용할 수 있도록 `beforeinstallprompt` 이벤트 저장하기.
- 사용자에게 **PWA**를 설치할 수 있음을 알리고, 앱 설치를 시작하는 버튼 또는 기타 요소 제공하기.

> `beforeinstallprompt` 및 `appinstalled` 이벤트가 Web App Manifest 사양에서 자체 인큐베이터로 이동되었습니다.
> Chrome 팀은 지원을 위해 최선을 다하고 있으며 지원을 제거하거나 중단 할 계획이 없다고 합니다.
> Google의 Web DevRel 팀은 맞춤형 설치 환경을 제공하기 위해 계속해서 이를 사용하도록 권장하고 있습니다.

### `beforeinstallprompt` 이벤트 수신

**PWA**가 [필수 설치 기준을](https://web.dev/install-criteria/) 충족하면 브라우저가 `beforeinstallprompt` 이벤트를 실행합니다.
이벤트에 대한 참조를 저장하고 사용자가 **PWA**를 설치할 수 있음을 나타내도록 사용자 인터페이스를 업데이트합니다.
이것에 관한 코드는 다음과 같습니다.

```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // mini-infobar(pwa 설치 권유 기본 ui 바)가 모바일에 나타나지 않도록 방지
  e.preventDefault();
  // 나중에 트리거 될 수 있도록 이벤트를 숨깁니다.
  deferredPrompt = e;
  // 사용자에게 PWA를 설치할 수 있음을 알리는 커스텀 UI를 업데이트합니다.
  showInstallPromotionUI();
});
```

### 인앱 설치 과정

인앱 설치를 제공하려면 사용자가 클릭하여 앱을 설치할 수 있는 버튼 또는 기타 인터페이스 요소를 제공해야 합니다.
요소를 클릭하면 `deferredPrompt` 변수에 저장된 `beforeinstallprompt` 이벤트에서 `prompt()`를 호출합니다.
사용자에게 **PWA**를 설치할 것인지 확인하는 모달 설치 대화 상자가 표시됩니다.

```js
buttonInstall.addEventListener('click', (e) => {
  // 앱에서 제공 커스텀 한 설치 권유 UI 숨기기
  hideMyInstallPromotionUI();
  // 설치 프롬프트 표시
  deferredPrompt.prompt();
  // 사용자가 프롬프트에 응답 할 때까지 기다립니다.
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('사용자가 설치 프롬프트를 수락했습니다.');
    } else {
      console.log('사용자가 설치 프롬프트를 닫았습니다.');
    }
  });
});
```

`userChoice` 속성은 사용자의 선택에 따라 해결되는 약속입니다.
지연된 이벤트에 대해 `prompt()`를 한 번만 호출 할 수 있습니다.
사용자가 이를 닫으면 일반적으로 `userChoice` 속성이 해결 된 직후,
`beforeinstallprompt` 이벤트가 다시 시작될 때까지 기다려야합니다.

## PWA가 성공적으로 설치됨을 감지하기

`userChoice` 속성을 사용하여 사용자가 사용자 인터페이스 내에서 앱을 설치했는지 확인할 수 있습니다.
그러나 사용자가 주소 표시줄이나 다른 브라우저 구성 요소에서 **PWA**를 설치하면 `userChoice`가 도움이되지 않습니다.
그러므로 `appinstalled` 이벤트를 수신해야합니다.
**PWA**를 설치하는데 사용된 메커니즘에 관계없이 **PWA**가 설치 될 때마다 실행됩니다.

```js
window.addEventListener('appinstalled', (evt) => {
  console.log('설치: 성공');
});
```

## PWA가 어떻게 시작되었는지 감지하기

CSS의 `display-mode` 미디어 쿼리는 브라우저 탭 또는 설치된 **PWA**로 실행 되었는지를 나타냅니다.
이를 통해 앱 실행 방식에 따라 다양한 스타일을 적용 할 수 있습니다.
예를 들어 설치된 **PWA**로 시작할 때는 항상 설치 버튼을 숨기고 뒤로 버튼을 제공하십시오.

### PWA가 어떻게 시작되었는지 추적하기

사용자가 **PWA**를 실행한 방법을 추적하려면 `matchMedia()`를 사용하여 `display-mode` 미디어 쿼리를 테스트합니다.
iOS의 Safari는 아직 이를 지원하지 않으므로 `navigator.standalone`을 확인해야 합니다.
브라우저가 독립형 모드에서 실행 중인지 여부를 나타내는 부울을 반환합니다.

```js
window.addEventListener('DOMContentLoaded', () => {
  let displayMode = 'browser tab';
  if (navigator.standalone) { // iOS 에서만 허용되는 비표준 모드
    displayMode = 'standalone-ios';
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    displayMode = 'standalone';
  }
  console.log('디스플레이 시작 모드: ', displayMode);
});
```

### 디스플레이 모드가 변경 될 때 추적하기

`standalone`과 `browser tab` 간에 모드가 변경되는지를 추적하려면 `display-mode` 미디어 쿼리의 변경 사항을 수신해야 합니다.

```js
window.addEventListener('DOMContentLoaded', () => {
  window.matchMedia('(display-mode: standalone)').addListener((evt) => {
    let displayMode = 'browser tab';
    if (evt.matches) {
      displayMode = 'standalone';
    }
    console.log('디스플레이 모드 변경: ', displayMode);
  });
});
```

## 현재 디스플레이 모드를 기반으로 UI 업데이트

### Android의 Chrome

Android에서 **PWA**가 시작되면 Chrome은 라이브 매니페스트에 대해 현재 설치된 매니페스트를 확인합니다.
업데이트가 필요한 경우 장치가 연결되어 Wi-Fi에 연결되면 [업데이트가 대기열에 들어가고 업데이트됩니다](https://developers.google.com/web/fundamentals/integration/webapks#update-webapk).

### PC의 Chrome

PC에서는 매니페스트가 자동으로 업데이트 되지 않지만 향후 업데이트 될 예정입니다.



































