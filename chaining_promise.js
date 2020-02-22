// IE client에서 Promise 기능을 써야하고
// 지속적인 체이닝 처리를 해야 할 경우.
// 주의: 예외처리 및 인자 유효성 검사 미구현

function Synce(callback) {
  const stack = []; // then 콜백함수 스택
  const _then = {then(func){ // then 객체
      stack.push(func);
      return _then;
    }};
  function resolve(rslt){ // then 콜백함수 실행
    stack.length && stack.shift()(rslt, resolve);
  }
  callback(resolve);
  return _then;
}

// 예제 코드
// 비동기로 999 값을 넘겨주면 then 콜백함수가 받아서 계산함.
// then 콜백함수는 채이닝 되어 지속적 비동기 함수를 넘겨줄수 있음.
// 주의: 당연하게도 콜백함수의 인자로 오는 resolve 함수를 통해 넘겨줘야 함.
// resolve는 기존 Promise에서 사용하는 개념과 동일.
const ms = 1000;
Synce(function(resolve){setTimeout(function(){resolve(999); }, ms); })
    .then(function(rslt, resolve){
      console.log('then1:', rslt);
      setTimeout(function(){resolve(rslt - 100); }, ms);
    })
    .then(function(rslt, resolve){
      console.log('then2:', rslt);
      setTimeout(function(){resolve(rslt - 100); }, ms);
    })
    .then(function(rslt, resolve){
      console.log('then3:', rslt);
      setTimeout(function(){resolve(rslt - 100); }, ms);
    })
    .then(function(rslt, resolve){
      console.log('then4:', rslt);
    });