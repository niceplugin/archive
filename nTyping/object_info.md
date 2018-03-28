# Object info in nTyping.js
## `typed['selectorId']` (object)
The custom typing option value is stored as object type in the `typed` object with the selector ID as the property name.
And the stored object has the following four sub objects.
* `duration`
  * `typed`  
  -Typed speed in millisecond unit.
  * `back`  
  -BackSpeed speed in millisecond unit.
  * `cursor`  
  -Cursor blink speed in millisecond unit.
  * `code`  
  -Staying time or number of times to run.
* `selector`
  * `content`  
  -Selector element object.
  * `cursor`  
  -Cursor element object.
  * `tag`  
  -Readed tag element object.
  * `event`  
  -Custom function.
*  `state`
  * `cursor`  
  -Whether the cursor is enabled.
  * `l`  
  -Length of `text.content`.
  * `i`  
  -Progress of how much `text.content` was inputted.
  * `typed`  
  -Number of typed characters.
  * `reading`  
  -Whether reading code or tags.
  * `readed`  
  -Readed code or tag value.
  * `tagLegnth`  
  -Number of readed tags.
  * `loop`  
  -Whether to loop is enabled.
  * `intervalAni`  
  -It has `setInterval(cursorAnimation)` for IE9-
  * `alt`  
  -Whether `alt='true'`.
* `text`
  * `content`  
  -About text to type.
  * `cursor`  
  -Character that will be specified by the cursor.
  * `altText`  
  -Alternative text to be read by *screen readers* when `aria-hidden=true` is enabled.
