/*
 * nSticky.js (http://niceplugin.com)
 * Version: 1.1702
 * Author: niceplugin@gmail.com
 * Author URL: http://niceplugin.com

 * Made available under a MIT License:
 * http://www.opensource.org/licenses/mit-license.php

 * Copyright 2017.All Rights reserved by niceplugin@gmail.com
 */

// NP global object check
if (!window.NP) {
    var NP = {};
}

//NP.set ShowUp object check
if (!NP.Sticky) {
    NP.Sticky = (function() {
        var state = {addEvent: false},
            sticky = [];
        
        //set user sticky value
        var setSticky = function() {
            var i1, i2, ar = arguments, aL = arguments.length, it, itC, itW, itP, x, xL, xE, cStyle;
            
            //Get browser screen width and height when IE9+
            if (typeof window.innerWidth === 'number') {
                state.screenWidth = window.innerWidth;
                state.screenHeight = window.innerHeight;
            }
            
            //Get browser screen width and height when IE8
            else if (typeof document.documentElement.clientWidth === 'number') {
                state.screenWidth = document.documentElement.clientWidth;
                state.screenHeight =document.documentElement.clientHeight;
            }
            
            //Repeat as many times as the number of arguments.
            for (i1 = 0; i1 < aL; i1++) {
                x = document.querySelectorAll(ar[i1]), xL = x.length;
                
                //If a selector exists.
                if (xL !== 0) {
                    
                    //Repeat as many times as the number of selector.
                    for (i2 = 0; i2 < xL; i2++) {
                        
                        //Default setting.
                        it = sticky[sticky.length] = {};
                        xE = x[i2];
                        itC = it.content = {};
                        itW = it.wrap = {};
                        itP = it.parent = {};
                        it.been = false;
                        it.running = false;
                        
                        //Get content computedStyle value IE9+
                        if (typeof window.getComputedStyle === 'function') {
                            cStyle = window.getComputedStyle(xE);
                        }
                        
                        //Get content computedStyle value IE8
                        else if (typeof document.documentElement.currentStyle === 'object') {
                            cStyle = xE.currentStyle;
                        }
                        
                        //Record content value=====
                        itC.element = xE;
                        itC.width = xE.offsetWidth;
                        itC.height = xE.offsetHeight;
                        itC.position = 0;
                        
                        if (typeof window.addEventListener === 'function') {
                            itC.element.addEventListener('focus', function(event) {focusInSticky(event);}, true);
                        }
                        else if (typeof window.attachEvent === 'object') {
                            itC.element.attachEvent('onfocusin', function(event) {focusInSticky(event);});
                        }
                        
                        if (cStyle.marginLeft === '0px' || cStyle.marginLeft === 'auto') {
                            itC.marginLeft = 0;
                        }
                        else {
                            itC.marginLeft = cStyle.marginLeft.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.marginTop === '0px' || cStyle.marginTop === 'auto') {
                            itC.marginTop = 0;
                        }
                        else {
                            itC.marginTop = cStyle.marginTop.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.marginRight === '0px' || cStyle.marginRight === 'auto') {
                            itC.marginRight = 0;
                        }
                        else {
                            itC.marginRight = cStyle.marginRight.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.marginBottom === '0px' || cStyle.marginBottom === 'auto') {
                            itC.marginBottom = 0;
                        }
                        else {
                            itC.marginBottom = cStyle.marginBottom.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.cssFloat) {
                            if (cStyle.cssFloat !== 'none') {
                                itC.float = cStyle.cssFloat;
                            }
                        }
                        else if (cStyle.float) {
                            if (cStyle.float !== 'none') {
                                itC.float = cStyle.float;
                            }
                        }
                        
                        if (cStyle.clear !== 'none') {
                            itC.clear = cStyle.clear;
                        }
                        
                        //record parent value=====
                        if (typeof window.getComputedStyle === 'function') {
                            cStyle = window.getComputedStyle(xE.parentElement);
                        }
                        else if (typeof document.documentElement.currentStyle === 'object') {
                            cStyle = xE.parentElement.currentStyle;
                        }
                        
                        if (cStyle.paddingLeft === '0px' || cStyle.paddingLeft === 'auto') {
                            itP.paddingLeft = 0;
                        }
                        else {
                            itP.paddingLeft = cStyle.paddingLeft.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.paddingTop === '0px' || cStyle.paddingTop === 'auto') {
                            itP.paddingTop = 0;
                        }
                        else {
                            itP.paddingTop = cStyle.paddingTop.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        if (cStyle.paddingBottom === '0px' || cStyle.paddingBottom === 'auto') {
                            itP.paddingBottom = 0;
                        }
                        else {
                            console.log(cStyle.paddingBottom)
                            itP.paddingBottom = cStyle.paddingBottom.replace(/[^\-*\d+]+/, '') * 1;
                        }
                        
                        itP.element = xE.parentElement;
                        itP.innerHeight = itP.element.clientHeight - itP.paddingTop - itP.paddingBottom;
                        itP.topSpace = itC.element.getBoundingClientRect().top - itP.element.getBoundingClientRect().top - itP.paddingTop - itC.marginTop;
                        
                        //record wrap value=====
                        itW.width = itC.width + itC.marginLeft + itC.marginRight;
                        itW.height = itC.height + itC.marginTop + itC.marginBottom;
                        
                        if (itC.float) {
                            itW.float = itC.float;
                        }
                        
                        if (itC.clear) {
                            itW.clear = itC.clear;
                        }
                        
                        itW.element = document.createElement('div');
                        itW.element.setAttribute('class', 'nSticky');
                        itW.element.style.width = itC.width + itC.marginLeft + itC.marginRight + 'px';
                        itW.element.style.height = itW.height + 'px';
                        if (itC.float) {
                            itW.element.style.float = itC.float;
                        }
                        if (itC.clear) {
                            itW.element.style.clear = itC.clear;
                        }
                        itP.element.insertBefore(itW.element, itC.element);
                        itW.element.appendChild(itC.element);
                    }
                }
            }
            
            //If the eventListener has never been added
            if (xL !== 0 && state.addEvent === false) {
                
                //for IE9+
                if (typeof window.addEventListener === 'function') {
                    window.addEventListener('scroll', readySticky);
                    window.addEventListener('resize', resizeSticky);
                    state.addEvent = true;
                }
                
                //for IE8
                else if (typeof window.attachEvent === 'object') {
                    window.attachEvent('onscroll', readySticky);
                    window.attachEvent('onresize', resizeSticky);
                    state.addEvent = true;
                }
            }
            resizeSticky();
        };
        
        //Ready for sticky run.
        var readySticky = function() {
            var wB, i, it, l = sticky.length;
            
            //Get current scroll coordinate in px unit when IE9+
            if (typeof window.pageXOffset === 'number') {
                state.currentScrollX = window.pageXOffset;
                state.currentScrollY = window.pageYOffset;
            }

            //Get current scroll coordinate in px unit when IE8
            else if (typeof document.documentElement.scrollLeft === 'number') {
                state.currentScrollX = document.documentElement.scrollLeft;
                state.currentScrollY = document.documentElement.scrollTop;
            }
            
            //Repeat as many times as the sticky array.
            for (i = 0; i < l; i++) {
                it = sticky[i];
                
                if (it.running === false) {
                    wB = it.wrap.element.getBoundingClientRect();
                    
                    if (0 > wB.top) {
                        it.running = true;
                        runSticky(it);
                    }
                }
                else {
                    runSticky(it);
                }
            }
            
            //Scroll value record
            state.prevScrollY = state.currentScrollY;
            state.prevScrollX = state.currentScrollX;
        };
        
        //Run sticky to set location.
        var runSticky = function(it) {
            var x, wB, cB, itC = it.content, itW = it.wrap, itP = it.parent;
            
            //Get content wrap bounding client rect.
            wB = itW.element.getBoundingClientRect();
            
            //컨텐츠가 화면보다 작다면
            //The content size is smaller than the viewport.
            if (state.screenHeight > itC.height) {
                
                //When the content wrap is above the viewport.
                if (0 > wB.top) {
                    x = -wB.top + itW.height + itP.topSpace;
                        
                    //If content is inside the parent when apply the fixed value to the content.
                    if (itP.innerHeight >= x && itC.element.style.top !== '0px') {
                        itC.element.style.position = 'fixed';
                        itC.element.style.left = wB.left + 'px';
                        itC.element.style.top = '0px';
                    }
                    
                    //If content is out the parent when apply the fixed value to the content.
                    else if (itP.innerHeight < x && itC.element.style.position !== 'relative') {
                        itC.element.style.position = 'relative';
                        itC.element.style.left = '';
                        itC.element.style.top = itP.innerHeight - itW.height - itP.topSpace + 'px';
                    }
                }
                
                //When the content wrap is located inside or below the viewport.
                else if (0 < wB.top && itC.element.style.position !== '') {
                    itC.element.style.position = '';
                    itC.element.style.left = '';
                    itC.element.style.top = '';
                    it.running = false;
                }
                
                //When the content position is fixed and horizontally scrolling.
                if (itC.element.style.position === 'fixed' && (state.prevScrollX !== state.currentScrollX || itC.element.style.left === '')) {
                    itC.element.style.left = wB.left + 'px';
                }
            }
            
            //컨텐츠가 화면보다 크다면
            //The content size is bigger than the viewport.
            else if (state.screenHeight < itC.height) {
                cB = itC.element.getBoundingClientRect();
                
                //When scroll down.
                if (state.prevScrollY < state.currentScrollY) {
                    
                    //When the content wrap is above the viewport and the content bottom is not visible.
                    if (wB.top < 0 && cB.bottom + itC.marginBottom > state.screenHeight && itC.element.style.position !== 'relative') {
                        itC.position += state.currentScrollY - state.prevScrollY;
                        itC.element.style.position = 'fixed';
                        
                        //Calculated position value > maximum position value
                        if (itC.position > itW.height - state.screenHeight) {
                            itC.position = itW.height - state.screenHeight;
                            itC.element.style.top = -itC.position + 'px';
                        }
                        
                        //Calculated position value <= maximum position value
                        else {
                            itC.element.style.top = -itC.position + 'px';
                        }
                    }
                    
                    //If content is out the parent when apply the fixed value to the content.
                    else if (itP.innerHeight < -wB.top - itC.position + itW.height + itP.topSpace && itC.element.style.position !== 'relative') {
                        itC.position = itW.height - state.screenHeight;
                        itC.element.style.position = 'relative';
                        itC.element.style.left = '';
                        itC.element.style.top = itP.innerHeight - itW.height - itP.topSpace + 'px';
                    }
                }
                
                //When scroll up.
                else if ((state.prevScrollY > state.currentScrollY) && (itP.innerHeight > -wB.top - itC.position - (state.currentScrollY - state.prevScrollY) + itW.height + itP.topSpace)) {
                    
                    //When the content wrap is above the viewport and the content top is not visible.
                    if (wB.top < 0 && cB.top - itC.marginTop < 0) {
                        itC.position += state.currentScrollY - state.prevScrollY;
                        itC.element.style.position = 'fixed';
                        
                        //minimum position value > Calculated position value
                        if (0 > itC.position && itC.element.style.top !== '0px') {
                            itC.position = 0;
                            itC.element.style.top = '0px';
                        }
                        
                        //minimum position value <= Calculated position value
                        else {
                            itC.element.style.top = -itC.position + 'px';
                        }
                    }
                    
                    //When the content wrap is located inside or below the viewport.
                    else if (0 <= wB.top && wB.top > cB.top - itC.marginTop && itC.element.style.position !== '') {
                        itC.position = 0;
                        itC.element.style.position = '';
                        itC.element.style.left = '';
                        itC.element.style.top = '';
                        it.running = false;
                    }
                }
                
                //Initial position setting.
                else if (it.been === false) {
                    
                    //Get current scroll coordinate in px unit when IE9+
                    if (typeof window.pageXOffset === 'number') {
                        state.prevScrollY = window.pageYOffset;
                    }
                    
                    //Get current scroll coordinate in px unit when IE8
                    else if (typeof document.documentElement.scrollLeft === 'number') {
                        state.prevScrollY = document.documentElement.scrollTop;
                    }
                    
                    //when the content top is visible and content possible inside the parent.
                    if (itP.innerHeight > -wB.top + itW.height + itP.topSpace) {
                        itC.position = 0;
                        itC.element.style.position = 'fixed';
                        itC.element.style.left = wB.left + 'px';
                        itC.element.style.top = '0px';
                    }
                    
                    //when the content top is visible and content impossible inside the parent.
                    else {
                        itC.position = itW.height - state.screenHeight;
                        itC.element.style.position = 'relative';
                        itC.element.style.left = '';
                        itC.element.style.top = itP.innerHeight - itW.height - itP.topSpace + 'px';
                    }
                }

                //Check that the initial position setting has been executed.
                if (it.been === false) {
                    it.been = true;
                }
                
                //When the content position is fixed and horizontally scrolling.
                if (itC.element.style.position === 'fixed' && (state.prevScrollX !== state.currentScrollX || itC.element.style.left === '')) {
                    itC.element.style.left = wB.left + 'px';
                }
            }
        };
        
        //Reset the sticky value when resizing.
        var resizeSticky = function() {
            var i, it, itC, itW, itP, l = sticky.length, cStyle;
            
            //Avoid computation overload.
            if (!state.resizing) {
                state.resizing = setTimeout(run, 200);
            }
            clearTimeout(state.resizing);
            state.resizing = setTimeout(run, 200);
            
            //Run reset the sticky value
            function run() {
                
                //Get browser screen width and height when IE9+
                if (typeof window.innerWidth === 'number') {
                    state.screenWidth = window.innerWidth;
                    state.screenHeight = window.innerHeight;
                }

                //Get browser screen width and height when IE8
                else if (typeof document.documentElement.clientWidth === 'number') {
                    state.screenWidth = document.documentElement.clientWidth;
                    state.screenHeight =document.documentElement.clientHeight;
                }

                //Repeat as many times as the number of sticky.
                for (i = 0; i < l; i++) {
                    it = sticky[i], itC = it.content, itW = it.wrap, itP = it.parent;
                    
                    //Selector state initialization.
                    it.running = false;
                    it.been = false;
                    
                    //Content inline style initialization.
                    itC.element.style.position = '';
                    itC.element.style.left = '';
                    itC.element.style.top = '';
                    itC.position = 0;
                    
                    //Remove wrap
                    if (itW.element) {
                        itP.element.insertBefore(itC.element, itW.element);
                        itP.element.removeChild(itW.element);
                    }

                    //Get content computedStyle value IE9+
                    if (typeof window.getComputedStyle === 'function') {
                        cStyle = window.getComputedStyle(itC.element);
                    }
                    
                    //Get content computedStyle value IE8
                    else if (typeof document.documentElement.currentStyle === 'object') {
                        cStyle = itC.element.currentStyle;
                    }
                    
                    //Record content value=====
                    itC.width = itC.element.offsetWidth;
                    itC.height = itC.element.offsetHeight;

                    if (cStyle.marginLeft === '0px' || cStyle.marginLeft === 'auto') {
                        itC.marginLeft = 0;
                    }
                    else {
                        itC.marginLeft = cStyle.marginLeft.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.marginTop === '0px' || cStyle.marginTop === 'auto') {
                        itC.marginTop = 0;
                    }
                    else {
                        itC.marginTop = cStyle.marginTop.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.marginRight === '0px' || cStyle.marginRight === 'auto') {
                        itC.marginRight = 0;
                    }
                    else {
                        itC.marginRight = cStyle.marginRight.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.marginBottom === '0px' || cStyle.marginBottom === 'auto') {
                        itC.marginBottom = 0;
                    }
                    else {
                        itC.marginBottom = cStyle.marginBottom.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.cssFloat) {
                        if (cStyle.cssFloat !== 'none') {
                            itC.float = cStyle.cssFloat;
                        }
                    }
                    else if (cStyle.float) {
                        if (cStyle.float !== 'none') {
                            itC.float = cStyle.float;
                        }
                    }

                    if (cStyle.clear !== 'none') {
                        itC.clear = cStyle.clear;
                    }

                    //Record parent value=====
                    if (typeof window.getComputedStyle === 'function') {
                        cStyle = window.getComputedStyle(itP.element);
                    }
                    else if (typeof document.documentElement.currentStyle === 'object') {
                        cStyle = itP.element.currentStyle;
                    }

                    if (cStyle.paddingLeft === '0px' || cStyle.paddingLeft === 'auto') {
                        itP.paddingLeft = 0;
                    }
                    else {
                        itP.paddingLeft = cStyle.paddingLeft.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.paddingTop === '0px' || cStyle.paddingTop === 'auto') {
                        itP.paddingTop = 0;
                    }
                    else {
                        itP.paddingTop = cStyle.paddingTop.replace(/[^\-*\d+]+/, '') * 1;
                    }

                    if (cStyle.paddingBottom === '0px' || cStyle.paddingBottom === 'auto') {
                        itP.paddingBottom = 0;
                    }
                    else {
                        itP.paddingBottom = cStyle.paddingBottom.replace(/[^\-*\d+]+/, '') * 1;
                    }
                    
                    itP.innerHeight = itP.element.clientHeight - itP.paddingTop - itP.paddingBottom;
                    itP.topSpace = itC.element.getBoundingClientRect().top - itP.element.getBoundingClientRect().top - itP.paddingTop - itC.marginTop;

                    //Record wrap value=====
                    itW.width = itC.width + itC.marginLeft + itC.marginRight;
                    itW.height = itC.height + itC.marginTop + itC.marginBottom;

                    if (itC.float) {
                        itW.float = itC.float;
                    }

                    if (itC.clear) {
                        itW.clear = itC.clear;
                    }

                    itW.element = document.createElement('div');
                    itW.element.setAttribute('class', 'nSticky');
                    itW.element.style.width = itC.width + itC.marginLeft + itC.marginRight + 'px';
                    itW.element.style.height = itW.height + 'px';
                    if (itC.float) {
                        itW.element.style.float = itC.float;
                    }
                    if (itC.clear) {
                        itW.element.style.clear = itC.clear;
                    }
                    itP.element.insertBefore(itW.element, itC.element);
                    itW.element.appendChild(itC.element);
                }
            
                //Run readySticky
                it = state;
                readySticky(it);
            }
        };
        
        //When content elements get focus.
        var focusInSticky = function(eve) {
            
            //If sticky plugin is enabled
            if (state.addEvent === true) {
                var b;
                
                //Get target bounging client rect IE9+
                if (eve.target) {
                    b = eve.target.getBoundingClientRect();
                }
                
                //Get target bounging client rect IE8
                else {
                     b = eve.srcElement.getBoundingClientRect();
                }
                
                //About top
                if (b.top < 0) {
                    window.scrollBy(0, b.top);
                }
                
                //About right
                if (b.right > state.screenWidth) {
                    window.scrollBy(b.right - state.screenWidth, 0);
                }
                
                //About bottom
                if (b.bottom > state.screenHeight) {
                    window.scrollBy(0, b.bottom - state.screenHeight);
                }
                
                //About left
                if (b.left < 0) {
                    window.scrollBy(b.left, 0);
                }
            }
        };
        
        //Enable Sticky plugin
        var enableSticky = function() {
            
            //If sticky plugin disabled
            if (state.addEvent === false) {
                
                //If IE9+
                if (typeof window.addEventListener === 'function') {
                    window.addEventListener('scroll', readySticky);
                    window.addEventListener('resize', resizeSticky);
                    state.addEvent = true;
                }
                
                //If IE8
                else if (typeof window.attachEvent === 'object') {
                    window.attachEvent('onscroll', readySticky);
                    window.attachEvent('onresize', resizeSticky);
                    state.addEvent = true;
                }
            }
            
            //Run
            resizeSticky();
        };
        
        //Disable Sticky plugin
        var disableSticky = function() {
            var i, it, itC, itW, itP, l = sticky.length;
            
            //If sticky plugin enabled
            if (state.addEvent === true) {
                
                //If IE9+
                if (typeof window.addEventListener === 'function') {
                    window.removeEventListener('scroll', readySticky);
                    window.removeEventListener('resize', resizeSticky);
                    state.addEvent = false;
                }
                
                //If IE8
                else if (typeof window.attachEvent === 'object') {
                    window.detachEvent('onscroll', readySticky);
                    window.detachEvent('onresize', resizeSticky);
                    state.addEvent = false;
                }
            }
            
            //Repeat as many times as the number of sticky.
            for (i = 0; i < l; i++) {
                it = sticky[i], itC = it.content, itW = it.wrap, itP = it.parent;

                //Selector state initialization.
                it.running = false;
                it.been = false;

                //Content inline style initialization.
                itC.element.style.position = '';
                itC.element.style.left = '';
                itC.element.style.top = '';
                itC.position = 0;
                
                //Remove wrap
                itP.element.insertBefore(itC.element, itW.element);
                itP.element.removeChild(itW.element);
                itW.element = null;
            }
        };
        
        return {
            set: setSticky,
            enable: enableSticky,
            disable: disableSticky
        };
    }());
}