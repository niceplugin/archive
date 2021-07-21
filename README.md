- [English](https://github.com/niceplugin/image-minify-client)
- [한국어](https://github.com/niceplugin/image-minify-client/blob/main/readme.ko.md)

* * *

# Image Minify Client

**Image Minify Client** is an image compression library that is easy to use in your browser.

It was created to reduce bandwidth and server CPU load. :)

It use the Canvas API. [link](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

## Advantages

- Easy to use :)
- Can request multiple image minify at once
- Resizing possible (maintain original image ratio, if original size is smaller then keep original size)

## Limitations

- Not support Internet Explorer
- Support input type only `bmp`, `png`, `gif`, `jpeg`, `webp`
- Support output type only `jpeg` and `webp`
- `image/png` type loses transparency if it has transparency
- `image/gif` type loses animation if it has animation

## Install

### CDN

```html
<script src="https://unpkg.com/image-minify-client/dist/imageMinifyClient.js"></script>
```
Use in JavaScript files after installation:
```js
imageMinifyClient( /* Object defining working */ )
```

### NPM

```shell
npm install image-minify-client
```
Use in JavaScript files after installation:
```js
import imageMinifyClient from "image-minify-client"
imageMinifyClient( /* Object defining working */ )
```

* * *

# How to use

## Quickstart example code

```html
<img id="img" src="">
<input id="input" type="file" multiple>

<script src="https://unpkg.com/image-minify-client/dist/imageMinifyClient.js"></script>
<script >
  const img = document.getElementById('img')
  const input = document.getElementById('input')

  input.addEventListener('change', event => {
    const files = event.target.files // This is FileList

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

## Run image minify

To run images minify, you just set to pass an object as a parameter.

### Syntax

```js
const data = {
  // required
  files: FileList,
  onsuccess: Function,

  // options
  onerror: Function,
  onended: Function,
  width: Number,
  height: Number,
  quality: Number,
  outputType: String
}

imageMinifyClient( data )
```

### Parameters

#### `files` (Required - FileList)

`FileList` means a list of files uploaded with `<input type="file">`.
It's not difficult!

**Quickstart example code** makes it easy to see what `FileList` is.

#### `onsuccess` (Required - Function)

This is a callback function that is called whenever one image file minified in `FileList`.
If there are total 5 images files in `FileList`, it is called 5 times.
The callback function passes an object as an argument.

```js
// onsuccess callback function
function success(result) {
  // result === { file, index }

  const file = result.file // minified image file
  const index = result.index // Index pointing to source file inside FileList

  const base64 = URL.createObjectURL(file) // If you need base64 data
}
```

#### `onerror` (Options - Function)

This is a callback function that is called whenever one image file fails to minified in `FileList`.
If the `FileList` length is 5 and one file among them is `*.txt`, the error callback is called once.
The callback function passes an object as an argument.

```js
// onerror callback function
function onerror(error) {
  // result === { index, code, message }

  // error code (error type)
  //   0: Module not supported
  //   1: Parameter is invalid
  //   2: File is invalid
  //   3: Runtime error

  const index = error.index // Index pointing to source file where error in the FileList
  const code = error.code
  const message = error.message
}
```

#### `onended` (Options - Function)

Callback function that is called after worked with all image files in `FileList`.
No arguments pass to callback function.

#### `width`, `height` (Options - Number)

The size to resize when minifying the image.
If the image size is smaller than the input value, the original size is maintained.
When resizing, the original image ratio (horizontal:vertical) is maintained.

- Default: `undefined`
- Minimum: `1`
- Maximum: Maximum horizontal and vertical values supported by each browser

> If the size or resizing value of the original image is larger than the maximum size supported by each browser, it is automatically resized to the maximum size supported by the browser.

#### `quality` (Options - Number)

Set the image quality.

- Default: `0.8`
- Range: `0 < n <= 1`

#### `outputType` (Options - String)

Set the format of the minified result image.

- Default: `jpeg`
- Support format: `jpeg`, `webp`

## Stop image minify

When the module is in minifying images, it can be stopped.

### Syntax

```js
const text = 'stop'
const onstop = function() {
  // Callback function called when module is successfully stopped
  // Called immediately if the module is not running
  // No arguments passed
}

imageMinifyClient( text, onstop )
```