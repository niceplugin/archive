---
title: 반복문
---

# 반복문 %{ #each }%

"신형만"씨와 "봉미선"씨가 버튼을 클릭한 만큼 별을 그리려면 어떻게 해야 할까요?

## 선행 조건 %{ #precondition }%

우선 별을 그릴 템플릿을 만드는 것입니다.
`stars.html` 파일을 만들고 아래와 같이 템플릿을 작성합니다:
```html
<template name="stars">
  <!-- 시작 주석 -->
    <span>별</span>
  <!-- 끝 주석 -->
</template>
```

다음으로 `stars.js` 파일을 만들고,
"전역 반응성 변수" `total`과 `stars`템플릿을 불러와야 합니다.
이후 조건문처럼 반복문에 쓰일 헬퍼를 만들어야 합니다. 

`stars.js` 파일을 만들고 아래와 같이 작성합니다:
```js
import './stars.html'
import total from './globalSum.js'
import { Template } from 'meteor/templating'

Template.stars.helpers({
  starList() {
    // 클릭 수 만큼의 길이를 가진 빈 배열을 만듭니다.
    const list = new Array( total.get() )
    
    // 빈 값을 모두 별로 채운 후, 해당 배열을 반환합니다.
    return list.fill('★ ')
  },
})
```

## 반복문 사용하기 %{ #use-each }%

반복문도 조건문처럼 시작과 끝이 있는 "블럭 태그" 입니다.

JS에서 아래와 같은 반복문을 본 적이 있을 겁니다:
```js
for (star in starList) { /* code */ }
```

`for`가 `each`로 바뀌고 괄호가 없어진 점을 제외하면,
스페이스 문법도 매우 비슷합니다. <br>
`stars.html` 템플릿의 `<!-- 주석 -->`을 다음처럼 작성해 봅시다:
```html
  {{# each star in starList }}
    <span>별</span>
  {{/ each }}
```

이제 반복문은 `starList` 헬퍼를 루프하면서 각각의 별을 `star` 변수에 전달할 것입니다.
그러니 "별" 문자를 감싸고 있는 코드 부분을 조금만 더 수정해 봅시다:
```html
    <span>{{ star }}</span>
```

이제 여러분은 반복문을 어떻게 사용하는지 알게 되었습니다!

## 적용하기 %{ #to-apply }%

이제 정말 클릭 수 만큼 별을 그리는지 적용해볼 차례입니다.

`main.js` 파일의 마지막 `import` 코드 아래에 다음 코드를 추가합니다:
```js
import './stars.js'
```

이제 소스를 실제로 불러오고 있으니 `main.html`에 `<!-- 주석 5 -->`를 템플릿으로 바꿔봅시다:
```html
  {{> stars }}
```

버튼을 누르면 별이 그려지나요? 그럼 성공입니다! <br>
만약 그렇지 않다면 튜토리얼을 처음부터 차근차근 다시 살펴보시길 바랍니다.

> 우리는 이번 섹션에서 다음과 같은 것을 배웠습니다:
> 1. 반복문 문법
> 2. 반복문 사용법

## 마무리하며 %{ #finish }%

이 튜토리얼은 Blaze가 어떻게 작동하는지 감을 잡기 위한 것으로,
실무에서 코드 유지보수를 용이하게 하는 코드 작성 패턴을 의도적으로 사용하지 않았습니다.

또한 Blaze에는 더 많은 기능이 있습니다.
따라서 가이드와 API 문서를 읽을 필요성이 있습니다.