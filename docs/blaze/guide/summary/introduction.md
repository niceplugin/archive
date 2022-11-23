---
title: 소개
---

# 소개 %{ #introduction }%

## Blaze란 무엇입니까? %{ #what-is-blaze }%

Blaze는 반응형 HTML 템플릿을 작성하여 UI를 만드는 강력한 라이브러리입니다.

이것은 앱에서 데이터 변경을 수신 대기하고 DOM을 조작하는 모든 "업데이트 로직"을 필요로 하지 않습니다.

대신 `{​{ #if }​}` 및 `{​{ #each }​}`와 같은 친숙한 템플릿 디렉티브가 "반응성 데이터"를 추적하여 DOM을 자동으로 업데이트합니다.

## 설치 %{ #install }%

[여기](/meteor/guide/summary/introduction.html#quick-start)의 지침대로 프로젝트를 생성하였다면,
Blaze는 프로젝트에 포함되어 있습니다.

수동으로 프로젝트에 추가하려는 경우:

```shell
meteor add blaze-html-templates
```

:::info
Blaze는 아직 jQuery에 일부 의존하는 내부 동작이 있습니다.
따라서 jQuery가 설치되어 있지 않거나,
일부 레거시 Blaze 프로젝트에서는 다음과 같은 오류가 발생할 수 있습니다.
```shell
Uncaught Error: jQuery not found
```

이 문제는 jQuery를 설치(또는 재설치)해서 해결할 수 있습니다:
```shell
meteor add jquery
```

해결되지 않을 경우, 더 자세한 정보는 [여기](https://www.blazejs.org/index.html#Prerequisite)를 참고하십시오.
:::

## 왜 Blaze 입니까? %{ #why-blaze }%

### 완만한 학습 곡선 %{ #easy-to-learn }%

Blaze를 시작하기 위해 많은 개념이나 용어를 배울 필요가 없습니다.
웹 개발자로서 우리는 이미 두꺼운 책에 설명된 복잡한 기술인 HTML, CSS 및 JS를 배웠습니다.
Blaze는 사용하기 위해 선행학습이 필요하지 않고,
기존 지식을 흥미롭고 새로운 방식으로 적용할 수 있습니다.

일반적으로 우리는 단순하고 가독성이 좋은 앱 코드와 API를 선호하며,
개발자가 새롭고 익숙하지 않은 용어와 문법을 배우는데 시간과 에너지가 제한되어 있음을 고려했습니다.

반응형 HTML을 위한 시스템을 만들 때 "간단하게 유지"하고,
개발자 경험을 우선시하는 것이 당연하게 들릴 수 있지만,
이러한 개선은 도전적이며 자주 일어나는 일이 아닙니다.
우리는 Blaze의 기능이 단순하고 이해하기 쉽고 유용하도록 유지하기 위해 [Meteor 커뮤니티](https://forums.meteor.com/c/blaze/24)의 피드백을 사용합니다.

### 명료한 반응성 %{ #transparent-reactivity }%

내부적으로 Blaze는 [Tracker](https://docs.meteor.com/api/tracker) 라이브러리를 사용하여,
각 템플릿 헬퍼를 다시 계산해야 하는 시기를 자동으로 추적합니다.
예를 들어 헬퍼가 클라이언트 측 데이터베이스에서 값을 읽는 경우,
값이 변경되면 헬퍼가 자동으로 다시 계산됩니다.

이것이 개발자에게 의미하는 바는,
DOM을 업데이트할 시기나 "데이터 바인딩"을 명시적으로 선언할 필요가 없다는 것입니다.
Tracker가 어떻게 작동하는지 또는 "반응성"이 정확히 무엇을 의미하는지 알 필요가 없습니다.

따라서 다른 접근 방식보다 적은 생각과 코드 타이핑이 가능합니다.

### 플러그인 상호 운용성 %{ #plugin-interoperability }%

웹 개발자는 종종 HTML, CSS 및 JS의 스니펫을 공유하거나,
라이브러리, 위젯 또는 jQuery 플러그인을 사용하여,
동영상, 지도 및 기타 타사 콘텐츠를 삽입하기를 원합니다.

Blaze는 자신이 DOM 전체를 소유하고 있다고 가정하지 않으므로,
업데이트 이외의 DOM에 대해 가능한 한 영향을 주지 않으려고 시도합니다.
메모리 누수를 방지하기 위해 jQuery의 클린업 루틴에 연결하며,
jQuery 또는 타사 라이브러리에 의해 엘리먼트에 추가된 클래스, 속성 및 스타일을 유지합니다.

조심하지 않으면 Blaze와 jQuery가 서로의 발목을 잡을 수 있지만,
이를 방지하는 확립된 패턴이 있으며,
Blaze 개발자는 더 넓은 웹 커뮤니티에서 만들어진 다양한 위젯과 향상된 기능들을 사용할 수 있을 것으로 기대합니다.

## 참고 사이트 %{ #reference-site }%

- [공식 Blaze 사이트](https://www.blazejs.org/)
- [공식 포럼 사이트](https://forums.meteor.com/c/blaze/24)
- [공식 깃허브](https://github.com/meteor/blaze)
