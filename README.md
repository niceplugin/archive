- [English](https://github.com/niceplugin/image-minify-client)
- [한국어](https://github.com/niceplugin/image-minify-client/blob/main/readme.ko.md)

* * *

# Image Minify Client

**Image Minify Client** scales down by removing metadata from the browser and adjusting quality using canvas APIs.

It was created to reduce bandwidth and server CPU load. :)

## Demo website

[imageMinify](https://imageminify.com/)

## Note

- Support input type only `bmp`, `png`, `gif`, `jpeg`, `webp`
- Support output type only `jpeg` and `webp`
- Loses animation if it has animation

## Install

```shell
npm install image-minify-client
```

## Quickstart example code

```html
<img id="img" src="">
<input id="input" type="file">
```

```js
import imc from "image-minify-client"

const img = document.getElementById('img')
const input = document.getElementById('input')

imc.init()

input.addEventListener('change', event => {
  const file = event.target.files[0]
  
  if (!file) { return }

  imc.minify(file).then(rslt => {
    const newFile = rslt[0]
    const oldFile = rslt[1]

    img.src = URL.createObjectURL(newFile)

    console.log(newFile, oldFile)
  })
})
```

## Methods

### init()

#### Description

Initialize the module. If the module is used without initialization, an error is returned.

#### Return

- `true` : If the module init is successful or has already been.
- `false` : If the module cannot be init.

#### Syntax

```js
import imc from "image-minify-client"
imc.init()
```

### minify(File[, options])

#### Description

Attempt to reduce the image file size.

#### Parameter

- `File` : Require. Image object of file type.
- `options` : Optional.
    - quality : (default: `0.8`) Number in the `0` < value <= `1` range.
    - maxWidth : (default: `undefined`) Greater then `0`. If the width of the image is greater than maxWidth, the width is adjusted to maxWidth while maintaining the proportions.
    - maxHeight : (default: `undefined`) Greater then `0`. If the height of the image is greater than maxHeight, the height is adjusted to maxHeight while maintaining the proportions.
    - outputType : (default: `jpeg`) String `jpeg` | `webp`

#### Return

Since this method is asynchronous, it returns a `promise`. In case of `resolve`, an array of `File` objects is returned as shown below.

`[ newFile , oldFile ]`

#### Syntax

```js
imc.minify(File, {
  quality: 0.75,
  maxHeight: 300,
  outputType: 'webp'
}).then(result => {
  console.log('Before minify file: ', result[1])
  console.log('After minify file: ', result[0])
})
```
#### error

If an error occurs during operation, an object such as `{ code: number, message: string }` is returned as an error. Even with the same error code, the message may be different. Details are as follows.

| Code | Message                                       |
|------|-----------------------------------------------|
| 400  | The first parameter cannot be empty.          |
| 400  | The first parameter is not a File type.       |
| 401  | Module initialization is required.            |
| 404  | The image could not be loaded.                |
| 409  | The process is already running.               |
| 412  | Failed to minify image.                       |
| 415  | The first parameter is not a Image File type. |
| 415  | "${ fileFormat }" format is not support       |
| 501  | Does not support modules.                     |