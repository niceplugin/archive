---
title: 스타일 가이드란?
---

# 스타일 가이드란? %{ #introduction }%

"이런 규칙으로 코드를 작성하자"라고 정의한 것을 스타일 가이드라고 합니다.

혼자서 작업하면 스타일 가이드가 필요 없을거라 생각할 수 있지만,
동일 인물이더라도 기분, 최신 유행 스타일 또는 일정에 따라 각각 다른 다른 스타일을 적용할 가능성이 매우 크기 때문입니다.

팀으로 협업하게 되면 더욱 중요한데,
각 구성원이 통일된 코딩 스타일을 가지고 있어야 프로젝트 코드 분석이 더 쉽고 빠르게 진행된다.
또한 통일된 스타일은 개인과 협업에 안정감을 주는데,
이것은 새로운 구성원이 합류했을 때 당황하지 않고 프로젝트 코드에 스며들 수 있다.

## 전체 공통사항 %{ #common-to-all }%

모든 HTML, CSS, JS 코드는 들여쓰기에 2 스페이스를 사용합니다.
```js
// ❌ 비추
function hello() {
    console.log('hello world!')
}
```

```js
// ✅ 추천
function hello() {
  console.log('hello world!')
}
```

## HTML & CSS 공통사항

### 프로토콜 %{ #protocol }%

가능한 임베드 되는 리소스에는 `https:` 프로토콜을 사용한다.
```html
<!-- ❌ 비추 -->
<script src="//domain.com/resource.js"></script>
<script src="http://domain.com/resource.js"></script>
```

```html
<!-- ✅ 추천 -->
<script src="https://domain.com/resource.js"></script>
```

```css
/* ❌ 비추 */
@import '//fonts.domain.com/css?family=Open+Sans';
@import 'http://fonts.domain.com/css?family=Open+Sans';
```

```css
/* ✅ 추천 */
@import 'https://fonts.domain.com/css?family=Open+Sans';
```

### 소문자 %{ #lowercase }%

HTML의 속성 값이나 CSS의 셀렉터를 제외한 모든 값은 소문자여야 합니다.
```html
<!-- ❌ 비추 -->
<IMG SRC="image.png" ALT="someInfo">
```

```html
<!-- ✅ 추천 -->
<img src="image.png" alt="someInfo">
```

```css
/* ❌ 비추 */
mySelect {
  color: #E5E5E5;
}
```

```css
/* ✅ 추천 */
mySelect {
  color: #e5e5e5;
}
```