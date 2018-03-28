/*
 * nTyping.js (http://niceplugin.com)
 * Version: 1.1703
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

//NP.set Toggle object check
if (!NP.Typing) {
    NP.Typing = (function() {
        var typed = {};
        
        //Cursor animation for IE9-
        var cursorAnimation = function(it) {
            if (it.style.fontSize === '0px') it.style.fontSize = '';
            else it.style.fontSize = '0px';
        };
        
        //Set typing value in object.
        var setTyping = function(db) {
            var it, itD, itSe, itSt, itT, x;
            
            //If the input of the required value is valid.
            if (db.id && db.content && document.getElementById(db.id) && typeof db.content === 'string') {
                
                //Create an object with the id you entered.
                it = typed[db.id] = {}, x;
                
                //Set the default value within the object created with the ID you entered.
                itD = it.duration = {};
                itSe = it.selector = {};
                itSt = it.state = {};
                itT = it.text = {};
                
                
                //About duration =====
                //Typing speed
                if (db.typeSpeed && typeof db.typeSpeed === 'number') itD.typed = db.typeSpeed;
                else itD.typed = 125;
                
                //Backspace spedd
                if (db.backSpeed && typeof db.backSpeed === 'number') itD.back = db.backSpeed;
                else itD.back = 75;
                
                //Cursor speed
                if (db.cursorSpeed && typeof db.cursorSpeed === 'number') itD.cursor = db.cursorSpeed;
                else itD.cursor = 750;
                
                //Readed code value
                itD.code = 0;
                
                
                //About set selector =====
                //Content
                itSe.content = document.getElementById(db.id);
                
                //Custom function
                if (db.event && typeof db.event === 'function') itSe.event = db.event;
                
                //Readed tag
                itSe.tag = [];
                
                
                //About set state =====
                //Whether the cursor is active.
                if (db.cursor && typeof db.cursor === false) itSt.cursor = false;
                else itSt.cursor = true;
                
                //Length of content to enter
                itSt.l = db.content.length;
                
                //Content progress to be entered
                itSt.i = 0;
                
                //Number of typed characters
                itSt.typed = 0;
                
                //Whether reading code or tags
                itSt.reading = false;
                
                //Readed code or tag value
                itSt.readed = '';
                
                //Number of readed tags
                itSt.tagLength = 0;
                
                //Whether to loop
                itSt.loop = false;
                
                //Whether to enable alt
                if (db.alt === false) itSt.alt = false;
                else itSt.alt = true;
                
                //About set characters =====
                //Content text to write
                itT.content = db.content;
                
                //The text to be displayed by the cursor.
                if (db.cursorChar && typeof db.cursorChar === 'string') itT.cursor = db.cursorChar;
                else itT.cursor = '|';
                
                //aria-label text value
                if (itSt.alt === true) {
                    if (typeof db.altText === 'string') itT.altText = db.altText;
                    else itT.altText = itSe.content.innerText;
                }
                
                itSe.content.setAttribute('aria-hidden', true);
                
                //If alt enabled
                if (itSt.alt === true) {
                    //Create span tag for aria-label
                    x = document.createElement('span');
                    x.setAttribute('class', db.id + ' typingAriaLabel');
                    x.setAttribute('title', itT.altText);
                    
                    //Add
                    itSe.content.parentNode.insertBefore(x, itSe.content);
                }
                
                //If cursor enabled
                if (itSt.cursor === true) {
                    //Create cursor
                    x = document.createElement('span');
                    itSe.cursor = x;
                    x.setAttribute('class', db.id + ' typingCursor');
                    x.setAttribute('aria-hidden', 'true');
                    x.innerHTML = itT.cursor;
                    itSe.content.parentElement.insertBefore(x, itSe.content.nextSibling);

                    //If can use @keyframes
                    if (typeof document.documentElement.style.animation === 'string' || typeof document.documentElement.style.webkitAnimation === 'string') {
                        
                        //If css has not been created yet.
                        if (!document.querySelector('#typingCursorCSS')) {
                            x = document.createElement('style');
                            x.setAttribute('id', 'typingCursorCSS');
                            x.innerHTML = '@keyframes typingCursorAni{0%{opacity:0}49%{opacity:0}50%{opacity:1}99%{opacity:1}100%{opacity:0}}@keyframes -webkit-typingCursorAni{0%{opacity:0}49%{opacity:0}50%{opacity:1}99%{opacity:1}100%{opacity:0}}.' + db.id + '.typingCursor{opacity: 1;-webkit-animation: typingCursorAni ' + itD.cursor * .001 + 's infinite;animation: typingCursorAni ' + itD.cursor * .001 + 's infinite;}';
                            document.head.appendChild(x);
                        }
                        else {
                            x = document.querySelector('#typingCursorCSS');
                            x.innerHTML += '.' + db.id + '.typingCursor{opacity: 1;-webkit-animation: typingCursorAni ' + itD.cursor * .001 + 's infinite;animation: typingCursorAni ' + itD.cursor * .001 + 's infinite;}';
                        }
                    }
                    //If can not use @keyframes (for IE9-)
                    else {
                        itSe.cursor.style.fontSize = '0px';
                        itSt.intervalAni = setInterval(function() {cursorAnimation(itSe.cursor);}, itD.cursor / 2);
                    }
                }
                
                //Run typing
                readContent(it);
            }
            
        };
        
        //Run typing
        var readContent = function(it) {
            var itD = it.duration, itSt = it.state, itT = it.text;
            
            //If typing is not finish.
            if (itSt.i < itSt.l) {
                
                //If readed typing command.
                if (itT.content.charAt(itSt.i) === '/') {
                    itSt.i++;
                    readCode(it);
                }
                
                //If readed typing tag.
                else if (itT.content.charAt(itSt.i) === '<') {
                    itSt.i++;
                    itSt.tagLength2 = itSt.tagLength + 1;
                    readTag(it);
                }
                
                //If readed normal character.
                else setTimeout(function() {writeChar(it);}, itD.typed);
            }
        };
        
        //Read code
        var readCode = function(it) {
            var itD = it.duration, itSt = it.state, itT = it.text,
                c = itT.content.charAt(itSt.i);
            
            //If text / is an input
            if (!itSt.reading && c === '/') setTimeout(function() {writeChar(it);}, itD.typed);
            
            //If code end / is an input
            else if (itSt.reading && c === '/') {
                
                //If loop
                if (itSt.readed === 'l') setTimeout(function() {runCode(it);}, itD.typed);
                
                //If backspace
                else if (itSt.readed === 'b') setTimeout(function() {runCode(it);}, itD.back);
                
                //If stay
                else if (itSt.readed === 's') setTimeout(function() {runCode(it);}, itD.code);
                
                //If immediate execution code.
                else setTimeout(function() {runCode(it);});
            }
            
            //If it is a code character.
            else if (!itSt.reading && (c === 'b' || c === 'c' || c === 'd' || c === 'e' || c === 'l' || c === 's')) {
                itSt.readed = c;
                itSt.i++;
                itSt.reading = true;
                
                readCode(it);
            }
            
            //If it is a code number.
            else if (itSt.reading && isFinite(c)) {
                if (itD.code === 0) itD.code = c * 1;
                else itD.code = (itD.code * 10) + (c * 1);
                itSt.i++;
                
                readCode(it);
            }
            
            //If it is not the code.
            else {
                itSt.reading = false;
                itSt.readed = '';
                itD.code = 0;
                itSt.i++;
                
                readContent(it);
            }
        };
        
        //Read tag
        var readTag = function(it) {
            var itD = it.duration, itSe = it.selector, itSt = it.state, itT = it.text,
                c = itT.content.charAt(itSt.i),
                x = {area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1};
            
            //If text < is an input
            if (!itSt.reading && c === '<') setTimeout(function() {writeChar(it);}, itD.typed);
            
            //If close tag / is an input
            else if (!itSt.reading && c === '/') {
                //Delete last tag in object.
                itSe.tag.pop();
                itSt.tagLength--;
                
                //Find the end character of the tag.
                while (itT.content.charAt(itSt.i) !== '>') itSt.i++;
                itSt.i++;
                
                readContent(it);
            }
            
            //If tag > is an input
            else if (itSt.reading && c === '>') {
                
                //Record tag name when Failed to extract tag value.
                if (itSt.tagLength !== itSt.tagLength2 && c === '>') {
                    itSe.tag.push(itSt.readed);
                    itSt.tagLength++;
                }
                
                //Type is not closing tag.
                if (x[itSe.tag[itSe.tag.length - 1]] === 1) setTimeout(function() {writeTag(true);}, itD.typed);
                //Type is closing tag.
                else setTimeout(function() {writeTag(false);});
            }
            
            //Read to end of content but could not find end of the tag.
            else if (itSt.i === itSt.l) return;
            
            //Record tag value
            else {
                
                //Record tag name
                if (itSt.tagLength !== itSt.tagLength2 && c === ' ') {
                    itSe.tag.push(itSt.readed);
                    itSt.tagLength++;
                }
                if (c !== '>') {
                    itSt.readed += c;
                    itSt.i++;
                }
                itSt.reading = true;
                
                readTag(it);
            }
            
            //Write tag
            function writeTag(b) {
                //Create tag
                x = '<' + itSt.readed + '>';
                
                //If there is already a parent tag value.
                if (itSt.tagLength - 1 !== 0) {
                    itSe.tag[itSt.tagLength - 1].innerHTML += x;
                    itSe.tag.splice(itSt.tagLength - 1, 1, itSe.tag[itSt.tagLength - 1].lastChild);
                }
                else {
                    itSe.content.innerHTML += x;
                    itSe.tag.splice(0, 1, itSe.content.lastChild);
                }
                
                //Resset about reading state
                itSt.reading = false;
                itSt.readed = '';
                
                //If type is not closing tag.
                if (b) {
                    itSe.tag.pop();
                    itSt.tagLength--;
                    itSt.typed++;
                }
                itSt.i++;
                
                readContent(it);
            }
        };
        
        //Write character
        var writeChar = function(it) {
            var itSe = it.selector, itSt = it.state, itT = it.text;
            
            //If object has tag value
            if (itSt.tagLength !== 0) {
                itSe.tag[itSt.tagLength - 1].innerHTML += itT.content.charAt(itSt.i);
                itSt.i++;
                itSt.typed++;
                
                setTimeout(function() {readContent(it);});
            }
            else {
                itSe.content.innerHTML += itT.content.charAt(itSt.i);
                itSt.i++;
                itSt.typed++;
                
                setTimeout(function() {readContent(it);});
            }
        };
        
        //Run command code
        var runCode = function(it) {
            var itD = it.duration, itSe = it.selector, itSt = it.state, s, x,
                name = {area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1};
            
            switch (itSt.readed) {
                    
                    //About backspace
                case 'b':
                    //In the case of content.
                    if (itSt.tagLength === 0) s = itSe.content;
                    //In the case of tag.
                    else s = itSe.tag[itSt.tagLength - 1];
                    x = s.innerHTML;
                    
                    //If the target to be removed is not >.
                    if (x.charAt(x.length - 1) !== '>') {
                        if (x.slice(x.length - 4, x.length) === '&lt;' || x.slice(x.length - 4, x.length) === '&gt;') {
                            s.innerHTML = x.substr(0, x.length - 4);
                        }
                        else {
                            s.innerHTML = x.substr(0, x.length - 1);
                        }
                    }
                    //If the target to be removed is >.
                    else {
                        //Type is not closing tag.
                        if (name[s.lastChild.nodeName.toLowerCase()] === 1) {
                            s.removeChild(s.lastChild);
                        }
                        
                        //Type is closing tag.
                        else {
                            itSe.tag.push(s.lastChild);
                            itSt.tagLength++;
                            s = itSe.tag[itSt.tagLength - 1];
                            x = s.innerHTML;
                            s.innerHTML = x.substr(0, x.length - 1);
                        }
                    }
                    
                    //If after remove character inside the tag.
                    if (itSt.tagLength !== 0) {
                        //Inside is empty when after remove character.
                        x = s.innerHTML;
                        if (x === '') {
                            s.parentElement.removeChild(s);
                            itSe.tag.pop();
                            itSt.tagLength--;
                        }
                    }
                    
                    itD.code--;
                    itSt.typed--;
                    
                    //When remove character is finished.
                    if (itD.code === 0) reset();
                    else setTimeout(function() {runCode(it);}, itD.back);
                    break;
                    
                    //About cursor disabled
                case 'c':
                    itSe.cursor.parentElement.removeChild(itSe.cursor);
                    if (itSt.intervalAni) clearInterval(itSt.intervalAni);
                    reset();
                    break;
                    
                    //About delete
                case 'd':
                    if (!itSt.loop) {
                        x = itSe.content.textContent || itSe.content.innerText;
                        itSe.content.innerHTML = x.substr(0, x.length - itD.code);
                    }
                    reset();
                    break;
                    
                    //About run custom function
                case 'e':
                    itSe.event(itSe.content);
                    reset();
                    break;
                    
                    //About loop
                case 'l':
                    //The number of all typed characters is transferred to the 'back space'.
                    itD.code = itSt.typed;
                    itSt.i = -1;
                    itSt.loop = true;
                    itSt.readed = 'b';
                    
                    setTimeout(function() {runCode(it);}, itD.back);
                    break;
                    
                    //About stay
                case 's':
                    reset();
                    break;
            }
            
            //Exit run code
            function reset() {
                itSt.reading = false;
                itSt.readed = '';
                itD.code = 0;
                itSt.i++;
                
                setTimeout(function() {readContent(it);});
            }
        };
        
        return {
            set: setTyping
        };
    }());
}