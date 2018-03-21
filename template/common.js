NP.Typing.set({
    id: 'loader-text',
    content: '/s200/특이한녀석들/s200//e/',
    typeSpeed: 75,
    cursor: false,
    cursorChar: ' ',
    event: function(e) {
        var parent = e.parentElement,
            interval = setInterval(function() {
                if (document.readyState === 'complete') {
                    clearInterval(interval);
                    parent.classList.add('loaded');
                    setTimeout(function() {
                        parent.setAttribute('style', 'display: none');
                    }, 1000);
                }
            });
    }
});
NP.Typing.set({
    id: 'myTyping',
    content: '만들고 함께하는 공동체/s500//b12/이유있는 기획/s500//b7/아름다운 디자인/s500//b8/섹시한 개발/s500//b6/남다른 소통/s500//b6/기업의 이야기를 디자인합니다./s500//l/',
    typeSpeed: 75,
    backSpeed: 75,
    cursor: true,
    cursorChar: '|',
    cursorSpeed: 750,
    alt: true,
    altText: '만들고 함께하는 공동체, 이유있는 기획, 아름다운 디자인, 섹시한 개발, 남다른 소통, 기업의 이야기를 디자인합니다.'
});

NP.ShowUp.set(
    {
        content: '#layer1 li:nth-child(1)',
        run: 'always',
        expos: 'whole',
        add: 'ani-shake'
    },
    {
        content: '#layer1 li:nth-child(2)',
        run: 'always',
        expos: 'whole',
        add: 'ani-shake'
    },
    {
        content: '#layer1 li:nth-child(3)',
        run: 'always',
        expos: 'whole',
        add: 'ani-shake'
    },
    {
        content: '#layer1 li:nth-child(4)',
        run: 'always',
        expos: 'whole',
        add: 'ani-shake'
    },
    {
        content: '#layer2 ul',
        run: 'always',
        expos: 'part',
        add: 'ani-fadeIn'
    },
    {
        content: '#layer4 ul',
        run: 'always',
        expos: 'part',
        add: 'ani-flip'
    },
    {
        content: '#layer5 ul',
        run: 'always',
        expos: 'part',
        add: 'ani-zoonIn'
    },
    {
        content: '#shake-btn',
        run: 'always',
        expos: 'whole',
        add: 'ani-shake'
    }
);

NP.ScrollTo.set(
    {
        content: 'a',
        duration: 400,
        intervalY: [90, 'px'],
        hold: true
    }
);
// 네비게이션 위치 설정 코드
(function () {
    var nav = document.querySelector('nav'),
        pageYOffset = window.pageYOffset,
        innerHeight = window.innerHeight,
        state = 'top'; // top, abs, fix

    function check(e) {
        pageYOffset = window.pageYOffset;

        function removeAll() {
            nav.classList.remove('nav-top');
            nav.classList.remove('nav-abs');
            nav.classList.remove('nav-fix');
        }

        if (pageYOffset === 0 && state !== 'top') {
            removeAll();
            nav.classList.add('nav-top');
            state = 'top';
        } else if (pageYOffset <= innerHeight && state !== 'abs') {
            removeAll();
            nav.classList.add('nav-abs');
            state = 'abs';
        } else if (pageYOffset > innerHeight && state !== 'fix') {
            removeAll();
            nav.classList.add('nav-fix');
            state = 'fix';
        }
    }

    document.addEventListener('scroll', check);
    document.addEventListener('resize', function (e) {
        pageYOffset = window.pageYOffset;
        innerHeight = window.innerHeight;
    });
}());