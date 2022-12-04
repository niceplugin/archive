# Object info in nScrollTo.js
## `state`
* `running`  
-Whether nScrollTo plug-in is running.  
-`false` not running, `true` running
* pressAny  
-Whether the user try to scroll control during plug-in running.  
-`false` not yet, `true` trying on
* `moving`  
-`RunScrollTo()` is moving the scroll bar.  
-`false` false, `true` true
* `holding`  
-Whether to lock scrolling while running.  
-`false` unlock, `true` lock
* `screenWidth`  
-Current window.innerWidth.
* `screenHeight`  
-Current window.innerHeight.
* `scrollX`  
-The first X position of the scroll in px unit.
* `scrollY`  
-The first Y position of the scroll in px unit.
* `currentX`  
-The current scroll X position to moved by `runScrollTo()` in px unit.
* `currentY`  
-The current scroll Y position to moved by `runScrollTo()` in px unit.
* `moveX`  
-The X position where the scroll should be moved in px unit.
* `moveY`  
-The Y position where the scroll should be moved in px unit.

## `scrollingto` (Array)
The `content: 'selector'` value entered by the user through the API is stored in the `scrollingto` array.
Each array has object value.
* `content`  
-Element to trigger the `runScrollTo()`.
* `target`  
-Element that `content` is pointing to.
* `duration`  
-Time taken to move from content to target.
* `intervalX`  
-X interval between the screen and the target on arrival.
* `intervalY`  
-Y interval between the screen and the target on arrival.
* `hold`  
-Enabled to lock scrolling while running.  
-`false` disabled, `true` enabled
* `targetX`  
-Actual X position for the target on arrival.
* `targetY`  
-Actual Y position for the target on arrival.
* `event`  
-A custom function to trigger on arrival at the target.
