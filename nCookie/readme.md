# nCookie.js

Click [here](https://niceplugin.github.io/nCookie) to view demo page.

It is a plug-in created to manage cookies easily and conveniently without jQuery.

nCookie.js has the following advantages.
* Works without jQuery
* Provides API to easily add / edit / delete cookies
* Provide API to get the value of cookie
* Set the expire date of cookie in hours unit
* Can add secure property
* Automatically encode / decode cookie values
* Supports IE8 +, Chorme, FireFox, Opera, Safari, iOS, Android

***

## Install
Declare the plugin in the `<head>` tag.
```Html
<head>
    <script src = '/nCookie.js'> </script>
</head>
```

***

## API
nCookie.js provides three APIs.

### Add / Edit Cookies
`NP.Cookie.set()` can add multiple cookies by setting several parameters at once.
```Html
<script>
    NP.Cookie.set(
        {
            name: 'myCookieName',
            value: 'myCookieValue',
            domain: 'host name',
            path: '/path',
            term: 24,
            secure: true.
        },
        {
            The second parameter of the cookie to add
        }
    );
</script>
```
* **name** (required)
* **value** (required)
* **domain** (optional)
* **path** (optional)
* **term** (optional)  
-The cookie expires after hour entered from current date.  
-If not entered, a session cookie is add.
* secure (optional, default false)  
-See about cookie setting standards [link](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

### Calling Cookies
`NP.Cookie.get()` can call one cookie at a time.
```Html
<Script>
    NP.Cookie.get('myCookieName');
</ Script>
```
Returns cookie value of calling name if it exists, or `null` if it does not exist.

### Delete cookies
By default, cookies can be deleted using the `NP.Cookie.set()` API, but separate delete API is support to prevent confusion.
`NP.Cookie.remove()` can delete multiple cookies by setting several parameters at once.
```Html
<script>
    NP.Cookie.remove(
        {
            name: 'myCookieName',
            domain: 'host name',
            path: '/path'
        },
        {
            The second parameter of the cookie to delete
        }
    );
</script>
```
* **name** (required)
* **domain** (optional)
* **path** (optional)

Cookies can be deleted that `domain` and` path` must be the same value when you created cookie.

***

## Etc
Everyone is welcomed to join in improving this project.
You can join in the following ways.
* Bug report through Issues menu
* Bug report to <niceplugin@gmail.com>
* Direct code editing
* Edit readme.md or comments in javascript so other developers can understand (i'm beginner and my English is very not good)
* Use nCookie.js on your website (hahaha XD)


When you modify the code, please specify the version with the following rules.
**Version `a`.`yy`.`n`**
* `a` Separates browser support by IE. (1: IE8+, 2: IE9+, ...)
* `yy` The modified year is indicated. (17 for 2017)
* `n` The number of revisions in the current year is displayed.

### Version log
**Version 1.17.1**
* Create nCookie.js
