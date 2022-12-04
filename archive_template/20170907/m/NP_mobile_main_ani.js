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
        setObject('.m_leaf');
        
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
                
                randoming(15);
				
				if ((4 < i && i < 9) || (19 < i && i < 24) || (29 < i && i < 34) || (38 < i)) {
					aniName = 'falling1';
				}
				else {
					aniName = 'falling2';
				}
                
                leaf[i].setAttribute('style', '-webkit-animation-name: ' + aniName + '; animation-name: ' + aniName + '; -webkit-animation-delay: ' + random + 's; animation-delay:' + random + 's;');
            }
            
            function falled(i) {
                leaf[i].className += ' m_falled';
            }
        })();
        
        // 스크린 가로 채크할 엘리먼트 등록
        root.screen = {};
        root.screen.object = document.getElementById('m_width_check');
        root.screen.respons = document.getElementById('m_responsive');
        
        // 백그라운드 컨텐츠 반응형 설정
        (function() {
            var obj = root.screen.object,
                res = root.screen.respons;
            
            window.addEventListener('resize', resizing);
            
            function resizing() {
                var width, height, ratio, value;
                
                width = obj.clientWidth;
                ratio = width / 750;
                height = Math.floor(1900 * ratio);
                
                // 계산된 height 값 적용
                value = 'height: ' + height + 'px';
                obj.setAttribute('style', value);
                
                // 계산된 뷰 사이즈 적용
                value = '-webkit-transform: scale(' + ratio + '); transform: scale(' + ratio + ')';
                res.setAttribute('style', value);
            }
            
            // 최초 1회 실행
            resizing();
        })();
    });
}
// 문서 로드시 NP.mainAni 실행
document.addEventListener('DOMContentLoaded', NP.mainAni);