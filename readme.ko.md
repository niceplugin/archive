- [English](https://github.com/niceplugin/image-minify-client)
- [한국어](https://github.com/niceplugin/image-minify-client/blob/main/readme.ko.md)

* * *

# Image Minify Client

**Image Minify Client**는 브라우저에서 메타데이터를 제거하고 켄버스 API를 사용하여 퀄리티를 조정하여 용량을 축소합니다.

대역폭과 서버 CPU 부하를 줄이기 위해 만들었습니다. :)

## 대모 웹사이트

[imageMinify](https://imageminify.com/)

## 참고

- 입력 포멧은 `bmp`, `png`, `gif`, `jpeg`, `webp`만 가능
- 출력 포멧은 `jpeg`와 `webp`만 가능
- 이미지에 애니메이션 동작이 있는 경우 더이상 동작하지 않음

## 설치

```shell
npm install image-minify-client
```

## 빠른시작 예제 코드

```html
<img id="img" src="" alt="">
<input id="input" type="file">
```

```js
import imc from "image-minify-client"

const img = document.getElementById('img')
const input = document.getElementById('input')

input.addEventListener('change', event => {
  const file = event.target.files[0]
  
  if (!file) { return }

  imc(file).then(rslt => {
    const newFile = rslt[0]
    const oldFile = rslt[1]

    img.src = URL.createObjectURL(newFile)

    console.log(newFile, oldFile)
  })
})
```

## 사용법

### 문법

```
module(File[, options])
```

### 파라미터

#### File

필수. File 타입의 이미지 객체.

#### options
선택.
- quality : (기본값: `0.8`) `0` < 값 <= `1` 범위의 숫자.
- maxWidth : (기본값: `undefined`) `0` 보다 큰 값. 이미지의 가로가 maxWidth 보다 클 경우, 비율을 유지한 채 가로가 maxWidth로 조정됩니다.
- maxHeight : (기본값: `undefined`) `0` 보다 큰 값. 이미지의 세로가 maxHeight 보다 클 경우, 비율을 유지한 채 세로가 maxHeight로 조정됩니다.
- outputType : (기본값: `jpeg`) 문자열 `jpeg` | `webp`

### 반환 값

이 메서드는 비동기이므로 `promise`를 반환합니다. `resolve` 일 경우 아래와 같이 `File` 객체로 이루어진 배열을 반환합니다.

`[ newFile , oldFile ]`

### 예제

```js
imc(File, {
  quality: 0.75,
  maxHeight: 300,
  outputType: 'webp'
}).then(result => {
  console.log('Before minify file: ', result[1])
  console.log('After minify file: ', result[0])
})
```

### error

작업 중 에러가 발생할 경우 `{ code: number, message: string }` 과 같은 객체를 에러로 반환합니다. 같은 에러 코드라도 메시지는 다를 수 있습니다. 상세 내용은 아래와 같습니다.

| 코드  | 메시지                                           |
|-----|-----------------------------------------------|
| 400 | The first parameter cannot be empty.          |
| 400 | The first parameter is not a File type.       |
| 404 | The image could not be loaded.                |
| 409 | The process is already running.               |
| 412 | Failed to minify image.                       |
| 413 | Image is over than the size supported.        |
| 415 | The first parameter is not a Image File type. |
| 415 | "${ fileFormat }" format is not support       |
| 501 | Does not support modules.                     |