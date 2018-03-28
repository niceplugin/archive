# nScrollTo.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/nScrollTo)를 클릭하세요.

jQuery없이 쉽고 편리하게 `<a href='#id'>`의 기능을 확장시켜주는 plug-in입니다.

nScrollTo.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* 가로, 세로 스크롤을 모두 지원
* 부드러운 스크롤링 애니메이션 및 시간 설정
* 스크롤 중일 때 사용자 스크롤 조작 활성 / 비활성 설정 가능
* `#id`에 도달시 사용자 정의 함수 호출가능
* IE8+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nScrollTo.js'></script>
</head>
```

***

## API
nScrollTo.js는 하나의 API를 제공합니다.

### `NP.ScrollTo.set()`
```html
<script>
    NP.ScrollTo.set(
        {
            content: 'selector',
            duration: 400,
            intervalX: [0, 'px'],
            intervalY: [0, '%'],
            hold: true,
            event: customFunctionName
        },
        {
            두번째로 적용할 element의 매개변수
        }
    );
</script>
```
* **content** (필수)  
-`#id` 또는 `.class`를 입력합니다.  
-태그명 `a`를 입력시 문서 내 `<a href='#id'>`와 같은 element만 적용됩니다.
* **duration** (선택, 기본값 400)  
-타겟까지 스크롤 하는데 걸리는 시간을 밀리초 단위로 입력합니다.
* **intervalX** (선택, 기본값 [0 'px'])  
-스크롤이 완료되었을 때 화면 내 문서의 좌측에서부터 타겟까지의 거리를 지정합니다.  
-단위는 `px` 또는 `%`만 지원합니다.
* **intervalY** (선택, 기본값 [0 'px'])  
-스크롤이 완료되었을 때 화면 내 문서의 상단에서부터 타겟까지의 거리를 지정합니다.  
-단위는 `px` 또는 `%`만 지원합니다.
* **hold** (선택, 기본값 false)  
-`false` 타겟으로 이동중 일때 사용자가 스크롤을 조작하면 취소됩니다.  
-`true` 타겟으로 이동이 완료될 때까지 스크롤 조작이 되지 않습니다.
* **event** (선택)  
-타겟으로 이동이 완료되면 사용자 정의 함수가 실행됩니다.  
-사용자 정의 함수의 첫번째 인자로 타겟 element가 전달됩니다.

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nScrollTo.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.1**
* Create nScrollTo.js
