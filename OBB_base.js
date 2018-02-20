(function ($) {
    'use strict';
    
    var canvas = $.document.getElementById('canvas'),
        c = canvas.getContext('2d'),
        // x, y is the center point of the shape.
        // w, h are the width and height of the shape
        // hw, hh is the half value of w, h.
        // r is the degree rotation angle of the shape.
        rect = [ { x: 100, y: 100, hw: 30, hh: 40, w: 60, h: 80, r: 0 },
                { x: 200, y: 110, hw: 50, hh: 50, w: 100, h: 100, r: 0 } ];
    
    function getDistanceVector(a, b) {// Distance vector of two shapes.
        return {
            x: $.Math.abs(a.x - b.x),
            y: $.Math.abs(a.y - b.y)
        };
    }
    
    function getHeightVector(a) {// Vertical (y-axis) vector of the shape
        var r = $.Math.PI * a.r / 180;
        return {
            x: a.hh * -$.Math.sin(r),
            y: a.hh * $.Math.cos(r)
        };
    }
    
    function getWidthVector(a) {// Horizontal (x-axis) vector of the shape
        var r = $.Math.PI * a.r / 180;
        return {
            x: a.hw * $.Math.cos(r),
            y: a.hw * $.Math.sin(r)
        };
    }
    
    function getUnitVector(v) {// get unit vector
        return {
            x: v.x / $.Math.sqrt($.Math.pow(v.x, 2) + $.Math.pow(v.y, 2)),
            y: v.y / $.Math.sqrt($.Math.pow(v.x, 2) + $.Math.pow(v.y, 2))
        };
    }
    
    function absDotVector(a, b) {// The dot product of a vector.
        return $.Math.abs(a.x * b.x + a.y * b.y);
    }
    
    function obbCheck(a, b) {
        var i, j, sum,
            dist = getDistanceVector(a, b),
            vecA = [],
            vecB = [],
            unit;
        
        vecA.push(getHeightVector(a));
        vecA.push(getWidthVector(a));
        vecB.push(getHeightVector(b));
        vecB.push(getWidthVector(b));
        
        // 콘솔 찍히는 것은 오랫동안 코드 방치해서 감을 잃었을 경우 시각적으로 데이터 확인을 위한 것임. 실제 사용시에는 지울것.
        $.console.log('A도형 ==============================');
        for (i = 0; i < vecA.length; i += 1) {
            unit = getUnitVector(vecA[i]);
            sum = 0;
            if (i === 0) {
                sum += a.hh;
            } else {
                sum += a.hw;
            }
            for (j = 0; j < vecB.length; j += 1) {
                sum = sum + absDotVector(vecB[j], unit);
            }
            $.console.log(i + '기준백터(' + $.Math.floor(unit.x * 100) / 100 + ', ' + $.Math.floor(unit.y * 100) / 100 + '), 거리내적' + $.Math.floor(absDotVector(dist, unit) * 100) / 100 + ', 투영내적' + sum);
            if (absDotVector(dist, unit) > sum) {
                return true; // no collision
            }
        }
        $.console.log('B도형 ==============================');
        for (i = 0; i < vecB.length; i += 1) {
            unit = getUnitVector(vecB[i]);
            sum = 0;
            if (i === 0) {
                sum += b.hh;
            } else {
                sum += b.hw;
            }
            for (j = 0; j < vecA.length; j += 1) {
                sum = sum + absDotVector(vecA[j], unit);
            }
            $.console.log(i + '기준백터(' + $.Math.floor(unit.x * 100) / 100 + ', ' + $.Math.floor(unit.y * 100) / 100 + '), 거리내적' + $.Math.floor(absDotVector(dist, unit) * 100) / 100 + ', 투영내적' + sum);
            if (absDotVector(dist, unit) > sum) {
                return true; // no collision
            }
        }
        return false; // collision
    }
    
    function log() {
        var dv = getDistanceVector(rect[0], rect[1]),
            wv = getWidthVector(rect[0]),
            hv = getHeightVector(rect[0]),
            uv;
        c.fillText('dv = (' + dv.x + ', ' + dv.y + ')', 10, 10);
        c.fillText('wv = (' + wv.x + ', ' + wv.y + ')', 10, 20);
        c.fillText('hv = (' + hv.x + ', ' + hv.y + ')', 10, 30);
        uv = getUnitVector(wv);
        c.fillText('w-uv = (' + uv.x + ', ' + uv.y + ')', 10, 40);
        uv = getUnitVector(hv);
        c.fillText('h-uv = (' + uv.x + ', ' + uv.y + ')', 10, 50);
    }
    
    // Draw function :)
    function draw() {
        var i;
//        $.requestAnimationFrame(draw);
        
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.strokeRect(0, 0, canvas.width, canvas.height);
        
        c.strokeStyle = '#888888';
        for (i = 0; i < canvas.width; i += 10) {
            c.beginPath();
            c.moveTo(i, 0);
            c.lineTo(i, canvas.height);
            c.stroke();
            c.closePath();
        }
        for (i = 0; i < canvas.height; i += 10) {
            c.beginPath();
            c.moveTo(0, i);
            c.lineTo(canvas.width, i);
            c.stroke();
            c.closePath();
        }
        
        c.strokeStyle = '#0000ff';
        for (i = 0; i < rect.length; i += 1) {
            c.save();
            c.translate(rect[i].x, rect[i].y);
            c.beginPath();
            c.arc(0, 0, 1, 0, 2 * $.Math.PI);
            c.fill();
            c.rotate(rect[i].r * Math.PI / 180);
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, -rect[i].hh);
            c.moveTo(0, 0);
            c.lineTo(rect[i].hw, 0);
            c.stroke();
            c.strokeRect(-rect[i].hw, -rect[i].hh, rect[i].w, rect[i].h);
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.restore();
        }
        
        if (obbCheck(rect[0], rect[1])) {
            c.fillText('No collision', 25, 25);
        } else {
            c.fillText('Collision', 25, 25);
        }
    }
    $.requestAnimationFrame(draw);
    
    /* 테스트를 위한 이벤트 헨들러
    ** a, d 키로 첫번째 도형 회전
    ** 방향키 좌우로 두번째 도형 회전
    */
    $.window.document.addEventListener('keydown', function (e) {
        var i;
        e.preventDefault();
        // The rotation angle of the left shape +-1.
        if (e.key === 'a') {
            rect[0].r += 1;
        } else if (e.key === 'd') {
            rect[0].r -= 1;
        }
        
        // The rotation angle of the right shape +-1.
        if (e.key === 'ArrowRight') {
            rect[1].r += 1;
        } else if (e.key === 'ArrowLeft') {
            rect[1].r -= 1;
        }
        
        for (i = 0; i < rect.length; i += 1) {
            if (rect[i].r < 0) {
                rect[i].r += 360;
            } else if (rect[i].r > 359) {
                rect[i].r = 0;
            }
        }
        $.console.clear();
        $.requestAnimationFrame(draw);
    });
}(window));