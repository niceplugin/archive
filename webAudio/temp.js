// 상황에 따른 this의 값에 대해 알아볼 필요가 있음

var obj = {
  x: 'local',
  y: function() {
    alert(this.x);
  }
};

// 여기서 this는 함수를 실행시킨 상위 객체를 가리킴
// 따라서 상위 객체는 obj
// 그러므로 this.x === 'local'

var newScope = (function () {
  x = 'local';
  return {
    y: function() {
      alert(this.x);
    }
  };
})();

// 여기서도 this는 함수를 실행시킨 상위 객체를 가리킴
// 상위 객체는 return 이 전달받는 객체 {y: function...}
// 이 객체에는 x 프로퍼티가 없으므로 undefined

var newScope = (function () {
  x = 'local';
  return {
    y: function() {
      alert(x);
    }
  };
})();

// 변수 탐색 범위는 함수 단위
// 일단 즉시실행함수를 A, 리턴 객체 내부의 함수를 B 라 가정
// A 함수가 즉시 실행되면서 x 값을 설정
// 여기서 x는 A 함수에서 선언된 변수가 아님 (window.x 임)
// B 함수가 실행되면 x 값을 B 함수 내에서 찾기 시작
// B 함수에 없으므로 자신을 감싸는 A 함수에서 찾기 시작
// A 함수에 없고 더이상 감싸는 함수가 없으므로 글로벌에서 찾기 시작
// 글로벌에 x 가 있음
// 따라서 'local' 값을 출력