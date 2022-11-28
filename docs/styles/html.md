# HTML

## 기본 메타테그 %{ #basic-meta-tag }%

항상 문서의 인코딩을 선언하십시오.
인코딩 지정 시기 및 방법에 대한 자세한 내용 [링크](https://www.w3.org/International/tutorials/tutorial-char-enc/)
```html
<meta charset="utf-8">
```

선택적으로 필요시 넣는 테그이나 필수로 첨부하도록 합시다.
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 의미있게 %{ #semantics }%

접근성, 재사용성 및 코드 효율성을 이유로 목적에 맞게 HTML 태그를 사용해야 합니다.
```html
<!-- ❌ 비추 -->
<div onclick="goToAboutPage();">About</div>
```

```html
<!-- ✅ 추천 -->
<a href="about/">About</a>
```

## 멀티미디어 대체 컨텐츠 %{ #multimedia-fallback }%

접근성을 위해 멀티미디어의 경우 확실하게 대안적인 의미가 있는 속성을 사용해야 합니다.
이미지의 경우 `alt` 속성을 비디오 및 오디오의 경우 대본과 캡션(가능한 경우)을 사용해야 합니다.
```html
<!-- ❌ 비추 -->
<img src="image.png">
```

```html
<!-- ✅ 추천 -->
<img src="image.png" alt="someInfo">
```

## 엔티티 참조 금지 %{ #no-entity }%

`&mdash;`, `&rdquo;`, 또는 `&#x263a;` 와 같은 엔티티를 참조하지 마십시오.

유일한 예외는 HTML에서 특별한 의미를 지니는 `<`와 `&` 입니다.
```html
<!-- ❌ 비추 -->
<p>유로화 기호는 &ldquo;&eur;&rdquo; 입니다.</p>
```

```html
<!-- ✅ 추천 -->
<p>유로화 기호는 "€" 입니다.</p>
```

## ID 사용 자제 %{ #refrain-from-using-id }%

불필요하게 `id` 속성을 사용하지 마시고,
스타일 지정에는 `class`를 스크립팅에는 `data-`속성을 사용하십시오.

`id` 속성이 반드시 필요한 경우에는 `-`(하이픈)을 사용하여,
JS 내장 식별자와 문법이 겹치지 않도록 해야 합니다.

엘리먼트에 `id` 속성이 있는 경우, 브라우저는 전역 `window` 프로토타입에 명명된 속성으로 사용할 수 있도록 하므로,
예기치 않은 동작이 발생할 수 있습니다.
`-`이 포함된 `id`속성 값은 여전히 속성 이름으로 사용할 수 있지만,
전역 JS 변수로 참조할 수 없기 때문입니다.
```html
<!-- ❌ 비추: `window.userProfile`로 <div> 노드를 참조할 수 있음 -->
<div id="userProfile"></div>
```

```html
<!-- ✅ 추천 -->
<div id="user-profile"></div>
```

## 들여쓰기 %{ #general-formatting }%

CSS는 엘리먼트의 `display`로 다른 속성을 지정할 수 있게 하지만,
이에 관계없이 모든 `block` 및 `table` 엘리먼트는 새 줄에 작성하고,
내부 엘리먼트는 들여쓰기 합니다.
```html
<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>

<ul>
  <li>Moe</li>
  <li>Larry</li>
  <li>Curly</li>
</ul>

<table>
  <thead>
    <tr>
      <th scope="col">Income</th>
      <th scope="col">Taxes</th>
  <tbody>
    <tr>
      <td>$ 5.00</td>
      <td>$ 4.50</td>
    </tr>
  </tbody>
</table>
```

## 들여쓰기 %{ #line-wrapping }%

HTML에 대한 열 제한 권장 사항은 없지만,
가독성이 크게 향상되는 경우 긴 줄은 줄 바꿈을 고려할 수 있습니다.
(4 스페이스 들여쓰기)

줄바꿈을 할 때,
각 연속 줄은 줄바꿈된 속성과 하위 엘리먼트를 구분하기 위해 원래 줄에서 4 이상의 스페이스 들여쓰기가 가능합니다.
```html
<button
    mat-icon-button
    color="primary"
    class="menu-button"
    (click)="openMenu()">
  <mat-icon>menu</mat-icon>
</button>

<button mat-icon-button
        color="primary"
        class="menu-button"
        (click)="openMenu()">
  <mat-icon>menu</mat-icon>
</button>
```

## 속성 인용 부호 %{ #quotation-marks }%

속성 값을 인용할 때에는 `'` 작은 따옴표 대신 `"` 큰 따옴표를 사용합니다.
```html
<!-- ❌ 비추 -->
<a class='maia-button maia-button-secondary'>로그인</a>
```

```html
<!-- ✅ 추천 -->
<a class="maia-button maia-button-secondary">로그인</a>
```




















