(function () {
    'use strict';
    
    var Cookie;
    
    // ============================================================
    // polyfill
    // ============================================================
    (function () {
        // IE 전용 NodeList.forEach
        if (window.NodeList && !window.NodeList.prototype.forEach) {
            window.NodeList.prototype.forEach = function (callback, thisArg) {
                var i;
                thisArg = thisArg || window;
                for (i = 0; i < this.length; i++) {
                    callback.call(thisArg, this[i], i, this);
                }
            };
        }
    }());
    
    // ============================================================
    // 쿠키 컨트롤 메소드
    // ============================================================
    (function () {
        
        /* API
        
        Cookie.set(obj);
        obj = {name: '', value: '' [, domain: '', path: '', life: '', secure: boolean]}
        
        
        Cookie.get(str);
        str = 'cookie name'
        
        
        Cookie.remove(obj);
        obj = {name: '' [, domain: '', path: '', secure: boolean]}
        
        
        return 값
        set, remove -> 메소드가 정상 처리 되었다면 true 아닐경우 false
        get -> 존재할 경우 해당 쿠키의 값, 존재하지 않거나 삭제되어 값을 가지지 않는 세션 쿠키의 경우 undefined
        */
        if (navigator.cookieEnabled === true) {
            Cookie = (function () {
                var cookies;

                // 현재 페이지에서 사용 가능한 쿠키 로드
                function loadCookie() {
                    var cookie = document.cookie;
                    cookies = {};
                    
                    // 하나 이상의 쿠키가 있다면
                    if (cookie !== '') {
                        cookie = cookie.split('; ');
                        cookie.forEach(function (str) {
                            str = str.split('=');
                            cookies[str[0]] = decodeURIComponent(str[1]);
                        });
                    }
                }
                loadCookie();

                // 쿠키를 추가 또는 수정
                function setCookie(obj) {
                    var value = '';
                    
                    // 요청이 유효하지 않다면
                    if (!obj.name || !obj.value) {return false; }

                    value += obj.name + '=' + encodeURIComponent(obj.value);
                    value += obj.domain ? '; domain=' + obj.domain : '';
                    value += obj.path ? '; path=' + obj.path : '';
                    value += obj.life ? '; expires=' + (Date.now() + obj.life) : '';
                    value += obj.secure === true ? '; secure' : '';

                    document.cookie = value;
                    cookies[obj.name] = obj.value;

                    return true;
                }

                // 인자로 받은 이름의 쿠키가 있을 경우 반환
                function getCookie(name) {
                    return cookies[name] || undefined;
                }

                // 쿠키를 삭제 (값이 없는 세션 쿠키가 됨)
                function removeCookie(obj) {
                    var value = '';

                    if (!obj.name || !cookies[obj.name]) {return false; }

                    value += obj.name + '=';
                    value += obj.domain ? '; domain=' + obj.domain : '';
                    value += obj.path ? '; path=' + obj.path : '';
                    value += '; expires=0';
                    value += obj.secure === true ? '; secure' : ';';
                    
                    if (cookies[obj.name]) { // 유효한 쿠키일 경우
                        document.cookie = value; // 해당 쿠키 갱신
                        loadCookie();
                    }
                    
                    // 정상적으로 쿠키가 삭제되었다 === true
                    return cookies[obj.name] ? false : true;
                }

                return {
                    set: setCookie,
                    get: getCookie,
                    remove: removeCookie
                };
            }());
        }
    }());
    
    
    // ============================================================
    // 드롭다운 메뉴
    // ============================================================
    (function () {
        var menutooltip = document.querySelector('#menutooltip'),
            menubar = document.querySelector('#menubar'),
            // 대 메뉴 li 리스트
            menubar_item = document.querySelectorAll('#menubar>li'),
            // 대 메뉴 li의 직속 a 리스트
            menubar_item_a = document.querySelectorAll('#menubar>li>a'),
            // 하위 메뉴 아이템을 감싸는 직속 부모 ul태그 참조
            menu = menubar.querySelectorAll('ul'),
            // menubar_item에 하위 메뉴 아이템이 있을 경우,
            // 2차원 배열로 하위 메뉴 li 리스트
            menu_item = [],
            // 2차원 배열로 하위 메뉴 li의 a 리스트
            menu_item_a = [],
            // 키보드를 이용하여 메뉴를 컨트롤 한 적이 없다 === true
            isInitialControl = true,
            // 키보드를 이용하여 메뉴를 컨트롤 중이다 === true
            isMenuKeyControl = false,
            // 포커스 인된 엘리먼트의 대메뉴 인덱스
            focusInIdx = -1,
            // 포커스 아웃된 엘리먼트의 대메뉴 인덱스
            focusOutIdx = -1,
            // 포커스 된 엘리먼트
            focusElement = null,
            fcusoutAsync;
        
        // 최초 키보드 컨트롤 시 1회 동작할 함수
        function initialControl() {
            isInitialControl = false;
            
            // 쿠키를 사용할 수 없다 || 툴팁을 표시했었다는 세션 쿠키가 없다면
            if (!Cookie || !Cookie.get('menuTooltip')) {
                // 세션 쿠키 생성
                if (Cookie) {Cookie.set({name: 'menuTooltip', value: true}); }
                // 툴팁 엘리먼트 애니메이션 시작
                menutooltip.classList.add('menutooltip');
                // 툴팁 엘리먼트 애니메이션 종료 시
                menutooltip.addEventListener('animationend', function (eve) {
                    eve.target.classList.remove('menutooltip');
                });
            }
        }
        
        // 메뉴 아이템의 data-menuitem-idx 속성값(문자열)에서
        // 숫자만을 파싱하여 배열로 반환하는 함수
        // 예: '1-2' -> [1, 2]
        // 속성값은 a-b, a-b-c-d 형식으로 되어 있음
        // a: 현재 대 또는 소 메뉴의 대메뉴의 인덱스
        // b: 대 메뉴의 맥스 인덱스
        // c: 현재 소 메뉴의 인덱스
        // d: 현재 소 메뉴의 맥스 인덱스
        function parseIdx(str) {
            str = str.split('-');
            str.forEach(function (val, i, arr) {arr[i] = +val; });
            return str;
        }
        
        // keyup 이벤트 헨들러 호출시 실행
        function keyUpControl() {
            if (isInitialControl) {initialControl(); }

            if (!isMenuKeyControl) {
                isMenuKeyControl = true;
                menubar.classList.add('menukeyctrl');
            }
        }
        
        // keydown 이벤트 헨들러 호출시 실행
        function keyDownControl(eve) {
            var keyCode = eve.keyCode,
                str = eve.target.getAttribute('data-menuitem-idx'),
                idxArr = parseIdx(str),
                // 대메뉴 아이템 인덱스
                i = idxArr[0],
                // 포커스 된 엘리먼트가 소메뉴 아이템이면 = 소메뉴 아이템 인덱스 || 아니면 = -1
                j = idxArr[2] !== undefined ? idxArr[2] : -1;

            if (!isMenuKeyControl) {keyUpControl(); }
            
            // 방향키 입력 처리
            switch (keyCode) {
            case 37: // ←
                i = i ? --i : idxArr[1];
                menubar_item_a[i].focus();
                break;
            case 39: // →
                i = i !== idxArr[1] ? ++i : 0;
                menubar_item_a[i].focus();
                break;
            case 38: // ↑
                if (j === -1 && menu_item_a[i]) { // 대메뉴 아이템에 포커스 중이고 소메뉴가 있다면
                    menu_item_a[i][menu_item_a[i].length - 1].focus();
                } else if (j > -1) { // 소메뉴에 포커스 중이라면
                    j = j ? --j : idxArr[3];
                    menu_item_a[i][j].focus();
                }
                break;
            case 40: // ↓
                if (j === -1 && menu_item_a[i]) { // 대메뉴 아이템에 포커스 중이고 소메뉴가 있다면
                    menu_item_a[i][0].focus();
                } else if (j > -1) { // 소메뉴에 포커스 중이라면
                    j = j !== idxArr[3] ? ++j : 0;
                    menu_item_a[i][j].focus();
                }
                break;
            }
        }

        // 메뉴 아이템에 포커스가 될 경우 이벤트 헨들러 호출에 의해 실행
        function focusin(eve) {
            var str = eve.target.getAttribute('data-menuitem-idx'),
                idxArr = parseIdx(str);
            
            // 비동기 포커스 해제 함수 취소
            clearTimeout(fcusoutAsync);
            
            focusInIdx = idxArr[0];
            focusElement = eve.target;
            
            // 포커스 인 되기 직전에 포커스 아웃된 적이 있다
            // && 포커스 아웃된 아이템 대메뉴 인덱스 !== 포커스 인 아이템 대메뉴 인덱스
            if (focusOutIdx > -1 && focusOutIdx !== idxArr[0]) {
                // 포커스 아웃된 아이템의 대메뉴 인덱스에 해당하는 엘리먼트의 .menufocus 클레스 제거
                menubar_item[focusOutIdx].classList.remove('menufocus');
            }
            
            // 포커스 인 된 엘리먼트에 .menufocus 클레스 추가
            menubar_item[idxArr[0]].classList.add('menufocus');
        }

        // #menubar 엘리먼트의 유효범위에서 mousemove 발생시
        // 키보드 컨트롤 종료를 위해 실행될 함수
        function mousemove() {
            // (키보드에 의한) 포커스된 아이템이 있다면
            if (focusElement) {
                // #menubar 엘리먼트의 .menukeyctrl 클레스 제거
                menubar.classList.remove('menukeyctrl');
                isMenuKeyControl = false;
                
                // 포커스 인 된 엘리먼트에 .menufocus 클레스 제거
                menubar_item[focusInIdx].classList.remove('menufocus');
                
                // 포커스 해제
                focusElement.blur();
                focusElement = null;
            }
        }
        
        // 메뉴 아이템에 포커스가 해제 될 경우 이벤트 헨들러 호출에 의해 실행
        function focusout(eve) {
            var str = eve.target.getAttribute('data-menuitem-idx'),
                idxArr = parseIdx(str);
            
            // 포커스 아웃된 아이템의 대메뉴 인덱스로 갱신
            focusOutIdx = idxArr[0];
            
            // 비동기 포커스 아웃 처리
            // 포커스 아웃 이후 즉시 #menubar 내부의 어떤 아이템에라도 포커스인이 될 경우
            // 동기적으로 focusin() 함수가 실행에 영향으로 아래 코드는 실행이 취소
            // 하지만 포커스 아웃 이후 즉시 #menubar 내부의 어떤 아이템에라도 포커스인이 되지 않았다면 아래 코드 실행
            // 실행 예: 텝키로 외부 엘리먼트로 이동, 마우스 클릭, 브라우저 창 비활성화, 시스템 메뉴 활성화 등
            fcusoutAsync = setTimeout(function () {mousemove(); });
        }

        // class, role, data-menuitem-idx 속성 설정
        // data-menuitem-idx 데이터 값은 다음과 같다
        // 현재 대메뉴 인덱스 - 대메뉴 개수 - 현재 소메뉴 인덱스 - 소메뉴 개수
        function setMenuAttribute(menubar) {
            var rowMax;

            menubar.setAttribute('role', 'menubar');

            // 대 메뉴 아이템 속성 세팅
            menubar_item.forEach(function (item, idx, arr) {
                rowMax = rowMax === undefined ? arr.length - 1 : rowMax;

                item.setAttribute('role', 'menuitem');
                item.classList.add('menuitem');
                item.classList.add('nomenu');
                
                menubar_item_a[idx].setAttribute('data-menuitem-idx', idx + '-' + rowMax);
            });

            // 소 메뉴 wrap(ul 태그) 속성 세팅
            menu.forEach(function (menu, idx) {
                var str = idx + '-' + rowMax + '-',
                    colMax;

                menu.setAttribute('role', 'menu');
                menu.classList.add('menu');
                menubar_item[idx].classList.remove('nomenu');
                menubar_item[idx].setAttribute('aria-haspopup', 'true');

                // 소 메뉴 아이템 속성 세팅
                menu_item[idx] = menu.querySelectorAll('li');
                menu_item_a[idx] = menu.querySelectorAll('li>a');
                menu_item[idx].forEach(function (item, idx2, arr) {
                    colMax = colMax === undefined ? arr.length - 1 : colMax;
                    item.setAttribute('role', 'menuitem');
                    item.classList.add('menuitem');
                    
                    menu_item_a[idx][idx2].setAttribute('data-menuitem-idx', str + idx2 + '-' + colMax);
                });
            });
        }

        // 크롬 브라우저 ↵(엔터)를 공백으로 인식하는 버그방지 함수
        function removeTextNode(menubar) {
            var node = menubar.childNodes;
            
            node.forEach(function (node) {
                // ↵(엔터) 텍스트 노드 삭제
                if (node.nodeName === '#text') {menubar.removeChild(node); }
            });
        }

        // 문서 내 id='menubar'를 사용중이라면 아래 함수 실행
        if (menubar) {
            removeTextNode(menubar);
            setMenuAttribute(menubar);

            menubar.addEventListener('keydown', keyDownControl);
            menubar.addEventListener('keyup', keyUpControl);
            menubar.addEventListener('focusin', focusin);
            menubar.addEventListener('focusout', focusout);
            menubar.addEventListener('mousemove', mousemove);
        }
    }());
    
}());