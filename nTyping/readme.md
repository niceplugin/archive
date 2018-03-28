# nTyping.js

Click [here](https://niceplugin.github.io/nTyping) to view demo page.

It is a plug-in created to give impressive typing effects.

nTyping.js has the following advantages.
* Works without jQuery
* Mark-Up considering Web Accessibility
* *Screen reader* compatible (tested with *Chrome Vox* and *NVDA*)
* Can be Add / Remove tags perfectly 
* Easy typing text command
* Supports IE8 +, Chorme, FireFox, Opera, Safari, iOS, Android

***

## Install
Declare the plugin in the `<head>` tag.
```html    
<head>
    <script src='/nTyping.js'></script>
</head>
```

***

## API
nTyping.js provides two APIs.

### `NP.Typing.set()`
```html
<script>
    NP.Typing.set({
        id: 'myId',
        content: 'my text',
        typeSpeed: 125,
        backSpeed: 75,
        cursor: true,
        cursorChar: '|',
        cursorSpeed: 750,
        event: myFunc,
        alt: true,
        altText: 'my alternative text'
    });
</script>
```
* **id** (required)
* **content** (required)  
-About text to type.
* **typeSpeed** (optional, default 125)  
-Type typing speed in milliseconds.
* **backSpeed** (optional, default 75)  
-Backspace speed in milliseconds.
* **cursor** (optional)  
-Whether the cursor is enabled.
* **cursorChar** (optional, default '|')  
-Character that will be specified by the cursor.
* **cursorSpeed** (optional, default 750)  
-Enter the speed at which the cursor blinks in milliseconds.
* **event** (optional)  
-Custom function.  
-Returns the selector object as the first argument.
* **alt** (optional)  
-Whether to enabled **altText**.
* **altText** (optional, default Selector text when plug-in has not been enabled.)  
-Alternative text to be read by *screen readers* when `alt:true` is enabled.

### Typing text command
* **//**  
-Input the '/' text. Ignored if only **/** is entered.
* **/b$/**  
-Run backspace. $ is the number of times to run.
* **/c/**  
-Disabled cursor
* **/d$/**  
-Immediate delete the text. $ is the number of characters to delete.
* **/e/**  
-Run custom function.
* **/l/**  
-Replay the typing.
* **/s$/**  
-Typing pause. $ is the number of milliseconds to pause.
* **<**  
-Declares tag start. If valid, tag termination is automatically recognized.
* **<<**  
-Input the '<' text.

***

## Web accessibility
### How does it work?
Adding real-time characters as typing effects can cause confusion for users who rely only on screen reader.
To prevent this confusion, nTyping.js works in the following way.

**Custom Mark-up**
```html
<span id='myId1'>Hello World.</span>
```
**Mark-up that changes dynamically by plug-in**
```html
<span class='myId1 typingAriaLabel' title='Hello World.'></span><span id='myId1' aria-hidden='true'>Hello World.</span>
```
1. Apply the `aria-hidden='true'` attribute to the typing selector to prevent the screen reader from reading it.
-See about property `aria-hidden`. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-hidden)
2. If `alt:true`, provide a replacement text by adding a new `<span>` tag before the selector and specifying `title='value'` as the attribute value.

### So, how do Mark-up?
Developers should refer to the following when using nTyping.js.
**Bad Mark-up**
```html
<h1 id='myId1'>Hello World.</h1>
<p id='myId2'>I love coding.</p>
```
**Good Mark-up**
```html
<h1><span id='myId1'>Hello World.</span></h1>
<p><span id='myId2'>I love coding.</span></p>
```

### Screen reader notes
```html
<h1><span class='myId1 typingAriaLabel' title='Hello World.'></span><span id='myId1'>Hello World.</span></h1>
```
**Chrome Vox** and **NVDA** outputs the mark-up changed as below by plug-in.

|ScreenReader|Output|
|:----------:|:----:|
|**Chrome Vox**|Hello World.|
|**NVDA**|Hello World.|


But, using the `<p>` tag will produce unintended results.
```html
<p><span class='myId2 typingAriaLabel' title='I love coding.'></span><span id='myId2'>I love coding.</span></p>
```
**Chrome Vox** output the intended result, but **NVDA** does not recognize the tag itself.

|ScreenReader|Output|
|:----------:|:----:|
|**Chrome Vox**|I love coding.|
|**NVDA**|-|

To solve this problem, you have to specify `alt:false` when setting properties and specify the alternative text manually.
Note: This mark-up expose textual information that is not visually visible in `mouse drag` `ctrl+c` `ctrl+v`.
```html
<p><span style='font-size:0px'>I love coding.</span><span id='myId2'>I love coding.</span></p>
```
See about alternate text. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#textalternativecomputation_header)

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nTypingjs on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.1**
* Create nTyping.js
