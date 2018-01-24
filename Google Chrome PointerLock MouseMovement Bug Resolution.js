(function (window) {
    'use strict';
    
    // This method is for chrome bug.
    function movementCoordinate(e) {
        if (movementCoordinate.chrome) {// If the runtime is chrome.
            // movementX bug check.
            if ((movementCoordinate.px > 0 && e.movementX >= 0) || (movementCoordinate.px < 0 && e.movementX <= 0)) {
                movementCoordinate.px = movementCoordinate.x = e.movementX;
            } else if (movementCoordinate.px === 0) {
                movementCoordinate.px = e.movementX;
                movementCoordinate.x = 0;
            } else if ((movementCoordinate.px > 0 && e.movementX < 0) || (movementCoordinate.px < 0 && e.movementX > 0)) {
                movementCoordinate.px = movementCoordinate.x = 0;
            }
            
            // movementY bug check.
            if ((movementCoordinate.py > 0 && e.movementY >= 0) || (movementCoordinate.py < 0 && e.movementY <= 0)) {
                movementCoordinate.py = movementCoordinate.y = e.movementY;
            } else if (movementCoordinate.py === 0) {
                movementCoordinate.py = e.movementY;
                movementCoordinate.y = 0;
            } else if ((movementCoordinate.py > 0 && e.movementY < 0) || (movementCoordinate.py < 0 && e.movementY > 0)) {
                movementCoordinate.py = movementCoordinate.y = 0;
            }
            
            return {
                x: movementCoordinate.x,
                y: movementCoordinate.y
            };
        } else {// If the runtime is not chrome.
            return {
                x: e.movementX,
                y: e.movementY
            };
        }
    }
    
    // 'movementCoordinate' property set.
    (function (e) {
        var isChrome = window.navigator.userAgent.search('Chrome');
        if (isChrome !== -1) {
            (e.chrome = true);
        } else {
            (e.chrome = false);
        }
        e.px = 0;
        e.py = 0;
        e.x = 0;
        e.y = 0;
    }(movementCoordinate));
    
    
    function myFunc(e) {
        var movement = movementCoordinate(e);
        window.console.log(movement.x, movement.y);
        /*
        It is not perfect.
        But it would be useful as a bug alternative.
        */
    }
    
    // This event listener is for test.
    window.document.body.addEventListener('click', function () {
        if (window.document.pointerLockElement) {
            window.document.exitPointerLock();
            window.document.body.removeEventListener('mousemove', myFunc);
        } else {
            window.document.body.requestPointerLock();
            window.document.body.addEventListener('mousemove', myFunc);
        }
    });
    window.document.addEventListener('pointerlockchange', function () {
        if (window.document.pointerLockElement) {
            window.document.body.addEventListener('mousemove', myFunc);
        } else {
            window.document.body.removeEventListener('mousemove', myFunc);
        }
    });

}(window));