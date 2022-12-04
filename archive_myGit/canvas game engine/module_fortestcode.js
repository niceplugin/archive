// =============================================================================
// 이하 셈플 테스트 코드
// =============================================================================

function myFunc1() {
    console.log('function 1!');
}
function myFunc2(e) {
    console.log('function 2!', e);
}
function myFunc3(e) {
    console.log('function 3!', e.x, e.y, e.prevX, e.prevY, e.movementX, e.movementY);
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
input.addEventListener('mouse', 'down', '2', myFunc2);
input.addEventListener('mouse', 'up', '2', myFunc3);
input.addEventListener('mouse', 'move', myFunc3);

setInterval(function () {
    console.log(f);
    f = 0;
}, 1000);

view.canvas.node.addEventListener('click', function () {
    view.canvas.node.requestPointerLock();
});