# nSlider.js

데모페이지를 보려면 [여기](https://niceplugin.github.io/nSlider)를 클릭하세요.

쉽고 빠르게 슬라이드 컨텐츠를 제작하기 위해 만든 plug-in입니다.

nSlider.js는 다음과 같은 장점이 있습니다.
* jQuery 없이 작동
* 터치 지원 (터치 드레그 속도에 반응)
* AJAX 구현 가능
* 비율을 유지하는 반응형 크기조절
* 웹 접근성을 높인 mark-up 구조
* 스크린리더 호환 (Chrome Vox와 NVDA로 테스트 됨)
* IE8+, Chorme, FireFox, Opera, Safari, iOS, Android를 지원

***

## 설치
`<head>` 태그에 플러그인을 선언합니다.
```html    
<head>
    <script src='/nSlider.js'></script>
</head>
```
슬라이드 컨텐츠를 다음과 같이 Mark-up 합니다.
```html    
<body>
    <ul id='myId1'>
        <li> Content </li>
        <li> Content </li>
               ...
        <li> Content </li>
    </ul>
</body>
```

***

## API
nSlider.js는 세개의 API를 제공합니다.

### `NP.Slider.set()`
`NP.Slider.set()`는 한번에 여러개의 매개변수를 설정하여 여러개의 슬라이더를 설정할 수 있습니다.
```html
<script>
    NP.Slider.set(
        {
            id: 'myId1',
            width: 640,
            height: 480,
            ratio: '4:3',
            event: myFunc1,
            code: {
                animation: 1,
                bgAnimation: 1,
                duration: 200,
                autoplay: 1,
                term: 4000,
                loop: 1,
                pnBtn: 1,
                carBtn: 1,
                conBtn: 1,
                background: 1,
                resizing: 1
            }
        },
        {
            The second parameter of the slider to set
        }
    );
</script>
```
* **id** (필수)
* **width**, **height** 또는 **ratio** (필수)  
-**width**, **height**를 px 단위로 입력  
-`width:100%`을 적용하고 `height:`는 비율로 지정해야 할 경우 **ratio**를 `x:y` 형식으로 입력  
-둘 다 입력시 **width**, **height**를 적용
* **event** (선택)  
-사용자 정의 함수  
-슬라이드가 전활 될 때마다 실행  
-첫번째 인자로 현재 슬라이드 id를 반환  
-두번째 인자로 현재 슬라이드 페이지 번호를 반환 (1페이지는 0)  
-세번째 인자로 전환되는 슬라이드 페이지 번호를 반환 (10페이지는 9)
* **code** (선택)  
-슬라이더의 세부 옵션을 지정  
  * **animation** (기본값 1)  
  -페이지 전환에 적용될 애니메이션  
  -`0` 미적용, `1` 좌우슬라이드, `2` 상하슬라이드, `3` 페이드
  * **bgAnimation** (기본값 1)  
  -**background** 활성화시 슬라이더 배경에 적용될 애니메이션  
  -`0` 페이드, `1` **animation**과 동일, `2` **animation**의 반대
  * **duration** (기본값 200, 최소값 100)  
  -페이지 전환 애니메이션 재생 시간 (밀리초 단위)
  * **autoplay** (기본값 1)  
  -자동으로 슬라이드 재생여부  
  -`0` 비활성화, `1` 활성화
  * **term** (기본값 4000)  
  -페이지 전환에 걸리는 시간 (밀리초 단위)  
  -**term** 값은 **duration** 값보다 작거나 같을 경우 **duration** 값을 적용
  * **loop** (기본값 1)  
  -반복 활성화 여부  
  -`0` 비활성화, `1` 무한, `2` 되돌리기  
  -`0`는 첫 또는 끝 페이지 일 경우에만 해당하는 이전/다음 버튼에 `notBtn` 클레스명이 추가된다.
  * **pnBtn** (기본값 1)  
  -이전/다음 버튼 활성화 여부  
  -`0` 비활성화, `1` 활성화
  * **carBtn** (기본값 1)  
  -카로우셀 버튼 활성화 여부  
  -`0` 비활성화, `1` 활성화
  * **conBtn** (기본값 1)  
  -재생 조작 버튼 활성화 여부  
  -`0` 비활성화, `1` 활성화
  * **background** (기본값 0)  
  -배경 활성화 여부  
  -`0` 비활성화, `1` 활성화
  * **resizing** (기본값 1)  
  -반응형 사이즈 조절 기능 활성화 여부  
  -`0` 비활성화, `1` 활성화

### `NP.Slider.get()`
`NP.Slider.get()`는 슬라이더의 정보를 호출합니다. (읽기 전용)
```html
<script>
    NP.Slider.get('myId1', 'foo', index);
</script>
```
`foo`에 해당하는 값은 다음과 같습니다.
* **curPage**  
-슬라이더의 현재 페이지 숫자 값을 반환 (1페이지는 0)
* **maxPage**  
-슬라이더의 끝 페이지를 숫자 값을 반환 (10페이지는 9)
* **length**  
-컨텐츠 갯수를 반환
* **playState**  
-재생상태를 반환  
-`0` 정지, `1` 재생중, `2` 일시정지 또는 페이지 미전환 애니페이션
* **ctrlBtn**  
-재생버튼 엘리먼트 객체를 반환
* **prevBtn**  
-이전버튼 엘리먼트 객체를 반환
* **nextBtn**  
-다음버튼 엘리먼트 객체를 반환
* **content**  
-컨텐츠를 감싸고 있는 `<li>` 객체를 반환 (index 입력 필수)
* **background**  
-배경 `<li>` 객체를 반환 (index 입력 필수)
* **carousel**  
-카로우셀 버튼 `<li>` 객체를 반환 (index 입력 필수)

### `NP.Slider.ctrl()`
`NP.Slider.ctrl()`는 슬라이더를 직접 컨트롤 할 수 있는 메소드 입니다.
```html
<script>
    NP.Slider.ctrl('myId1', 'foo', index);
</script>
```
`foo`에 해당하는 값은 다음과 같습니다.
* **playToggle**  
-컨트롤 버튼 활성화 여부에 관계없이 슬라이더를 재생 또는 일시정지
* **goTo**  
-지정한 페이지로 화면 전환 (index 입력 필수, 2페이지로 이동시 index값은 1)

### CSS 참고사항
nSlider.js를 통해 생성되는 모든 슬라이더는 다음과 같은 CSS 기본값을 가지게 되며, `<head>` 태그에 `<style id='nSliderDefaultCSS'>`로 추가됩니다.
```html
<style id='nSliderDefaultCSS'>
    .nSlider {position: relative; width: 100%}
    .nSlider .sWrap {position: relative; margin: auto; width: 100%; z-index: 1}
    .nSlider .prevBtn {position: absolute} .nSlider .nextBtn {position: absolute}
    .nSlider .carousel {position: absolute} .nSlider .conBtn {position: absolute; z-index: 1}
    .nSlider .sBg {position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden}
    .nSlider .sBg li {position: absolute; width: 100%; height: 100%}
    
    .nSlider .myId1 {position: relative; width: 100%; height: 100%; overflow: hidden}
    .nSlider .myId1>li {position: absolute; width: 100%; height: 100%}
</style>
```

***

## 웹 접근성
### 어떻게 동작하는가?
자칫 잘못하면 슬라이더 컨텐츠는 스크린리더 또는 키보드에 의존하는 사용자에게 혼란 또는 불편함을 안겨주는 문제를 야기 할 수 있습니다.
이러한 문제를 방지하고자 nSlider.js는 아래와 같은 방식으로 동작합니다.

**사용자 지정 Mark-up**
```html
<ul id='myId1'>
    <li> Content </li>
    <li> Content </li>
           ...
    <li> Content </li>
</ul>
```
**Plug-in에 의해 동적으로 변하는 Mark-up**
```html
<div id='myId1' class='nslider'>
    <div class='sWrap'>
    
        <!-- 활성화 한 경우에만 생성 -->
        <button class='conBtn' aria-pressed='true||false' title='slider play button'></button>
        
        <!-- id 속성이 class 속성으로 변경, 값은 동일 -->
        <ul class='myId1'>
            <li> Content </li>
            <li> Content </li>
                   ...
            <li> Content </li>
        </ul>
        
        <!-- 활성화 한 경우에만 생성 -->
        <button class='prevBtn' aria-hidden='true' tabindex='-1'></button>
        <button class='nextBtn' aria-hidden='true' tabindex='-1'></button>
        
        <!-- 활성화 한 경우에만 생성 -->
        <ul class='carousel' aria-hidden='true'>
            <li></li> <!-- 컨텐츠 리스트 만큼 생성 -->
        </ul>
    </div>
    
    <!-- 활성화 한 경우에만 생성 -->
    <ul class='sBg'>
        <li></li> <!-- 컨텐츠 리스트 만큼 생성 -->
    </ul>
</div>
```
* **플레이 버튼**  
-이 버튼의 용도와 상태를 스크린리더가 읽을 수 있도록 `aria-pressed` `title` 속성을 설정합니다.  
-`aria-pressed` 속성은 *NVDA*에서 오작동하는 이슈가 있습니다. 이처럼 개발자는 nSlider.js를 사용해 슬라이드 서비스를 제공할 경우, 해당 국가의 스크린리더와의 호환성을 확인할 필요가 있습니다. 그리고 경우에 따라서 스크립트의 해당 기능을 커스터마이징 해야 합니다.  
-`aria-pressed`에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-pressed)  
-대체 텍스트에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#textalternativecomputation_header)

