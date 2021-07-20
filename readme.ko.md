- [English](https://github.com/niceplugin/image-minify-client)
- [한국어](https://github.com/niceplugin/image-minify-client/blob/master/readme.ko.md)

* * *

# Image Minify Client

**Image Minify Client**는 브라우저에서 쉽게 사용할 수 있는 이미지 압축 라이브러리 입니다.

대역폭과 서버 CPU 부하를 줄이기 위해 만들었습니다. :)

켄버스 API를 사용합니다. [링크](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

## 장점

- 사용이 쉬움 :)
- 한번에 여러 이미지 작업을 요청할 수 있음
- 리사이징 가능 (원본 이미지 비율 유지, 원본 사이즈가 더 작을경우 원본 사이즈 유지)

## 제한사항

- Internet Explorer 미지원
- 입력 포멧은 `bmp`, `png`, `gif`, `jpeg`, `webp`만 가능
- 출력 포멧은 `jpeg`와 `webp`만 가능
- `image/png` 이미지에 투명도가 있는 경우 투명도를 잃음
- `image/gif` 이미지에 애니메이션 동작이 있는 경우 더이상 동작하지 않음

## 설치

### CDN

```html
<script src="https://unpkg.com/nicedb/dist/imageMinifyClient.js"></script>
```
설치 이후 자바스크립트 파일에서 사용:
```js
imageMinifyClient( /* 작업을 정의하는 객체 */ )
```

### NPM

```shell
npm install nicedb
```
설치 이후 자바스크립트 파일에서 사용:
```js
import imageMinifyClient from "image-minify-client"
imageMinifyClient( /* 작업을 정의하는 객체 */ )
```

* * *

# 사용법

## 빠른 예제 코드

```html
<img id="img" src="">
<input id="input" type="file" multiple>

<script src="https://unpkg.com/nicedb/dist/imageMinifyClient.js"></script>
<script >
  const img = document.getElementById('img')
  const input = document.getElementById('input')

  input.addEventListener('change', event => {
    const files = event.target.files // <- 이것이 바로 FileList

    imageMinifyClient({
      files,
      onsuccess: result => {
        const imageFile = result.file
        const base64 = URL.createObjectURL(imageFile)
        
        img.src = base64
      }
    })
  })
</script>
```

##이미지 축소 실행

이미지 축소 작업을 실행하기 위해서는 하나의 객체를 파라미터로 전달하면 됩니다.

### 문법

```js
const data = {
  // 필수
  files: FileList,
  onsuccess: Function,

  // 선택
  onerror: Function,
  onended: Function,
  width: Number,
  height: Number,
  quality: Number,
  outputType: String
}

imageMinifyClient( data )
```

### 파라미터

#### `files` (필수- FileList)

`FileList`는 `<input type="file">`로 업로드 한 파일리스트를 의미합니다.
어렵지 않아요!

**빠른 예제 코드**를 보면 `FileList`가 무엇인지 쉽게 알 수 있습니다.

#### `onsuccess` (필수- Function)

`FileList` 안의 이미지 파일 하나가 축소작업 완료 될 때마다 호출되는 콜백함수 입니다.
`FileList` 안에 총 5개의 이미지 파일이 있다면, 5번 호출 됩니다.
콜백함수는 객체 하나를 인자로 전달합니다.

```js
// onsuccess 의 콜백함수
function success(result) {
  // result === { file, index }

  const file = result.file // <- 압축된 이미지 파일
  const index = result.index // <- FileList 안에 원본 파일을 가리키는 인덱스

  const base64 = URL.createObjectURL(file) // base64 데이터가 필요할 경우
}
```

#### `onerror` (선택- Function)

`FileList` 안의 이미지 파일 하나가 축소작업 실패 될 때마다 호출되는 콜백함수 입니다.
`FileList` 길이가 5이고, 이 중에 파일 하나가 `*.txt`라면 애러 콜백이 1회 호출 됩니다.
콜백함수는 객체 하나를 인자로 전달합니다.

```js
// onerror 의 콜백함수
function onerror(error) {
  // result === { index, code, message }

  // error code
  //   0: 모듈 미지원
  //   1: 파라미터가 유효하지 않음
  //   2: 파일이 유효하지 않음
  //   3: 실행 오류

  const index = error.index // <- FileList 안에 애러가 발생한 원본 파일을 가리키는 인덱스
  const code = error.code // <- 애러 코드 (애러 타입)
  const message = error.message // <- 애러 상세 내용
}
```

#### `onended` (선택- Function)

`FileList` 안의 모든 이미지 파일들을 작업 시도 후 호출되는 콜백함수 입니다.
`FileList` 길이가 5일 경우, `onsuccess`와 `onerror`를 총 5회 호출한 이후에 `onended`를 호출합니다.
콜백함수로 전달되는 인자는 없습니다.

#### `width`, `height` (선택- Number)

이미지를 압축할 때 리사이징 할 넓이 입니다.
입력값보다 이미지 넓이가 작을 경우 원본 사이즈가 유지됩니다.
리사이징 될 경우 원본 이미지의 비율(가로:세로)을 유지합니다.

- 기본값: `undefined`
- 최소값: `1`
- 최대값: 각 브라우저가 지원가능한 최대 가로 및 세로 값

> 원본 이미지의 넓이 또는 리사이징 넓이가 각 브라우저가 지원가능한 최대 넓이보다 클 경우, 브라우저가 지원 가능한 최대 넓이로 자동 리사이징 됩니다.

#### `quality` (선택- Number)

이미지 품질을 설정합니다.

- 기본값: `0.8`
- 범위: `0 < n <= 1`

#### `outputType` (선택- String)

압축 결과물 이미지의 포멧을 설정합니다.

- 기본값: `jpeg`
- 지원 포멧: `jpeg`, `webp`

## 이미지 축소 중지

모듈이 여러장의 이미지들을 축소하는 작업을 진행중일 때, 작업을 중지해야 할 경우가 있습니다.

### 문법

```js
const text = 'stop'
const onstop = function() {
  // 성공적으로 모듈 작업이 정지되면 호출되는 콜백함수
  // 모듈이 실행중이지 않으면 즉시 호출됨
  // 전달되는 인자 없음
}

imageMinifyClient( text, onstop )
```