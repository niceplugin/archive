# nSticky.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/nSticky)를 클릭하세요.

페이지 스크롤시 셀렉터(매뉴바 같은)를 쉽고 편리하게 동적으로 고정시키기 위해 만든 plug-in입니다.

nSticky.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* 상대적인 위치를 고수
* 깨지지 않는 레이아웃
* IE8+, Chorme, FireFox, Opera, Android를 지원 (Safari, iOS 확인하지 못함)

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nSticky.js'></script>
</head>
```

***

## API
nSticky.js는 세개의 API를 제공합니다.

### `NP.Sticky.set()`
`NP.Sticky.set()`는 한번에 여러개의 매개변수를 설정하여 여러개의 셀렉터들을 스틱키 할 수 있습니다.
```html
<script>
    NP.Sticky.set('#selector1', '.selector2', ...);
</script>
```

### `NP.Sticky.enabled()` `NP.Sticky.disabled()`
스틱키 기능은 디스플레이 해상도에 따라 활성/비활성 조작이 필요할 수 있습니다.
활성/비활성 기능은 다음과 같이 사용 할 수 있습니다.
```html
<script>
    <!-- nSticky.js plug-in이 비활성화 되어있을 경우 활성화 합니다. -->
    NP.Sticky.enabled();
    
    <!-- nSticky.js plug-in이 활성화 되어있을 경우 비활성화 합니다. -->
    NP.Sticky.disabled();
</script>
```

***

## 알림
IE8에서 정상적으로 작동하기 위해서는 `margin` `padding` `width` `height` 값은 `px` 단위여야 합니다.


nSticky.js 기능은 데스크탑 사용자의 UX를 고려해 고안하였습니다.
물론 모바일에서도 정상적으로 작동합니다.
하지만 다음과 같은 이유로 *모바일 크롬 브라우저*에서는 이슈가 발생합니다.
* nSticky.js는 사용자 스크롤에 따라 `style='top:value'`값을 동적으로 변경합니다.
* *모바일 크롬 브라우저*는 위와 비슷한 기능이 내장되어 있습니다.  
(사용자 UX를 고려한 *모바일 크롬 브라우저*만의 기본 기능이라 예상됩니다)
* 따라서 스틱키 된 셀렉터는 의도하지 않은 곳에 위치하게 됩니다.

***niceplugin 개발자***는 모바일에서 nSticky.js 사용을 권장하지 않으므로 의도적으로 이 이슈를 방치했습니다.
따라서 이 이슈를 해결하기 위해서는 `navigator.userAgent`를 이용하여 수동적으로 *모바일 크롬 브라우저*를 감지하고 plug-in을 비활성화 해야 합니다.
`navigator.userAgent` 알아보기. [링크](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent)

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nSticky.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.2**
* `onload` 후 작동하도록 변경.
* 스크롤업 할 경우 간헐적으로 작동하지 않는 문제가 수정.
* 페이지를 새로 고칠 때 초기 위치가 설정되지 않던 문제 수정.

**Version 1.17.1**
* Create nSticky.js
