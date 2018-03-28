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
            ],
            pointer: {
                mouse: {
                    start: {
                        x: Number,
                        y: Number
                    },
                    end: {
                        x: Number,
                        y: Number
                    }
                },
                touch1, touch2, ...
            }
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
            specialKeyLock: Boolean,
            fulllScreen: Bollean
        },
        fps: {
            showFps: Boolean,
            interval: setInterval,
            prevTime: Number, // 이전 드로우 시간
            currTime: Number, // 지금 드로우 시간
            fpsGap: Number, // 지금과 이전 드로우 시간차
            count: Number, // 지금까지 카운트 된 드로우 횟수
            fps: number // 1초동안 카운터 된 드로우 횟수
        }
    }
    
    res = {
        'directory_name': {
            'source_name': HTMLMediaElement
        }
    }
    */
    
    var res = {
        length: 0,
        loaded: 0
    },
        system = {
            playback: {},
            device: {},
            view: {},
            motion: {
                mouse: {},
                keybord: {},
                touch: [],
                pointer: {}
            },
            status: {
                pointerLock: false,
                fullScreen: false
            },
            option: {
                display: 'sticky',
                mouseInput: true,
                keybordInput: true,
                touchInput: true,
                pointerLock: false,
                orientationLock: true,
                specialKeyLock: true,
                showFps: false,
                fullScreen: true
            },
            fps: {}
        },
        map,
        ctx;
    
    $.g8b = {
        app: createFrame,
        addRes: addResource,
        draw: draw,
        fullScreen: fullScreen,
        playAudio: playAudio,
        stopAudio: stopAudio,
        setAudioProp: setAudioProp,
        system: system,
        res: res,
        ctx: null, // 프레임 생성시 재설정 해줘야 해서 null로 구분지어놓음
        fps: fps,
        version: '1.0'
    }
    
    /*
    API
    g8b.fps();
    */
    function fps() {
        if (system.option.showFps) {
            system.option.showFps = false;
            
            clearInterval(fps.interval);
        }
        else {
            system.option.showFps = true;
            system.fps.count = 0;
            system.fps.fps = 0;
            fps.interval = setInterval(_fpsCheck, 1000);
        }
    }
    
    /*
    API
    g8b.draw(array);
    */
    function draw(m) {
        map = m;
        system.fps.prevTime = Date.now();
        requestAnimationFrame(_draw);
    }
    
    /*
    API
    g8b.app();
    */
    function createFrame() {
        var d = system.device,
            v = system.view,
            m = system.motion,
            s = system.status,
            o = system.option,
            canvas = document.getElementById('canvas');
        
        _setDeviceInfo($, d);
        (d.innerWidth === d.outerWidth && d.innerHeight === d.outerHeight) ? d.type = 'mobile' : d.type = 'pc';

        v.node = canvas;
        v.width = canvas.width;
        v.height = canvas.height;
        v.ratio = v.height / v.width;
        (v.width > v.height) ? v.orientation = 'horizontal' : v.orientation = 'vertical';
        
        if (!canvas.getContext) {
            return _notExecutable();
        }
        else {
            ctx = canvas.getContext('2d');
            g8b.ctx = ctx;
        }
        
        _optionHandler($.document, d, v, o, s, m);
    }
    
    /*
    API
    g8b.addResource('dir', ['file_path', 'file_path' ...]);
    */
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
        
        if (str === 'length' || str === 'loaded') {return;} // @+ 해당 이름으로 경로만들기 시도시 오류
        
        if (!res[str]) {
            res[str] = new Res();
            system.playback[str] = new Res();
            addRes($, res, arr, str);
        }
        else {
            return console.log(str + ' is the directory name that already exists.');
        }
        
        function load(e) {
            res.loaded++;
            e.target.removeEventListener(e.type, load);
        }
        
        function addRes($, res, arr, str) {
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
                                res[str][name] = new Audio(arr[i]);
                                res[str][name].setAttribute('data-dir', str);
                                res[str][name].addEventListener('canplaythrough', load);
                                break;
                            case 'png':
                                res[str][name] = new Image();
                                res[str][name].src = arr[i];
                                res[str][name].addEventListener('load', load);
                                break;
                        }
                        
                        res.length++;
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
    
    /*
    API
    g8b.playAudio(g8b.res[path][file_name]);
    */
    function playAudio(obj) {
        var p = system.playback[obj.getAttribute('data-dir')],
            name = obj.src,
            i = 0;
        
        // 볼륨 0 일 경우 재생하지 않고 리턴
        if (obj.volume === 0) {return;}
        
        while (p[name + i]) {i++;}
        name = name + i;
        
        p[name] = obj.cloneNode();
        p[name].volume = obj.volume;
        p[name].loop = obj.loop;
        p[name].setAttribute('data-playbackId', name);
        p[name].addEventListener('ended', _removePlaybackMedia);
        p[name].addEventListener('volumechange', _volumeChangePlaybackMedia);
        p[name].play();

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
    }
    
    /*
    API
    g8b.stopAudio('dir');
    * g8b.res[path] -> 'dir'
    */
    function stopAudio(dir) {
        var i;
        dir = system.playback[dir];
        
        for (i in dir) {
            dir[i]['volume'] = 0;
        }
    }
    
    /*
    API
    g8b.setAudioProp('dir', 'attribute', 'value');
    */
    function setAudioProp(dir, att, val) {
        var r = res[dir],
            p = system.playback[dir];
        
        if (!r) {
            return; // @+ 잘못된 리소스 디렉토리 경로
        }
        
        r.setAtt(att, val);
        p.setAtt(att, val);
    }
    
    /*
    API
    g8b.fullScreen();
    */
    function fullScreen() {
        if (system.option.fullScreen) {
            if (system.status.fullScreen) {
                $.document.exitFullscreen();
            }
            else {
                system.view.node.requestFullscreen();
            }
        }
    }
    
    // @+ 콘솔록그나 얼럿메세지 띄우는 모든 부분 찾아서 하나의 함수로 인자(코드넘버) 전달해서 띄우는 형태로 통일할것. 엔진 완성되면.
    
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
    
    function _optionHandler($d, d, v, o, s, m) {
        var i,
            temp,
            eve;
        
        function addPointer(device, type, i) {
            if (device === 'mouse') {
                if (type === 'start') {
                    m.pointer.mouse = {};
                    m.pointer.mouse.start = {};
                    m.pointer.mouse.start.x = m.mouse.x;
                    m.pointer.mouse.start.y = m.mouse.y;
                }
                else if (type === 'end') {
                    m.pointer.mouse.end= {};
                    m.pointer.mouse.end.x = m.mouse.x;
                    m.pointer.mouse.end.y = m.mouse.y;
                }
                else {
                    if (!m.pointer.mouse) {m.pointer.mouse = {};}
                    m.pointer.mouse.move= {};
                    m.pointer.mouse.move.x = m.mouse.x;
                    m.pointer.mouse.move.y = m.mouse.y;
                }
            }
            else {
                if (type === 'start') {
                    m.pointer['touch' + i] = {};
                    m.pointer['touch' + i].start = {};
                    m.pointer['touch' + i].start.x = m.touch[i].x;
                    m.pointer['touch' + i].start.y = m.touch[i].y;
                }
                else {
                    m.pointer['touch' + i].end = {};
                    m.pointer['touch' + i].end.x = m.touch[i].x;
                    m.pointer['touch' + i].end.y = m.touch[i].y;
                }
            }
        }
        
        // @+ 다운업 모두 유효범위 안에 있을때만 객체를 탭한것으로 관주하는 함수 만들것
        // 마우스 클릭과 연계해서 하나의 함수로 통일해서 만들것
        // 그냥 스쳐가는 상상으로는 배열같은거 하나 만들어서 다운시 화면 내 클릭할 수 있는 객체모두를 조회해서
        // 좌표가 해당 범위 내에 있으면 배열에 넣어놓고
        // 업 시 넣어놓은 객체와 좌표가 맞을시 유효 클릭으로 인정하는 정도?
        if (o.touchInput) {
            v.node.addEventListener('touchstart', touchStart);
            v.node.addEventListener('touchend', touchEnd);
            v.node.addEventListener('touchmove', touchMove);
            m.touchs = 0;

            // @+ 아마 위 상상의 나래를 실현하려면 이 함수 내부 마지막에 유효시 배열에 넣을 함수가 들어가야 할것임
            function touchStart(e) {
                i = e.changedTouches[0]['identifier'];
                m.touch[i] = {tap: true};
                m.touchs++;
                touchLocation($, v, m, e);
                addPointer('touch', 'start', i);
            }

            // @+ 그리고 끝났을때 배열에 들어있는 객체와 지금 계산해서 나오는 좌표가 맞는지 확인하는 함수가 들어가야 할듯함 (마우스도 순서는 동일)
            function touchEnd(e) {
                i = e.changedTouches[0]['identifier'];
                m.touch[i] = {tap: false};
                m.touchs--;
                touchLocation($, v, m, e);
                addPointer('touch', 'end', i);
            }

            function touchMove(e) {
                touchLocation($, v, m, e);
            }

            function touchLocation($, v, m, e) {
                var x, y;
                
                i = e.changedTouches[0]['identifier'];
                
                if (e.type === 'touchmove') {
                    x = m.touch[i]['x'];
                    y = m.touch[i]['y'];
                }
                
                m.touch[i]['x'] = $.Math.floor((e.changedTouches[0].clientX - v.left) / v.ratioX);
                m.touch[i]['y'] = $.Math.floor((e.changedTouches[0].clientY - v.top) / v.ratioY);
                
                if (e.type === 'touchmove') {
                    if (m.touch[i]['movementX'] === undefined) {
                        m.touch[i]['movementX'] = 0;
                        m.touch[i]['movementY'] = 0;
                    }
                    else {
                        m.touch[i]['movementX'] = m.touch[i]['x'] - x;
                        m.touch[i]['movementY'] = m.touch[i]['y'] - y;
                    }
                }
            }
        }
        
        // 마우스 인풋 활성화 이밴트 핸들러
        // @+ 다운업 모두 유효범위 안에 있을때만 객체를 클릭한것으로 관주하는 함수 만들것
        if (o.mouseInput) {
            v.node.addEventListener('mousedown', mouseDown);
            v.node.addEventListener('mouseup', mouseUp);
            v.node.addEventListener('mousemove', mouseMove);

            function mouseDown(e) {
                mouseLocation($, v, m, e);
                m.mouse['m' + e.button] = true;

                // 마우스 좌클릭 시에만 포인터 생성
                if (e.button === 0) {addPointer('mouse', 'start');}
            }

            function mouseUp(e) {
                mouseLocation($, v, m, e);
                m.mouse['m' + e.button] = false;

                // 마우스 좌클릭 시에만 포인터 생성
                if (e.button === 0) {addPointer('mouse', 'end');}
            }

            function mouseMove(e) {
                mouseLocation($, v, m, e);
                addPointer('mouse', 'move');
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
        }
        
        // 키보드 인풋 활성화 이밴트 핸들러
        if (o.keybordInput || o.specialKeyLock) {
            $d.addEventListener('keydown', keyDown);
            $d.addEventListener('keyup', keyUp);

            function keyDown(e) {
                if (o.specialKeyLock) {e.preventDefault();}
                m.keybord[e.code] = true;
            }

            function keyUp(e) {
                m.keybord[e.code] = false;
            }
        }
        
        // 풀 스크린 벤더프리픽스 통일화
        v.node.requestFullscreen = v.node.requestFullscreen || v.node.webkitRequestFullscreen || v.node.mozRequestFullscreen || v.node.msRequestFullscreen;
        $d.exitFullscreen = $d.exitFullscreen || $d.webkitExitFullscreen || $d.mozExitFullscreen || $d.msExitFullscreen;
        if ('onfullscreenchange' in v.node) {eve = 'fullscreenchange';}
        else if ('onwebkitfullscreenchange' in v.node) {eve = 'webkitfullscreenchange';}
        else if ('onmozfullscreenchange' in v.node) {eve = 'mozfullscreenchange';}
        else if ('onMSfullscreenchange' in v.node) {eve = 'MSfullscreenchange';}
        
        if (o.fullScreen) {
            if (!v.node.requestFullscreen) {
                return _notExecutable(); // @+ 풀스크린 불가 에러
            }
            document.addEventListener(eve, fullScreenChange);
            
            function fullScreenChange() {
                if (s.fullScreen) {
                    s.fullScreen = false;
                }
                else {
                    s.fullScreen = true;
                }
            }
        }
        
        // 포인터 락 옵션이 활성화 일 경우 추가되는 핸들러
        // 포인터 락 벤더프리픽스 통일화
        v.node.requestPointerLock = v.node.requestPointerLock || v.node.webkitRequestPointerLock || v.node.mozRequestPointerLock;
        v.node.exitPointerLock = v.node.exitPointerLock || v.node.webkitExitPointerLock || v.node.mozExitPointerLock;
        if ('onpointerlockchange' in $d) {eve = 'pointerlockchange';}
        else if ('onwebkitpointerlockchange' in $d) {eve = 'webkitpointerlockchange';}
        else if ('onmozpointerlockchange' in $d) {eve = 'mozpointerlockchange';}
        
        if (o.pointerLock) {
            if (!v.node.requestPointerLock) {
                return _notExecutable();
            }
            v.node.addEventListener('click', togglePointerLock);
            $d.addEventListener(eve, pointerLockChange);
        
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
    
    function _fpsGap() {
        var f = system.fps;
        
        f.currTime = Date.now();
        f.fpsGap = f.currTime - f.prevTime;
        f.prevTime = f.currTime;
        f.count++;
    }
    
    function _fpsCheck() {
        var f = system.fps;
        
        f.fps = f.count;
        f.count = 0;
    }
    
    function _fpsdraw() {
        var f = system.fps,
            c = ctx,
            x = system.view.width;
        
        c.save();
        c.font = 'bold 16px serif';
        c.textAlign = 'right';
        c.textBaseline = 'top';
        c.fillStyle = '#ff0000';
        c.fillRect(x - 64, 0, 64, 20);
        c.fillStyle = '#00ff00';
        c.fillText('fps: ' + f.fps, x - 4, 2);
        c.restore();
    }
    
    function _draw() {
        requestAnimationFrame(_draw);
        
        _fpsGap();
        map[map.current_map]();
        if (system.option.showFps) {_fpsdraw();}
    }
    
})(window);

(function($, g, c, r, s) {
    var map = [],
        t = [], // 템프 변수를 담는 배열
        moobileInputEnabled,
        info = {
            score: 0
        }; // 볼륨 민감도 스코어
    
    /*
    0 = 컨텍스트 시스템 셋
    1 = 로딩
    2 = 로고
    3 = 타이틀
    4 = 옵션
    5 = 게임오버
    6 = 엔딩
    7 = 플레잉
    */
    map.current_map = 0;
    map[0] = seen0;
    map[1] = seen1;
    map[2] = seen2;
    map[3] = seen3;
    map[4] = seen4;
    map[5] = seen5;
    map[6] = seen6;
    map[7] = seen7;
    
    // 글로별 변수 삭제로 일반적인 접근을 금지시킨다.
//    g8b = undefined;
    
    // 문서가 완전히 로드 되었을 때 앱 실행한다. (폰트 다운완료 포함)
    $.addEventListener('load', function() {
        g.app();
        
        g.addRes('se', [
            '/res/click1.mp3',
            '/res/click2.mp3',
            '/res/click3.mp3',
            '/res/item.mp3',
            '/res/laser.mp3',
            '/res/boom.mp3',
            '/res/launch.mp3',
            '/res/shoot.mp3'
        ]);
        g.addRes('bgm', [
            '/res/intro.mp3',
            '/res/Beethoven_Virus.mp3'
        ]);
        g.addRes('img', [
            '/res/sprite_x5_alpha.png',
            '/res/btn_x5_alpha.png'
        ]);
//        g.playAudio(r.bgm.intro);
        
        c = g.ctx; // null 입력값이 그대로 넘어오기 때문에 로드 후 다시 설정해줘야 함
        g.draw(map);
    });
    
    function deleteTemp() {
        var i;
        for (i in t) {
            delete t[i];
        }
        t = [];
    }
    
    function checkPointer(arr) {
        var i, j, x;
        x = s.motion.pointer;
        
        function returned(obj, val, boo) {
            if (boo) {
                delete obj.end;
            }
            else {
                delete obj.move;
            }
            return val;
        }
        
        for (i in x) {
            if (x[i].end !== undefined) {
                for (j in arr) {
                    
                    // 클릭 터치 감지
                    if (x[i].start.x < arr[j].minX || x[i].end.x < arr[j].minX) {continue;}
                    if (x[i].start.x > arr[j].maxX || x[i].end.x > arr[j].maxX) {continue;}
                    if (x[i].start.y < arr[j].minY || x[i].end.y < arr[j].minY) {continue;}
                    if (x[i].start.y > arr[j].maxY || x[i].end.y > arr[j].maxY) {continue;}
                    return returned(x[i], [arr[j].value, true], true);
                }
                delete x[i].end;
            }
            else if (x[i].move !== undefined) {
                for (j in arr) {
                    
                    // 마우스 무브 감지
                    if (!(x[i].move.x < arr[j].minX || x[i].move.x > arr[j].maxX || x[i].move.y < arr[j].minY || x[i].move.y > arr[j].maxY)) {
                        return returned(x[i], [arr[j].value, false], false);
                    }
                }
                delete x[i].move;
            }
        }
        return false;
    }
    
    function mobileInputCheck(boo) {
        var i;
        
        if (boo !== false) {
            moobileInputEnabled = true;
            return;
        }
        for (i in s.motion.keybord) {
            moobileInputEnabled = true;
            return;
        }
    }
    
    function seen0() {
        (s.device.type === 'mobile') ? moobileInputEnabled = false : moobileInputEnabled = true;
        
        c.font = '80px FSEX300';
        c.textAlign = 'left';
        c.textBaseline = 'bottom';
        
        g.fps();
        
        // info에 들어가는 변수 설정
        for (t[0] in r) {
            for (t[1] in r[t[0]]) {
                if (r[t[0]][t[1]].volume !== undefined) {
                    info[t[0]] = r[t[0]][t[1]].volume * 10;
                }
                break;
            }
        }
        info.touchSensitivity = 10;
        
        map.current_map = 7; // @+ 개발용으로 코드쓰는중 끝나면 0으로 바꿀것
        deleteTemp();
    }
    
    function seen1() {
        var i = r.loaded / r.length,
            str = ['.', '..', '...'];
        
        /*
        t[0] = 문자도트 카운터용으로 사용
        t[1] = 애니메이션 전환 딜레이
        t[2] = 0: 로딩중, 1: 로딩완료
        t[3] = 알파값
        */
        
        if (typeof t[0] !== 'number') {
            t[0] = t[1] = t[2] = 0;
            t[3] = 1;
        }
        else if (t[0] > 2) {
            t[0] = 0;
        }
        
        c.clearRect(0, 0, s.view.width, s.view.height);
        
        c.fillStyle = 'rgba(255, 255, 255, ' + t[3] + ')';
        c.fillRect(160, 320, 960, 80);
        c.clearRect(165, 325, 950, 70);
        c.fillRect(170, 330, 940 * i, 60);
        
        t[1] += s.fps.fpsGap;
        
        c.fillText('Loading' + str[t[0]], 160, 315);
        
        if (t[2] === 0) {
            if (t[1] > 500) {
                t[0]++;
                t[1] = 0;
            }

            if (r.loaded === r.length) {
                t[2] = 1;
            }
        }
        else {
            t[3] -= 1 * s.fps.fpsGap / 1000;
            if (t[3] < 0) {
                map.current_map = 2;
                deleteTemp();
            }
        }
    }
    
    function seen2() {
        /*
        t[0] = 0: 최초대기, 1: 페이드 인, 2: 대기, 3: 페이드 아웃, 4: 다음맵으로 이동
        t[1] = 애니메이션 전환 딜레이
        t[2] = 알파값
        */
        if (typeof t[0] !== 'number') {
            t[0] = t[1] = t[2] = 0;
        }
        
        if (t[0] === 0) {
            if (t[1] > 500) {
                t[0] = 1;
            }
        }
        else if (t[0] === 1) {
            t[2] += 1 * s.fps.fpsGap / 1000;
            if (t[2] > 1) {
                t[0] = 2;
                t[1] = 0;
                t[2] = 1;
            }
        }
        else if (t[0] === 2) {
            if (t[1] > 1000) {
                t[0] = 3;
            }
        }
        else {
            t[2] -= 1 * s.fps.fpsGap / 1000;
            if (t[2] < 0) {
                t[0] = 4;
                t[2] = 0;
            }
        }
        
        t[1] += s.fps.fpsGap;
        
        c.fillStyle = 'rgba(255, 255, 255, ' + t[2] + ')'
        c.clearRect(0, 0, s.view.width, s.view.height);
        
        c.fillRect(290, 235, 700, 250);
        c.clearRect(340, 285, 150, 50);
        c.clearRect(340, 335, 50, 50);
        c.clearRect(340, 385, 100, 50);
        
        c.clearRect(490, 235, 50, 250);
        
        c.clearRect(590, 285, 100, 50);
        c.clearRect(590, 385, 100, 50);
        
        c.clearRect(740, 235, 50, 250);
        
        c.clearRect(840, 235, 150, 100);
        c.clearRect(840, 385, 100, 50);
        
        if (t[0] === 4) {
            map.current_map = 3;
            deleteTemp();
        }
        checkPointer();
    }
    
    function seen3() {
        var button = [
            {
                minX: 480,
                minY: 400,
                maxX: 800,
                maxY: 480,
                value: 0
            },
            {
                minX: 480,
                minY: 480,
                maxX: 800,
                maxY: 560,
                value: 1
            }
        ];
        
        /*
        t[0] = 커서 위치 0: play, 1: option
        t[1] = 터치 또는 클릭한 버튼 반환
        t[2] = 포인터 결과 반환
        */
        if (typeof t[0] !== 'number') {
            t[0] = 0;
            t[1] = false;
            c.fillStyle = 'rgba(255, 255, 255, 1)';
//            g.playAudio(r.bgm.intro);
            c.textAlign = 'center';
            c.textBaseline = 'middle';
            c.font = '80px FSEX300';
        }
        
        // 모바일에서 키보드 마우스 사용 여부 감지
        if (!moobileInputEnabled) {mobileInputCheck(t[1]);}
        
        // 화면 드로잉
        c.clearRect(0, 0, 1280, 720);
        
        c.save();
        c.font = '160px FSEX300';
        c.fillText('Pixel UFO', 640, 160);
        c.restore();
        
        c.fillText('Play', 640, 440);
        c.fillText('Option', 640, 520);
        
        // 모바일이 아닐 경우 드로잉
        if (moobileInputEnabled) {
            // 커서 위치 처리
            if (t[0] === 0) {
                c.fillText('>', 525, 440);
            }
            else {
                c.fillText('>', 485, 520);
            }

            // 키보드 방향키 처리
            if (s.motion.keybord.ArrowUp) {
                (t[0] === 0) ? t[0] = 1 : t[0]--;
                s.motion.keybord.ArrowUp = false;
                g.playAudio(r.se.click1);
            }
            else if (s.motion.keybord.ArrowDown) {
                (t[0] === 1) ? t[0] = 0 : t[0]++;
                s.motion.keybord.ArrowDown = false;
                g.playAudio(r.se.click1);
            }
            else if (s.motion.keybord.Space) {
                goto([t[0], true]);
                s.motion.keybord.Space = false;
            }
        }
        
        // 포인터를 확인하고 유효할 경우 해당 맵으로 이동
        t[2] = checkPointer(button);
        if (t[2] !== false) {goto(t[2]);}
        
        function goto(i) {
            switch (i[0]) {
                case 0:
                    if (i[1]) {
                        g.stopAudio('bgm');
                        map.current_map = 7;
                    }
                    else if (t[0] !== 0) {
                        t[0] = 0;
                        i[2] = true;
                    }
                    break;
                case 1:
                    if (i[1]) {
                        map.current_map = 4;
                    }
                    else if (t[0] !== 1) {
                        t[0] = 1;
                        i[2] = true;
                    }
                    break;
            }
            
            // 커서 효과음 처리
            if (i[1]) {
                g.playAudio(r.se.click3);
                deleteTemp();
            }
            if (i[2]) {
                g.playAudio(r.se.click1);
            }
        }
    }
    
    function seen4(goto9map) {
        var button = [
            {
                minX: 650, minY: 240,
                maxX: 720, maxY: 320,
                value: 0
            },
            {
                minX: 845, minY: 240,
                maxX: 915, maxY: 320,
                value: 1
            },
            {
                minX: 650, minY: 320,
                maxX: 720, maxY: 400,
                value: 2
            },
            {
                minX: 845, minY: 320,
                maxX: 915, maxY: 400,
                value: 3
            },
            {
                minX: 650, minY: 400,
                maxX: 720, maxY: 480,
                value: 4
            },
            {
                minX: 845, minY: 400,
                maxX: 915, maxY: 480,
                value: 5
            },
            {
                minX: 360, minY: 480,
                maxX: 560, maxY: 560,
                value: 6
            }
        ];
        
        /*
        t[0] = 커서 위치 0-1: BGM, 2-3: SE, 4-5: TouchSensitivity, 6: Back
        t[1] = 터치 또는 클릭한 버튼 반환
        t[2] = 포인터 결과 반환
        */
        if (typeof t[0] !== 'number') {
            t[0] = 0;
            t[1] = false;
            c.fillStyle = 'rgba(255, 255, 255, 1)';
        }
        
        // 모바일에서 키보드 마우스 사용 여부 감지
        if (!moobileInputEnabled) {mobileInputCheck(t[1]);}
        
        // 화면 드로잉
        c.clearRect(0, 0, 1280, 720);
        
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.font = '160px FSEX300';
        c.fillText('Option', 640, 160);
        
        c.font = '80px FSEX300';
        c.fillText(info.bgm, 770, 280);
        c.fillText(info.se, 770, 360);
        c.fillText(info.touchSensitivity, 770, 440);
        
        c.textAlign = 'left';
        c.textBaseline = 'bottom';
        c.save();
        c.font = '40px FSEX300';
        c.fillText('Touch', 375, 440);
        c.fillText('Sensitivity', 395, 480);
        c.restore();
        
        c.fillText('BGM', 375, 320);
        c.fillText('SE', 375, 400);
        c.fillText('Back', 375, 560);
        
        c.fillText('<', 655, 320);
        c.fillText('<', 655, 400);
        c.fillText('<', 655, 480);
        c.fillText('>', 845, 320);
        c.fillText('>', 845, 400);
        c.fillText('>', 845, 480);
        
        // 모바일이 아닐 경우 드로잉
        if (moobileInputEnabled) {
            // 커서 위치 처리
            c.fillText('>', 320, 320 + (Math.floor(t[0] / 2) * 80));

            // 키보드 방향키 처리
            if (s.motion.keybord.ArrowUp) {
                (t[0] === 0) ? t[0] = 6 : t[0] -= 2;
                s.motion.keybord.ArrowUp = false;
                g.playAudio(r.se.click1);
            }
            else if (s.motion.keybord.ArrowDown) {
                if (t[0] < 5) {t[0] += 2;}
                else if (t[0] === 5) {t[0]++;}
                else {t[0] = 0;}
                s.motion.keybord.ArrowDown = false;
                g.playAudio(r.se.click1);
            }
            else if (s.motion.keybord.ArrowLeft) {
                goto([t[0], true]);
                s.motion.keybord.ArrowLeft = false;
            }
            else if (s.motion.keybord.ArrowRight) {
                goto([t[0] + 1, true]);
                s.motion.keybord.ArrowRight = false;
            }
            else if (s.motion.keybord.Escape || (s.motion.keybord.Space && t[0] === 6)) {
                goto([6, true]);
                s.motion.keybord.Space = false;
                deleteTemp();
            }
        }
        
        // 포인터를 확인하고 유효할 경우 해당 맵으로 이동
        t[1] = checkPointer(button);
        if (t[1] !== false) {goto(t[1]);}
        
        function goto(i) {
            switch (i[0]) {
                case 0:
                    if (i[1]) {
                        if (info.bgm > 1) {
                            info.bgm--;
                            g.setAudioProp('bgm', 'volume', info.bgm / 10);
                        }
                        else {
                            info.bgm = 0;
                            g.setAudioProp('bgm', 'volume', 0);
                        }
                    }
                    else if (t[0] !== 0) {
                        t[0] = 0;
                        i[2] = true;
                    }
                    break;
                case 1:
                    if (i[1]) {
                        if (info.bgm === 0) {
                            info.bgm++;
                            g.setAudioProp('bgm', 'volume', info.bgm / 10);
                            if (goto9map) {
                                g.playAudio(r.bgm.Beethoven_Virus);
                            }
                            else {
                                g.playAudio(r.bgm.intro);
                            }
                            console.log('a')
                        }
                        else if (info.bgm < 9) {
                            info.bgm++;
                            g.setAudioProp('bgm', 'volume', info.bgm / 10);
                        }
                        else {
                            info.bgm = 10;
                            g.setAudioProp('bgm', 'volume', 1);
                        }
                    }
                    else if (t[0] !== 1) {
                        t[0] = 1;
                        i[2] = true;
                    }
                    break;
                case 2:
                    if (i[1]) {
                        if (info.se > 1) {
                            info.se--;
                            g.setAudioProp('se', 'volume', info.se / 10);
                        }
                        else {
                            info.se = 0;
                            g.setAudioProp('se', 'volume', 0);
                        }
                    }
                    else if (t[0] !== 2) {
                        t[0] = 2;
                        i[2] = true;
                    }
                    break;
                case 3:
                    if (i[1]) {
                        if (info.se < 9) {
                            info.se++;
                            g.setAudioProp('se', 'volume', info.se / 10);
                        }
                        else {
                            info.se = 10;
                            g.setAudioProp('se', 'volume', 1);
                        }
                    }
                    else if (t[0] !== 3) {
                        t[0] = 3;
                        i[2] = true;
                    }
                    break;
                case 4:
                    if (i[1]) {
                        if (info.touchSensitivity > 1) {
                            info.touchSensitivity--;
                        }
                    }
                    else if (t[0] !== 4) {
                        t[0] = 4;
                        i[2] = true;
                    }
                    break;
                case 5:
                    if (i[1]) {
                        if (info.touchSensitivity < 20) {
                            info.touchSensitivity++;
                        }
                    }
                    else if (t[0] !== 5) {
                        t[0] = 5;
                        i[2] = true;
                    }
                    break;
                case 6:
                    if (i[1]) {
                        if (goto9map) {
                            map.current_map = 9;
                        }
                        else {
                            map.current_map = 3;
                        }
                        deleteTemp();
                    }
                    else if (t[0] !== 6) {
                        t[0] = 6;
                        i[2] = true;
                    }
                    break;
            }
            
            // 커서 효과음 처리
            if (i[1]) {
                if (i[0] === 6) {
                    g.playAudio(r.se.click3);
                }
                else {
                    g.playAudio(r.se.click2);
                }
            }
            if (i[2]) {
                g.playAudio(r.se.click1);
            }
        }
    }
    
    function seen5() {
        /*
        t[0] = 알파값
        t[1] = 애니메이션 전환 딜레이
        t[2] = 0: 페이드인, 1: 대기, 2: 페이드 아웃
        t[3] = 대기시간 또는 볼륨
        */
        
        if (typeof t[0] !== 'number') {
            t[0] = t[1] = t[2] = t[3] = 0;
            c.font = '160px FSEX300';
            c.textAlign = 'center';
            c.textBaseline = 'middle';
        }
        
        if (t[2] === 0) {
            t[0] += 1 * s.fps.fpsGap / 1000;
            if (t[0] > 1) {
                t[0] = 1;
                t[2]++;
            }
            t[3] = 1 - t[0];
            t[3] = (info.bgm / 10) * t[3];
            if (t[3] <= 0) {
                t[3] = 0;
            }
            g.setAudioProp('bgm', 'volume', t[3]);
        }
        else if (t[2] === 1) {
            if (t[3] < 1000) {
                t[3] += s.fps.fpsGap;
            }
            else {
                t[2]++;
                g.setAudioProp('bgm', 'volume', info.bgm / 10);
            }
        }
        else {
            c.clearRect(0, 0, s.view.width, s.view.height);
            t[0] -= 1 * s.fps.fpsGap / 1000;
            if (t[0] < 0) {
                t[0] = 0;
                map.current_map = 3;
                deleteTemp();
            }
        }
        
        c.fillStyle = 'rgba(0, 0, 0, ' + t[0] + ')';
        c.fillRect(0, 0, s.view.width, s.view.height);
        c.fillStyle = 'rgba(255, 255, 255, ' + t[0] + ')';
        c.fillText('Game Over', 640, 360);
        
        checkPointer();
    }
    
    function seen6() {
        /*
        t[0] = 알파값
        t[1] = 애니메이션 전환 딜레이
        t[2] = 0: 페이드인, 1: 대기, 2: 페이드 아웃
        t[3] = 대기시간 또는 볼륨
        */
        
        if (typeof t[0] !== 'number') {
            t[0] = t[1] = t[2] = t[3] = 0;
            c.font = '80px FSEX300';
            c.textAlign = 'center';
            c.textBaseline = 'middle';
        }
        
        if (t[2] === 0) {
            t[0] += 1 * s.fps.fpsGap / 2000;
            if (t[0] > 1) {
                t[0] = 1;
                t[2]++;
            }
            t[3] = 1 - t[0];
            t[3] = (info.bgm / 10) * t[3];
            if (t[3] <= 0) {
                t[3] = 0;
            }
            g.setAudioProp('bgm', 'volume', t[3]);
        }
        else if (t[2] === 1) {
            if (t[3] < 2000) {
                t[3] += s.fps.fpsGap;
            }
            else {
                t[2]++;
                g.setAudioProp('bgm', 'volume', info.bgm / 10);
            }
        }
        else {
            t[0] -= 1 * s.fps.fpsGap / 1000;
            if (t[0] < 0) {
                t[0] = 0;
                map.current_map = 3;
                deleteTemp();
            }
        }
        
        c.clearRect(0, 0, s.view.width, s.view.height);
        c.fillStyle = 'rgba(255, 255, 255, ' + t[0] + ')';
        c.fillText('Thank You for playing.', 640, 360);
        
        checkPointer();
    }
    
    // ========================================================
    // ========================================================
    // ========================================================
    
    var obj;
    
    function drawObject() {
        var i, j, o,
            sx, sy, dx, dy, w, h,
            gap = s.fps.fpsGap,
            img = r.img.sprite_x5_alpha;
        
        for (i in obj) {
            for (j in obj[i]) {
                o = obj[i][j];
                drawing(o);
            }
        }
        
        function drawing(o) {
            if (o.dx) { // 이동할 x거리가 있으면 실행
                o.x += o.dx * o.speed.currentX * gap / 1000;
            }
            if (o.dy) { // 이동할 y거리가 있으면 실행
                o.y += o.dy * o.speed.currentY * gap / 1000;
            }
            
            if (o.aniTrans.mTime) { // 애니 전환 시간이 0 이 아니면 실행
                o.aniTrans.cTime += gap;
                if (o.aniTrans.cTime > o.aniTrans.mTime) {
                    o.aniTrans.cIndex++;
                    o.aniTrans.cTime = 0;
                    if (o.aniTrans.cIndex === o.animation.length) {
                        o.aniTrans.cIndex = 0;
                    }
                }
            }
            
            w = o.width;
            h = o.height;
            sx = o.animation[o.aniTrans.cIndex].x;
            sy = o.animation[o.aniTrans.cIndex].y;
            dx = o.hw;
            dy = o.hh;
            
            if (!o.overflow) {
                if (o.x < o.hw) {o.x = o.hw;transDx();}
                else if (o.x > 1280 - o.hw) {o.x = 1280 - o.hw;transDx();}
                if (o.y < o.hh) {o.y = o.hh;transDy();}
                else if (o.y > 720 - o.hh) {o.y = 720 - o.hh;transDy();}
                
                function transDx() {
                    if (o.speed.min !== 0) {
                        if (o.dx > 0) {
                            o.dx = -(Math.random() + .5);
                        }
                        else {
                            o.dx = Math.random() + .5;
                        }
                    }
                }
                
                function transDy() {
                    if (o.speed.min !== 0) {
                        if (o.dy > 0) {
                            o.dy = -(Math.random() + .5);
                        }
                        else {
                            o.dy = Math.random() + .5;
                        }
                    }
                }
            }
            
            c.save();
            
            c.translate(o.x, o.y);
            
            if (o.rotate.speed) { // 회전 애니 각도가 0이 아닐 경우 계산
                o.rotate.direction += o.rotate.speed * gap / 1000;
                if (o.rotate.speed > 360) {o.rotate.speed -= 360}
                else if (o.rotate.speed < -360) {o.rotate.speed += 360}
            }
            else if (o.dx !== 0 && o.speed.min !== undefined) {
                rotate = (o.speed.min - o.speed.currentX) / 10;
                rotate = rotate * o.dx;
                o.rotate.direction = rotate;
            }
            else if (!o.rotate.speed && o.speed.min !== undefined) {
                o.rotate.direction = 0;
            }
            
            c.rotate(o.rotate.direction * -Math.PI / 180);
            c.drawImage(img, sx, sy, w, h, -dx, -dy, w, h);
            
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.restore();
        }
    }
    
    function movePlayer() {
        var rotate,
            p = obj.player[0],
            gap = s.fps.fpsGap;
        
        function deceleY(n) {
            if (!n) {n = .5;}
            if (p.speed.currentY > p.speed.min) {
                p.speed.currentY -= gap * n;
                if (p.speed.currentY <= p.speed.min) {
                    p.speed.currentY = p.speed.min;
                    p.dy = 0;
                }
            }
        }
        
        function accelY() {
            if (p.speed.currentY < p.speed.max) {
                p.speed.currentY += gap;
                if (p.speed.currentY > p.speed.max) {
                    p.speed.currentY = p.speed.max;
                }
            }
        }
        
        function deceleX(n) {
            if (!n) {n = .5;}
            if (p.speed.currentX > p.speed.min) {
                p.speed.currentX -= gap * n;
                if (p.speed.currentX <= p.speed.min) {
                    p.speed.currentX = p.speed.min;
                    p.dx = 0;
                }
            }
        }
        
        function accelX() {
            if (p.speed.currentX < p.speed.max) {
                p.speed.currentX += gap;
                if (p.speed.currentX > p.speed.max) {
                    p.speed.currentX = p.speed.max;
                }
            }
        }
        
        // 아래 키를 누른 경우
        if (s.motion.keybord.ArrowDown && p.y < 720 - p.hh) {
            if (p.dy < 0) { // 위로가는 속도가 있을때 아래를 누른경우
                deceleY(2);
            }
            else {
                p.dy = 1;
                accelY();
            }
        }
        // 위 키를 누른 경우
        else if (s.motion.keybord.ArrowUp && p.y > p.hh) {
            if (p.dy > 0) { // 아래로 가는 속도가 있을때 위를 누른경우
                deceleY(2);
            }
            else {
                p.dy = -1;
                accelY();
            }
        }
        // 누른 위아래 키가 없는데 위아래 이동값이 있는 경우
        else if (p.dy !== 0){
            deceleY();
        }
        
        // 앞 키를 누른 경우
        if (s.motion.keybord.ArrowRight && p.x < 1280 - p.hw) {
            if (p.dx < 0) { // 뒤로가는 속도가 있을때 앞을 누른경우
                deceleX(2);
            }
            else {
                p.dx = 1;
                accelX();
            }
        }
        // 뒤 키를 누른 경우
        else if (s.motion.keybord.ArrowLeft && p.x > p.hw) {
            if (p.dx > 0) { // 앞으로 가는 속도가 있을때 뒤를 누른경우
                deceleX(2);
            }
            else {
                p.dx = -1;
                accelX();
            }
        }
        // 누른 좌우 키가 없는데 좌우 이동값이 있는 경우
        else if (p.dx !== 0){
            deceleX();
        }
        
        if (p.hp <= 0) {
            map.current_map = 5;
            deleteTemp();
        }
    }
    
    function moveGear() {
        var i, r, x, y, dx, dy,
            gap = s.fps.fpsGap,
            g = obj.gear;
        
        x = obj.player[0].x;
        y = obj.player[0].y;
        
        for (i in g) {
            r = g[i].rotate.direction * Math.PI / -180;
            dx = Math.sin(r) * 100;
            dy = Math.cos(r) * 100;
            
            g[i].x = x + dx;
            g[i].y = y + dy;
        }
    }
    
    function moveEnemy() {
        var i, type,
            ene = obj.enemy;
        
        for (i in ene) {
            if (ene[i].reaction && !ene[i].missile) {
                type = ene[i].type;
                
                switch (type) {
                    case 'and1':
                        and1(ene[i]);
                        break;
                    case 'and2':
                        and2(ene[i]);
                        break;
                    case 'and3':
                        and3(ene[i]);
                        break;
                    case 'and4':
                        and4(ene[i]);
                        break;
                    case 'cat':
                        cat(ene[i]);
                        break;
                    case 'boss':
                        boss(ene[i]);
                        break;
                }
            }
            else if (ene[i].speed.min === 0 && !ene[i].missile) {
                response(ene[i]);
            }
            else if (ene[i].overflow) {
                if (ene[i].x >= 0 && ene[i].x <= 1280 && ene[i].y >= 0 && ene[i].y <= 720) {
                    ene[i].overflow = false;
                }
            }
            else if (ene[i].missile) {
                stillShotBullet(ene[i]);
            }
        }
        
        // 안드1 행동 패턴
        function and1(e) {
            var i;
            i = actions(e, 1);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i > 0) {
                e.missile = true;
                shotBullet(e, 3, 1, 'front', 1);
            }
        }
        
        function and2(e) {
            var i;
            i = actions(e, 2);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i === 1) {
                e.missile = true;
                shotBullet(e, 4, 2, 'front', 1);
            }
            else if (i === 2) {
                e.missile = true;
                shotBullet(e, 4, 2, 'spin', .1);
            }
        }
        
        function and3(e) {
            var i;
            i = actions(e, 1);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i === 1) {
                e.missile = true;
                shotBullet(e, 5, 12, 'spin', 1);
            }
        }
        
        function and4(e) {
            var i;
            i = actions(e, 3);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i === 1) {
                e.missile = true;
                shotBullet(e, 6, 6, 'spin', 1.8);
            }
            else if (i > 1) {
                e.missile = true;
                shotBullet(e, 6, 6, 'spin', .5);
            }
        }
        
        function cat(e) {
            var i;
            i = actions(e, 4);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i === 1) {
                e.missile = true;
                shotBullet(e, 3, 10, 'spin', .5);
            }
            else if (i === 2) {
                e.missile = true;
                shotBullet(e, 4, 12, 'spin', 2);
            }
            else if (i > 2) {
                e.missile = true;
                shotBullet(e, 7, 6, 'spin', 1);
            }
        }
        
        function boss(e) {
            var i;
            i = actions(e, 5);
            if (i === 0) {
                resetArrive(e);
            }
            else if (i === 1) {
                e.missile = true;
                shotBullet(e, 3, 10, 'front', 1);
            }
            else if (i === 2) {
                e.missile = true;
                shotBullet(e, 3, 48, 'spin', 3);
            }
            else if (i > 3) {
                e.missile = true;
                shotBullet(e, 7, 12, 'spin', 1);
            }
        }
        
        // 적 기본 총알
        function shotBullet(e, bType, sNum, sType, spinN) {
            /*
            e = 총알을 발사하는 객체
            bType = 총알 종류
            sNum = 발사할 갯수
            sType = 발사할 타입 (front 전방으로, spin 뱅뱅 돌면서)
            */
            var dx, dy, angle,
                ac = e.action;
            if (!spinN) {spinN = 1;}
            ac.missileType = bType;
            ac.maxShot = sNum;
            ac.currShot = 1;
            ac.shotType = sType;
            ac.spin = spinN;
            ac.currTime = 0;
            
            if (ac.maxShot !== ac.currShot) {
                // 플레이어쪽으로 발사할 총알의 방향을 계산한다.
                dx = obj.player[0].x - e.x;
                dy = obj.player[0].y - e.y;
                
                angle = Math.atan2(dx, dy);
                
                dx = Math.sin(angle);
                dy = Math.cos(angle);
                
                angle = (angle / Math.PI * 180) - 90;
                
                obj.eBullet.push(new CreateBullet(bType, e.x, e.y, dx, dy, angle));
            }
        }
        
        // 적 기본 총알
        function stillShotBullet(e) {
            var dx, dy, angle, n,
                gap = s.fps.fpsGap,
                ac = e.action;
            
            ac.currTime += gap;
            
            if (ac.shotType === 'spin') {
                n = 0.1;
            }
            else {
                n = 1;
            }
            
            if (ac.maxShot !== ac.currShot) {
                if (ac.currTime >= ac.missileGap * n) {
                    ac.currTime -= ac.missileGap * n;
                    ac.currShot++;
                    
                    // 플레이어쪽으로 발사할 총알의 방향을 계산한다.
                    dx = obj.player[0].x - e.x;
                    dy = obj.player[0].y - e.y;

                    angle = Math.atan2(dx, dy);

                    // 스핀 모드일 경우 발사할 각에서 추가 각을 더한다.
                    if (ac.shotType === 'spin') {
                        angle = angle / Math.PI * 180;
                        angle += 360 * ac.currShot / ac.maxShot * ac.spin;
                        angle = angle * Math.PI / 180;
                    }

                    dx = Math.sin(angle);
                    dy = Math.cos(angle);
                    
                    angle = (angle / Math.PI * 180) - 90;
                    
                    obj.eBullet.push(new CreateBullet(ac.missileType, e.x, e.y, dx, dy, angle));
                }
            }
            else {
                e.missile = false;
            }
        }
        
        // 액션 난수 반환
        function actions(e, n) {
            // n 0~n 중 난수 반환
            var i,
                gap = s.fps.fpsGap;
            
            e.action.currTime += gap;
//            console.log(e.action.currTime)
            if (e.action.time < e.action.currTime) {
                e.action.currTime = 0;
                i = Math.round(Math.random() * n);
                return i;
            }
        }
        
        // 이동할 위치 재설정
        function resetArrive(e) {
            var i;
            e.move = true;
            e.reaction = false;
            
            // 도착할 뷰의 y 지점
            i = Math.random() * (720 - e.height);
            i = i + e.hh;
            e.ay = i;
            // 도착할 뷰의 x 지점
            i = Math.random() * (855 - e.width);
            i = i + 425 + e.hw;
            e.ax = i;

            // 이동 각도 설정
            x = e.ax - e.x;
            y = e.ay - e.y;

            angle = Math.atan2(x, y);

            e.dx = Math.sin(angle);
            e.dy = Math.cos(angle);
        }
        
        // 리스폰 모드일때 또는 무브모드일때 이동
        function response(e) {
        var rotate,
            gap = s.fps.fpsGap * .3;

            function deceleY() {
                if (e.speed.currentY > e.speed.min) {
                    e.speed.currentY -= gap;
                    if (e.speed.currentY <= e.speed.min) {
                        e.speed.currentY = e.speed.min;
                        e.dy = 0;
                    }
                }
            }

            function accelY() {
                if (e.speed.currentY < e.speed.max) {
                    e.speed.currentY += gap;
                    if (e.speed.currentY > e.speed.max) {
                        e.speed.currentY = e.speed.max;
                    }
                }
            }

            function deceleX() {
                if (e.speed.currentX > e.speed.min) {
                    e.speed.currentX -= gap;
                    if (e.speed.currentX <= e.speed.min) {
                        e.speed.currentX = e.speed.min;
                        e.dx = 0;
                    }
                }
            }

            function accelX() {
                if (e.speed.currentX < e.speed.max) {
                    e.speed.currentX += gap;
                    if (e.speed.currentX > e.speed.max) {
                        e.speed.currentX = e.speed.max;
                    }
                }
            }
            
            if (e.move) {
                accelX();
                accelY();
                // 경로에 도착하면 실행
                if (Math.abs(e.x - e.ax) < 10 && Math.abs(e.y - e.ay) < 10) {
                    e.response = false;
                    e.overflow = false;
                    e.move = false;
                }
            }
            else if (e.speed.currentX !== 0 && e.speed.currentY !== 0) {
                if (e.speed.min !== 0) {
                    e.reaction = true;
                }
                else {
                    deceleX();
                    deceleY();
                }
            }
            else {
                e.dx = e.dy = 0;
                e.reaction = true;
            }
        }
    }
    
    function moveBullet() {
        var i, e;
        
        e = obj.eBullet;
        for (i in e) {
            move(e[i]);
            life(e, i);
        }
        
        e = obj.pBullet;
        for (i in e) {
            move(e[i]);
            life(e, i);
        }
        
        // 화면 밖으로 나갈 경우 삭제
        function life(e, i) {
            if (e[i].x < 0 || e[i].x > 1280 || e[i].y < 0 || e[i].y > 720) {
                e.splice(i, 1);
            }
        }
        
        // 총알 이동 계산
        function move(e) {
        var rotate,
            gap = s.fps.fpsGap * .3;

            function deceleY() {
                if (e.speed.currentY > e.speed.max) {
                    e.speed.currentY -= gap;
                    if (e.speed.currentY <= e.speed.max) {
                        e.speed.currentY = e.speed.max;
                    }
                }
            }

            function accelY() {
                if (e.speed.currentY < e.speed.max) {
                    e.speed.currentY += gap;
                    if (e.speed.currentY > e.speed.max) {
                        e.speed.currentY = e.speed.max;
                    }
                }
            }

            function deceleX() {
                if (e.speed.currentX > e.speed.max) {
                    e.speed.currentX -= gap;
                    if (e.speed.currentX <= e.speed.max) {
                        e.speed.currentX = e.speed.max;
                    }
                }
            }

            function accelX() {
                if (e.speed.currentX < e.speed.max) {
                    e.speed.currentX += gap;
                    if (e.speed.currentX > e.speed.max) {
                        e.speed.currentX = e.speed.max;
                    }
                }
            }
            
            if (e.speed.currentX < e.speed.max) {
                accelX();
                accelY();
            }
            else if (e.speed.currentX > e.speed.max) {
                deceleX();
                deceleY();
            }
            
            if (e.type === 4) {
                if (obj.player[0].y < e.y) {
                    e.dy -= gap / 2000
                }
                else if (obj.player[0].y > e.y) {
                    e.dy += gap / 2000
                }
            }
        }
    }
    
    function CreateObj() {
        return {
            eBullet: [

            ],
            pBullet: [

            ],
            enemy: [

            ],
            player: [{
                type: 'player',
                hp: 100, // 객체 hp
                damage: 0, // 충돌시 상대방에게 주는 데미지
                x: 360, y: 160, // 현재 화면상 위치
                width: 90, height: 50, // 객체 크기 및 이미지
                hw: 45, hh: 25, // 객체 크기의 절반 값
                dx: 0, dy: 0, // 이동해야 할 방향
                radius: 25, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
                speed: {
                    min: 0, // 초당 이동할 픽셀거리 최소 속도
                    currentX: 0, // 초당 이동할 x픽셀거리 현재 속도
                    currentY: 0, // 초당 이동할 y픽셀거리 현재 속도
                    max: 500 // 초당 이동할 픽셀거리 최대 속도
                },
                rotate: {
                    direction: 0, // 바라보고 있는 각도
                    speed: 0 // 초당 회전할 각도 애니메이션 속도 0~360
                },
                animation: [
                    {x: 0, y: 0},
                    {x: 90, y: 0},
                    {x: 180, y: 0},
                    {x: 270, y: 0}
                ],
                aniTrans: {
                    cIndex: 0, // 애니메이션 현재 인덱스
                    cTime: 0, // 전환까지 경화한 시간
                    mTime: 100 //애니메이션 인덱스 전환에 필요한 초과시간
                },
                gear: {
                    laser: 1, // 해당 무기 레벨
                    lCurrtTime: 0, // 다음 슛까지 경과한 딜레이 시간
                    lShotDelay: 400, // 다음 슛까지의 딜레이 레이저는 충전시간
                    bullet: 1,
                    bCurrtTime: 0,
                    bShotDelay: 200,
                    missile: 0,
                    mCurrtTime: 0,
                    mShotDelay: 900,
                    gear: 0,
                    gCurrtTime: 0,
                    gShotDelay: 500
                },
                controll: true, // 플레이어가 컨트롤 가능한지 여부
                overflow: false // 뷰 밖으로 나가는 것 허용여부
            }],
            gear: [

            ],
            item: [

            ]
        }
    }
    
    function CreateBullet(type, x, y, dx, dy, ang) {
        // 이녀석은 
        /*
        type = 0: 아군기본, 1: 아군 미사일, 2: 아군 레이저
        3: 적군기본, 4: 적군 유도, 5: 적군다발, 6: 적군메가포, 7: 적군 레이저1, 8: 적군 레이저2
        */
        this.type = type,
        this.x = x,
        this.y = y,
        this.dx = dx,
        this.dy = dy, // 이동해야 할 방향
        this.aniTrans = {
            cIndex: 0,
            mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
        },
        this.rotate = {
            direction: ang, // 바라보고 있는 각도
            speed: 0 // 초당 회전할 각도 애니메이션 속도 0~360
        },
        this.radius = 0, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
        this.overflow = true; // 뷰 밖으로 나가는 것 허용여부
        
        if (type === 0) {
            this.damage = 100, // 충돌시 상대방에게 주는 데미지
            this.width = 28, this.height = 28, // 객체 크기 및 이미지
            this.hw = 14, this.hh = 14, // 객체 크기의 절반 값
            this.radius = 14, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 1500, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 1500, // 초당 이동할 y픽셀거리 현재 속도
                max: 1500 // 초당 이동할 픽셀거리 최대 속도
            },
            this.animation = [
                {x: 311, y: 191}
            ];
        }
        else if (type === 1) {
            this.damage = 300, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 23, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 12, // 객체 크기의 절반 값
            this.radius = 12, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 1000, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 1000, // 초당 이동할 y픽셀거리 현재 속도
                max: 2000 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                cTime: 0, //애니메이션 인덱스 전환에 필요한 초과시간
                mTime: 100 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 291, y: 141},
                {x: 291, y: 166}
            ];
        }
        else if (type === 2) {
            this.damage = 300, // 충돌시 상대방에게 주는 데미지
            this.width = 93, this.height = 13, // 객체 크기 및 이미지
            this.hw = 47, this.hh = 7, // 객체 크기의 절반 값
            this.dx = 1,
            this.dy = 0,
            this.rotate.direction = 0,
            this.speed = {
                currentX: 3000, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 3000, // 초당 이동할 y픽셀거리 현재 속도
                max: 3000 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 6, y: 381}
            ];
        }
        else if (type === 3) {
            this.damage = 20, // 충돌시 상대방에게 주는 데미지
            this.width = 28, this.height = 28, // 객체 크기 및 이미지
            this.hw = 14, this.hh = 14, // 객체 크기의 절반 값
            this.radius = 14, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 400, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 400, // 초당 이동할 y픽셀거리 현재 속도
                max: 400 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 311, y: 221}
            ];
        }
        else if (type === 4) {
            this.damage = 15, // 충돌시 상대방에게 주는 데미지
            this.width = 28, this.height = 18, // 객체 크기 및 이미지
            this.hw = 14, this.hh = 9, // 객체 크기의 절반 값
            this.rotate.speed = 120,
            this.radius = 9, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 250, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 250, // 초당 이동할 y픽셀거리 현재 속도
                max: 250 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 311, y: 251}
            ];
        }
        else if (type === 5) {
            this.damage = 10, // 충돌시 상대방에게 주는 데미지
            this.width = 28, this.height = 13, // 객체 크기 및 이미지
            this.hw = 14, this.hh = 7, // 객체 크기의 절반 값
            this.radius = 7, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 500, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 500, // 초당 이동할 y픽셀거리 현재 속도
                max: 150 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 311, y: 271}
            ];
        }
        else if (type === 6) {
            this.damage = 30, // 충돌시 상대방에게 주는 데미지
            this.width = 63, this.height = 33, // 객체 크기 및 이미지
            this.hw = 32, this.hh = 17, // 객체 크기의 절반 값
            this.radius = 18, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.speed = {
                currentX: 0, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 0, // 초당 이동할 y픽셀거리 현재 속도
                max: 1000 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                cTime: 0, //애니메이션 인덱스 전환에 필요한 초과시간
                mTime: 100 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 201, y: 361},
                {x: 201, y: 396},
                {x: 201, y: 431}
            ];
        }
        else if (type === 7) {
            this.damage = 50, // 충돌시 상대방에게 주는 데미지
            this.width = 88, this.height = 33, // 객체 크기 및 이미지
            this.hw = 44, this.hh = 17, // 객체 크기의 절반 값
            this.radius = 17, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
            this.dx = -1,
            this.dy = 0,
            this.rotate.direction = 0,
            this.speed = {
                currentX: 2000, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 2000, // 초당 이동할 y픽셀거리 현재 속도
                max: 2000 // 초당 이동할 픽셀거리 최대 속도
            },
            this.aniTrans = {
                cIndex: 0,
                mTime: 100 //애니메이션 인덱스 전환에 필요한 초과시간
            },
            this.animation = [
                {x: 101, y: 416}
            ];
        }
    }
    
    function CreateEnemy(type) {
        this.dx = 0,
        this.dy = 0, // 이동해야 할 방향
        this.aniTrans = {
            cIndex: 0,
            mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
        },
        this.rotate = {
            direction: 0, // 바라보고 있는 각도
            speed: 0 // 초당 회전할 각도 애니메이션 속도 0~360
        },
        this.speed = {
            min: 0, // 초당 이동할 픽셀거리 최소 속도
            currentX: 500, // 초당 이동할 x픽셀거리 현재 속도
            currentY: 500, // 초당 이동할 y픽셀거리 현재 속도
            max: 500 // 초당 이동할 픽셀거리 최대 속도
        },
        this.action = {
            shotType: '',
            missileType: 0,
            maxShot: 3,
            currShot: 0,
            missileGap: 300, // 연속 미사일 발사시 다음 발사까지 대기해야 할 시간
            currTime: 0, // 다음 동작까지 현재 소모한 시간
            time: 1000 // 다음 동작까지 소모해야 할 시간
        },
        this.type = type,
        this.radius = 0, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
        this.overflow = true, // 뷰 밖으로 나가는 것 허용여부
        this.response = true, // 뷰 밖으로 나가는 것 허용여부
        this.move = true, // 이동할 것인가
        this.reaction = false, // 액션 난수를 실행할 것인가
        this.missile = false; // 미사일을 발사중인가
        
        if (type === 'and1') {
            this.hp = 300, // 객체 hp
            this.damage = 20, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 78, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 39, // 객체 크기의 절반 값
            this.animation = [
                {x: 91, y: 101}
            ];
        }
        else if (type === 'and2') {
            this.hp = 500, // 객체 hp
            this.damage = 20, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 78, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 39, // 객체 크기의 절반 값
            this.action.time = 900,
            this.animation = [
                {x: 141, y: 101}
            ];
        }
        else if (type === 'and3') {
            this.hp = 700, // 객체 hp
            this.damage = 20, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 78, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 39, // 객체 크기의 절반 값
            this.action.time = 800,
            this.animation = [
                {x: 191, y: 101}
            ];
        }
        else if (type === 'and4') {
            this.hp = 900, // 객체 hp
            this.damage = 20, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 78, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 39, // 객체 크기의 절반 값
            this.action.time = 700,
            this.animation = [
                {x: 241, y: 101}
            ];
        }
        else if (type === 'cat') {
            this.hp = 1100, // 객체 hp
            this.damage = 30, // 충돌시 상대방에게 주는 데미지
            this.width = 73, this.height = 88, // 객체 크기 및 이미지
            this.hw = 37, this.hh = 44, // 객체 크기의 절반 값
            this.action.time = 500,
            this.animation = [
                {x: 291, y: 51}
            ],
            this.speed = {
                min: 0, // 초당 이동할 픽셀거리 최소 속도
                currentX: 400, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 400, // 초당 이동할 y픽셀거리 현재 속도
                max: 400 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        else if (type === 'boss') {
            this.hp = 3000, // 객체 hp
            this.damage = 100, // 충돌시 상대방에게 주는 데미지
            this.width = 133, this.height = 148, // 객체 크기 및 이미지
            this.hw = 67, this.hh = 74, // 객체 크기의 절반 값
            this.action.time = 300,
            this.animation = [
                {x: 1, y: 231}
            ],
            this.speed = {
                min: 0, // 초당 이동할 픽셀거리 최소 속도
                currentX: 300, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 300, // 초당 이동할 y픽셀거리 현재 속도
                max: 300 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        else if (type === 'rock1') {
            this.hp = 300, // 객체 hp
            this.damage = 50, // 충돌시 상대방에게 주는 데미지
            this.width = 48, this.height = 48, // 객체 크기 및 이미지
            this.hw = 24, this.hh = 24, // 객체 크기의 절반 값
            this.rotate.speed = 30,
            this.animation = [
                {x: 91, y: 181}
            ],
            this.speed = {
                min: 300, // 초당 이동할 픽셀거리 최소 속도
                currentX: 300, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 300, // 초당 이동할 y픽셀거리 현재 속도
                max: 300 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        else if (type === 'rock2') {
            this.hp = 500, // 객체 hp
            this.damage = 75, // 충돌시 상대방에게 주는 데미지
            this.width = 88, this.height = 88, // 객체 크기 및 이미지
            this.hw = 44, this.hh = 44, // 객체 크기의 절반 값
            this.rotate.speed = 60,
            this.animation = [
                {x: 1, y: 51}
            ],
            this.speed = {
                min: 250, // 초당 이동할 픽셀거리 최소 속도
                currentX: 250, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 250, // 초당 이동할 y픽셀거리 현재 속도
                max: 250 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        else if (type === 'rock3') {
            this.hp = 1500, // 객체 hp
            this.damage = 100, // 충돌시 상대방에게 주는 데미지
            this.width = 168, this.height = 168, // 객체 크기 및 이미지
            this.hw = 84, this.hh = 84, // 객체 크기의 절반 값
            this.rotate.speed = 90,
            this.animation = [
                {x: 141, y: 191}
            ],
            this.speed = {
                min: 200, // 초당 이동할 픽셀거리 최소 속도
                currentX: 200, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 200, // 초당 이동할 y픽셀거리 현재 속도
                max: 200 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        else if (type === 'saw') {
            this.hp = 1500, // 객체 hp
            this.damage = 10, // 충돌시 상대방에게 주는 데미지
            this.width = 88, this.height = 88, // 객체 크기 및 이미지
            this.hw = 44, this.hh = 44, // 객체 크기의 절반 값
            this.rotate.speed = 270,
            this.animation = [
                {x: 1, y: 141}
            ],
            this.speed = {
                min: 600, // 초당 이동할 픽셀거리 최소 속도
                currentX: 600, // 초당 이동할 x픽셀거리 현재 속도
                currentY: 600, // 초당 이동할 y픽셀거리 현재 속도
                max: 600 // 초당 이동할 픽셀거리 최대 속도
            };
        }
        
        var i, x, y, angle;
        // 리스폰 할 랜덤 세로 위치 생성
        i = Math.random() * (1440 + this.height);
        i = i - 360 - this.hh;
        this.y = i;
        // 리스폰 할 랜덤 가로 위치 생성
        if (i < -this.hh || i > 720 + this.hh) {
            i = Math.random() * 960;
            i = i + 640;
            this.x = i;
        }
        else {
            this.x = 1280 + this.hw;
        }
        
        // 도착할 뷰의 y 지점
        i = Math.random() * (720 - this.height);
        i = i + this.hh;
        this.ay = i;
        // 도착할 뷰의 x 지점
        i = Math.random() * (640 - this.width);
        i = i + 640 + this.hw;
        this.ax = i;
        
        // 이동 각도 설정
        x = this.ax - this.x;
        y = this.ay - this.y;

        angle = Math.atan2(x, y);

        this.dx = Math.sin(angle);
        this.dy = Math.cos(angle);
    }
    
    function CreateGear() {
        var x, y, dx, dy, r;
        
        if (!obj.gear.length) {
            r = 0 * Math.PI / 180;
            this.rotate = {direction: 0};
        }
        else {
            r = obj.gear[obj.gear.length - 1].rotate.direction + 90;
            this.rotate = {direction: r};
            r = r * Math.PI / 180;
        }
        
        x = obj.player[0].x;
        y = obj.player[0].y;
        dx = Math.sin(r) * 100;
        dy = Math.cos(r) * 100;
        
        this.x = x + dx,
        this.y = y + dy;
        this.dx = 0,
        this.dy = 0, // 이동해야 할 방향
        this.overflow = true, // 뷰 밖으로 나가는 것 허용여부
        this.aniTrans = {
            cIndex: 0,
            mTime: 0 //애니메이션 인덱스 전환에 필요한 초과시간
        },
        this.rotate.speed = 90, // 초당 회전할 각도 애니메이션 속도 0~360
        this.speed = {
            min: 0, // 초당 이동할 픽셀거리 최소 속도
            currentX: 0, // 초당 이동할 x픽셀거리 현재 속도
            currentY: 0, // 초당 이동할 y픽셀거리 현재 속도
            max: 500 // 초당 이동할 픽셀거리 최대 속도
        },
        this.radius = 18, // 충돌범위 반지름, 0일 경우 aabb 사각형 충돌로 연산
        this.width = 35, this.height = 35, // 객체 크기 및 이미지
        this.hw = 18, this.hh = 18, // 객체 크기의 절반 값
        this.animation = [
            {x: 310, y: 285}
        ];
    }
    
    function CreateItem() {
        
    }
    
    function seen7() {
        /*
        t[0] = 초기화 여부
        */
        
        if (!t[0]) {
            t[0] = true;
            obj = new CreateObj();
//            setTimeout(function() {obj.player[0].hp = 0}, 1000)
            obj.enemy[0] = new CreateEnemy('and1');
            obj.enemy[1] = new CreateEnemy('and2');
            obj.enemy[2] = new CreateEnemy('and3');
            obj.enemy[3] = new CreateEnemy('and4');
            obj.enemy[4] = new CreateEnemy('cat');
            obj.enemy[5] = new CreateEnemy('boss');
            obj.enemy[6] = new CreateEnemy('saw');
            obj.enemy[7] = new CreateEnemy('rock1');
            obj.enemy[8] = new CreateEnemy('rock2');
            obj.enemy[9] = new CreateEnemy('rock3');
        }
        
        c.clearRect(0, 0, 1280, 720);
        
        movePlayer();
        moveGear();
        moveEnemy();
        moveBullet();
        drawObject();
        
    }
    
})(window, g8b, g8b.ctx, g8b.res, g8b.system);
































