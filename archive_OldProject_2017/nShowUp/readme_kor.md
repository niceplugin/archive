# nShowUp.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/OldProject_2017/nShowUp)를 클릭하세요.

스크롤하여 화면에 element가 노출될 때 커스텀 이펙트를 쉽고 편리하게 제어하기 위해 만든 plugin입니다.

nShowUp.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* 다른 css 애니메이션 프레임워크를 쉽게 이용 가능
* 노출정도에 따른 실행조건을 설정
* 실행 횟수를 지정
* 사용자 정의 함수 선언 가능
* 실시간 모드를 이용한 parallax 구현
* IE8+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nShowUp.js'></script>
</head>
```
***

## API
nShowUp.js는 하나의 API를 제공합니다.

### `NP.ShowUp.set()`
한번에 여러개의 매개변수를 추가하여 서로 다른 옵션의 셀렉터를 설정할 수 있다.
```html
<script>
    NP.ShowUp.set(
        {
            content: 'selector',
            run: 'once',
            expos: 'part',
            add: 'myClassName',
            event: customFunctionName,
            realTime: false
        },
        {
            매개변수를 추가하여 다른 셀렉터에 다른 옵션을 적용 할 수 있다.
        }
    );
</script>
```
* **content** (필수)  
-`태그명` 또는 `#id` 또는 `.class` 입력
* **run** (선택, 기본값 once)  
-반복 실행 여부  
-`once` 한번만 실행, `always` 매번 실행
* **expos** (선택, 기본값 'part')  
-노출 정도에 따른 실행 여부  
-`part` 일부만 노출되어도 실행, `whole` 전체가 노출되었을 때 실행
* **add** (선택, 기본값 'showup')  
-실행되었을 때 element에 추가될 클레스명
* **event** (선택)  
-사용자 정의 함수 선언  
-첫번째 인자로 해당하는 element 객체를 반환  
-**realTime**이 활성화 일 경우에만 두번째 인자로 해당하는 `element.getBoundingClientRect()` 객체값을 반환  
-**realTime**이 활성화 일 경우에만 세번째 인자로 `window.inner` `Width and Height` 객체값을 `width` `height` 프로퍼티명으로 반환
* **realTime** (선택, 기본값 false)  
-`run:'always'` 그리고 사용자 정의 함수가 선언되었을 때만 `true` 설정 가능  
-`false` 비활성화, `true` element가 노출되었을 때 스크롤시 실시간으로 사용자 정의 함수 실행

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nShowUp.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.1**
* Create nShowUp.js
