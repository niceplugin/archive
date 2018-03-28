# nCookie.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/OldProject_2017/nCookie)를 클릭하세요.

jQuery없이 쉽고 편리하게 쿠키를 관리하기 위해 만든 plug-in입니다.

nCookie.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* cookie를 쉽게 추가/수정/삭제 할 수 있는 API를 제공
* cookie의 존제 여부와 그 값을 얻을 수 있는 API를 제공
* cookie의 유효기간을 시간단위로 설정
* secure 프로퍼티를 추가 가능
* 쿠키값을 자동으로 인코딩/디코딩
* IE8+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nCookie.js'></script>
</head>
```

***

## API
nCookie.js는 세 개의 API를 제공합니다.

### Cookie를 추가 / 수정
`NP.Cookie.set()`는 한번에 여러개의 매개변수를 설정하여 여러개의 쿠키를 생성할 수 있습니다.
```html
<script>
    NP.Cookie.set(
        {
            name: 'myCookieName',
            value: 'myCookieValue',
            domain: 'host name',
            path: '/path',
            term: 24,
            secure: true
        },
        {
            두번째로 생성할 쿠키의 매개변수
        }
    );
</script>
```
* **name** (필수)
* **value** (필수)
* **domain** (선택)
* **path** (선택)
* **term** (선택)  
-현재 시각으로부터 입력한 시간만큼 지나면 쿠키가 만료됩니다.  
-입력하지 않았을 경우 세션쿠키가 생성됩니다.
* **secure** (선택, 기본값 false)  
-쿠키설정 표준에 대해 알아보기 [링크](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

### Cookie 호출
`NP.Cookie.get()`는 한번에 하나의 쿠키를 호출할 수 있습니다.
```html
<script>
    NP.Cookie.get('myCookieName');
</script>
```
호출하는 이름의 cookie가 존재한다면 그 값을 반환, 존재하지 않는다면 `null`을 반환합니다.

### Cookie 삭제
기본적으로 cookie는 `NP.Cookie.set()` API를 이용하여 삭제할수 있으나, 혼란을 방지하고자 별도의 삭제 API를 만들어 구분하고 있습니다.
`NP.Cookie.remove()`는 한번에 여러개의 매개변수를 설정하여 여러개의 쿠키를 삭제할 수 있습니다.
```html
<script>
    NP.Cookie.remove(
        {
            name: 'myCookieName',
            domain: 'host name',
            path: '/path'
        },
        {
            두번째로 삭제할 쿠키의 매개변수
        }
    );
</script>
```
* **name** (필수)
* **domain** (선택)
* **path** (선택)

`domain`과 `path`는 cookie를 생성할 때 값을 입력했다면 동일한 값을 입력해야 삭제됩니다.

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nCookie.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.1**
* Create nCookie.js
