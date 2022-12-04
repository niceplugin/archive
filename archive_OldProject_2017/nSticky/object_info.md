# Object info in nSticky.js
## `state` (object)
* `ar`  
-Arguments received from the `NP.Sticky.set()`.
* `screenWidth`  
-Contains the `window.innerWidth` value.
* `screenHeight`  
-Contains the `window.innerHeight` value.
* `currentScrollX`  
-Contains the current `window.pageXOffset` value.
* `currentScrollY`  
-Contains the current `window.pageYOffset` value.
* `prevScrollX`  
-Contains the previous `window.pageXOffset` value.
* `prevScrollY`  
-Contains the previous `window.pageYOffset` value.
* `addEvent`  
-Whether the `eventListener` has been added.  
* `onloaded`  
-Whether the eventListener `load` has been added.  
-`false` not added, `true` added
* `resizing`  
-A variable containing `setTimeout` used to prevent overload during resizing.

## `sticky` (array)
About selectors are stored as an array of `sticky`.
Each property of `sticky` array has type of object.
* `been`  
-Whether the content initial position setting.  
-`false` not setting, `true` setting
* `runniing`  
-Whether the content is sticky.  
-`false` not sticky, `true` sticky

* `content`  
-About selector element.
  * `element`  
    -Selector element object.
  * `width` `height`  
    -Selector offset value.
  * `marginTop` `marginRight` `marginBottom` `marginLeft`  
    -Computed margin of selector.
  * `float`  
    -Computed float of selector.
  * `position`  
    -`style='top:value'` of selector.
* `wrap`  
-About wrap element for wrapping the selector.
  * `element`  
    -Wrap element object.
  * `width`  
    -Wraps width of computed as follows.  
    -Content `width` + `marginLeft` + `marginRight`.
  * `height`  
    -Wraps height of computed as follows.  
    -Content `height` + `marginTop` + `marginBottom`.
  * `float`  
    -`Float:value` inherited from content.
* `parent`  
-About parent element of the selector.
  * `element`  
    -parent element object.
  * `topSpace`  
    -Original distance from parent.top to content.top.
  * `innerHeight`  
    -`parent.clientHeight` - `paddingTop` - `paddingBottom`.
  * `paddingTop` `paddingBottom` `paddingLeft`  
    -Computed padding of parent.
