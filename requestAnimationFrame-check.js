(function ($) {
    'use strict';
    
    /* Gap is the ms time from the previous frame to the current frame.
    ** This is not a game speed that depends on the number of frames per second,
    ** gap / second to achieve the game speed.
    */
    function frames() {
        frames.currTime = $.Date.now();
        frames.gap = frames.currTime - frames.prevTime;
        frames.prevTime = frames.currTime;
        frames.second += frames.gap;
        frames.count += 1;
        
        // Reset count value and update fps if one second has passed.
        if (frames.second >= 1000) {
            frames.fps = frames.count;
            frames.count = 0;
            frames.second = 0;
            // $.console.log(frames.fps);
        }
        
        return frames.gap;
    }
    
    (function (frames) {
        frames.prevTime = $.Date.now();
        frames.second = 0;
        frames.count = 0;
    }(frames));
    
    function myFunc() {
        var gap;
        $.requestAnimationFrame(myFunc);
        gap = frames();
        // $.console.log(gap);
    }
    $.requestAnimationFrame(myFunc);
}(window));