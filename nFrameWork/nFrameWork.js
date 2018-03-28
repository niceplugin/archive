/*
 * nCookie.js (http://nslider.com)
 * Version: 1.17.1
 * Author: niceplugin@gmail.com
 * Author URL: https://github.com/niceplugin/nFrameWork

 * Made available under a MIT License:
 * http://www.opensource.org/licenses/mit-license.php

 * Copyright 2017.All Rights reserved by niceplugin@gmail.com
 */

if (!window.NP) {
    var NP = {};
}

//NP.FRAME object check
if (!NP.FRAME) {
    NP.FRAME = (function() {
        window.addEventListener('DOMContentLoaded', SetNPFrameWork);

        var TextAreaSys = (function () {
            
            function Change(eve) {
                var eveT = eve.target,
                    temp;
                eveT.setAttribute('style', 'height: 0');
                temp = eveT.scrollHeight + 1 + 'px';
                eveT.setAttribute('style', 'height: ' + temp);
            }
            return {
                Change: Change
            }
        }());
        
        var TabPanelSys = (function() {

            function PanelKeybordUpControl(eve, sel) {
                var eveT = eve.target,
                    tBro = sel === 'tab' ? eveT.parentElement.querySelectorAll('.' + sel + 'head') : eveT.parentElement.parentElement.querySelectorAll('.' + sel + 'head'),
                    pBro = eveT.parentElement.parentElement.querySelectorAll('.' + sel + 'body'),
                    course, i, i2, l, t1, re;

                // 
                if (eve.keyCode === 13 || eve.keyCode === 32) course = 'click';
                else if (eve.keyCode === 37 || eve.keyCode === 38) course = 'prev';
                else if (eve.keyCode === 39 || eve.keyCode === 40) course = 'next';
                else return;
                
                if (course === 'click' && eveT.className.search('selected') !== -1) return;

                // eveT set attribute
                sel === 'tab' ? t1 = 'selected' : t1 = 'expanded';
                sel === 'tab' ? re = new RegExp(/\s*selected/) : re = new RegExp(/\s*expanded/);

                for (i = 0, l = tBro.length; i < l; i++) {
                    if (eveT.compareDocumentPosition(tBro[i]) === 0) {
                        if (course === 'click') {
                            i2 = i;
                        }
                        else if (course === 'prev') {
                            i ? i2 = i - 1 : i2 = l - 1;
                        }
                        else if (course === 'next') {
                            i === l - 1 ? i2 = 0 : i2 = i + 1;
                        }
                    }

                    if (sel === 'tab') {
                        tBro[i].setAttribute('tabindex', '-1');
                        tBro[i].setAttribute('aria-' + t1, 'false');
                        tBro[i].className = tBro[i].className.replace(re, '');

                        pBro[i].setAttribute('aria-hidden', 'true');
                        pBro[i].className = pBro[i].className.replace(re, '');
                    }
                }

                if (sel === 'tab') {
                    tBro[i2].setAttribute('tabindex', '0');
                    tBro[i2].setAttribute('aria-' + t1, 'true');
                }

                if (sel === 'tab' || course === 'click') {
                    eveT.className.search('expanded') === -1 ? i = true : i = false;

                    if (sel === 'tab' || i) {
                        tBro[i2].className ? tBro[i2].className += ' ' + t1 : tBro[i2].className = t1;

                        pBro[i2].className ? pBro[i2].className += ' ' + t1 : pBro[i2].className = t1;
                        pBro[i2].setAttribute('aria-hidden', 'false');
                    }
                    else {
                        tBro[i2].className = tBro[i2].className.replace(re, '');

                        pBro[i2].className = pBro[i2].className.replace(re, '');
                        pBro[i2].setAttribute('aria-hidden', 'true');
                    }

                    if (sel === 'acc') tBro[i2].setAttribute('aria-' + t1, i);
                }
                tBro[i2].focus();
            }

            function PanelClickControl(eve, sel) {
                PanelKeybordUpControl({
                    keyCode: 13,
                    target: (function() {
                        var temp = eve.target;
                        while (!temp.className || temp.className.search(sel + 'head') === -1) {
                            temp = temp.parentElement;
                        }
                        return temp;
                    })()
                }, sel);
            }

            return {
                PanelKeybordUpControl: PanelKeybordUpControl,
                PanelClickControl: PanelClickControl
            }
        }());

        var DropMenuSys = (function() {

            function ToggleTabIndex(target, course) {
                var tchild, i, l;

                if (course === 'open') {
                    target = target.querySelector('ul');
                    ChangeTabIndex('0');
                    target = target.querySelector('ul');
                    ChangeTabIndex('-1');
                }
                else if (course === 'close') {
                    ChangeTabIndex('-1');
                }

                function ChangeTabIndex(t) {
                    if (target) {
                        tchild = target.querySelectorAll('a');
                        for (i = 0, l = tchild.length; i < l; i++) {
                            tchild[i].setAttribute('tabindex', t);
                        }
                        
                        tchild = target.querySelectorAll('li[tabindex]');
                        for (i = 0, l = tchild.length; i < l; i++) {
                            tchild[i].setAttribute('tabindex', t);
                        }
                    }
                }
            }

            function OpenChild(eve) {
                var eveT = eve.target,
                    exp;
                
                exp = eveT.getAttribute('aria-expanded');

                if (exp === 'false') {
                    eveT.className ? eveT.className += ' expanded' : eveT.className = 'expanded';
                    eveT.setAttribute('aria-expanded', 'true');
                    eveT.querySelector('ul').setAttribute('aria-hidden', 'false');

                    ToggleTabIndex(eveT, 'open');

                    // child element get focus
                    eveT = eveT.querySelector('li');
                    if (eveT.hasAttribute('tabindex')) {
                        eveT.focus();
                    }
                    else {
                        eveT.querySelector('a').focus();
                    }
                }
            }

            function CloseChild(eve, course) {
                var eveT = eve.target,
                    conT, exp;

                eveT.tagName === 'A' ? conT = eveT.parentElement.parentElement : conT = eveT.parentElement;
                exp = conT.getAttribute('aria-hidden');

                if (exp === 'false') {
                    conT.setAttribute('aria-hidden', 'true');

                    ToggleTabIndex(conT, 'close');

                    // child element get focus
                    conT = conT.parentElement;
                    conT.setAttribute('aria-expanded', 'false');
                    conT.className = conT.className.replace(/\s*expanded/, '');

                    if (course === 'esc') {
                        conT.getAttribute('tabindex') !== null ? conT.focus() : conT.querySelector('a').focus();
                    }
                    else if (course === 'all') {
                        CloseChild({target: conT}, 'all');
                    }
                    else if (course === 'one') {
                        MenuBlurControl({target: conT});
                    }
                }
            }

            function MenuKeybordUpControl(eve) {
                var eveK = eve.keyCode,
                    eveT = eve.target,
                    conT, i, l, n;

                if (eveK === 27) { // esc
                    CloseChild(eve, 'esc')
                }

                else if (eveK === 32) { // space

                    while (eveT.tagName !== 'LI') {
                        eveT = eveT.parentElement;
                    }
                    
                    OpenChild({target: eveT});
                }

                else if (eveK === 37) { // left arrow
                    arrow('drop-l', true, true);
                }

                else if (eveK === 39) { // right arrow
                    arrow('drop-r', false, true);
                }

                else if (eveK === 38) { // up arrow
                    arrow('drop-t', true, false);
                }

                else if (eveK === 40) { // down arrow
                    arrow('drop-b', false, false);
                }

                function arrow(course, min, x) {
                    var temp;

                    if (x && course === 'drop-l') {
                        temp = 'drop-r';
                    }
                    else if (x && course === 'drop-r') {
                        temp = 'drop-l';
                    }

                    while (eveT.tagName !== 'LI') {
                        eveT = eveT.parentElement;
                    }
                    //  eveT is childen of 'menubar' === 0 || !== 20
                    eveT.parentElement.getAttribute('role') === 'menubar' ? n = 0 : n = 20;
                    if (!x) {n = 0}

                    if (eveT.className && eveT.className.search(course) !== -1) {
                        OpenChild({target: eveT});
                    }
                    else if (x && eveT.parentElement.parentElement.className.search(temp) !== -1) {
                        CloseChild({target: eveT}, 'esc');
                    }
                    else {
                        conT = eveT;
                        if (x) {
                            while (conT.getAttribute('role') !== 'menubar') {
                                conT = conT.parentElement;
                            }
                        }
                        else {
                            while (conT.tagName !== 'UL') {
                                conT = conT.parentElement;
                            }
                        }
                        conT = conT.children;
                        l = conT.length - 1;

                        for (i = 0; conT[i].compareDocumentPosition(eveT) !== n; i++) {}
                        if (min) {
                            i ? i = i - 1 : i = l;
                        }
                        else {
                            i === l ? i = 0 : i = i + 1;
                        }
                        conT[i].getAttribute('tabindex') ? conT[i].focus() : conT[i].querySelector('a').focus();
                    }
                }
            }

            function MenuBlurControl(eve) {
                setTimeout(function() {Checked(document.activeElement)});

                function Checked(focusE) {
                    var eveT = eve.target,
                        conT = eve.target,
                        temp;

                    while (temp !== 'menubar') {
                        conT = conT.parentElement;
                        temp = conT.getAttribute('role');
                    }

                    if (conT.compareDocumentPosition(focusE) !== 20) {
                        CloseChild({target: eveT}, 'all');
                    }
                    else {
                        conT = eve.target;
                        temp = null;
                        while (temp !== 'UL') {
                            conT = conT.parentElement;
                            temp = conT.tagName;
                        }

                        if (conT.compareDocumentPosition(focusE) !== 20) {
                            CloseChild({target: eveT}, 'one');
                        }
                    }
                }
            }

            function MenuMouseOverControl(eve) {
                var eveT = eve.target;

                while (eveT.tagName !== 'LI') {
                    eveT = eveT.parentElement;
                }
                OpenChild({target: eveT});
                
                if (eveT.getAttribute('aria-expanded') === null) {
                    eveT.hasAttribute('tabindex') ? eveT.focus() : eveT.querySelector('a').focus();
                }
            }

            function MenuMouseOutControl(eve) {
                setTimeout(function() {CloseChild({target: document.activeElement}, 'all')});
            }

            return {
                OpenChild: OpenChild,
                CloseChild: CloseChild,
                MenuKeybordUpControl: MenuKeybordUpControl,
                MenuBlurControl: MenuBlurControl,
                MenuMouseOverControl: MenuMouseOverControl,
                MenuMouseOutControl: MenuMouseOutControl
            }
        }());

        var ToolTipSys = (function() {
            function ToolTipEnabledControl(eve) {
                var eveT = eve.target,
                    content = eveT.getAttribute('data-np-tooltip'),
                    viewC = eveT.className.match(/\s*tooltip-[blrt]/),
                    tt = document.getElementById('tooltip'),
                    ttC = tt.getAttribute('class');

                viewC ? viewC = viewC[0].replace(/\s*tooltip-/, '') : viewC = 't';

                if (!ttC || ttC.search(/\s*tooltip-[blrt]/) === -1) {
                    ttC ? tt.className += ' tooltip-' + viewC : tt.className = 'tooltip-' + viewC;
                    tt.innerHTML = content;

                    ToolTipPosition();
                }

                function ToolTipPosition() {
                    var screenW = window.innerWidth,
                        screenH = window.innerHeight,
                        scrollX = (document.documentElement && document.documentElement.scrollLeft) || 
                          document.body.scrollLeft,
                        scrollY = (document.documentElement && document.documentElement.scrollTop) || 
                          document.body.scrollTop,
                        docW = document.body.offsetWidth,
                        docH = document.body.offsetHeight,
                        tooW = tt.offsetWidth,
                        tooH = tt.offsetHeight,
                        tp = eveT.getBoundingClientRect(),
                        posX, posY;

                    if (viewC === 't') {
                        posX = (scrollX + tp.left + scrollX + tp.right - tooW) / 2;

                        posY = (scrollY + tp.top - tooH) - 9;
                    }
                    else if (viewC === 'b') {
                        posX = (scrollX + tp.left + scrollX + tp.right - tooW) / 2;

                        posY = (scrollY + tp.bottom) + 9;
                    }
                    else if (viewC === 'l') {
                        posX = (scrollX + tp.left) - tooW - 9;

                        posY = (scrollY + tp.top + scrollY + tp.bottom - tooH) / 2 / docH * docH;
                    }
                    else if (viewC === 'r') {
                        posX = (scrollX + tp.right) + 9;

                        posY = (scrollY + tp.top + scrollY + tp.bottom - tooH) / 2 / docH * docH;
                    }

                    posX = posX.toFixed(2);
                    posY = posY.toFixed(2);
                    tt.setAttribute('style', 'top: ' + posY + 'px; left: ' + posX + 'px;');
                }
            }

            function ToolTipDisabledControl(eve) {
                var eveT = eve.target,
                    content = eveT.getAttribute('data-np-tooltip'),
                    tt = document.getElementById('tooltip'),
                    ttC = tt.getAttribute('class');

                if (ttC && ttC.search(/\s*tooltip-[blrt]/) !== -1) {
                    tt.className = tt.className.replace(/\s*tooltip-[blrt]/, '');
                    tt.innerHTML = '';
                }
            }
            return {
                ToolTipEnabledControl: ToolTipEnabledControl,
                ToolTipDisabledControl: ToolTipDisabledControl
            }
        }());

        var PopupSys = (function() {

            function PopupActive(t, eve) {
                var b = document.body,
                    temp;

                b.className ? b.className += ' popup-active' : b.className = 'popup-active';

        //        eve.target.setAttribute('aria-expanded', 'true');

                t.setAttribute('aria-hidden', 'false');
                t.setAttribute('aria-expanded', 'true');
                t.className += ' popuped';
                t.focus();
            }

            function PopupClose(t, eve) {
                var b = document.body,
                    temp = document.querySelector('[data-np-popup="' + t.getAttribute('id') + '"]');

        //        temp.setAttribute('aria-expanded', 'false');

                t.className = t.className.replace(/\s*popuped/, '');
                t.setAttribute('aria-hidden', 'true');
                t.setAttribute('aria-expanded', 'false');

                b.className = b.className.replace(/\s*popup-active/, '');

                temp.focus();
            }

            function LayoutPopupClickControl(eve) {
                var b = document.body,
                    eveT = eve.target,
                    cloT, temp;

                if (eveT.tagName === "BODY" && eveT.className.search('popup-active') !== -1) {
                    cloT = document.querySelector('.popuped');
                    temp = document.querySelector('[data-np-popup="' + cloT.getAttribute('id') + '"]');

            //        temp.setAttribute('aria-expanded', 'false');

                    cloT.className = cloT.className.replace(/\s*popuped/, '');
                    cloT.setAttribute('aria-hidden', 'true');
                    cloT.setAttribute('aria-expanded', 'false');

                    b.className = b.className.replace(/\s*popup-active/, '');

                    temp.focus();
                }
            }

            function LayoutPopupKeyUpControl(eve) {
                var eveK = eve.keyCode,
                    eveT = eve.target;

                if (eveK === 27) {
                    while (eveT.className.search('popup-box') === -1) {
                        eveT = eveT.parentElement;
                    }
                    PopupSys.PopupClose(eveT);
                }
            }

            function LayoutPopupBlurControl(eve) {
                setTimeout(function() {Checked(document.activeElement)});

                function Checked(focusE) {
                    var eveK = eve.keyCode,
                        eveT = eve.target;

                    while (eveT.className.search('popup-box') === -1) {
                        eveT = eveT.parentElement;
                    }

                    if (eveT.compareDocumentPosition(focusE) === 2 || eveT.compareDocumentPosition(focusE) === 4) {
                        PopupSys.PopupClose(eveT);
                    }
                }
            }

            return {
                PopupActive: PopupActive,
                PopupClose: PopupClose,
                LayoutPopupClickControl: LayoutPopupClickControl,
                LayoutPopupKeyUpControl: LayoutPopupKeyUpControl,
                LayoutPopupBlurControl: LayoutPopupBlurControl
            }
        }());

        var SliderSys = (function() {

            var slide = {box: [], 
                        item: [],
                        itemli: [],
                        l: [],
                        goto: [],
                        page: [],
                        state: [],
                        speed: [],
                        interval: [],
                        ratioHeight: []},
                touch = {startX: 0,
                         startY: 0,
                         enable: null,
                         boxWidth: 0,
                         drew: 0};

            function SliderPrevControl(no) {
                var temp;

                SlideTransitionValue(0, no, temp);

                if (slide.page[no] === 0) {
                    slide.page[no] = slide.l[no];
                }
                else {
                    --slide.page[no];
                }

                SlideTransitionValue(1, no, temp);
            }

            function SliderNextControl(no) {
                var temp;

                SlideTransitionValue(0, no, temp);

                if (slide.page[no] === slide.l[no]) {
                    slide.page[no] = 0;
                }
                else {
                    ++slide.page[no];
                }

                SlideTransitionValue(1, no, temp);
            }

            function SliderGotoControl(no, page) {

                if (slide.page[no] !== page) {
                    SlideTransitionValue(0, no);

                    slide.page[no] = page;

                    SlideTransitionValue(1, no);
                }
            }

            function SlideTransitionValue(i , no, temp) {
                if (!i) {
                    temp = slide.goto[no][slide.page[no]];
                    temp.className = temp.className.replace(/\s*selected/, '');

                }
                else {
                    temp = 'transform: translate(' + (-100 * slide.page[no]) + '%, 0)';
                    slide.item[no].setAttribute('style', temp);

                    temp = slide.goto[no][slide.page[no]];
                    temp.className += ' selected';
                }
            }

            function SliderPlayToggleControl(no) {
                if (slide.state[no] === 2) {
                    slide.item[no].className += ' played';

                    slide.state[no] = 1;
                }
                else {
                    slide.item[no].className = slide.item[no].className.replace(/\s*played/, '');

                    slide.state[no] = 2;
                }
            }

            function SliderItemFocusControl(no, focuspage, eve) {
                if (slide.page[no] !== focuspage) {
                    slide.box[no].scrollLeft = 0;
                    SliderGotoControl(no, focuspage);
                }
            }

            function SliderBlurControl(eve, no) {
                setTimeout(function() {Checked(document.activeElement)});

                function Checked(focusE) {
                    if (slide.box[no].compareDocumentPosition(focusE) !== 20 && slide.state[no] === 1) {
                        slide.state[no] = 0;

                        slide.interval[no] = setInterval(function() {SliderNextControl(no)}, slide.speed[no]);
                    }
                }
            }

            function SliderMouseOverControl(eve, no) {
                if (slide.state[no] === 0) {
                    slide.state[no] = 1;

                    clearInterval(slide.interval[no]);
                }
            }

            function SliderMouseOutControl(eve, no) {
                if (slide.state[no] === 1) {
                    slide.state[no] = 0;

                    slide.interval[no] = setInterval(function() {SliderNextControl(no)}, slide.speed[no]);
                }
            }

            function SliderTouchStartControl(eve, no) {
                touch.startX = eve.touches[0].screenX;
                touch.startY = eve.touches[0].screenY;
                touch.boxWidth = parseInt(getComputedStyle(slide.box[no]).getPropertyValue('width'), 10);
            }

            function SliderTouchMoveControl(eve, no) {
                var x, y, temp;

                if (touch.enable === null) {
                    x = Math.abs(touch.startX - eve.touches[0].screenX);
                    y = Math.abs(touch.startY - eve.touches[0].screenY);

                    y < x / 2 ? touch.enable = true : touch.enable = false;
                }
                else if (touch.enable === true){
                    eve.preventDefault();

                    if (slide.state[no] !== 2) {
                        slide.state[no] = 1;

                        clearInterval(slide.interval[no]);
                    }

                    x = touch.startX - eve.touches[0].screenX;
                    touch.drew = (-slide.page[no] + (-x / touch.boxWidth)) * 100;

                    if (touch.drew > 33) {
                        touch.drew = 30;
                    }
                    else if ((slide.l[no] * 100) + touch.drew < -33) {
                        touch.drew = -((slide.l[no] * 100) + 30);
                    }

                    temp = 'transform: translate(' + (touch.drew) + '%, 0); transition: transform 0s';
                    slide.item[no].setAttribute('style', temp);
                }
            }

            function SliderTouchEndControl(eve, no) {
                var way = touch.drew + (slide.page[no] * 100),
                    i, temp;

                if (touch.enable === true) {
                    // left way
                    if (way > 30) {
                        i = Math.ceil((way - 30) * 0.01);
                        i = slide.page[no] - i;

                        SliderGotoControl(no, i);
                    }
                    //right way
                    else if (way < -30) {
                        i = Math.floor((way + 30) * 0.01);
                        i = slide.page[no] - i;

                        SliderGotoControl(no, i);
                    }
                    //on place
                    else {
                        temp = 'transform: translate(' + (-100 * slide.page[no]) + '%, 0)';
                        slide.item[no].setAttribute('style', temp);
                    }

                    // play
                    if (slide.state[no] === 1) {
                        slide.state[no] = 0;

                        slide.interval[no] = setInterval(function() {SliderNextControl(no)}, slide.speed[no]);
                    }
                }

                touch.enable = null;
            }

            function SliderResizeControl() {
                var compS, boxX, boxY, ratio, temp, i, l;
                
                for (i = 0, l = slide.box.length; i < l; i++) {
                    compS = getComputedStyle(slide.box[i]);
                    boxX = parseInt(compS.maxWidth, 10);
                    temp = parseInt(compS.width, 10);
                    
                    if (boxX !== temp || (boxX === 100 && temp === 100)) {
                        boxY = parseInt(compS.maxHeight, 10);
                        ratio = boxY / boxX;
                        slide.ratioHeight[i] = 'height: ' + Math.round(temp * ratio) + 'px';
                        
                        slide.box[i].setAttribute('style', slide.ratioHeight[i])
                    }
                }
            }

            return {
                slide: slide,
                SliderPrevControl: SliderPrevControl,
                SliderNextControl: SliderNextControl,
                SliderGotoControl: SliderGotoControl,
                SlideTransitionValue: SlideTransitionValue,
                SliderPlayToggleControl: SliderPlayToggleControl,
                SliderItemFocusControl: SliderItemFocusControl,
                SliderBlurControl: SliderBlurControl,
                SliderMouseOverControl: SliderMouseOverControl,
                SliderMouseOutControl: SliderMouseOutControl,
                SliderTouchStartControl: SliderTouchStartControl,
                SliderTouchMoveControl: SliderTouchMoveControl,
                SliderTouchEndControl: SliderTouchEndControl,
                SliderResizeControl: SliderResizeControl
            }
        }());
        
        var SpySys = (function() {
            var arr, maxIndex, prevIndex = -1, nowIndex = 0, spyOffset;

            function SpyScrollControll(eve) {
                var scrollMaximum = document.documentElement.scrollHeight - window.innerHeight,
                    pageYOffset = window.pageYOffset;

                spied();

                function spied() {
                    var prevRect = {},
                        nowRect = {},
                        temp;

                    if (nowIndex <= maxIndex) {
                        temp = arr[nowIndex].target.getBoundingClientRect();
                        nowRect.top = temp.top - spyOffset;
                        nowRect.bottom = temp.bottom - spyOffset;
                    }
                    
                    if (prevIndex >= 0) {
                        temp = arr[prevIndex].target.getBoundingClientRect();
                        prevRect.top = temp.top - spyOffset;
                        prevRect.bottom = temp.bottom - spyOffset;
                    }

                    if (prevIndex !== nowIndex && nowIndex <= maxIndex && nowRect.top <= 0) {
                        if (prevIndex >= 0) {
                            temp = arr[prevIndex].list;
                            temp.className = temp.className.replace(/\s*spied/, '');
                        }

                        temp = arr[nowIndex].list;
                        temp.className ? temp.className += ' spied' : temp.className = 'spied';

                        prevIndex++;
                        nowIndex++;
                        if (nowIndex > maxIndex) {
                            nowIndex = maxIndex;
                        }
                        
                        spied();
                    }

                    if (prevIndex >= 0 && prevRect.top > 0) {
                        temp = arr[prevIndex].list;
                        temp.className = temp.className.replace(/\s*spied/, '');

                        if (prevIndex - 1 >= 0) {
                            temp = arr[prevIndex - 1].list;
                            if (!temp.className) {
                                temp.className = 'spied'
                            }
                            else if (temp.className.search('spied') === -1) {
                                temp.className += ' spied';
                            }
                        }

                        prevIndex--;
                        nowIndex--;
                        if (prevIndex === nowIndex) {
                            nowIndex = maxIndex;
                        }

                        spied();
                    }

                    if (scrollMaximum <= pageYOffset && prevIndex !== maxIndex) {
                        temp = arr[prevIndex].list;
                        temp.className = temp.className.replace(/\s*spied/, '');

                        prevIndex = maxIndex;
                        nowIndex = maxIndex + 1;

                        temp = arr[prevIndex].list;
                        temp.className ? temp.className += ' spied' : temp.className = 'spied';
                    }
                    
                    if (prevIndex !== -1 && arr[prevIndex].level !== 1) {
                        lvUp(prevIndex);
                    }
                    
                    if (prevIndex > 0 && arr[prevIndex].level < arr[prevIndex - 1].level) {
                        lvDown(prevIndex - 1);
                    }
                    
                    function lvUp(p) {
                        p = arr[p].parentListIndex;
                        temp = arr[p].list;
                        
                        if (!temp.className) {
                            temp.className = 'spied'
                        }
                        else if (temp.className.search('spied') === -1) {
                            temp.className += ' spied';
                        }
                    
                        if (p !== -1 && arr[p].level !== 1) {
                            lvUp(p);
                        }
                    }
                    
                    function lvDown(p) {
                        p = arr[p].parentListIndex;
                        temp = arr[p].list;
                        temp.className = temp.className.replace(/\s*spied/, '');
                    
                        if (p > 0 && arr[prevIndex].level < arr[p].level) {
                            lvDown(p);
                        }
                    }
                }
            }

            function SpyClickControll(eve) {
                var s;

                eve.preventDefault();

                s = eve.target.getAttribute('href').replace('#', '');
                s = document.getElementById(s).getBoundingClientRect().top - spyOffset + 1;

                scrollBy(0, s);
            }

            function setArr(a, b) {
                arr = a;
                maxIndex = arr.length - 1;

                spyOffset = b;
            }

            return {
                setArr: setArr,
                SpyScrollControll: SpyScrollControll,
                SpyClickControll: SpyClickControll
            }

        }());

        function SetNPFrameWork() {
            SetTextArea();
            SetPanel('tab');
            SetPanel('acc');
            SetDropMenu();
            SetToolTip();
            SetLayerPopup()
            SetDataNPFor();
            SetSlider();
            SetScrollSpy();
        }

        function SetDataNPFor() {
            var queryE = document.querySelectorAll('[data-np-for]'),
                forId,
                i, l;

            for (i = 0, l = queryE.length; i < l; i++) {
                forId = queryE[i].getAttribute('data-np-for');
                queryE[i].setAttribute('aria-labelledby', forId);
                queryE[i].removeAttribute('data-np-for');
            }
        }
        
        function SetTextArea() {
            var queryE = document.querySelectorAll('textarea:not(.not-auto-resize)'),
                i, l;
            
            for (i = 0, l = queryE.length; i < l; i++) {
                queryE[i].addEventListener('input', function(eve) {TextAreaSys.Change(eve)})
            }
        }

        function SetPanel(sel) {
            var queryE, qHead, qBody, i, l, i2, l2, t1;

            queryE = document.querySelectorAll('.' + sel + 'wrap');

            for (i = 0, l = queryE.length; i < l; i++) {
                qHead = queryE[i].querySelectorAll('.' + sel + 'head');
                qBody = queryE[i].querySelectorAll('.' + sel + 'body');

                // qHead parent element set 'role' attribute
                if (sel === 'tab') qHead[0].parentElement.setAttribute('role', 'tablist');

                // qHead set attribute
                for (i2 = 0, l2 = qHead.length; i2 < l2; i2++) {
                    sel === 'tab' ? qHead[i2].setAttribute('role', 'tab') : qHead[i2].setAttribute('role', 'button');

                    t1 =  qHead[i2].getAttribute('data-np-for');
                    qHead[i2].setAttribute('aria-controls', t1);
                    qHead[i2].removeAttribute('data-np-for');

                    if (sel === 'tab') {
                        i2 ? qHead[i2].setAttribute('aria-selected', 'false') : qHead[i2].setAttribute('aria-selected', 'true');
                        i2 ? qHead[i2].setAttribute('tabindex', '-1') : qHead[i2].setAttribute('tabindex', '0');
                    }
                    else {
                        qHead[i2].setAttribute('aria-expanded', 'false'); qHead[i2].setAttribute('tabindex', '0');
                    }

                    if (i2 === 0 && sel === 'tab') qHead[i2].className ? qHead[i2].className += ' selected' : qHead[i2].className = 'selected';

                    // add event handler
                    qHead[i2].addEventListener('keydown', function(eve) {KeybordDownPreventDefaultControl(eve, {arrow: true, space: true})});
                    qHead[i2].addEventListener('keyup', function(eve) {TabPanelSys.PanelKeybordUpControl(eve, sel)});
                    qHead[i2].addEventListener('click', function(eve) {TabPanelSys.PanelClickControl(eve, sel)});
                }

                // qBody set attribute
                for (i2 = 0, l2 = qBody.length; i2 < l2; i2++) {
                    sel === 'tab' ? qBody[i2].setAttribute('role', 'tabpanel') : qBody[i2].setAttribute('role', 'region');

                    t1 =  qBody[i2].getAttribute('data-np-for');
                    qBody[i2].setAttribute('aria-labelledby', t1);
                    qBody[i2].removeAttribute('data-np-for');

                    i2 || sel === 'acc' ? qBody[i2].setAttribute('aria-hidden', 'true') : qBody[i2].setAttribute('aria-hidden', 'false');

                    if (i2 === 0 && sel === 'tab') qBody[i2].className ? qBody[i2].className += ' selected' : qBody[i2].className = 'selected';
                }
            }
        }

        function SetDropMenu() {
            var queryE = document.querySelectorAll('.menubar'),
                queryLi, queryUl, queryA, i, l, i2, l2, t1, t2;

            // '.menubar' set 'role' attribute
            for (i = 0, l = queryE.length; i < l; i++) {
                queryUl = queryE[i].querySelectorAll('ul');
                queryLi = queryE[i].querySelectorAll('li');
                queryA = queryE[i].querySelectorAll('a');

                queryE[i].setAttribute('role', 'menubar');

                LiSetAttribute();
                UlSetAttribute();
                ASetAttribute();

                queryE[i].addEventListener('mouseleave', DropMenuSys.MenuMouseOutControl);
            }

            // 'li' set attribute
            function LiSetAttribute() {
                for (i2 = 0, l2 = queryLi.length; i2 < l2; i2++) {
                    queryLi[i2].setAttribute('role', 'menuitem');

                    if (queryLi[i2].className.search('drop-') !== -1) {
                        queryLi[i2].setAttribute('aria-haspopup', 'true');
                        queryLi[i2].setAttribute('aria-expanded', 'false');
                    }
                    
                    if (queryLi[i2].firstElementChild && queryLi[i2].firstElementChild.tagName !== 'A') {
                        
                        t1 = queryLi[i2].parentElement.getAttribute('role');
                        t1 === 'menubar' ? queryLi[i2].setAttribute('tabindex', '0') : queryLi[i2].setAttribute('tabindex', '-1');

                        AddEventListener(queryLi[i2]);
                    }
                }
            }

            // 'ul' set attribute
            function UlSetAttribute() {
                for (i2 = 0, l2 = queryUl.length; i2 < l2; i2++) {
                    queryUl[i2].setAttribute('role', 'menu');

                    t1 = queryUl[i2].previousElementSibling;
                    if (t1) {
                        queryUl[i2].setAttribute('aria-label', t1.textContent);
                    }

                    queryUl[i2].setAttribute('aria-hidden', 'true');
                }
            }

            // 'a' set attribute
            function ASetAttribute() {
                for (i2 = 0, l2 = queryA.length; i2 < l2; i2++) {
                    t1 = queryA[i2].parentElement.parentElement.getAttribute('role');
                    t1 === 'menubar' ? queryA[i2].setAttribute('tabindex', '0') : queryA[i2].setAttribute('tabindex', '-1');

                    AddEventListener(queryA[i2]);
                }
            }

            // add event listener
            function AddEventListener(target) {

                    target.addEventListener('mouseover', DropMenuSys.MenuMouseOverControl);
                    target.addEventListener('blur', DropMenuSys.MenuBlurControl);
                    target.addEventListener('keydown', function(eve) {KeybordDownPreventDefaultControl(eve, {arrow: true, space: true})});
                    target.addEventListener('keyup', DropMenuSys.MenuKeybordUpControl);
            }
        }

        function SetToolTip() {
            var isTooltip = document.getElementById('tooltip'),
                queryE = document.querySelectorAll('[data-np-tooltip]'),
                getAtt,
                i, l;

            if (isTooltip) {
                isTooltip.setAttribute('role', 'tooltip');
                isTooltip.setAttribute('aria-live', 'assertive');
            }

            for (i = 0, l = queryE.length; i < l; i++) {
                getAtt = queryE[i].getAttribute('data-np-tooltip');
                queryE[i].setAttribute('aria-describedby', 'tooltip');

                queryE[i].addEventListener('mouseenter', ToolTipSys.ToolTipEnabledControl);
                queryE[i].addEventListener('mouseleave', ToolTipSys.ToolTipDisabledControl);
                queryE[i].addEventListener('focus', ToolTipSys.ToolTipEnabledControl);
                queryE[i].addEventListener('blur', ToolTipSys.ToolTipDisabledControl);
            }
        }

        function SetLayerPopup() {
            var queryE, i, l, t1, t2;

            // 'popup-box' set attribute
            queryE = document.querySelectorAll('.popup-box');
            for (i = 0, l = queryE.length; i < l; i++) {
                queryE[i].setAttribute('role', 'dialog');
                queryE[i].setAttribute('aria-hidden', 'true');
                queryE[i].setAttribute('aria-expanded', 'false');
                queryE[i].setAttribute('tabindex', '0');

                queryE[i].addEventListener('keyup', PopupSys.LayoutPopupKeyUpControl);
                queryE[i].addEventListener('focusout', PopupSys.LayoutPopupBlurControl);
            }

            // popup control button addEventListener
            queryE = document.querySelectorAll('[data-np-popup]')
            for (i = 0, l = queryE.length; i < l; i++) {
                t1 = queryE[i].getAttribute('data-np-popup');

                if (t1 === '') { // close btn
                    t2 = queryE[i];
                    while (t1 !== 'dialog') {
                        t2 = t2.parentElement;
                        t1 = t2.getAttribute('role');
                    }
                    AddEvent(queryE[i], t2, true);
                }
                else {
                    queryE[i].setAttribute('aria-haspopup', 'true');
                    t1 = document.getElementById(t1);
                    AddEvent(queryE[i], t1, false);
                }
            }

            document.body.addEventListener('click', PopupSys.LayoutPopupClickControl);

            function AddEvent(e, t, c) {
                if (c) {
                    e.addEventListener('click', function(eve) {PopupSys.PopupClose(t, eve)});
                }
                else {
                    e.addEventListener('click', function(eve) {PopupSys.PopupActive(t, eve)});
                }
            }
        }

        function SetSlider() {
            var slide = SliderSys.slide,
                queryE, temp, i, l, i2, l2;

            queryE = document.querySelectorAll('.slide-box');
            
            if (queryE) {

                window.addEventListener('resize', function (eve) {SliderSys.SliderResizeControl(eve)});

                for (i = 0, l = queryE.length; i < l; i++) {
                    addEvent(queryE[i], 'focusin', 'SliderMouseOverControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'focusout', 'SliderBlurControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'mouseover', 'SliderMouseOverControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'mouseout', 'SliderMouseOutControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'touchstart', 'SliderTouchStartControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'touchmove', 'SliderTouchMoveControl(eve, ' + i + ')');
                    addEvent(queryE[i], 'touchend', 'SliderTouchEndControl(eve, ' + i + ')');

                    slide.box[i] = queryE[i];
                    slide.page[i] = 0;
                    slide.ratioHeight[i] = '';

                    temp = queryE[i].getAttribute('data-np-slide-speed');
                    temp ? slide.speed[i] = parseInt(temp, 10) : slide.speed[i] = 4000;
                    queryE[i].removeAttribute('data-np-slide-speed');

                    temp = slide.box[i].querySelector('.slide-item');
                    slide.item[i] = temp;

                    slide.item[i].className.search('played') === -1 ? slide.state[i] = 2 : slide.state[i] = 0;

                    temp = slide.box[i].querySelectorAll('.slide-item>li');
                    slide.l[i] = temp.length - 1;
                    for(i2 = 0, l2 = temp.length; i2 < l2; i2++) {
                        if (typeof slide.itemli[i] !== 'object') {
                            slide.itemli[i] = [];
                        }
                        slide.itemli[i][i2] = temp[i2];

                        temp[i2].setAttribute('tabindex', '0');
                        addEvent(temp[i2], 'focusin', 'SliderItemFocusControl(' + i + ', ' + i2 + ', eve)');
                    }

                    temp = slide.box[i].querySelector('.slide-btn-prne');
                    if (temp) {
                        temp.setAttribute('aria-hidden', 'true');
                    }

                    temp = slide.box[i].querySelectorAll('.slide-btn-prne>li');
                    for (i2 = 0, l2 = temp.length; i2 < l2; i2++) {
                        i2 ? addEvent(temp[i2], 'click', 'SliderNextControl(' + i + ')') : addEvent(temp[i2], 'click', 'SliderPrevControl(' + i + ')');
                    }

                    temp = slide.box[i].querySelector('.slide-btn-goto');
                    if (temp) {
                        temp.setAttribute('aria-hidden', 'true');
                    }

                    temp = slide.box[i].querySelectorAll('.slide-btn-goto>li');
                    for (i2 = 0, l2 = temp.length; i2 < l2; i2++) {
                        if (typeof slide.goto[i] !== 'object') {
                            slide.goto[i] = [];
                        }
                        slide.goto[i][i2] = temp[i2];

                        if (!i2) {
                            temp[i2].className += ' selected';
                        }
                        addEvent(temp[i2], 'click', 'SliderGotoControl(' + i + ', ' + i2 + ')');
                    }

                    temp = slide.box[i].querySelector('.slide-btn-play');
                    if (temp) {
                        temp.setAttribute('aria-hidden', 'true');
                        addEvent(temp, 'click', 'SliderPlayToggleControl(' + i + ')');
                    }

                    if (slide.state[i] === 0) {
                        addInterval(i);
                    }
                }

                function addEvent(target, handler, func) {
                    target.addEventListener(handler, function(eve) {eval('SliderSys.' + func)});
                }

                function addInterval(i) {
                    slide.interval[i] = setInterval(function() {SliderSys.SliderNextControl(i)}, slide.speed[i]);
                }

                SliderSys.SliderResizeControl();
            }
        }

        function SetScrollSpy() {
            var queryB = document.getElementById('spy-box'),
                queryA = queryB && queryB.querySelectorAll('[href^="#"]:not([href="#"])'),
                arr = [],
                temp, OBJ, i, l;

            function OBJ(q) {        
                temp = q.getAttribute('href').replace('#', '');
                temp = document.getElementById(temp);

                if (temp) {
                    this.list = q;
                    this.target = temp;

                    temp = 0;
                    while (q.getAttribute('id') !== 'spy-box') {
                        q = q.parentElement;
                        if (q.tagName === 'UL') {
                            temp++;
                        }
                    }
                    this.level = temp;

                    temp === 1 ? this.parentListIndex = null : this.parentListIndex = queryParent(temp - 1);
                }
                else {
                    return null
                }

                function queryParent(lv) {
                    for (var i = arr.length - 1; i >= 0; i--) {
                        if (arr[i].level === lv) {
                            return i
                        }
                    }
                    return null
                }
            }

            if (queryB && queryA) {
                for (i = 0, l = queryA.length; i < l; i++) {
                    temp = new OBJ(queryA[i]);

                    if (temp) {
                        arr.push(temp);

                        queryA[i].addEventListener('click', SpySys.SpyClickControll)
                    }
                }
            }

            if (arr.length !== 0) {
                temp = parseInt(queryB.getAttribute('data-np-spyoffset'));
                temp ? temp : temp = 0;

                SpySys.setArr(arr, temp);

                window.addEventListener('scroll', SpySys.SpyScrollControll);
            }
        }

        function KeybordDownPreventDefaultControl(eve, kb) {
            var ekc = eve.keyCode;

            // keybord 'space' control
            if (kb.space && ekc === 32) {
                eve.preventDefault();
            }

            // keybord 'arrow' control
            else if (kb.arrow && 37 <= ekc && ekc <= 40) {
                eve.preventDefault();
            }
        }
    }());
}