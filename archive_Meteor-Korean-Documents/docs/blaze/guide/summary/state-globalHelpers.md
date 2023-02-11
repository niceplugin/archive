---
title: 상태관리와 전역 헬퍼
---

# 상태관리와 전역 헬퍼 %{ #state-and-global-helpers }%

`Redux`, `Vuex`, `Mobx`, `Pinia` 등 상태관리 라이브러리에 대해 들어보셨을 수도 있습니다.

상태(state)는 무엇일까요?

상태는 현재 값(정보)를 의미합니다.
"신형만"씨가 버튼을 5번 클릭했다면,
여기서 반응성 변수의 값 `5`는 상태라고 할 수 있습니다.

하지만 이 상태는 `counter`라는 각각의 템플릿 내부에서만 유지됩니다.
앱을 만들다보면, 일부 상태는 여러 템플릿에서 값이 공유되도록 사용해야 하는 경우가 있습니다.

우리가 구현하려는 클릭 수 "합계"가 바로 그렇습니다. <br>
"신형만"씨의 `counter` 템플릿에서 클릭한 횟수는
"봉미선"씨의 `counter` 템플릿에서 그 값 그대로 참조할 수 있어야 합니다.
그래야 합계를 구할 수 있으니까요.

> 한마디로 우리는 어디서든 현재 상태 그대로 조회 가능한 "전역 반응성 변수"가 필요하다는 것!

그리고 앱이 커질수록 "전역 반응성 변수"가 많이 필요해집니다.

`Redux`, `Vuex`, `Mobx`, `Pinia` 등 상태관리 라이브러리들을 한 번쯤 들어봤을 것입니다.
이것들의 기본적인 목적이 바로 "전역 반응성 변수"를 편리하게 관리해주는 것입니다.
하지만 이런 라이브러리들은 특정 프레임워크에 종속되거나, 배우는데 많은 시간이 걸립니다.

우리는 지금부터 라이브러리에 의존하지 않고,
"전역 반응성 변수"를 만들 것입니다.

## 전역 반응형 변수 만들기 %{ #create-global-reactive-var }%

`globalSum.js` 파일을 생성합니다.
그리고 내부에 아래와 같이 반응형 변수를 만듭니다:
```js
import { ReactiveVar } from 'meteor/reactive-var'

const total = new ReactiveVar(0)

// 어디선가 이 파일을 불러오면,
// total 반응형 변수를 내보내서 잠시 쓸 수 있게 해줍니다
export default total
```

이제 우리는 `globalSum.js` 파일을 어디서든 불러서(`import`) `total` 변수를 사용할 수 있습니다.
즉, "전역 반응성 변수"를 만든것 입니다!

## 전역 반응형 변수 사용하기 %{ #using-global-reactive-var }%

`counter.js` 파일로 돌아와 마지막 `import` 코드 바로 아래에 다음과 같이 코드를 추가하세요:
```js
import total from './globalSum.js'
```

그리고 `counter.js` 코드 내 버튼 클릭 핸들러 코드에 두 줄을 추가하세요:
```js
Template.counter.events({
  'click button'(event, instance) {
    const value = instance.counted.get() + 1

    instance.counted.set( value )

    const sum = total.get() + 1 // 추가되는 코드
    total.set( sum )            // 추가되는 코드
  }
})
```

우리는 이제 "전역 반응성 변수"를 조작할 수 있게 되었지만,
시각적으로 보이지 않으니 실제 작동하는지 알 수 없습니다.

## 글로벌 헬퍼 만들기 %{ #create-global-helpers }%

우리는 이제 `main.html`에 두 사람의 클릭 수 합계를 노출하고 싶습니다.
하지만 `main.html`은 템플릿이 아니므로,
템플릿 헬퍼를 만들 수 없습니다.

이럴 경우에는 글로벌 헬퍼를 만들어 사용하면 됩니다.
글로벌 헬퍼는 `main.html`은 물론이고 어떤 템플릿에서도 참조가 가능한 헬퍼입니다.

우선 `main.js`파일의 마지막 `import` 코드 밑에 다음과 같이 두 줄을 추가합니다:
```js
import { Template } from 'meteor/templating'
import total from './globalSum.js'
```

글로벌 헬퍼는 템플릿 헬퍼와 다르게 한 번에 하나씩만 등록이 가능합니다.

이제 `main.js`파일의 마지막 줄에 `totalNumber` 이름의 글로벌 헬퍼를 등록할 것입니다:
```js
Template.registerHelper('totalNumber', function() {
  return total.get()
})
```

이제 글로벌 헬퍼를 화면에 노출하기만 하면 됩니다.

## 글로벌 헬퍼 노출하기 %{ #show-global-helpers }%

`main.html` 파일의 `<!-- 주석 3 -->`을 아래와 같이 변경합니다:
```html
<hr>
<p>총 클릭 수: {{ totalNumber }}</p>
```

완성입니다!

`globalSum.js`의 `sum` 변수는 최초로 호출되었을 때에만 `sum` 변수를 만들고,
이후부터는 호출될 때마다 만들어진 `sum` 변수를 사용합니다.

그래서 이렇게 전역적으로 사용이 가능했던 것 입니다.

> 우리는 이번 섹션에서 다음과 같은 것을 배웠습니다:
> 1. 상태는 무엇인가
> 2. 상태관리 라이브러리를 사용하는 이유
> 3. 글로벌 상태 만들기
> 4. 글로벌 헬퍼 만들고 노출하기

하지만 여전히 아쉬움이 남습니다.
다음 섹션에서는 총 클릭 수에 따라 다른 메세지가 출력되도록 구현 해봅시다.














