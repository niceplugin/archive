// =============================================================================
// module view
// =============================================================================

var view = {
    interval: null,
    // window의 rect size를 담는 객체
    window: {
//        innerWidth:
//        innerHeight:
//        outerWidth:
//        outerHeight:
        // 윈도우가 활성화 되는 시점일 때마다 한번만 실행할 함수 배열
        enabled: [],
        // 윈도우가 비활성화 되는 시점일 때마다 한번만 실행할 함수 배열
        disabled: [],
        windowEnable: function () {
            view.window.enabled.forEach(function (func) {func(); });
        },
        windowDisable: function () {
            view.window.disabled.forEach(function (func) {func(); });
        }
    },
    // screen의 rect size를 담는 객체
    screen: {
//        width:
//        height:
//        ratio:
//        curOrientation:
//        prevOrientation:
        // 기기 방향이 바뀔때마다 한번만 실행할 함수
        orientation: [],
        orientationChange: function () {
            view.screen.orientation.forEach(function (func) {
                // 첫번째 인자로 전환된 현재 방향을 문자열로 전달
                func(view.screen.curOrientation);
            });
        }
    },
    // canvas의 rect size를 담는 객체
    canvas: {
//        width:
//        height:
//        curWidth:
//        curHeight:
//        top:
//        left:
//        ratioX:
//        ratioY:
    },
    setting: function () {
        var node,
            cur,
            c = view.canvas,
            s = view.screen,
            w = view.window,
            $ = window;
        // screen 세팅 ===========================================
        s.width = $.screen.width;
        s.height = $.screen.height;
        w.innerWidth = $.innerWidth;
        w.innerHeight = $.innerHeight;
        w.outerWidth = $.outerWidth;
        w.outerHeight = $.outerHeight;
        // 스크린의 세로:가로 비율
        s.ratio = s.height / s.width;
        // 방향이 지정된 적이 있었다면 이전방향에 지정된 방향값 저장
        if (s.curOrientation) {
            s.prevOrientation = s.curOrientation;
        }
        // 비율이 1보다 크다면 스크린은 세로 방향 아니면 가로방향
        s.curOrientation = s.ratio > 1 ? 'vertical' : 'horizontal';
        // 기기화면 방향이 전환 되었다면 실행
        if (s.prevOrientation && s.prevOrientation !== s.curOrientation) {
            view.screen.orientationChange();
        }
        
        // canvas 세팅 ===========================================
        node = c.node = document.getElementById('canvas');
        // node의 최초 사이즈 값
        c.width = node.width;
        c.height = node.height;
        cur = node.getBoundingClientRect();
        // node의 현재 사이즈 값
        c.curWidth = cur.width;
        c.curHeight = cur.height;
        // 마우스, 터치의 좌표위치를 알아내기 위한 canvas (0, 0) 위치
        c.top = (w.innerHeight - c.curHeight) / 2;
        c.left = (w.innerWidth - c.curWidth) / 2;
        // X, Y 좌표 비율
        // 마우스, 터치 이벤트 좌표를 아래 값으로 나누면 canvas에 적용할 좌표값
        c.ratioX = c.curWidth / c.width;
        c.ratioY = c.curHeight / c.height;
    },
    detect: function () {
        // 불필요한 연산 및 조회를 피하기 위해 리사이즈가 끝skrh 200ms 이후 실행
        clearInterval(view.interval);
        view.interval = setTimeout(view.setting, 200);
    },
    addEventListener: function (type, listener, func) {
        if (typeof view[type][listener] === 'object') {
            view[type][listener].push(func);
        }
    },
    removeEventListener: function (type, listener, func) {
        var path = view[type][listener],
            i = path.indexOf(func);
        if (1 !== -1) {
            path.splice(i, 1);
        }
    }
};

view.setting();
window.addEventListener('resize', view.detect);
window.addEventListener('blur', view.window.windowDisable);
window.addEventListener('focus', view.window.windowEnable);