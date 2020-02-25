// 요지: client 에서 Promise 기능을 써야하고 지속적인 체이닝 처리를 해야 할 경우.
// 주의: 예외처리 및 인자 유효성 검사 미구현
// 주의: 화살표 함수 구문으로 IE 미동작

function Synce(callback) {
  const stack = []; // then 콜백함수 스택
  const then = Object.freeze({then(callback){return stack.push(callback) && then; }});
  // then 콜백함수 실행 (ms가 있을경우 ms초 후 콜백 실행)
  const resolve = (resolve_value, ms)=>{
    if (!stack.length) {return; }
    ms ? setTimeout(()=>{stack.shift()(resolve_value, resolve); }, ms) :
        stack.shift()(resolve_value, resolve);
  };
  return setTimeout(()=>callback(resolve)) && then;
}

const ms = 1000;
// 예제 코드 1 - 비동기 함수를 채이닝 해야 할 경우
// 비동기 함수는 setTimeout 으로 대체하여 예문작성 됨
Synce(resolve=>{setTimeout(()=>{resolve(100); }, ms); })
    .then((value, resolve)=>{
      console.log(value);
      setTimeout(()=>{resolve(value + 200); }, ms); })
    .then((value)=>{console.log(value); });

// 예제 코드 2 - 동기 함수를 특정 시간 간격으로 채이닝 해야 할 경우
Synce(resolve=>{resolve('hello', ms); })
    .then((value, resolve)=>{
      console.log(value);
      resolve(value + ' world', ms); })
    .then(value=>{console.log(value); });

// 예제 코드 3 - 응용: Synce 를 실행할 서로 다른 함수 A, B, C를 채이닝 할 경우
// 동작 순서 이해를 위한 코드 라이팅 스타일과 console 코드에
// 번잡해 보일 수 있으나 개념은 간단함.
const A = ()=>{
  return Synce(resolve=>{
    console.log('A Promise Run');
    resolve('A Promise', ms)
  });
};
const B = ()=>{
  return Synce(resolve=>{
    console.log('B Promise Run');
    resolve('B Promise', ms)
  });
};
const C = ()=>{
  return Synce(resolve=>{
    console.log('C Promise Run');
    resolve('C Promise', ms)
  });
};
Synce(resolve=>{ // 실행한 현재 프로미스를 O 라고 칭함
  // 최초 O 실행 -> 예약된 A를 실행후 .then 에서 O의 resolve 호출
  console.log('Start Promise Run');
  A().then((A_value)=>{
    console.log(A_value);
    resolve(A_value);
  });
}).then((O_value, resolve)=>{
  B().then((B_value)=>{
    console.log(B_value);
    resolve(O_value + ' > ' + B_value);
  });
}).then((O_value, resolve)=>{
  C().then((C_value)=>{
    console.log(C_value);
    resolve(O_value + ' > ' + C_value);
  });
}).then((O_value)=>{
  // 최종적으로 각 프로미스가 O 프로미스에 링크된 효과를 보았음
  console.log(O_value);
});