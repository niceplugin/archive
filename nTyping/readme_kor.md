# nTyping.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/OldProject_2017/nTyping)를 클릭하세요.

타이핑 이펙트로 인상적인 효과를 주기위해 만든 plug-in입니다.

nTyping.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* 웹 접근성을 고려한 Mark-Up
* 스크린리더 호환 (Chrome Vox와 NVDA로 테스트 됨)
* 완벽한 태그 추가/제거
* 쉬운 타이핑 텍스트 명령어
* IE8+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nTyping.js'></script>
</head>
```

***

## API
nTyping.js는 한개의 API를 제공합니다.

### `NP.Typing.set()`
```html
<script>
    NP.Typing.set({
        id: 'myId',
        content: 'my text',
        typeSpeed: 125,
        backSpeed: 75,
        cursor: true,
        cursorChar: '|',
        cursorSpeed: 750,
        event: myFunc,
        alt: true,
        altText: 'my alternative text'
    });
</script>
```
* **id** (필수)
* **content** (필수)  
-타이핑 할 텍스트.
* **typeSpeed** (선택, 기본값 125)  
-타이핑 속도를 밀리초 단위로 입력.
* **backSpeed** (선택, 기본값 75)  
-백스페이스 속도를 밀리초 단위로 입력.
* **cursor** (선택)  
-커서 활성화 여부.  
-`false` 비활성화, `true` 활성화
* **cursorChar** (선택, 기본값 '|')  
-커서로 지정할 문자값.
* **cursorSpeed** (선택, 기본값 750)  
-커서가 깜빡이는 속도를 밀리초 단위로 입력.
* **event** (선택)  
-사용자 정의 함수.  
-첫번째 인자로 셀렉터 객체를 반환.
* **alt** (선택)  
-대체 텍스트 활성화 여부.  
-`false` 비활성화, `true` 활성화
* **altText** (선택, 기본값 plug-in이 적용되지 않았을 때의 셀렉터 텍스트)  
-`alt:true` 일 경우 스크린리더가 읽을 대체 텍스트.

### 타이핑 텍스트 명령어
* **//**  
-텍스트 '/'를 입력. **/**만 입력시 무시
* **/b$/**  
-백스페이스를 실행. $는 실행할 횟수.
* **/c/**  
-커서 비활성화.
* **/d$/**  
-텍스트를 즉시 삭제. $는 삭제할 문자수.
* **/e/**  
-사용자 정의 함수 실행.
* **/l/**  
-타이핑 리플레이.
* **/s$/**  
-타이핑 일시정지. $는 일시정지 할 밀리초 값.
* **<**  
-태그 시작을 선언. 유효할 경우 태그 종료는 자동적으로 인식.
* **<<**  
-텍스트 '<'를 입력.

***

## 웹 접근성
### 어떻게 동작하는가?
타이핑 효과로 실시간 문자가 추가될 경우, 전적으로 스크린리더에 의존하는 사용자에게 혼란을 야기할 수 있습니다.
이러한 혼란을 미연에 방지하기 위해 nTyping.js는 아래와 같은 방식으로 동작합니다.

**사용자 지정 Mark-up**
```html
<span id='myId1'>Hello World.</span>
```
**Plug-in에 의해 동적으로 변하는 Mark-up**
```html
<span class='myId1 typingAriaLabel' title='Hello World.'></span><span id='myId1' aria-hidden='true'>Hello World.</span>
```
1. 타이핑 되는 셀렉터에 `aria-hidden='true'` 속성을 적용시켜 스크린리더가 읽지 못하게 합니다.
-`aria-hidden` 속성에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-hidden)
2. `alt:true` 일 경우 셀렉터 앞에 새로운 `<span>` 태그를 추가하고 속성값으로 `title='value'`를 지정하여 대체 택스트를 제공합니다.

### 어떻게 Mark-up 해야할까?
개발자는 nTyping.js를 사용시 아래를 참고해야 합니다.
**잘못된 Mark-up**
```html
<h1 id='myId1'>Hello World.</h1>
<p id='myId2'>I love coding.</p>
```
**올바른 Mark-up**
```html
<h1><span id='myId1'>Hello World.</span></h1>
<p><span id='myId2'>I love coding.</span></p>
```

### 스크린리더 참고사항
```html
<h1><span class='myId1 typingAriaLabel' title='Hello World.'></span><span id='myId1'>Hello World.</span></h1>
```
**Chrome Vox**와 **NVDA**는 위와 같이 Plug-in에 의해 변경된 Mark-up을 아래와 같이 출력합니다.

|ScreenReader|Output|
|:----------:|:----:|
|**Chrome Vox**|Hello World.|
|**NVDA**|Hello World.|


하지만 `<p>` 태그를 사용했을 경우 의도하지 않은 결과가 출력됩니다.
```html
<p><span class='myId2 typingAriaLabel' title='I love coding.'></span><span id='myId2'>I love coding.</span></p>
```
**Chrome Vox**는 의도한 결과를 출력하지만 **NVDA**는 태그 자체를 인식하지 않습니다.

|ScreenReader|Output|
|:----------:|:----:|
|**Chrome Vox**|I love coding.|
|**NVDA**|-|

이러한 문제를 해결하기 위해서는 속성 설정시 `alt:false`를 적용하고 수동으로 대체 텍스트를 지정해야 합니다.
하지만 이러한 Mark-up은 `Mouse drag` `ctrl+c` `ctrl+v`시 시각적으로 보이지 않은 텍스트 정보를 노출한다는 점을 참고해야 합니다.
```html
<p><span style='font-size:0px'>I love coding.</span><span id='myId2'>I love coding.</span></p>
```
대체 텍스트에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#textalternativecomputation_header)

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nTyping.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.1**
* Create nTyping.js
