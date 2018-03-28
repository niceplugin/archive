# nFrameWork
쉽고 빠른 Web을 제작을 위한 customizing framework 입니다.

[여기](https://niceplugin.github.io/OldProject_2017/nFrameWork/)서 지금 확인하세요.

***

## 장점

* jQuery 없이 작동하는 lite-plugin 탑재
* 웹 접근성 준수
* Wai-Aria 자동완성
* IE9+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 구성

* nFrameWork.css
* nFrameWork.js
* nIcons.css

***

## 설치
`<head>` 내부에 선언합니다.
```html    
<head>
    <link rel="stylesheet" href="./nFrameWork.css">
    <link rel="stylesheet" href="./nIcons.css">
    <script src='/nframework.js'></script>
</head>
```

***

## CSS 지원

* `h1`~ `h6`, 6가지의 기본 폰트 크기
* 기본, 빨강, 초록, 파랑, 노랑의 글꼴색상, 배경, 태마
* Note box
* form
 - checkbox, radio, toggle, text-radio
 - `<button>`, `<input type='button, submit, reset'>`
 - `<input type='text, search, tel, url, email, password, number'>`
 - `<textarea>`
 - `<select>`
 - `<fieldset>` 태그 스타일
* `<table>` 태그 스타일
* footer 기본 위치 지원

***

## 기본 Plugin 지원

* `<textarea>` auto resize
* layer popup
* tab panel
* drop menu
* accordion
* tool tip
* scroll spy
* slider

***

## 70종류의 Only CSS Icon 지원
`<span class='ico-foo'></span>` 형식으로 간단하게 사용할 수 있으며 폰트사이즈 조절로 깨짐없는 크기조절이 가능합니다.
* home
* mail
* check
* cross
* plus
* minus
* rss
* caretTop
* caretRight
* caretBottom
* caretLeft
* arrowTop
* arrowRight
* arrowBottom
* arrowLeft
* play
* stop
* pause
* next
* previous
* forward
* rewind
* download
* upload
* flag
* tag
* tags
* bookmark
* ellipsis
* ellipsis2
* file
* picture
* repeat
* reset
* reset2
* gear
* zoomin
* zoomout
* search
* calendar
* volumeNone
* volumeLow
* volumeMiddle
* volumeHigh
* mic
* chartBar
* chartLine
* chartArea
* chartPie
* folderClose
* folderOpen
* clip
* link
* video
* music
* print
* tile2x2
* tile3x3
* list
* share1
* share2
* power
* pin
* trashcan
* desktop
* laptop
* tablet
* mobile
* block
* comment

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 2.17.1**
* Create nFrameWork
