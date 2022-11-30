---
title: CSS
---

# CSS %{ #css }%

## 클래스 작명 %{ #class-naming }%

의미 있거나 일반적인 클래스 이름을 사용해야 합니다.

엘리먼트의 목적을 구체적으로 반영하는 이름이 가장 이해하기 쉽고,
변경될 가능성이 낮기 때문에 선호됩니다.

```css
<!-- ❌ 비추 -->
.yee-1234 {}
```

```css
<!-- ✅ 추천 -->
.login {}
.video {}
```

## 작명 스타일 %{ #nameing-style }%

가능한 짧은 클래스 이름을 지으려고 노력하십시오.
단, 일반적으로 의미가 전달될 수 있을만큼의 긴 클래스 이름이어야 합니다.

```css
<!-- ❌ 비추 -->
.navigation {}
.atr {}
```

```css
<!-- ✅ 추천 -->
.nav {}
.author {}
```

## 클래스 이름 구분자 %{ #class_name_delimiters }%

하이픈 `-` 으로 클래스 이름의 단어들을 구분짓습니다.

```css
<!-- ❌ 비추 -->
.demoimage {}
.error_status {}
```

```css
<!-- ✅ 추천 -->
.video-id {}
.ads-sample {}
```

## 접두어 %{ #prefixes }%

대규모 프로젝트에서는 앱별로 짧고 고유한 접두사를 붙입니다.

이것은 네임스페이스를 사용하는 것으로서,
상호간에 이름 충돌을 방지하며,
검색 및 변경 작업과 같은 유지보수가 더 수월해집니다.

```css
.adw-help {} /* AdWords */
.maia-note {} /* Maia */
```

## 셀렉터 %{ #selectors }%

엘리먼트 이름과 함께 클래스 이름을 사용하여 셀렉터를 지정하지 마십시오.

불필요한 셀렉터를 지양하는 것은 [성능상 유용](https://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)합니다.

```css
<!-- ❌ 비추 -->
ul.example {}
div.error {}
```

```css
<!-- ✅ 추천 -->
.example {}
.error {}
```

## ID 셀랙터 %{ #id-selector }%

ID 셀랙터는 사용하지 마십시오.

ID 속성은 고유해야 합니다.
개발자가 여러 페이지를 작업하는 경우,
수 많은 엘리먼트를 포함한 수 많은 페이지가 생성되므로 고유함을 보장하기 어렵습니다.

```css
<!-- ❌ 비추 -->
#example {}
```

```css
<!-- ✅ 추천 -->
.example {}
```

## 간략한 프로퍼티 %{ #shorthand-properties }%

단축 속성은 코드 효율성과 가독력을 높여주므로 가능하면 단축 속성을 사용합니다.

```css
<!-- ❌ 비추 -->
.example {
  border-top-style: none;
  font-family: palatino, georgia, serif;
  font-size: 100%;
  line-height: 1.6;
  padding-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0;
}
```

```css
<!-- ✅ 추천 -->
.example {
  border-top: 0;
  font: 100%/1.6 palatino, georgia, serif;
  padding: 0 1em 2em;
}
```

## 0과 단위

`0`이라는 값을 사용하는 경우,
필요한 경우가 아니라면 이후에 단위를 사용하지 마십시오.

```css
.example {

  flex: 0px; /* 이 컴포넌트는 단위가 필요합니다. */
  margin: 0;
  padding: 0;
}
```

## 접두어 0 %{ #leading-0 }%

-1 ~ 1 사이의 값을 사용할 때는 항상 앞에 `0`을 표기하십시오.

```css
<!-- ❌ 비추 -->
.example {
  font-size: .8em;
}
```

```css
<!-- ✅ 추천 -->
.example {
  font-size: 0.8em;
}
```

## `!import` 선언 %{ #import-declarations }%

`!import` 선언을 사용하지 마십시오.

이러한 선언은 CSS의 자연스러운 캐스케이드를 깨고,
스타일을 추론하는 것을 어렵게 만듭니다.
속성을 재정의하려면 [셀랙터 고유성](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)을 사용하십시오.

```css
<!-- ❌ 비추 -->
.example {
  font-weight: bold !important;
}
```

```css
<!-- ✅ 추천 -->
.example {
  font-weight: bold;
}
```

## 선언 순서 %{ #declaration-order }%

프로젝트 내에서 일관된 선언을 위해 속성 선언은 알파벳 순으로 정렬합니다.

정렬간 공급업체별 접두사의 붙이는 경우는 속성 정렬에서는 무시하지만,
공급 업체별 알파벳 정렬은 유지되어야 합니다.

```css
.example {
  background: fuchsia;
  border: 1px solid;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: black;
  text-align: center;
  text-indent: 2em;
}
```

## 블록 콘텐츠 들여쓰기 %{ #block-content-indentation }%

계층 구조를 반영하고 이해를 높이기 위해 모든 [블록 컨텐츠](https://www.w3.org/TR/CSS21/syndata.html#block), 즉 선언 내 규칙을 들여씁니다.

```css
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

## 세미콜론 %{ #semicolon }%

일관성과 확장성을 위해 모든 선언을 세미콜론으로 끝냅니다.

```css
<!-- ❌ 비추 -->
.test {
  display: block;
  height: 100px
}
```

```css
<!-- ✅ 추천 -->
.test {
  display: block;
  height: 100px;
}
```

## 속성 후 공백 %{ #space-after-property }% 

속성 뒤 `:`콜론과 값 사이에는 항상 하나의 공백을 사용합니다.

```css
<!-- ❌ 비추 -->
h3 {
  font-weight:bold;
}
```

```css
<!-- ✅ 추천 -->
h3 {
  font-weight: bold;
}
```

## 선언 블록 분리 %{ #declaration-block-separation }%

마지막 셀랙터와 블록 사이에는 항상 하나의 공백을 사용하고,
셀랙터와 여는 블록은 같은 줄에 있어야 합니다.

```css
<!-- ❌ 비추 -->
.video{
  margin-top: 1em;
}
.video
{
  margin-top: 1em;
}
```

```css
<!-- ✅ 추천 -->
.video {
  margin-top: 1em;
}
```

## 셀랙터 분리 선언 %{ #selector-declaration-separation }%

각 셀랙터 선언은 항상 새 행에서 시작하십시오.

```css
<!-- ❌ 비추 -->
a:focus, a:active {
  position: relative; top: 1px;
}
```

```css
<!-- ✅ 추천 -->
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

## 규칙 분리 %{ #rule-separation }%

규칙과 규칙 사이는 항상 한 줄을 비워두십시오.

```css
html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
```

## CSS 인용 부호 %{ #css-quotation-marks }%

속성 셀랙터 및 속성 값에는 두 개 `"`가 아닌 단일 `'` 따옴표를 사용합니다.

`url` 값에는 따옴표를 사용하지 않습니다.

예외: @charset 규칙을 사용해야 하는 경우 큰따옴표를 사용하십시오.
[작은따옴표는 허용되지 않습니다.](https://www.w3.org/TR/CSS21/syndata.html#charset)

```css
<!-- ❌ 비추 -->
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
```

```css
<!-- ✅ 추천 -->
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

## 주석 %{ #comments }%

각 섹션 설명은 주석으로 합니다.

```css
/* 해더 */

.adw-header {}

/* 푸터 */

.adw-footer {}

/* 겔러리 */

.adw-gallery {}
```
