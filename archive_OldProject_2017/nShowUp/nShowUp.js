/*
 * nShowUp.js (http://niceplugin.com)
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
if (!NP.ShowUp) {
    NP.ShowUp = (function() {
        var showup = {
            state: {event: false},
            once: [],
            always: []
        };
        
        //set user showup value
        var setShowUp = function() {
            var ar, el, ell, i, i2, it, l = arguments.length, itO = showup.once, itA = showup.always;
            
            //set side option
            var setOption = function(it, ar) {
                
                //about expos
                if (ar.expos === 'whole') {
                    it.expos = ar.expos;
                }
                else {
                    it.expos = 'part';
                }

                //about add class name
                if (ar.add) {
                    it.add = ar.add;
                }
                else {
                    it.add = 'showup';
                }
                
                //about function event
                if (typeof ar.event === 'function') {
                    it.event = ar.event;
                }
                
                //about real time
                if (ar.realTime === true && ar.run === 'always') {
                    it.realTime = ar.realTime;
                }
                else {
                    it.realTime = false;
                }
            }
            
            //All arguments value received from the user is classified according to 'once' or 'always'.
            for (i = 0; i < l; i++) {
                
                //Defines the current argument.
                ar = arguments[i];
                
                
                //type run
                if (ar.run === 'always') {
                    
                    //If the content input value is the corresponding element.
                    if (el = document.querySelector(ar.content)) {
                        
                        //about ID
                        if (ar.content.charAt(0) === '#') {
                            it = itA[itA.length] = {};
                            it.content = el;
                            it.showing = 0;
                            setOption(it, ar);
                        }
                        
                        //about class
                        else if (ar.content.charAt(0) === '.') {
                            el = document.querySelectorAll(ar.content);
                            for (i2 = 0, ell = el.length; i2 < ell; i2++) {
                                it = itA[itA.length] = {};
                                it.content = el[i2];
                                it.showing = 0;
                                setOption(it, ar);
                            }
                        }
                    }
                    
                    contentAlways();
                }
                
                //type once
                else {
                    
                    //If the content input value is the corresponding element.
                    if (el = document.querySelector(ar.content)) {
                        
                        //about ID
                        if (ar.content.charAt(0) === '#') {
                            it = itO[itO.length] = {};
                            it.content = el;
                            setOption(it, ar);
                        }
                        
                        //about class
                        else if (ar.content.charAt(0) === '.') {
                            el = document.querySelectorAll(ar.content);
                            for (i2 = 0, ell = el.length; i2 < ell; i2++) {
                                it = itO[itO.length] = {};
                                it.content = el[i2];
                                setOption(it, ar);
                            }
                        }
                    }
                    
                    contentOnce();
                }
            }
            
            //Determine if event listeners should be added.
            if (showup.state.event === false && (0 < itO.length || 0 < itA.length)) {
                showup.state.event = true;
                
                //for IE9+
                if (typeof window.addEventListener === 'function') {
                    window.addEventListener("scroll", onScrolling);
                }
                
                //for IE8
                else if (typeof window.attachEvent === 'object') {
                    window.attachEvent("onscroll", onScrolling);
                }
            }
        }
        
        //when scrolling
        var onScrolling = function() {
            var itOL = showup.once.length, itAL = showup.always.length;
            
            //There is no object to check.
            if (itOL === 0 && itAL === 0) {
                showup.state.event = false;
                if (typeof window.removeEventListener === 'function') {
                    window.removeEventListener("scroll", onScrolling);
                }
                else if (typeof window.detachEvent === 'object') {
                    window.detachEvent("onscroll", onScrolling);
                }
            }
            
            //there is object to check.
            else {
                
                //once
                if (itOL !== 0) {
                    contentOnce();
                }
                
                //always
                if (itAL !== 0) {
                    contentAlways();
                }
            }
        }
        
        //Check the event activation condition of 'once'.
        var contentOnce = function() {
            var i, r, itS = showup.state, itO = showup.once, itOL = showup.once.length;
            
            //Get document innerWidth when IE9+
            if (typeof window.innerWidth === 'number') {
                itS.screenWidth = window.innerWidth;
                itS.screenHeight = window.innerHeight;
            }
            
            //Get document innerWidth when IE8
            else if (typeof document.documentElement.clientWidth === 'number') {
                itS.screenWidth = document.documentElement.clientWidth;
                itS.screenHeight = document.documentElement.clientHeight;
            }
            
            //Check all once elements
            for(i = 0; i < itOL; i++) {
                
                //Get BoundingClientRect value
                r = itO[i].content.getBoundingClientRect();
                itO[i].minX = r.left;
                itO[i].minY = r.top;
                itO[i].maxX = r.right;
                itO[i].maxY = r.bottom;
                
                //Condition is when a part is seen.
                if (itO[i].expos === 'part') {
                    if ((0 <= itO[i].minX || 0 <= itO[i].maxX) && (0 <= itO[i].minY || 0 <= itO[i].maxY) && (itO[i].minX <= itS.screenWidth || itO[i].maxX <= itS.screenWidth) && (itO[i].minY <= itS.screenHeight || itO[i].maxY <= itS.screenHeight)) {
                        
                        //Run the corresponding array.
                        runShowUp('once', i, itO[i].content);
                        
                        //Delete the corresponding array value.
                        showup.once.shift();
                        itOL--, i--;
                    }
                }
                
                //Condition is when a whole is seen.
                else if (itO[i].expos === 'whole') {
                    if ((0 <= itO[i].minX && 0 <= itO[i].minY) && (itO[i].maxX <= itS.screenWidth && itO[i].maxY <= itS.screenHeight)) {
                        
                        //Run the corresponding array.
                        runShowUp('once', i, itO[i].content);
                        
                        //Delete the corresponding array value.
                        showup.once.shift();
                        itOL--, i--;
                    }
                }
            }
        }
        
        //Check the event activation condition of 'always'.
        var contentAlways = function() {
            var i, r, obj, itS = showup.state, itA = showup.always, itAL = showup.always.length;
            
            //Get document innerWidth when IE9+
            if (typeof window.innerWidth === 'number') {
                itS.screenWidth = window.innerWidth;
                itS.screenHeight = window.innerHeight;
            }
            
            //Get document innerWidth when IE8
            else if (typeof document.documentElement.clientWidth === 'number') {
                itS.screenWidth = document.documentElement.clientWidth;
                itS.screenHeight =document.documentElement.clientHeight;
            }
            
            //Check all always elements
            for(i = 0; i < itAL; i++) {
                
                //Get BoundingClientRect value
                r = itA[i].content.getBoundingClientRect();
                itA[i].minX = r.left;
                itA[i].minY = r.top;
                itA[i].maxX = r.right;
                itA[i].maxY = r.bottom;
                
                //Condition is when a part is seen.
                if (itA[i].expos === 'part') {
                    
                    //When element part is exposed.
                    if ((0 <= itA[i].minX || 0 <= itA[i].maxX) && (0 <= itA[i].minY || 0 <= itA[i].maxY) && (itA[i].minX <= itS.screenWidth || itA[i].maxX <= itS.screenWidth) && (itA[i].minY <= itS.screenHeight || itA[i].maxY <= itS.screenHeight)) {
                            
                        //Get activation element.
                        obj = itA[i].content;
                        
                        //If real time mode.
                        if (itA[i].realTime === true) {
                            itA[i].showing = 1;
                            
                            //Run the corresponding array.
                            runShowUp('always', i, obj, r);
                        }
                        
                        //If not real time mode and not been run.
                        else if (itA[i].showing === 0) {
                            itA[i].showing = 1;
                            
                            //Run the corresponding array.
                            runShowUp('always', i, obj);
                        }
                    }
                    
                    //When the exposed element is out of sight.
                    else if ((0 > itA[i].maxX || 0 > itA[i].maxY) || (itS.screenWidth < itA[i].minX || itS.screenHeight < itA[i].minY) && (itA[i].showing === 1)) {
                        
                        //Ready again the corresponding array.
                        readyAgainShowUp(i);
                    }
                }
                
                //Condition is when a whole is seen.
                else if (itA[i].expos === 'whole') {
                    
                    //When element whole is exposed.
                    if ((0 <= itA[i].minX && 0 <= itA[i].minY) && (itA[i].maxX <= itS.screenWidth && itA[i].maxY <= itS.screenHeight)) {
                            
                        //Get activation element.
                        obj = itA[i].content;
                        
                        //If real time mode.
                        if (itA[i].realTime === true) {
                            itA[i].showing = 1;
                            
                            //Run the corresponding array.
                            runShowUp('always', i, obj, r);
                        }
                        
                        //If not real time mode and not been run.
                        else if (itA[i].showing === 0) {
                            itA[i].showing = 1;
                            
                            //Run the corresponding array.
                            runShowUp('always', i, obj);
                        }
                    }
                    
                    //When the exposed element is out of sight.
                    else if ((0 > itA[i].maxX || 0 > itA[i].maxY) || (itS.screenWidth < itA[i].minX || itS.screenHeight < itA[i].minY) && (itA[i].showing === 1)) {
                        
                        //Ready again the corresponding array.
                        readyAgainShowUp(i);
                    }
                }
                
            }
        }
        
        //Run the corresponding array function.
        var runShowUp = function(mode, i, obj, r) {
            var it, x = {};
            
            x.width = showup.state.screenWidth;
            x.height = showup.state.screenHeight;
            
            //Check once or always
            if (mode === 'once') {
                it = showup.once;
            }
            else {
                it = showup.always;
            }
            
            //Add class name
            if (it[i].content.className === '') {
                it[i].content.className = it[i].add;
            }
            else if (it[i].content.className !== '' && it[i].content.className.search(it[i].add) === -1) {
                it[i].content.className += ' ' + it[i].add;
            }
            
            //Run user function
            if (it[i].event) {
                
                //Run when not real time.
                if (it.realTime === false) {
                    it[i].event(obj);
                }
                
                //Run when real time.
                //Firt argument is activation element.
                //Second argument is object of BoundingClientRect value.
                //Third argument is current window.inner width and height value.
                else {
                    it[i].event(obj, r, x);
                }
            }
        }
        
        //Ready again  for runShowUp.
        var readyAgainShowUp = function(i) {
            var p, itA = showup.always;
            
            //Set class name value a regular expression pattern.
            p = new RegExp('\\s*' + itA[i].add);
            
            //Set default value.
            itA[i].showing = 0;
            
            //Remove class name.
            itA[i].content.className = itA[i].content.className.replace(p, '');
        }
        
        return {
            set: setShowUp
        }
    }());
}