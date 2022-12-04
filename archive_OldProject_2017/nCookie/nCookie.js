/*
 * nCookie.js (http://nslider.com)
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
if (!NP.Cookie) {
    NP.Cookie = (function() {
        var cookies = {};
        
        //Load a valid cookies on the current site.
        (function() {
            if (navigator.cookieEnabled === true) {
                var c = document.cookie, i, l, name, value, x;

                if (c !== '') {
                    for (i = 0, c = c.split('; '), l = c.length; i < l; i++) {
                        x = c[i].indexOf('=');
                        name = c[i].substring(0, x);
                        value = c[i].substring(x + 1);
                        value = decodeURIComponent(value);
                        cookies[name] = value;
                    }
                }
                
                c = i = l = name = value = x = null;
            }
        }());
        
        //Add or change cookies.
        var setCookies = function() {
            if (navigator.cookieEnabled === true) {
                var a = arguments, l = arguments.length, i, v, date;
                
                for (i = 0; i < l; i++) {
                    if (a[i].name !== '' && a[i].value !== '') {
                        v = '';
                        v += a[i].name + '=' + encodeURIComponent(a[i].value);
                        
                        if (a[i].domain) v += '; domain=' + a[i].domain;
                        
                        if (a[i].path) v += '; path=' + a[i].path;
                        
                        if (a[i].term) {
                            date = new Date();
                            date.setTime(new Date().getTime() + a[i].term * 3600000);
                            date = date.toUTCString();
                            v += '; expires=' + date;
                        }
                        
                        if (a[i].secure && a[i].secure === true) v += '; secure';
                        
                        cookies[a[i].name] = a[i].value;
                        document.cookie = v;
                    }
                }
                
                a = l = i = v = date = null;
            }
        };
        
        //Get the value of select cookie.
        var getCookies = function(name) {
            return cookies[name] || null;
        };
        
        //Remove the selected cookie.
        var removeCookies = function() {
            if (navigator.cookieEnabled === true) {
                var a = arguments, l = arguments.length, i, v, date;
                
                for (i = 0; i < l; i++) {
                    if (a[i].name !== '' && cookies[a[i].name]) {
                        v = '';
                        v += a[i].name + '=';
                        
                        if (a[i].domain) v += '; domain=' + a[i].domain;
                        
                        if (a[i].path) v += '; path=' + a[i].path;
                        
                        date = new Date();
                        date.setTime(new Date().getTime() - 1);
                        date = date.toUTCString();
                        v += '; expires=' + date;
                        
                        delete cookies[a[i].name];
                        document.cookie = v;
                    }
                }
                
                a = l = i = v = date = null;
            }
        };
        
        return {
            set: setCookies,
            get: getCookies,
            remove: removeCookies
        };
    }());
}