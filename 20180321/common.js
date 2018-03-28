NP.Typing.set({
    id: 'loader-text',
    content: '/s200/Nice Demo/s200//e/',
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
    content: '동해물과 백두산이/s500//b9/마르고 닳도록/s500//b7/하느님이 보우하사/s500//b9/우리나라 만세/s500//b7/무궁화 삼천리 화려강산/s500//b12/대한사람 대한으로 길이 보전하세./s500//l/',
    typeSpeed: 75,
    backSpeed: 75,
    cursor: true,
    cursorChar: '|',
    cursorSpeed: 750,
    alt: true,
    altText: '동해물과 백두산이 마르고 닳도록. 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려강산. 대한사람 대한으로 길이 보전하세.'
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