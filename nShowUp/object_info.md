# Object info in nShowUp.js
## `showup`
nShowUp.js uses one object named `showup`.
`showup` consists of two arrays one named `once` and one named` always` and one object named` state`.
### `state` (object)
* `event`  
-Whether onscroll event listener has been added.  
-`false` has not been, `true` has been
* `screenWidth`  
-Return current `window.innerWidth` value.
* `screenHeight`  
-Return current `window.innerHeight` value.
### `once` and `always` (array)
The selector elements are classify according to `run:once or always` and stored in the corresponding array.
* `content`  
-selector element object.
* `expos`  
-Whether to run according to the level of exposure.  
-`part` Run if part of exposed, `whole` Run if whole of exposed
* `add`  
-Class name to be appended to the element when it is run.
* `event`  
-Custom function.  
-Return the corresponding element object as the first .argument  
-Returns the value of the corresponding `element.getBoundingClientRect()` object as the second argument only if **realTime** is enabled.  
-Return the value of `window.inner` `Width and Height` object as the third argument in `width` `height` property named only if **realTime** is enabled.
* `minX`, `minY`, `maxX`, `maxY`  
-About `content` `.getBoundingClientRect()` value.
* `showing`  
-Only valid on `always` array.  
-Current state of showing up.  
-`false` not showing up, `true` showing up
* `realTime`  
-Whether real time mode enabled.  
-`false` disabled, `true` enabled
