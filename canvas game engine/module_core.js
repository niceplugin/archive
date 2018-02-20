// =============================================================================
// module core
// =============================================================================

var core = {
    frame: {
        perSecond: 0, // 초당 프레임
        curTime: 0, // 현재 프레임 생성 시각
        prevTime: 0, // 이전 프레임 생성 시각
        gap: 0, // 이전 프레임과 현재 프레임 간의 시간 간격 차
        count: 0, // 매번 프레임 횟수 카운터
        elapsedTime: 0 // 프레임을 카운터 하기 시작한 후부터의 경과시간
    },
    contents: {
        index: null
//        myKeyName1: myFunc1
    },
    engine: function () {
        window.requestAnimationFrame(core.engine);
        
        // 프레임을 계산한다.
        core.frame.prevTime = core.frame.curTime || Date.now();
        core.frame.curTime = Date.now();
        core.frame.gap = core.frame.curTime - core.frame.prevTime;
        core.frame.elapsedTime += core.frame.gap;
        if (core.frame.elapsedTime >= 1000) {
            core.frame.elapsedTime -= 1000;
            core.frame.perSecond = core.frame.count;
            core.frame.count = 0;
            console.log(core.frame.perSecond);
        }
        core.frame.count++;
        
        // 컨텐츠를 실행한다.
        if (core.contents.index && core.contents[core.contents.index]) {
            core.contents[core.contents.index](core.frame.gap);
        }
    },
    // 사용자는 최초 이 함수로 contents 인자를 전달하고 엔진을 가동
    start: function (contents) {
        if (typeof contents === 'object' && typeof contents.index) {
            core.contents = contents;
            window.requestAnimationFrame(core.engine);
        } else {
            throw new Error('Something is wrong with the argument.');
        }
    }
};
core.start({index: ''});