# nSticky.js

Click [here](https://niceplugin.github.io/OldProject_2017/nSticky) to view demo page.

It is a plug-in created to auto fixed the selector (like menu-bar) easily and conveniently when the page is scrolled.

nSticky.js has the following advantages.
* Works without jQuery
* Hold relative position
* Unbreakable layout
* Supports IE8+, Chorme, FireFox, Opera, Android (Safari, iOS could not to verify)

***

## Install
Declare the plugin in the `<head>` tag.
```html    
<head>
    <script src='/nSticky.js'></script>
</head>
```

***

## API
nSticky.js provides three APIs.

### `NP.Sticky.set()`
`NP.Sticky.set()` can sticky several selectors by setting several parameters at once.
```html
<script>
    NP.Sticky.set('#selector1', '.selector2', ...);
</script>
```

### `NP.Sticky.enabled()` `NP.Sticky.disabled()`
The sticky may require enabled / disabled operation depending on the display resolution.
The enabled / disabled operation can be used as follows.
```html
<script>
    <!-- If nSticky.js plug-in is disabled, enabled it. -->
    NP.Sticky.enabled();
    
    <!-- If nSticky.js plug-in is enabled, disabled it. -->
    NP.Sticky.disabled();
</script>
```

***

## Notice
The `margin` `padding` `width` `height` value must be `px` unit for normal works in IE8.


The nSticky.js is designed contemplate desktop user UX.
Of course, it works well on mobile.
But issues arise with *Mobile Chrome Browser* for the following reasons.
* nSticky.js auto set the `style='top:value'` according to user scrolling.
* *Mobile Chrome Browser* has built-in functions similar to those above.  
(***Dev.niceplugin*** think that *Mobile Chrome Browser*s basic function of contemplate user UX)
* Therefore, the sticky selector will be in an unintended position.

***Dev.niceplugin*** does not recommend using nSticky.js on mobile, so we neglected to address this issue intentionally.
Therefore, to resolve this issue, you need to manually detect the *Mobile Chrome Browser* using `navigator.userAgent` and disable the plug-in.
See about `navigator.userAgent`. [link](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent)

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nStickyjs on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.2**
* Changed to work after `onload`.
* Fixed an issue that did not work intermittently on scrolling up.
* Fixed an issue where the initial position was not set when the page was refreshed.


**Version 1.17.1**
* Create nSticky.js
