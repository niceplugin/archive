# nSlider.js

Click [here](https://niceplugin.github.io/OldProject_2017/nSlider) to view demo page.

It is a plug-in created to make slide contents easily and quickly.

nSlider.js has the following advantages.
* Works without jQuery
* Touch support (responsive to touch dragging speed)
* AJAX implementable
* Reactor size control to maintain ratio
* Mark-up structure with enhanced web accessibility
* *Screen reader* compatible (tested with *Chrome Vox* and *NVDA*)
* Supports IE8 +, Chorme, FireFox, Opera, Safari, iOS, Android

***

## Install
Declare the plugin in the `<head>` tag.
```html    
<head>
    <script src='/nSlider.js'></script>
</head>
```
Mark-up slide contents as follows.
```html    
<body>
    <ul id='myId1'>
        <li> Content </li>
        <li> Content </li>
               ...
        <li> Content </li>
    </ul>
</body>
```

***

## API
nSlider.js provides three APIs.

### `NP.Slider.set()`
`NP.Slider.set()` can set multiple sliders by setting several parameters at once.
```html
<script>
    NP.Slider.set(
        {
            id: 'myId1',
            width: 640,
            height: 480,
            ratio: '4:3',
            event: myFunc1,
            code: {
                animation: 1,
                bgAnimation: 1,
                duration: 200,
                autoplay: 1,
                term: 4000,
                loop: 1,
                pnBtn: 1,
                carBtn: 1,
                conBtn: 1,
                background: 1,
                resizing: 1
            }
        },
        {
            The second parameter of the slider to set
        }
    );
</script>
```
* **id** (required)
* **width**, **height** or **ratio** (required)  
-Enter **width**, **height** in px units  
-`width:100%`, and if you want to specify the ratio of `height:`, enter **ratio** in `x:y` format  
-When you enter both, **width**, **height** are applied.
* **event** (optional)  
-Custom function  
-Run every time slide is activated  
-Return first argument as slide id  
-Return second argument as page number of current slide content (page 1 is 0)  
-Return third argument as page number of slide content to be transformation (page 10 is 9)
* **code** (optional)
-Specify detailed options for the slider
  * **animation** (default 1)  
  -Animation to be applied to page transition  
  -`0` not used, `1` horizontal slide, `2` vertical slide, `3` fade
  * **bgAnimation** (default 1)  
  -**background** animation to be applied to background of slider when enabled
  -`0` fade, `1` same as **animation**, `2` reverse as **animation**
  * **duration** (default 200, minimum 100)  
  -Page transition animation duration (in milliseconds)
  * **autoplay** (default 1)  
  -Whether to play slide automatically  
  -`0` disabled, `1` enabled
  * **term** (default 4000)  
  -Time required to transform slide (in milliseconds)  
  -**term** value can not less than or equal to **duration** value.
  * **loop** (default 1)  
  -Whether enabled repeatedly  
  -`0` disabled, `1` infinite, `2` revert  
  -`notBtn` class name is added to prev / next button only first or last page when `loop:0`.
  * **pnBtn** (default 1)  
  -Whether the prev / next button enabled  
  -`0` disabled, `1` enabled
  * **carBtn** (default 1)  
  -Whether carousel button enabled  
  -`0` disabled, `1` enabled
  * **conBtn** (default 1)  
  -Whether playback operation button enabled  
  -`0` disabled, `1` enabled
  * **background** (default 0)  
  -Whether background enabled  
  -`0` disabled, `1` enabled
  * **resizing** (default 1)  
  -Whether reactive type size enabled  
  -`0` disabled, `1` enabled

### `NP.Slider.get()`
`NP.Slider.get()` calls information on the slider. (Read only)
```html
<script>
    NP.Slider.get('myId1', 'foo', index);
</script>
```
`foo` is as follows.
* **curPage**  
-Return current page number of slider (page 1 is 0)
* **maxPage**  
-Return end page number of slider (page 10 is 9)
* **length**  
-Return number of contents
* **playState**  
-Return the playback status  
-`0` stop, `1` playing, `2` pause or page transform animation
* **ctrlBtn**  
-Return the play button element object
* **prevBtn**  
-Return the previous button element object
* **nextBtn**  
-Return the next button element object
* **content**  
-Return the `<li>` object that containing the content (Required enter the index)
* **background**  
-Return the background `<li>` object (Required enter the index)
* **carousel**  
-Return the carousel button `<li>` object (Required enter the index)

### `NP.Slider.ctrl()`
`NP.Slider.ctrl()` is method that can directly control the slider.
```html
<script>
    NP.Slider.ctrl('myId1', 'foo', index);
</script>
```
`foo` is as follows.
* **playToggle**  
-Play or pause the slider regardless of whether the control button enabled or not
* **goTo**  
-Transform to the specified page (Required enter the index, index value is 1 when moving to page 2)

### CSS notes
All sliders created through nSlider.js will have the following CSS defaults, and will be added with `<style id='nSliderDefaultCSS'>` in the `<head>` tag.
```html
<style id='nSliderDefaultCSS'>
    .nSlider {position: relative; width: 100%}
    .nSlider .sWrap {position: relative; margin: auto; width: 100%; z-index: 1}
    .nSlider .prevBtn {position: absolute} .nSlider .nextBtn {position: absolute}
    .nSlider .carousel {position: absolute} .nSlider .conBtn {position: absolute; z-index: 1}
    .nSlider .sBg {position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden}
    .nSlider .sBg li {position: absolute; width: 100%; height: 100%}
    
    .nSlider .myId1 {position: relative; width: 100%; height: 100%; overflow: hidden}
    .nSlider .myId1>li {position: absolute; width: 100%; height: 100%}
</style>
```

***

## Web accessibility
### How does it work?
In some cases, slider content can cause confusion or inconvenience to users who rely only on screen readers or keyboards.
To prevent this problem, nSlider.js works in the following way.

**Customising Mark-up**
```html
<ul id='myId1'>
    <li> Content </li>
    <li> Content </li>
           ...
    <li> Content </li>
</ul>
```
**Mark-up dynamically changed by plug-in**
```html
<div id='myId1' class='nslider'>
    <div class='sWrap'>
    
        <!-- Create only if enabled -->
        <button class='conBtn' aria-pressed='true||false' title='slider play button'></button>
        
        <!-- Id attribute is changed to class attribute, the value is the same -->
        <ul class='myId1'>
            <li> Content </li>
            <li> Content </li>
                   ...
            <li> Content </li>
        </ul>
        
        <!-- Create only if enabled -->
        <button class='prevBtn' aria-hidden='true' tabindex='-1'></button>
        <button class='nextBtn' aria-hidden='true' tabindex='-1'></button>
        
        <!-- Create only if enabled -->
        <ul class='carousel' aria-hidden='true'>
            <li></li> <!-- Create as many as content list length. -->
        </ul>
    </div>
    
    <!-- Create only if enabled -->
    <ul class='sBg'>
        <li></li> <!-- Create as many as content list length. -->
    </ul>
</div>
```
* **Playback button**  
-Set `aria-pressed` `title` property to allow screen readers to read the purpose and status of this button.  
-`aria-pressed` attribute has an issue that causes it to malfunction in *NVDA*. As such, developers need to ensure compatibility with their country's screen readers when using nSlider.js to provide slide content services. In some cases, may need to customize this script.  
-See about `aria-pressed`. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-pressed)  
-See about alternate text. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#textalternativecomputation_header)
* **Content**  
-Contents will transform to the accessed content page when accessing the content with the tab.  
-If there is no element to take focus inside the content, the `<li>` tag that surrounds the content will has `tabindex='0'` property.
* **Prev / next button**  
-Due to basic functions of **content** described above, **previous / next button** is not need control by keyboard, so it has `tabindex='-1'` property.  
-To prevent confusion of screen reader users, that has `aria-hidden='true'` property.
* **Carousel button**  
-As with the **prev / next button**, this is not need to control by keyboard, so it created with the tag `<ul>` `<li>`.  
-To prevent confusion of screen reader users, that has `aria-hidden='true'` property.

