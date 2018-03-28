// NP 글로벌 변수없을시 생성
if (!window.NP) {
    var NP = {};
}

// NP.mainAni 생성
if (!NP.mainAni) {
    NP.mainAni = (function() {
        
        var root = {};
        
        // 순수객체(배열) 생성 함수
        function setObject(sel) {
            var temp, l;
            
            temp = document.querySelectorAll(sel);
            l = temp.length;
            sel = sel.replace(/.m_/, '');
            
            root[sel] = [];
            
            while (l--) {
                   root[sel][l] = temp[l];
                   }
        }
        
        // 순수객체 생성
        setObject('area');
        setObject('.m_shop');
        setObject('.m_leaf');
        
        // 링크 이벤트 리스너 처리
        (function() {
            var link = root.area,
                i = root.area.length;
            
            function addEve(n) {
                link[n].addEventListener('mouseover', function() {userFocus(n);});
                link[n].addEventListener('focus', function() {userFocus(n);});
                link[n].addEventListener('mouseout', function() {userBlur(n);});
                link[n].addEventListener('blur', function() {userBlur(n);});
            }
            
            while (i--) {
                addEve(i);
            }

            // 링크 텝 포커스, 마우스 오버 처리
            function userFocus(i) {
                var shop = root.shop,
                    l = shop.length,
                    c1, c2;
                
                i = f(i);
                c1 = shop[i].className;

                if (c1.search('m_blur') !== -1) {
                    shop[i].className = c1.replace('m_blur', 'm_focus');
                }
                else if (c1.search('m_focus') === -1 && c1.search('m_blur') === -1) {
                    shop[i].className += ' m_focus';
                }

                while (l--) {
                    c2 = shop[l].className;

                    // .m_blur 없는 경우
                    if (l !== i && c2.search('m_blur') === -1) {

                        // m_focus 있는 경우
                        if (c2.search('m_focus') !== -1) {
                            shop[l].className = c2.replace('m_focus', 'm_blur');
                        }
                    }
                }
            }

            // 링크 텝 블로, 마우스 리브 처리
            function userBlur(i) {
                var shop = root.shop,
                    c1;
                
                i = f(i);
                c1 = shop[i].className;

                shop[i].className = c1.replace('m_focus', 'm_blur');
            }
            
            // 요청으로 짬뽕뒤틀린 값 재설정
            function f(n) {
                switch (n) {
                    case 0:
                        return 3
                    case 1:
                        return 6
                    case 2:
                        return 7
                    case 3:
                        return 4
                    case 4:
                        return 0
                    case 5:
                        return 1
                    case 6:
                        return 5
                    case 7:
                        return 2
                }
            }
        })();
        
        // 낙엽 애니메이션 종료 감지
        (function() {
            var leaf = root.leaf,
                i = root.leaf.length,
                random, aniName;
            
            function addEve(n) {
                leaf[n].addEventListener('animationend', function() {falled(n);});
            }
            
            function randoming(n) {
                random = Math.floor(Math.random() * n);
            }
            
            while (i--) {
                addEve(i);
                
                if (i < 36) {
                    aniName = 'falling1';
                    randoming(15);
                }
                else if (i < 62) {
                    aniName = 'falling2';
                    randoming(10);
                }
                else {
                    aniName = 'falling3';
                    randoming(5);
                }
                
                leaf[i].setAttribute('style', '-webkit-animation-name: ' + aniName + '; animation-name: ' + aniName + '; -webkit-animation-delay: ' + random + 's; animation-delay:' + random + 's;');
            }
            
            function falled(i) {
                leaf[i].className += ' m_falled';
            }
        })();
    });
}
// 문서 로드시 NP.mainAni 실행
document.addEventListener('DOMContentLoaded', NP.mainAni);