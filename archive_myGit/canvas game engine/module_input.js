// =============================================================================
// module input // 반드시 module_view 이후에 선언해야 한다.
// =============================================================================

// 하드웨어 입력에 관한 정보를 담는 객체
var input = {
    // 키보드에 관한 정보를 담는 객체
    // 하위 프로퍼티 키 네임은 키보드 이벤트 핸들러 값
    key: {
        // 키보드의 각 버튼 keyCode를 키로 사용, 키에 해당하는 값은 배열
        // 배열내의 프로퍼티는 호출할 함수들
        press: {// 버튼이 눌려진 동안 매 프레임 마다 호출할 함수
            //keyA: [myFunction, ...]
        },
        down: {},// 버튼이 눌려질 때마다 1회만 호출할 함수
        up: {},// 버튼이 때어질 때마다 1회만 호출할 함수
        pressed: {},// 버튼이 눌려졌는지 여부의 boolean 값
        // pressed 객체의 index 역할을 할 true 값을 가진 키를 문자열로 배열에 저장
        // for in 루프를 지양하기 위함
        idx: [],
        // 함수 실행시 인자로 반환할 이벤트 오브젝트
        data: {
            // 각 키별로 저장되는 정보
//            Key$: {
//                // 이 키를 마지막으로 눌렀던 시각
//                prevTime: 0,
//                // 이 키를 지금 누른 시각
//                curTime: 0
//            },
            // 공통정보
            common: {
                // 이전에 누른 시각
                prevTime: 0,
                // 지금 누른 시각
                curTime: 0
            },
            // 인자로 반활될 객체
            returns: {
                // 이 키를 마지막으로 누른 시간과 지금 누른 시간 간격 차
                equalGap: 0,
                // 마지막에 누른 어떤 키와 지금 누른 이 키와의 시간 간격 차
                unequalGap: 0,
                // 이전에 누른 키 코드
                prevKey: null,
                // 지금 누른 키 코드
                curKey: null
            }
        },
        keyDown: function (e) {
            var code = e.code;
            e.preventDefault();
            // 버튼이 눌러진 적이 없다면 (keypress, keydown은 눌러지고 있는동안 지속적으로 호출되므로 필터링이 반드시 필요함)
            if (!input.key.pressed[code]) {
                if (!input.key.data[code]) {
                    input.key.data[code] = {};
                }
                input.key.data[code].prevTime = input.key.data[code].curTime || 0;
                input.key.data.common.prevTime = input.key.data.common.curTime || 0;
                input.key.data.common.curTime = input.key.data[code].curTime = Date.now();
                input.key.data.returns.prevKey = input.key.data.returns.curKey || null;
                input.key.data.returns.curKey = code;
                input.key.data.returns.equalGap = input.key.data[code].curTime - input.key.data[code].prevTime;
                input.key.data.returns.unequalGap = input.key.data.common.curTime - input.key.data.common.prevTime;
                
                input.key.pressed[code] = true;
                input.key.idx.push(code);
                // 눌러지는 시점에서 1회만 실행할 함수가 있다면
                if (input.key.down[code] && input.key.down[code].length) {
                    input.key.down[code].forEach(function (func) {
                        func(input.key.data.returns);
                    });
                }
            }
        },
        keyUp: function (e) {
            var code = e.code, i = input.key.idx.indexOf(code);
            // 윈도우 포커스 상태가 아닐때 눌린 버튼이 포커스 후 때어질 경우 생길 오류 방지 조건문
            if (i !== -1) {
                // 때어지는 시점에서 1회만 실행할 함수가 있다면
                if (input.key.up[code] && input.key.up[code].length) {
                    input.key.up[code].forEach(function (func) {func(); });
                }
                // 눌려진 상태를 반환하는 배열에서 해당 값을 제거
                input.key.idx.splice(i, 1);
            }
            // 때어진 버튼의 pressed 값을 비활성
            input.key.pressed[code] = false;
        }
    },
    mouse: {
        // event.buttons 값의 각 비트의 순서를 키로 할당
        // 1: 좌클릭, 2: 우클릭, 4: 휠클릭, 8: 마우스 4버튼, 16: 마우스 5버튼
        // 1, 2, 3, 4, 5
        press: {},
        down: {},
        up: {},
        move: [],
        pressed: {},
        idx: [],
        over: false, // 마우스가 켄버스 내에 있는지 여부
        pointLock: false, // 포인터 락 상태 여부
        location: {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            movementX: 0,
            movementY: 0
        },
        // 함수 실행시 인자로 반환할 이벤트 오브젝트
        data: {
            // 각 키별로 저장되는 정보
//            1~5: {
//                // 이 키를 마지막으로 눌렀던 시각
//                prevTime: 0,
//                // 이 키를 지금 누른 시각
//                curTime: 0
//            },
            // 공통정보
            common: {
                // 이전에 누른 시각
                prevTime: 0,
                // 지금 누른 시각
                curTime: 0
            },
            // 인자로 반활될 객체
            returns: {
                // 이 키를 마지막으로 누른 시간과 지금 누른 시간 간격 차
                equalGap: 0,
                // 마지막에 누른 어떤 키와 지금 누른 이 키와의 시간 간격 차
                unequalGap: 0,
                // 이전에 누른 키 코드
                prevKey: null,
                // 지금 누른 키 코드
                curKey: null,
                x: 0,
                y: 0,
                prevX: 0,
                prevY: 0,
                movementX: 0,
                movementY: 0
            }
        },
        mouseDown: function (e) {
            var i,
                n = e.buttons,
                code = [];
            if (!input.mouse.over) {
                return;
            }
            // 눌린 마우스버튼을 배열값으로 반환
            for (i = 1; n; i++) {
                if (n & 1) {
                    code.push(i.toString());
                }
                n = n >> 1;
            }
            // 버튼이 눌러진 적이 없다면 (keypress, keydown은 눌러지고 있는동안 지속적으로 호출되므로 필터링이 반드시 필요함)
            code.forEach(function (code) {
                if (!input.mouse.pressed[code]) {
                    if (!input.mouse.data[code]) {
                        input.mouse.data[code] = {};
                    }
                    input.mouse.data[code].prevTime = input.mouse.data[code].curTime || 0;
                    input.mouse.data.common.prevTime = input.mouse.data.common.curTime || 0;
                    input.mouse.data.common.curTime = input.mouse.data[code].curTime = Date.now();
                    input.mouse.data.returns.prevKey = input.mouse.data.returns.curKey || null;
                    input.mouse.data.returns.curKey = code;
                    input.mouse.data.returns.equalGap = input.mouse.data[code].curTime - input.mouse.data[code].prevTime;
                    input.mouse.data.returns.unequalGap = input.mouse.data.common.curTime - input.mouse.data.common.prevTime;
                    
                    input.mouse.pressed[code] = true;
                    input.mouse.idx.push(code);
                    // 눌러지는 시점에서 1회만 실행할 함수가 있다면
                    if (input.mouse.down[code] && input.mouse.down[code].length) {
                        // canvas 내에서 적용되는 마우스 좌표값 객체를 첫번째 인자로 전달
                        input.mouse.down[code].forEach(function (func) {
                            func(input.mouse.data.returns);
                        });
                    }
                }
            });
        },
        mouseUp: function (e) {
            var i,
                idx = input.mouse.idx,
                n = e.buttons,
                code = [];
            if (!input.mouse.over) {
                return;
            }
            // 눌린 마우스버튼을 배열값으로 반환
            for (i = 1; n; i++) {
                if (n & 1) {
                    code.push(i.toString());
                }
                n = n >> 1;
            }
            idx.forEach(function (v, i) {
                // idx 배열에 있으나 code에 없으면 해당 값은 때어짐으로 판단
                if (code.indexOf(v) === -1) {
                    // 때어진 버튼의 pressed 값을 비활성
                    input.mouse.pressed[idx[i]] = false;
                    // 때어지는 시점에서 1회만 실행할 함수가 있다면
                    if (input.mouse.up[idx[i]] && input.mouse.up[idx[i]].length) {
                        input.mouse.up[idx[i]].forEach(function (func) {
                            func(input.mouse.data.returns);
                        });
                    }
                    // 눌려진 상태를 반환하는 배열에서 해당 값을 제거
                    input.mouse.idx.splice(i, 1);
                }
            });
        },
        mouseMove: function (e) {
            var m = input.mouse.data.returns;
            m.prevX = m.x;
            m.prevY = m.y;
            m.x = Math.floor((e.clientX - view.canvas.left) / view.canvas.ratioX);
            m.y = Math.floor((e.clientY - view.canvas.top) / view.canvas.ratioY);
            if (input.mouse.pointLock) {
                // 포인터락을 활성화 한 브라우저가 크롬일 경우 해당 함수 사용
                if (input.mouse.poinerBugFix) {
                    input.mouse.poinerBugFix(e);
                } else {// 아닐 경우 일반적인 무브먼트 적용
                    m.movementX = e.movementX;
                    m.movementY = e.movementY;
                }
            } else {
                m.movementX = m.x - m.prevX;
                m.movementY = m.y - m.prevY;
            }
            input.mouse.move.forEach(function (func) {func(m); });
        },
        mouseOver: function () {
            input.mouse.over = true;
        },
        mouseLeave: function () {
            var v = 31;
            input.mouse.idx.forEach(function (i) {
                v -= Math.pow(2, i - 1);
            });
            input.mouse.mouseUp({buttons: v});
            input.mouse.over = false;
        },
        pointerLockChange: function () {
            //포인터 락 되었을 경우 true 아닐 경우 false
            input.mouse.pointLock = document.pointerLockElement ? true : false;
        }
    },
    wheel: {
        up: [],
        down: [],
        left: [],
        right: [],
        wheelTurn: function (e) {
            if (e.deltaX > 0) { // 우로 휠하였다면
                input.wheel.right.forEach(function (func) {
                    func(input.mouse.location);
                });
            } else if (e.deltaX < 0) { // 좌로 휠하였다면
                input.wheel.left.forEach(function (func) {
                    func(input.mouse.location);
                });
            }
            if (e.deltaY < 0) { // 위로 휠 하였다면
                input.wheel.up.forEach(function (func) {
                    func(input.mouse.location);
                });
            } else if (e.deltaY > 0) { // 아래로 휠 하였다면
                input.wheel.down.forEach(function (func) {
                    func(input.mouse.location);
                });
            }
        }
    },
    addEventListener: function (type, listener, code, func) {
        var path = input[type][listener];
        if (typeof code === 'string') {
            // 해당 경로에 버튼키 배열이 없을 경우 생성 (최초만 실행됨)
            if (!path[code]) {path[code] = []; }
            path[code].push(func);
            // 버튼키가 한번도 등록된 적이 없다면 생성
            if (input.key.pressed[code] === undefined) {
                input.key.pressed[code] = false;
            }
        } else { // 타입이 문자열이 아닐경우 code는 함수
            path.push(code);
        }
    },
    removeEventListener: function (type, listener, code, func) {
        var path, i;
        if (typeof code === 'string') {
            path = input[type][listener][code];
            i = path.indexOf(func);
        } else {
            path = input[type][listener];
            i = path.indexOf(code);
        }
        // 해당 경로에 등록된 것이 있다면
        if (i !== -1) {
            path.splice(i, 1);
        }
    },
    // 윈도우가 포커스를 잃을 경우 눌러진 상태의 모든 인풋값을 초기화
    // 키를 누른 상태에서 포커스를 잃을 경우 키를 때더라도 눌러진 상태 유지하는 버그 방지
    windowBlur: function () {
        input.key.idx.forEach(function (i) {
            input.key.keyUp({code: i});
        });
        input.mouse.mouseLeave();
    },
    // 매 프레임마다 입력을 감지
    detect: function () {
        input.key.idx.forEach(function (i) {
            if (input.key.press[i]) {
                input.key.press[i].forEach(function (func) {
                    func();
                });
            }
        });
        if (input.mouse.over) {// 켄버스 내에 마우스가 있을 경우에만
            input.mouse.idx.forEach(function (i) {
                if (input.mouse.press[i]) {
                    input.mouse.press[i].forEach(function (func) {
                        func(input.mouse.location);
                    });
                }
            });
        }
    }
};

