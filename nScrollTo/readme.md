# nScrollTo.js

Click [here](https://niceplugin.github.io/nScrollTo) to view demo page.

It is a plug-in that expands the functionality of `<a href='#id'>` easily and conveniently.

nScrollTo.js has the following advantages.
* Works without jQuery
* Supports both horizontal and vertical scrolling
* Smooth scrolling animation and time setting
* Enable / disable user scrolling control when scrolling
* Custom function run possible when reached at `#id`
* Supports IE8 +, Chorme, FireFox, Opera, Safari, iOS, Android

***

## Install
Declare the plugin in the `<head>` tag.
```html    
<head>
    <script src='/nScrollTo.js'></script>
</head>
```

***

## API
nScrollTo.js provides one API.

### `NP.ScrollTo.set()`
```html
<script>
    NP.ScrollTo.set(
        {
            content: 'selector',
            duration: 400,
            intervalX: [0, 'px'],
            intervalY: [0, '%'],
            hold: true,
            event: customFunctionName
        },
        {
            The second parameter of the selector
        }
    );
</script>
```
* **content** (required)  
-Enter the `#id` or `.class`.  
-When you enter tagName `a`, only elements like `<a href='#id'>` in the document are applied.
* **duration** (optional, default 400)  
-Enter the time taken to move from content to target in millisecond unit.
* **intervalX** (optional, default [0 'px'])  
-Enter X interval between the screen and the target on arrival.  
-Support only `px` or `%` unit.
* **intervalY** (optional, default [0 'px'])  
-Enter Y interval between the screen and the target on arrival.  
-Support only `px` or `%` unit.
* **hold** (optional, default false)  
-`false` When moving to the target, user can cancel the scrolling operation.  
-`true` When moving to the target, user can not cancel the scrolling operation.
* **event** (optional)  
-Enter the custom function to be executed when the move to target is completed.  
-The target element is passed as the first argument to the custom function.

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nScrollTo.js on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.1**
* Create nScrollTo.js
