/*
 * nScrollTo.js (http://niceplugin.com)
 * Version: 1.17.1
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
if (!NP.ScrollTo) {
    NP.ScrollTo = (function() {
        var state = {
            running: false,
            pressAny: false,
            holding: false
        },
            scrollingto = [];
        
        //set user scrollingto value
        var setScrollTo = function() {
            var el, i1, i2, it, h, ar = arguments, aL1 = arguments.length, aL2;
            
            //repeat as many times as the number of contents to be set
            for (i1 = 0; i1 < aL1; i1++) {
                el = document.querySelectorAll(ar[i1].content);
                aL2 = el.length;
                
                //repeat as many times as the number of select element to be set
                for (i2 = 0; i2 < aL2; i2++) {
                    h = el[i2].getAttribute('href');
                    
                    //if it has href value that starts with #
                    if (h !== null && h.charAt(0) === '#') {
                        
                        //check that the href value is valid
                        h = document.querySelector(h);
                        if (h !== null) {
                            
                            //create array
                            it = scrollingto[scrollingto.length] = {};
                            
                            //record a or area element to content
                            it.content = el[i2];
                            
                            //record target element to target
                            it.target = h;
                            
                            //record the time it takes to move from the current location to the arrival
                            if (typeof ar[i1].duration === 'number') {
                                it.duration = ar[i1].duration;
                            }
                            else {//default value
                                it.duration = 400;
                            }
                            
                            //record the X interval between the screen and the target on arrival
                            if (typeof ar[i1].intervalX === 'object') {
                                if (typeof ar[i1].intervalX[0] === 'number') {
                                    it.intervalX = [];
                                    it.intervalX[0] = ar[i1].intervalX[0];

                                    if (typeof ar[i1].intervalX[1] === 'string' && (ar[i1].intervalX[1] === 'px' || ar[i1].intervalX[1] === '%')) {
                                        it.intervalX[1] = ar[i1].intervalX[1];
                                    }
                                    else {
                                        it.intervalX[1] = 'px';
                                    }
                                }
                            }
                            
                            //record the Y interval between the screen and the target on arrival
                            if (typeof ar[i1].intervalY === 'object') {
                                if (typeof ar[i1].intervalY[0] === 'number') {
                                    it.intervalY = [];
                                    it.intervalY[0] = ar[i1].intervalY[0];

                                    if (typeof ar[i1].intervalY[1] === 'string' && (ar[i1].intervalY[1] === 'px' || ar[i1].intervalY[1] === '%')) {
                                        it.intervalY[1] = ar[i1].intervalY[1];
                                    }
                                    else {
                                        it.intervalY[1] = 'px';
                                    }
                                }
                            }
                            
                            //record the code about hold mode
                            if (ar[i1].hold === true) {
                                it.hold = true;
                            }
                            else {
                                it.hold = false;
                            }
                            
                            //record the function about user set function
                            if (typeof ar[i1].event === 'function') {
                                it.event = ar[i1].event;
                            }
                            
                            //add event listener to content when IE9+
                            if (typeof window.addEventListener === 'function') {
                                (function() {
                                    var i = scrollingto.length - 1;
                                    it.content.addEventListener('click', function(event) {readyScrollTo(i, event);});;
                                }());
                            }
                            
                            //add event listener to content when IE8
                            else if (typeof window.attachEvent === 'object') {
                                (function() {
                                    var i = scrollingto.length - 1;
                                    it.content.attachEvent('onclick', function(event) {readyScrollTo(i, event);});;
                                }());
                            }
                        }
                    }
                }
            }
        }
        
        //get value for run 'runScrollTo' when clicking content.
        var readyScrollTo = function(i, eve) {
            
            //if 'runScrollTo' is not running
            if (state.running === false) {
                var x = 0, y = 0, it = scrollingto[i], r = it.target.getBoundingClientRect();
                
                //'href = # ...' prevent default.
                eve.preventDefault ? eve.preventDefault() : (eve.returnValue = false);
                
                //Get document innerWidth when IE9+
                if (typeof window.innerWidth === 'number') {
                    state.screenWidth = window.innerWidth;
                    state.screenHeight = window.innerHeight;
                }

                //Get document innerWidth when IE8
                else if (typeof document.documentElement.clientWidth === 'number') {
                    state.screenWidth = document.documentElement.clientWidth;
                    state.screenHeight =document.documentElement.clientHeight;
                }
                
                //Get current scroll coordinate in px unit when IE9+
                if (typeof window.pageXOffset === 'number') {
                    state.scrollX = window.pageXOffset;
                    state.scrollY = window.pageYOffset;
                }
                
                //Get current scroll coordinate in px unit when IE8
                else if (typeof document.documentElement.scrollLeft === 'number') {
                    state.scrollX = document.documentElement.scrollLeft;
                    state.scrollY = document.documentElement.scrollTop;
                }
                
                //calculate the X interval between the screen and the target on arrival
                if (it.intervalX) {
                    if (it.intervalX[1] === '%') {
                        x = state.screenWidth * it.intervalX[0] * 0.01;
                    }
                    else {
                        x = it.intervalX[0];
                    }
                }
                
                //calculate the Y interval between the screen and the target on arrival
                if (it.intervalY) {
                    if (it.intervalY[1] === '%') {
                        y = state.screenHeight * it.intervalY[0] * 0.01;
                    }
                    else {
                        y = it.intervalY[0];
                    }
                }
                
                //calculate the actual position of the target on arrival
                it.targetX = r.left - x;
                it.targetY = r.top - y;
                
                //run 'runScrollTo'
                runScrollTo(it);
            }
        }
        
        //controls movement to the target
        var runScrollTo = function(it) {
            var x, setT, getT, curT;
            
            //change state running enable
            state.running = true;
            
            //record the start time
            setT = new Date().getTime();
            
            //add event listener for control to something press from user when IE9+
            if (typeof window.addEventListener === 'function') {
                
                //hold mode enable
                if (it.hold === true) {
                    state.holding = true;
                    window.addEventListener('keydown', enableHold1);
                    window.addEventListener('touchmove', enableHold2);
                    window.addEventListener('wheel', enableHold2);
                    window.addEventListener('scroll', enableHold3);
                }
                
                //hold mode disable
                else {
                    window.addEventListener('keydown', disableHold1);
                    window.addEventListener('wheel', disableHold2);
                    window.addEventListener('scroll', disableHold3);
                }
            }
            
            //add event listener for control to something press from user when IE8
            else if (typeof window.attachEvent === 'object') {
                
                //hold mode enable
                if (it.hold === true) {
                    state.holding = true;
                    document.documentElement.attachEvent('onkeydown', enableHold1);
                    document.documentElement.attachEvent('onmousewheel', enableHold2);
                    window.attachEvent('onscroll', enableHold3);
                }
                
                //hold mode disable
                else {
                    document.documentElement.attachEvent('onkeydown', disableHold1);
                    document.documentElement.attachEvent('onmousewheel', disableHold2);
                    window.attachEvent('onscroll', disableHold3);
                }
            }
            
            //run scriptAni
            scriptAni();
            
            //animated moving
            function scriptAni() {
                //record the current time
                getT = new Date().getTime();
                
                //time from start to current
                curT = getT - setT;
                
                //Animation ease function value
                x = (Math.cos(curT / it.duration * Math.PI) * -1 + 1) * .5;
                
                //if there is no user press value and the 'curT'stime is less than duration
                if (curT / it.duration < 1 && state.pressAny === false) {
                    
                    //calculate the coordinates at which the scroll will move
                    state.moveX = Math.floor(state.scrollX + (x * it.targetX));
                    state.moveY = Math.floor(state.scrollY + (x * it.targetY));
                    
                    //change scroll bar moving state enable
                    state.moving = true;
                    
                    //move the scroll bar
                    window.scrollTo(state.moveX, state.moveY);
                    
                    //Get current scroll coordinate in px unit when IE9+
                    if (typeof window.pageXOffset === 'number') {
                        state.currentX = window.pageXOffset;
                        state.currentY = window.pageYOffset;
                    }

                    //Get current scroll coordinate in px unit when IE8
                    else if (typeof document.documentElement.scrollLeft === 'number') {
                        state.currentX = document.documentElement.scrollLeft;
                        state.currentY = document.documentElement.scrollTop;
                    }
                    
                    //change scroll bar moving state disable
                    state.moving = false;
                    
                    //run 'scriptAni' again
                    setTimeout(scriptAni, Math.min(10, it.duration - curT));
                }
                
                //if there is user press value and the 'curT'stime is less than duration
                else if (curT / it.duration < 1 && state.pressAny === true) {
                    
                    //run 'endScrollTo'
                    endScrollTo(it);
                }
                
                //if 'curT'stime is more than duration
                else {
                    //scroll bar go to the target final arrival
                    window.scrollTo(state.scrollX + it.targetX, state.scrollY + it.targetY);
                    
                    //run 'endScrollTo'
                    endScrollTo(it);
                }
            }
        }
        
        //reset value when 'runScrollTo' execution is complete
        var endScrollTo = function(it) {
            
            //remove event listener for control to something press from user when IE9+
            if (typeof window.removeEventListener === 'function') {
                
                //hold mode enable
                if (state.holding === true) {
                    state.holding = false;
                    window.removeEventListener('keydown', enableHold1);
                    window.removeEventListener('touchmove', enableHold2);
                    window.removeEventListener('wheel', enableHold2);
                    window.removeEventListener('scroll', enableHold3);
                }
                
                //hold mode disable
                else {
                    window.removeEventListener('keydown', disableHold1);
                    window.removeEventListener('wheel', disableHold2);
                    window.removeEventListener('scroll', disableHold3);
                }
            }
            
            //remove event listener for control to something press from user when IE8
            else if (typeof window.detachEvent === 'object') {
                
                //hold mode enable
                if (state.holding === true) {
                    state.holding = false;
                    document.documentElement.detachEvent('onkeydown', enableHold1);
                    document.documentElement.detachEvent('onmousewheel', enableHold2);
                    window.detachEvent('onscroll', enableHold3);
                }
                
                //hold mode disable
                else {
                    document.documentElement.detachEvent('onkeydown', disableHold1);
                    document.documentElement.detachEvent('onmousewheel', disableHold2);
                    window.detachEvent('onscroll', disableHold3);
                }
            }
            
            //if 'runScrollTo' is done without cancel, and user function exists, user function run
            if (it.event && state.pressAny === false) {
                
                //sends the target value as a parameter to the user function
                it.event(it.target);
            }
            
            //reset about state
            state.running = false;
            state.pressAny = false;
        }
        
        //prevent keybord press when hold mode enabled
        var enableHold1 = function(eve) {
            // left: 37, up: 38, right: 39, down: 40,
            // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            if (32 <= eve.keyCode && eve.keyCode <= 40) {
                eve.preventDefault ? eve.preventDefault() : (eve.returnValue = false);
            }
        }
        
        //prevent wheel event when hold mode enabled
        var enableHold2 = function(eve) {
            eve.preventDefault ? eve.preventDefault() : (eve.returnValue = false);
        }
        
        ////prevent scrolling when hold mode enabled
        var enableHold3 = function() {
            if (state.moving === false) {
                window.scrollTo(state.moveX, state.moveY);
            }
        }
        
        //get keybord press when hold mode disabled
        var disableHold1 = function(eve) {
            // left: 37, up: 38, right: 39, down: 40,
            // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            if (32 <= eve.keyCode && eve.keyCode <= 40) {
                state.pressAny = true;
            }
        }
        
        //get wheel event when hold mode disabled
        var disableHold2 = function() {
            state.pressAny = true;
        }
        
        //get scrolling when hold mode disabled
        var disableHold3 = function() {
            var X, Y;
            
            //Get current scroll coordinate in px unit when IE9+
            if (typeof window.pageXOffset === 'number') {
                X = window.pageXOffset;
                Y = window.pageYOffset;
            }

            //Get current scroll coordinate in px unit when IE8
            else if (typeof document.documentElement.scrollLeft === 'number') {
                X = document.documentElement.scrollLeft;
                Y = document.documentElement.scrollTop;
            }
            
            //if scrolling other than 'runScrollTo' is detected
            if ((state.currentX !== X || state.currentY !== Y) && (state.moving === false)) {
                state.pressAny = true;
            }
        }
        
        return {
            set: setScrollTo
        }
    }());
}