window.addEventListener('keydown', input.key.keyDown);
window.addEventListener('keyup', input.key.keyUp);
window.addEventListener('mousedown', input.mouse.mouseDown);
window.addEventListener('mouseup', input.mouse.mouseUp);
window.addEventListener('contextmenu', function (e) {e.preventDefault(); });
view.canvas.node.addEventListener('mousemove', input.mouse.mouseMove);
view.canvas.node.addEventListener('mouseover', input.mouse.mouseOver);
view.canvas.node.addEventListener('mouseleave', input.mouse.mouseLeave);
document.addEventListener('pointerlockchange', input.mouse.pointerLockChange);
view.canvas.node.addEventListener('wheel', input.wheel.wheelTurn);
window.addEventListener('blur', input.windowBlur);

// 구글 크롬 포인터락 활성화시 마우스무브먼트 값 튐 버그 픽스를 위한 조치
// 추후 구글에서 해당 버그 픽스시 삭제할 코드
(function () {
    var prevMovementX = 0,
        prevMovementY = 0,
        movementX = 0,
        movementY = 0;
    // 브라우저가 크롬이라면
    if (window.navigator.userAgent.search('Chrome') !== -1) {
        input.mouse.poinerBugFix = function (e) {
            // movementX bug check.
            if ((prevMovementX > 0 && e.movementX >= 0) || (prevMovementX < 0 && e.movementX <= 0)) {
                prevMovementX = movementX = e.movementX;
            } else if (prevMovementX === 0) {
                prevMovementX = e.movementX;
                movementX = 0;
            } else if ((prevMovementX > 0 && e.movementX < 0) || (prevMovementX < 0 && e.movementX > 0)) {
                prevMovementX = movementX = 0;
            }

            // movementY bug check.
            if ((prevMovementY > 0 && e.movementY >= 0) || (prevMovementY < 0 && e.movementY <= 0)) {
                prevMovementY = movementY = e.movementY;
            } else if (prevMovementY === 0) {
                prevMovementY = e.movementY;
                movementY = 0;
            } else if ((prevMovementY > 0 && e.movementY < 0) || (prevMovementY < 0 && e.movementY > 0)) {
                prevMovementY = movementY = 0;
            }
            input.mouse.data.returns.movementX = movementX;
            input.mouse.data.returns.movementY = movementY;
        };
    }
}());


// =============================================================================
// 이하 셈플 테스트 코드
// =============================================================================

function myFunc1() {
    console.log('function 1!');
}
function myFunc2() {
    console.log('function 2!');
}
function myFunc3() {
    console.log('function 3!');
}
var f = 0;
function core() {
    window.requestAnimationFrame(core);
    input.detect();
    f++;
}
window.requestAnimationFrame(core);

input.addEventListener('key', 'press', 'KeyA', myFunc1);
input.addEventListener('key', 'down', 'KeyD', myFunc2);
input.addEventListener('key', 'up', 'KeyD', myFunc3);
//input.removeEventListener('key', 'press', 'Keya', myFunc1);
input.addEventListener('mouse', 'press', '1', myFunc1);
input.addEventListener('mouse', 'down', '3', myFunc2);
input.addEventListener('mouse', 'up', '3', myFunc3);

setInterval(function () {
    console.log(f);
    f = 0;
}, 1000);



































