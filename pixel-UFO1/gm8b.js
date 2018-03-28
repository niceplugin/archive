(function($) {
    
/*    
    
    
    system = {
        playback = {
            'directory_name': {
                'source_name': HTMLMediaElement
            }
        }
        device: {
            screenWidth: Number,
            screenHeight: Number,
            innerWidth: Number,
            innerHeight: Number,
            outerWidth: Number,
            outerHeight: Number,
            ratio: Number,
            type: String,
            orientation: String
        },
        view: {
            top: Number,
            left: Number,
            width: Number,
            height: Number,
            currentWidth: Number,
            currentHeight: Number,
            ratio: Boolean,
            ratioX: Boolean,
            ratioY: Boolean,
            node: HTMLElement,
            orientation: String
        },
        motion: {
            mouse: {
                x: Number,
                y: Number,
                movementX: Number,
                movementY: Number,
                m0: Boolean,
                m1: Boolean,
                m2: Boolean,
                m3: Boolean,
                m4: Boolean
            },
            keybord: {
                event[code]: Boolean
            },
            touch: [
                {
                    x: Number,
                    y: Number,
                    tap: Boolean
                }, {}...
            ]
        },
        status: {
            pointerLock: boolean,
            fullScreen: Boolean
        },
        option: {
            display: String,
            mouseInput: Boolean,
            keybordInput: Boolean,
            touchInput: Boolean,
            pointerLock: Boolean,
            orientationLock: Boolean,
            specialKeyLock: Boolean
        }
    }
    
    res = {
        'directory_name': {
            'source_name': HTMLMediaElement
        }
    }
    */
    
    var res = {},
        system = {
            playback: {},
            device: {},
            view: {},
            motion: {
                mouse: {},
                keybord: {},
                touch: []
            },
            status: {
                pointerLock: false,
                fullScreen: false
            },
            option: {
                display: 'auto',
                mouseInput: true,
                keybordInput: true,
                touchInput: true,
                pointerLock: false,
                orientationLock: true,
                specialKeyLock: true
            }
        },
        ctx;
    
    // @+ 콘솔록그나 얼럿메세지 띄우는 모든 부분 찾아서 하나의 함수로 인자(코드넘버) 전달해서 띄우는 형태로 통일할것. 엔진 완성되면.
    
    
    $.gm8b = {
        createFrame: createFrame,
        addResource: addResource,
        playAudio: playAudio,
        setAudioProp: setAudioProp,
        res: res,
        ctx: ctx,
        version: '1.0',
        d: function(x) {
            switch (x) {
                case 'd':
                    console.log(system.device);
                    break;
                case 'v':
                    console.log(system.view);
                    break;
                case 'm':
                    console.log(system.motion);
                    break;
                case 's':
                    console.log(system.status);
                    break;
                case 'o':
                    console.log(system.option);
                    break;
            }
        }
    }
    
    function _notExecutable() {
        alert('The game can not run because it has technology that is not supported by this browser.\n Please access from the latest browser.');
    }
    
    function _setDeviceInfo($, d) {
        d.screenWidth = $.screen.width;
        d.screenHeight = $.screen.height;
        d.innerWidth = $.innerWidth;
        d.innerHeight = $.innerHeight;
        d.outerWidth = $.outerWidth;
        d.outerHeight = $.outerHeight;
        d.ratio = d.innerHeight / d.innerWidth;
        (d.screenWidth > d.screenHeight) ? d.orientation = 'horizontal' : d.orientation = 'vertical';
    }
    
    function _setViewInfo($, d, v) {
        var temp = v.node.getBoundingClientRect();
        
        v.currentWidth = temp.width;
        v.currentHeihgt = temp.height;
        v.top = $.Math.floor((d.innerHeight - v.currentHeihgt) / 2);
        v.left = $.Math.floor((d.innerWidth - v.currentWidth) / 2);
        v.ratioX = v.currentWidth / v.width;
        v.ratioY = v.currentHeihgt / v.height;
    }
    
    function createFrame(str, obj) {
        var d = system.device,
            v = system.view,
            m = system.motion,
            s = system.status,
            o = system.option;
        
        if (d.type !== undefined) {
            return;
        }
        
        str = document.getElementById(str);
        
        if (str && str.nodeName === 'CANVAS') {
            _setDeviceInfo($, d);
            (d.innerWidth === d.outerWidth && d.innerHeight === d.outerHeight) ? d.type = 'mobile' : d.type = 'pc';
            
            v.node = str;
            v.width = str.width;
            v.height = str.height;
            v.ratio = v.height / v.width;
            (v.width > v.height) ? v.orientation = 'horizontal' : v.orientation = 'vertical';
            
            if (!str.getContext) {
                return _notExecutable();
            }
            else {
                ctx = str.getContext('2d');
            }
        }
        
        if (obj && typeof obj === 'object') {
            if (typeof obj.display === 'string' && obj.display.match(/(^sticky$)|(^fill$)|(^auto$)/)) {o.display = obj.display;};
            if (typeof obj.mouseInput === 'boolean') {o.mouseInput = obj.mouseInput};
            if (typeof obj.keybordInput === 'boolean') {o.keybordInput = obj.keybordInput};
            if (typeof obj.touchInput === 'boolean') {o.touchInput = obj.touchInput};
            if (typeof obj.pointerLock === 'boolean') {o.pointerLock = obj.pointerLock};
            if (typeof obj.orientationLock === 'boolean') {o.orientationLock = obj.orientationLock};
            if (typeof obj.specialKeyLock === 'boolean') {o.specialKeyLock = obj.specialKeyLock};
        }
        
        _optionHandler($.document, d, v, o, s, m);
    }
    
    function _optionHandler($d, d, v, o, s, m) {
        var i,
            temp,
            pointerlockchange;
        
        // @+ 다운업 모두 유효범위 안에 있을때만 객체를 탭한것으로 관주하는 함수 만들것
        // 마우스 클릭과 연계해서 하나의 함수로 통일해서 만들것
        // 그냥 스쳐가는 상상으로는 배열같은거 하나 만들어서 다운시 화면 내 클릭할 수 있는 객체모두를 조회해서
        // 좌표가 해당 범위 내에 있으면 배열에 넣어놓고
        // 업 시 넣어놓은 객체와 좌표가 맞을시 유효 클릭으로 인정하는 정도?
        if (o.touchInput) {
            v.node.addEventListener('touchstart', touchStart);
            v.node.addEventListener('touchend', touchEnd);
            v.node.addEventListener('touchmove', touchMove);
        }
        
        // @+ 아마 위 상상의 나래를 실현하려면 이 함수 내부 마지막에 유효시 배열에 넣을 함수가 들어가야 할것임
        function touchStart(e) {
            i = e.changedTouches[0]['identifier'];
            m.touch[i] = {tap: true};
            touchLocation($, v, m, e);
        }
        
        // @+ 그리고 끝났을때 배열에 들어있는 객체와 지금 계산해서 나오는 좌표가 맞는지 확인하는 함수가 들어가야 할듯함 (마우스도 순서는 동일)
        function touchEnd(e) {
            i = e.changedTouches[0]['identifier'];
            m.touch[i] = {tap: false};
            touchLocation($, v, m, e);
        }
        
        function touchMove(e) {
            touchLocation($, v, m, e);
        }
        
        function touchLocation($, v, m, e) {
            i = e.changedTouches[0]['identifier'];
            m.touch[i]['x'] = $.Math.floor((e.changedTouches[0].clientX - v.left) / v.ratioX);
            m.touch[i]['y'] = $.Math.floor((e.changedTouches[0].clientY - v.top) / v.ratioY);
        }
        
        // 마우스 인풋 활성화 이밴트 핸들러
        // @+ 다운업 모두 유효범위 안에 있을때만 객체를 클릭한것으로 관주하는 함수 만들것
        if (o.mouseInput) {
            v.node.addEventListener('mousedown', mouseDown);
            v.node.addEventListener('mouseup', mouseUp);
            v.node.addEventListener('mousemove', mouseMove);
        }
        
        function mouseDown(e) {
            mouseLocation($, v, m, e);
            m.mouse['m' + e.button] = true;
        }
        
        function mouseUp(e) {
            mouseLocation($, v, m, e);
            m.mouse['m' + e.button] = false;
        }
        
        function mouseMove(e) {
            mouseLocation($, v, m, e);
        }
        
        function mouseLocation($, v, m, e) {
            if (!s.pointerLock) {
                m.mouse.x = $.Math.floor((e.clientX - v.left) / v.ratioX);
                m.mouse.y = $.Math.floor((e.clientY - v.top) / v.ratioY);
            }
            else { // 포인터 활성화 시 마우스 좌표 및 마우스 movement 연산
                m.mouse.movementX = e.movementX / v.ratioX;
                m.mouse.movementY = e.movementY / v.ratioY;
                m.mouse.x = m.mouse.x + m.mouse.movementX;
                m.mouse.y = m.mouse.y + m.mouse.movementY;
                if (m.mouse.x < 0) {m.mouse.x = 0}
                else if (m.mouse.x > v.width) {m.mouse.x = v.width}
                if (m.mouse.y < 0) {m.mouse.y = 0}
                else if (m.mouse.y > v.height) {m.mouse.y = v.height}
                
                // @+ 테스트용 포인터 커서. 추후 시스템 완성되면 지워야 할 코드.
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, view.width, view.height);
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(m.mouse.x, m.mouse.y);
                ctx.lineTo(m.mouse.x, m.mouse.y + 16);
                ctx.lineTo(m.mouse.x + 5, m.mouse.y + 12);
                ctx.lineTo(m.mouse.x + 11, m.mouse.y + 12);
                ctx.lineTo(m.mouse.x + 11, m.mouse.y + 11);
                ctx.fill();
            }
        }
        
        // 키보드 인풋 활성화 이밴트 핸들러
        if (o.keybordInput || o.specialKeyLock) {
            $d.addEventListener('keydown', keyDown);
            $d.addEventListener('keyup', keyUp);
        }
        
        function keyDown(e) {
            if (o.specialKeyLock) {e.preventDefault();}
            m.keybord[e.code] = true;
        }
        
        function keyUp(e) {
            m.keybord[e.code] = false;
        }
        
        // 포인터 락 옵션이 활성화 일 경우 추가되는 핸들러
        // 포인터 락 벤더프리픽스 통일화
        v.node.requestPointerLock = v.node.requestPointerLock || v.node.webkitRequestPointerLock || v.node.mozRequestPointerLock;
        v.node.exitPointerLock = v.node.exitPointerLock || v.node.webkitExitPointerLock || v.node.mozExitPointerLock;
        if ('onpointerlockchange' in $d) {pointerlockchange = 'pointerlockchange';}
        else if ('onwebkitpointerlockchange' in $d) {pointerlockchange = 'webkitpointerlockchange';}
        else if ('onmozpointerlockchange' in $d) {pointerlockchange = 'mozpointerlockchange';}
        
        if (o.pointerLock && d.type === 'pc') {
            if (!v.node.requestPointerLock) {
                return _notExecutable();
            }
            v.node.addEventListener('click', togglePointerLock);
            $d.addEventListener(pointerlockchange, pointerLockChange);
        }
        
        function togglePointerLock(e) {
            if (s.pointerLock) {
                v.node.exitPointerLock();
            }
            else {
                mouseLocation($, v, m, e);
                v.node.requestPointerLock();
                v.node.removeEventListener('click', togglePointerLock);
            }
        }
        
        function pointerLockChange(e) {
            if (s.pointerLock) {
                s.pointerLock = false;
                v.node.addEventListener('click', togglePointerLock);
                if (!o.mouseInput) {v.node.removeEventListener('mousemove');}
            }
            else {
                s.pointerLock = true;
                if (!o.mouseInput) {v.node.addEventListener('mousemove', mouseMove);}
            }
        }
        
        // 켄버스 뷰포트의 크기를 지정한다.
        // 브라우저 줌 인/아웃에 관계없이 동일한 뷰포트를 제공한다.
        setViewInlineCSS();
        function setViewInlineCSS() {
            // 'sticky'가 'fill' 효과를 적용하기 위한 스크린 비율 허용 범위.
            // 허용범위를 벗어날 경우 'auto' 효과 적용.
            var range = [1.2, 0.8];
            
            switch (o.display) {
                case 'fill':
                    v.node.setAttribute('style', 'width: 100%; height: 100%');
                    break;
                case 'sticky':
                    if (d.ratio < v.ratio * range[0] && d.ratio > v.ratio * range[1]) {
                        v.node.setAttribute('style', 'width: 100%; height: 100%');
                        break;
                    }
                default:
                    (d.ratio > v.ratio) ? v.node.setAttribute('style', 'width: 100%') : v.node.setAttribute('style', 'height: 100%');
                    break;
            }
            
            // @+ 이곳에 오리엔테이션 락 트루에 모바일상태에서 뷰포트 방향과 디바이스 방향이 다를 경우 알림 발생 함수 호출하는 문구 넣을것 (해당 함수는 옵션핸들러 내부에 작성할것)
        }
        _setViewInfo($, d, v);
        
        // 리사이즈 이벤트 핸들러 추가 조건 및 실행 구조
        // 리사이즈 이벤트가 연속적으로 호출될 경우 과도한 연산을 방지하기 위해
        // timeout 함수가 사용되었다.
        // @+ 셋디바이스와 셋 뷰는 매번 연산하면서 인라인스타일 함수만 과연산 방지 걸어논게 말이 안됨. 지금은 다른게 급해서 가지만 이거 해결해야 함
        // @+ 인라인스타일은 문서 스타일 계산 결과 가지고 와야 하므로 렌더링 과부화 방지로 걸어두고 나머지는 렌더링 부하걸리는 연산이 없어서 이렇게 해놨던거 같은데 ... 확인필요함.
        $.addEventListener('resize', function() {
            clearTimeout(temp);
            _setDeviceInfo($, d);
            _setViewInfo($, d, v);
            temp = setTimeout(setViewInlineCSS, 500);
        });
        
        // Ctrl, Alt, Tab, Fn 등과 마우스 우클릭 메뉴 속성 비활성화 핸들러
        // 브라우저 내부에서 컨트롤 가능한 범위만 해당하므로
        // 윈도우 키나 Alt+Tab 등 브라우저 범위를 벗어나는 네이티브 컨트롤은
        // 비활성화 되지 않는다.
        if (o.specialKeyLock) {
            $d.addEventListener('contextmenu', function(e){e.preventDefault();});
        }
    }
    
    function addResource(str, arr) {
        
        function Res() {};
        Object.defineProperty(Res.prototype, 'setAtt', {
            value: function(att, val) {
                var i;
                
                for (i in this) {
                    if (this[i][att] !== undefined) {
                        this[i][att] = val;
                    }
                }
            }
        });
        
        if (!res[str]) {
            res[str] = new Res();
            system.playback[str] = new Res();
            addRes($, res[str], arr, str);
        }
        else {
            return console.log(str + ' is the directory name that already exists.');
        }
        
        function addRes($, rd, arr, str) {
            var i, name, type;
            
            for (i in arr) {
                
                if (typeof arr[i] === 'string') {
                    name = arr[i].match(/\/[a-zA-Z$_][\w$]*\.(mp3|png)$/);
                    
                    if (name) {
                        name = name[0].split('.');
                        type = name[1];
                        name = name[0].replace('/', '');
                        
                        switch (type) {
                            case 'mp3':
                                rd[name] = new Audio(arr[i]);
                                rd[name].setAttribute('data-dir', str);
                                break;
                            case 'png':
                                rd[name] = new Image();
                                rd[name].src = arr[i];
                                break;
                        }
                    }
                    else {
                        return; // @+ 파일명 에러 또는 엔진이 미지원 확장자
                    }
                }
                else {
                    return; // @+ 경로가 문자열이 아니라는 애러
                }
            }
        }
    }
    
    function playAudio(obj) {
        var p = system.playback[obj.getAttribute('data-dir')],
            name = obj.src,
            i = 0;
        
        while (p[name + i]) {i++;}
        name = name + i;
        
        p[name] = obj.cloneNode();
        p[name].volume = obj.volume;
        p[name].loop = obj.loop;
        p[name].setAttribute('data-playbackId', name);
        p[name].addEventListener('ended', _removePlaybackMedia);
        p[name].addEventListener('volumechange', _volumeChangePlaybackMedia);
        p[name].play();
    }
    
    function _volumeChangePlaybackMedia(e) {
        var p = system.playback[e.target.getAttribute('data-dir')],
            name = e.target.getAttribute('data-playbackId');
        
        if (p[name].volume === 0) {
            p[name].currentTime = p[name].duration;
        }
    }
    
    function _removePlaybackMedia(e) {
        var p = system.playback[e.target.getAttribute('data-dir')],
            name = e.target.getAttribute('data-playbackId');
        
        p[name].removeEventListener('ended', _removePlaybackMedia);
        p[name].removeEventListener('volumechange', _volumeChangePlaybackMedia);
        delete p[name];
    }
    
    function setAudioProp(dir, att, val) {
        var r = res[dir],
            p = system.playback[dir];
        
        if (!r) {
            return; // @+ 잘못된 리소스 디렉토리 경로
        }
        
        r.setAtt(att, val);
        p.setAtt(att, val);
    }
    
})(window);

var x = {
    dx: 0,
    dy: 0,
    dw: 0,
    dh: 0,
    cx: 0,
    cy: 0,
    cw: 0,
    ch: 0,
    mx: 0,
    my: 0
}



// 테스트 코드

var g = gm8b;
g.createFrame('canvas');
g.addResource('se', [
    '/se1.mp3',
    '/se2.mp3',
    '/se3.mp3',
    '/se4.mp3',
    '/se5.mp3',
    '/se6.mp3',
    '/bgm.mp3'
]);

document.addEventListener('click', function() {
    g.playAudio(g.res.se.bgm);
})