* **컨텐츠**  
-nSlider.js는 텝으로 컨텐츠에 접근 시 해당 컨텐츠 페이지로 전환됩니다.  
-컨텐츠 내부에 포커스를 받을 요소가 하나도 없다면, 해당 컨텐츠를 감싸고 있는 `<li>` 태그는 `tabindex='0'` 속성을 가지게 됩니다.

* **이전/다음 버튼**  
-앞서 설명한 컨텐츠의 기본기능에 의해 **이전/다음 버튼**을 키보드 조작 필요성이 없어지므로 `tabindex='-1'` 속성을 가지게 됩니다.  
-스크린리더 사용자의 혼란을 막기 위해 `aria-hidden='true'` 속성을 가지게 됩니다.

* **카로우셀 버튼**  
-**이전/다음 버튼**과 동일하게 키보드 조작 필요성이 없으므로 `<ul>` `<li>`태그로 생성됩니다.  
-스크린리더 사용자의 혼란을 막기 위해 `aria-hidden='true'` 속성을 가지게 됩니다.

### Mark-up 참고사항
슬라이더에 한번에 세개씩 총 9개의 컨텐츠를 나타내고 싶을 때 다음과 같이 mark-up하게 됩니다.
```html
<ul id='myId1'>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
</ul>
```
이러한 mark-up은 시각적으로 문제는 없지만, 스크린리더는 다음과 같이 의도하지 않은 문서구조를 출력하게 됩니다.
> \>목록항목 3개를 포함한 목록
> * list1  
> \>목록항목 3개를 포함한 목록
>   * list1
>   * list2
>   * list3
> * list2  
> \>목록항목 3개를 포함한 목록
>   * list1
>   * list2
>   * list3
> * list3  
> \>목록항목 3개를 포함한 목록
>   * list1
>   * list2
>   * list3