### Mark-up notes
If you want to display 3 on a slide at a time 9 contents in total, you will mark-up as follows.
```html
<ul id='myId1'>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
    <li>
        <ul>
            <li> Content </li>
            <li> Content </li>
            <li> Content </li>
        </ul>
    </li>
</ul>
```
These mark-up has not visual problem, but screen reader will output unintended document structure as follows.
> \>List containing 3 list items
> * list1  
> \>List containing 3 list items
>   * list1
>   * list2
>   * list3
> * list2  
> \>List containing 3 list items
>   * list1
>   * list2
>   * list3
> * list3  
> \>List containing 3 list items
>   * list1
>   * list2
>   * list3

To solve this problem, you need to add the attribute `role='presentation'` `role='listitem'` to your tag as follows.
```html
<ul id='myId1'>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
    <li role='presentation'>
        <ul role='presentation'>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
            <li role='listitem'> Content </li>
        </ul>
    </li>
</ul>
```
The screen reader will then output the document structure as follows.
> \>List containing 9 list items
> * list1
> * list2
> * list3
> * list4
> * list5
> * list6
> * list7
> * list8
> * list9

See about `role='presentation'`. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#presentation)
See about `role='listitem'`. [link](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#listitem)

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nSlider.js on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.1**
* Create nSlider.js
