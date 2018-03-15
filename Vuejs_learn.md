# Vue.js 2.x 기초를 정리해본다.

## 들어가기 전 잡설

취업준비하며 느낀건 프레임웍 사용 여부를 그렇게 따지더라 였다...

사실 취준생이 프레임웍을 사용할 만큼의 포트폴리오를 만들일도 없고 해서 머리론 이해하지만 체감상 필요성을 느끼진 못한다..

그래서인지 프레임 웍을 머리로만 공부한다는게 참 꺼려진다.

하지만 뭐 취업하려면 요구하고 취업하자고 별별 프레임웍 다 숙지할수도 없는 노릇이라

요즘 핫하게 뜨고 있는 그리고 뜨기 훨씬 전부터 이건 좀 쉬운데 라고 느꼇던 Vue.js 정말 기초만 간단히 정리해본다.

물론 Vue.js도 깊이있게 활용하려면 음... 개인적으로 와닿지 않는 부분이라 힘든거 같긴 하지만

nodejs를 만질때 express와 pug 템플릿을 사용했었는데 아직도 vuejs가 뭔 프레임웍인지 감이 안온다.

vuejs도 하나의 템플릿 종류라고만 느껴진다.. 이부분은 실무를 해봐야 와닿을듯.

## Vue 객체 만들기

객체를 만드는 대략적인 기본틀은 이러하다.

    <p id='my-p'>이 p 테그를 뷰 객체화 해보자.</p>
    <script>
        // app 이라는 변수에 새로운 Vue 객체를 생성한다.
        var app = new Vue({
            el: '#my-p',    // HTML Element의 id값을 입력
                            // app.$el로 해당 객체가 참조된다.
            data: {         // 객체에서 사용할 데이터 객체, 프로퍼티로 원시값 객체 배열
                foo: 'foo'
            },
            methods: {      // 객체에서 사용할 함수
                foo: function() {}
            }
        });
    </script>


## directives

HTML tag 속성으로 들어갈 Vue의 directive 종류에 대해 정리해본다.

공식문서는 [여기](https://kr.vuejs.org/v2/api/#%EB%94%94%EB%A0%89%ED%8B%B0%EB%B8%8C)에서 확인할 수 있다.

- v-text
- v-html
- v-show
- v-if, v-else-if, v-else
- v-pre
- v-cloak
- v-once

### v-text

    <p id='my-p'>
        <span v-text='myText'></span>
        {{ myText }}
    </p>
    <script>
        var app = new Vue({
            el: '#my-p',
            data: {
                myText: 'hello!'
            }
        });
    </script>

이렇게 hello 라는 문자열(값)을 출력할 수 있다.

문자열이 html 형식이여도 텍스트로 출력되므로 xss 염려는 없다.

### v-html

v-text와 동일하나 값이 html 문자열이므로 html 형식으로 렌더링 하여 출력한다.

xss 주의를 요한다.

### v-show

    <p id='my-p'>
        <span v-text='myText' v-show='isShow'></span>
    </p>
    <script>
        var app = new Vue({
            el: '#my-p',
            data: {
                myText: 'hello!',
                isShow: true
            }
        });
    </script>

값으로 boolean을 받으며 true 일 경우 해당 태그가 노출 false 일 경우 노출 되지 않는다.

javascript 에서 false로 인정하는 값들은 모두 false 처리되어 인식된다. ('', 0, null, undefined ... 또있던가?)

### v-if, v-else-if, v-else

v-show와 동일하나 단지 조건문으로 동작하는 정도.

### v-pre

이 속성을 가진 엘리먼트와 그 이하 자식 엘리먼트는 vue가 해석할 directive가 없다고 판단하여 건너뛴다.

그러므로 {{ }} 와 같은 머스태쉬 구문도 그대로 문자열로 출력된다.

컴파일 속도향상을 기대할수 있다.

### v-cloak

> Vue 인스턴스가 컴파일을 완료할 때까지 엘리먼트에 남아있습니다.

라고 하는데 사실 뭔말인가 싶다...

컴파일이 안됬을때 css 설정으로

    [v-cloak] {display: none}

와 같이 하여 시각적 비활성화를 할 수 있다는건 이해하겠는데 어따 써먹어야 하는가...?

### v-once

> 엘리먼트 및 컴포넌트를 한번만 렌더링 합니다. 후속 렌더링에서 엘리먼트 / 컴포넌트와 모든 하위 엘리먼트는 정적으로 처리되어 건너 뜁니다. 이는 업데이트 성능을 최적화하는데 사용합니다.

최초 랜더링 결과에 따라 출력여부가 결정된다.




















