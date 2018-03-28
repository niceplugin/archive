# nShowUp.js

Click [here](https://niceplugin.github.io/nShowUp) to view demo page.

nShowUp.js plug-in is created for easy and convenient control of custom effects when elements are exposed on the screen by scrolling.

nShowUp.js has the following advantages.
* Works without jQuery
* Easy to use other css animation framework
* Set the run condition to the exposure level
* Set whether to execute repeatedly
* Can declare custom functions
* Parallax possible using realTime mode.
* Supports IE8 +, Chorme, FireFox, Opera, Safari, iOS, Android

***

## Install
Declare the plugin in the `<head>` tag.
```html    
<head>
    <script src='/nShowUp.js'></script>
</head>
```
***

## API
nShowUp.js provides one API.

### `NP.ShowUp.set()`
You can set the selectors for different options by adding multiple parameters at once.
```html
<script>
    NP.ShowUp.set(
        {
            content: 'selector',
            run: 'once',
            expos: 'part',
            add: 'myClassName',
            event: customFunctionName,
            realTime: false
        },
        {
            You can add other options to other selector by adding parameters.
        }
    );
</script>
```
* **content** (required)  
-Enter the `tagName` or `#id` or `.class`
* **run** (optional, default 'once')  
-Whether to repeat run  
-`once` Run only once, `always` Always run
* **expos** (optional, default 'part')  
-Set whether to run according to the level of exposure  
-`part` Run if part of exposed, `whole` Run if whole of exposed
* **add** (optional, default 'showup')  
-Class name to be appended to the element when it is run
* **event** (optional)  
-Custom function declaration  
-Return the corresponding element object as the first argument  
-Returns the value of the corresponding `element.getBoundingClientRect()` object as the second argument only if **realTime** is enabled  
-Return the value of `window.inner` `Width and Height` object as the third argument in `width` and `height` property named only if **realTime** is enabled
* **realTime** (optional, default false)  
-It set only when `run:'always'` and custom function is declared  
-`false` disabled, `true` Run custom function in realTime when scrolling when element is exposed

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nShowUp.js on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.1**
* Create nShowUp.js
