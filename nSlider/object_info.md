# Object info in nSlider.js
## `resizing` (object)
* `added`  
-Whether addEventListener resize applied.  
-`false` unapplied, `true` applied
* `run`  
-A variable containing `setTimeout` used to prevent overload during resizing.

## `slider['selectorId']` (object)
The custom slider option value is stored as object type in the `slider` object with the selector ID as the property name.
And the stored object has the following five sub objects.

* `code`
  * `animation`  
  -Animation to be applied to page transition  
  -`0` not used, `1` horizontal slide, `2` vertical slide, `3` fade
  * `background`  
  -Whether background enabled  
  -`0` disabled, `1` enabled
  * `bgAnimation`  
  -**background** animation to be applied to background of slider when enabled  
  -`0` fade, `1` same as **animation**, `2` reverse as **animation**
  * `duration`  
  -Page transition animation duration (in milliseconds)
  * `autoplay`  
  -Whether to play slide automatically  
  -`0` disabled, `1` enabled
  * `timer`  
  -Time required to transform slide (in milliseconds)  
  -**timer** value can not less than or equal to **duration** value.
  * `loop`  
  -Whether enabled repeatedly  
  -`0` disabled, `1` infinite, `2` revert
  * `pnBtn`  
  -Whether the prev / next button enabled  
  -`0` disabled, `1` enabled
  * `carBtn`  
  -Whether carousel button enabled  
  -`0` disabled, `1` enabled
  * `conBtn`  
  -Whether playback operation button enabled  
  -`0` disabled, `1` enabled
  * `resizing`  
  -Whether reactive type size enabled  
  -`0` disabled, `1` enabled
  
* `element`
  * `content` (array)  
  -About `<li>` object that wrapping the content
  * `background` (array)  
  -About `<li>` object that background
  * `carousel` (array)  
  -About `<li>` object that carousel bottun
  * `prevBtn`  
  -`<button>` object that prevBtn
  * `nextBtn`  
  -`<button>` object that nextBtn
  * `conBtn`  
  -`<button>` object that playback button
  * `sWrap`  
  -`<div>` object with a `class='sWrap'` attribute inside the slider.
  * `slider`  
  -`<div>` object that represents a slider application.
  
* `event`  
-Custom function

* `size`
  * `width` `height` `ratio`  
  -The first `width` `height` value and its `ratio` value
  
* `state`
  * `animation`  
  -`0` animation is not on progress, `1` animation is on progress.
  * `id`  
  -slider ID
  * `curWidth`  
  -Current slider content width (in px unit)
  * `curHeight`  
  -Current slider content height (in px unit)
  * `curPage`  
  -Current slider page number (page 1 is 0)
  * `maxPage`  
  -Slider last page number (page 10 is 9)
  * `l`  
  -Number of contents
  * `play`  
  -Current playback status  
  -`0` stop, `1` playing, `2` pause or page transform animation
  * `playprev`  
  -The `play` state value before changed
  * `waitingSome`  
  -Whether there is a subsequent animation once the animation finished  
  -`0` none, `1` yes
  * `waitVal` (object)  
  -Corresponding slider index value and  select page value that to be used the next animation
    * `i`  
    -corresponding slider index
    * `s`  
    -selection page

## `touched` (object)
Value related to a touch event.

* `coodinate`
  * `width`  
  -Horizontal distance from the starting point (in px unit)
  * `height`  
  -Vertical distance from the starting point (in px unit)
  * `diagonal`  
  -Diagonal distance from the starting point (in px unit)
  * `length`  
  -Distance horizontally or vertically from the starting point (in % unit)
  * `startX` `startY`  
  -X or Y coordinate of the starting point
  * `nowX` `nowY`  
  -X or Y coordinate of the current point
  * `prevX` `prevY`  
  -Previous X or Y coordinate from current.
  
* `direction`
  * `nowX` `nowY` `prevX` `prevY`  
  -Bassed on start touch point  
  -The direction of touch that the current or immediately previous of current  
  -`0` Unspecified direction, `1 or more` right, `-1 or less` left
  * `prevnext`  
  -Based on content  
  -It has the same type of value as above
  
* `state`
  * `prevE` `nextE`  
  -Whether exposed the prev or next content with Touch Dragging  
  -`false` unexposed, `true` exposed
  * `speed`  
  -Touch drag speed is moving px per 0.01second
  * `touchValid`  
  -Touch is valid to move content  
  -`0` Undefined, `1` valid, `-1` invalid
  
* `time`
  * `start`  
  -Start time of touch (in millisecond)
  * `now`  
  -Current time of touch (in millisecond)
  * `elapse`  
  -Elapsed time from start to now (in millisecond)