이러한 문제를 해결하기 위해서는 다음과 같이 태그에 `role='presentation'` `role='listitem'` 속성을 추가해야 합니다.
```html
<ul id='myId1'>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
</ul>
```
그러면 스크린리더는 다음과 같이 문서구조를 출력하게 됩니다.
> \>목록항목 9개를 포함한 목록
> * list1
> * list2
> * list3
> * list4
> * list5
> * list6
> * list7
> * list8
> * list9

`role='presentation'`에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#presentation)
`role='listitem'`에 대해 알아보기. [링크](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#listitem)

***

## 기타
누구나 이 프로젝트의 개선에 동참하는 것을 환영합니다.
다음과 같은 방법으로 동참할 수 있습니다.
* Issues 매뉴를 통한 버그 리포트
* <niceplugin@gmail.com>로 버그 리포트
* 직접 코드 수정
* 다른 개발자가 이해할 수 있게 주석 수정 (제 영어실력이 매우 좋지 않습니다.)
* 당신의 웹사이트에 nSlider.js 사용 (하하하 XD)


코드를 수정하였을 때는 다음과 같은 규칙으로 버전을 명시해주십시요.
**Version `a`.`yy`.`n`**
* `a` IE 기준으로 브라우저 지원을 구분합니다. (1: IE8+, 2: IE9+, ...)
* `yy` 수정한 년도를 표기합니다. (2017년 일 경우 17)
* `n` 해당 년도에 수정한 횟수를 표기합니다.

### 버전 정보
**Version 1.17.1**
* Create nSlider.js
