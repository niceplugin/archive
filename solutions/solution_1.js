// 문제를 만드는 방법 1
// 하지만 이것은 시간이 기하급수적으로 오래걸리게 된다
// 7*7의 7장 케이스를 만드는데 3시간 걸림

function matrix(x, y) {
  const arr = [];
  while (y--) {
    arr.push(Array.from(new Array(x), i=>0));
  }
  return arr;
}

// ====================
// String =============
// ====================

// 매트릭스 문자열 시각화
String.prototype.mtxToStr = function() {
  // 문자열이 매트릭스라고 판단될 경우 매트릭스 문자열 반환, 아닐경우 원본 반환
  return this.startsWith('[[') && this.endsWith(']]') ?
    this.replace(/\[\[/, '[')
      .replace(/\]\]/, ']')
      .replace(/\]\,\[/g, ']\n[') :
    this;
}
// 문자열 매트릭스 배열로 반환
String.prototype.toMtx = function() {
  return JSON.parse(this);
}

// ====================
// Array ==============
// ====================

// 매트릭스(배열) 복사
Array.prototype.copy = function() {
  return JSON.parse(JSON.stringify(this));
}
// 매트릭스 지정된 위치 값 변경
Array.prototype.sets = function(x, y, v) {
  if ( this[y] !== undefined
    && this[y][x] !== undefined ) {
    // 적용할 값이 0이 아니거나 강제 적용해야 할 경우에만 값 세팅
    this[y][x] = v;
  }
  return this;
}
// 매트릭스 지정된 위치 값 리턴
Array.prototype.gets = function(x, y) {
  return this[y][x];
}
// 매트릭스 x축 전환
Array.prototype.rx = function() {
  const arr = this.copy();
  return arr.map((cur)=>{return cur.reverse(); });
}
// 매트릭스 y축 전환
Array.prototype.ry = function() {
  const arr = this.copy();
  return arr.reverse();
}
// 매트릭스 원점 대칭 전환
Array.prototype.ro = function() {
  const arr = this.copy().reverse();
  return arr.map((cur)=>{return cur.reverse(); });
}
// 배열 그대로를 문자로 (네이티브 toString 메서드 커스터마이징)
Array.prototype.toString = function () {
  return JSON.stringify(this);
}
// 배열 내 값이 val인 속성의 개수를 리턴
Array.prototype.countVal = function(val) {
  return this.reduce((acc, cur, idx, arr)=>{return arr[idx] === val ? ++acc : acc;}, 0);
}
// 행렬 가로 세로 반전
Array.prototype.rotate = function() {
  const arr = [];
  let y = this[0].length;
  while (y--) {
    const arr2 = [];
    let x = this.length;
    while (x--) {
      arr2.push(this[x][y]);
    }
    arr.push(arr2);
  }
  return arr;
}
// 행렬 외각의 0으로만 이루어진 축 제거 후 배열로 반환
Array.prototype.minimization = function() {
  let arr = this.toString();
  // 행렬 하단 여백 제거
  arr = arr.replace(/((\,)*\[((\,)*0)*\])*\]$/, ']');
  // 행렬 상하 반전후 하단 여백 제거
  arr = JSON.parse(arr).ry().toString();
  arr = arr.replace(/((\,)*\[((\,)*0)*\])*\]$/, ']');
  // 행렬 90도 돌려서 하단 여백 제거
  arr = JSON.parse(arr).rotate().toString();
  arr = arr.replace(/((\,)*\[((\,)*0)*\])*\]$/, ']');
  // 행렬 상하 반전후 하단 여백 제거
  arr = JSON.parse(arr).ry().toString();
  arr = arr.replace(/((\,)*\[((\,)*0)*\])*\]$/, ']');
  arr = JSON.parse(arr);
  // 행렬의 y축이 x축보다 길 경우 회전 후 반환
  return arr.length > arr[0].length ? arr.rotate() : arr;
}
// 없는 페턴의 행렬인지 확인
Array.prototype.isUnique = function(mtx) {
  mtx = mtx.minimization();
  if ((this.indexOf(mtx.toString()) === -1)
    && (this.indexOf(mtx.rx().toString()) === -1)
    && (this.indexOf(mtx.ry().toString()) === -1)
    && (this.indexOf(mtx.ro().toString()) === -1)) {
    this.push(mtx.toString());
    if (this.length % 1000 === 0) {console.log('unique: ', this.length); }
    return true;
  }
  else {
    return false;
  }
}
// 유니크 목적지인지 확인
Array.prototype.isUniqueXY = function(xy) {
  if (this.indexOf(xy) === -1) {
    this.push(xy);
    return true;
  }
  else {
    return false;
  }
}
// 행열 내 모든 값의 합
Array.prototype.sum = function() {
  return this.reduce((acc, cur)=>{
    return acc + cur.reduce((acc, cur)=>{
      return acc + cur;
    }, 0);
  }, 0);
}
// 행열 내 유일 유효값의 좌표
Array.prototype.point = function() {
  let y = this.length;
  while (y--) {
    let x = this[0].length;
    while (x--) {
      if (this[y][x] > 0) {
        return [x, y];
      }
    }
  }
}
// 주어진 위치 사방의 값을 중앙으로 이동하여 더함
Array.prototype.toCenter = function(x, y) {
  const y_length = this.length, x_length = this[0].length;
  let sum = 0;
  if (y - 1 >= 0) {
    sum += this.gets(x, y - 1);
    this.sets(x, y - 1, 0);
  }
  if (y + 1 < y_length) {
    sum += this.gets(x, y + 1);
    this.sets(x, y + 1, 0);
  }
  if (x - 1 >= 0) {
    sum += this.gets(x - 1, y);
    this.sets(x - 1, y, 0);
  }
  if (x + 1 < x_length) {
    sum += this.gets(x + 1, y);
    this.sets(x + 1, y, 0);
  }
  return this.sets(x, y, sum);
}

// todo 임시로 사용할 메서드
Array.prototype.printWay = function(idx) {
  this[idx].forEach((str)=>{console.log(str.mtxToStr()); });
}

// ==================================================================

const UNIQUE_DB = []; // 유일한 케이스
const CASE_DB = []; // 문제 케이스

function Disperse_Number_Of_Case(mtx, x, y, num, case_arr) {
  // mtx: 매트릭스
  // x, y: 분배해야 할 값의 원점
  // num: 분배해야 할 값
  // case_arr: 원점으로부터 사방으로 분배할 수 있는 각각의 경우에 대한 케이스
  if (case_arr.length > 4) {return; }
  if (case_arr.length === 4) { // 재귀로 케이스가 완성되었을 경우
    if (num === 0 && case_arr.countVal(0) <= 2) { // 남은 분배값이 없고, 2방향 이상으로 분배할 경우
      let y_length = mtx.length, x_length = mtx[0].length;
      // 원점으로부터 4방향 모두 비어있을 경우
      // 해당 방향으로 분배하는 값이 없더라도 그 방향의 값은 비어있어야 함
      // 그렇지 않을 경우 역으로 값을 모을 때 분배하지 않았던 쪽의 값을 같이 모으게 됨
      // 그렇게 되면 값을 모두 모을수 없는 오류가 발생함
      if ((y - 1 >= 0 && mtx.gets(x, y - 1) === 0)
        && (y + 1 < y_length && mtx.gets(x, y + 1) === 0)
        && (x - 1 >= 0 && mtx.gets(x - 1, y) === 0)
        && (x + 1 < x_length && mtx.gets(x + 1, y) === 0)) {
        Disperse_Solve(mtx.copy()
          .sets(x, y - 1, case_arr[0])
          .sets(x, y + 1, case_arr[1])
          .sets(x - 1, y, case_arr[2])
          .sets(x + 1, y, case_arr[3]));
      }
      return;
    }
    else {return; }
  }
  for (let i = 0; i < (num + 1); i++) {
    if ((num - i) >= 0) {
      const clone_case_arr = case_arr.copy();
      clone_case_arr.push(i);
      Disperse_Number_Of_Case(mtx, x, y, num - i, clone_case_arr);
    }
  }
}

function Disperse_Solve(mtx) {
  const str = mtx.toString();
  // 만약 행렬에 0,1 이외의 숫자가 없을 경우 완료된 과정으로 판단
  if (str.replace(/\[|\]|\,|0|1/g, '').length === 0) {
    // 유니크 페턴일 경우 유니크 디비에 저장
    UNIQUE_DB.isUnique(mtx);
    return;
  }

  let y = mtx.length, isBreak = false;
  while (y--) {
    let x = mtx[0].length;
    while (x--) {
      const num = mtx.gets(x, y);
      // 절대값 > 1 발견시 재귀 호출 후 반복문 종료
      if (Math.abs(num) > 1) {
        Disperse_Number_Of_Case(mtx.copy().sets(x, y, 0), x, y, num, []);
        isBreak = true;
        break;
      }
    }
    if (isBreak) {break; }
  }
}

function Collect_Solve_All(arr) {
  const total = arr[0].toMtx().sum();
  let i = arr.length;
  while (i--) {
    const one = {
      problem: arr[i], // 유니크 매트릭스
      cases: 0, // 해당 문제를 풀 수 있는 방법 개수
      ways: [ /* ["문제를", "풀어내는", "단계적", "과정"], ..... */ ], // 풀어나간 과정
      xy: [ /* ['x','y'], ..... */ ], // ways의 해당 인덱스의 최종 집결지 좌표
      u_cases: 0,
      u_xy: [], // 중첩되지 않은 최종 집결지 좌표 모음
      u_xy_case: [] // 각각의 중첩되지 않은 최종 집결지 좌표가 가지는 ways 개수
    };

    Collect_Solve(arr[i].toMtx(), [], total, one);
    CASE_DB.push(one);
  }
}

function Collect_Solve(mtx, log, total, one) {
  // mtx: 행렬
  // log: 풀어나간 과정
  // total: 최종적으로 나와야 하는 값
  // one: 전달받은 케이스
  const str = mtx.toString();
  // 과정 저장
  log.push(str);
  // 모두 풀었다고 판단될 경우
  if (str.search(total) !== -1) {
    // 유니크 페턴일 경우 유니크 디비에 저장
    let xy = mtx.point().toString();
    one.cases++;
    one.ways.push(log);
    one.xy.push(xy);
    if (one.u_xy.isUniqueXY(xy)) {
      one.u_cases++;
      one.u_xy_case.push(1);
    } else {
      one.u_xy_case[one.u_xy_case.length - 1]++;
    }
    return;
  }

  const x_length = mtx[0].length, y_length = mtx.length;
  let y = mtx.length;
  while (y--) {
    let x = mtx[0].length;
    while (x--) {
      if (mtx.gets(x, y) !== 0) {continue; } // 합쳐야 할 위치가 비어있는지 확인
      let count = 0; // 주어진 위치의 사방에 유효값이 있는 개수
      if (y - 1 >= 0 && mtx.gets(x, y - 1) !== 0) {count++; }
      if (y + 1 < y_length && mtx.gets(x, y + 1) !== 0) {count++; }
      if (x - 1 >= 0 && mtx.gets(x - 1, y) !== 0) {count++; }
      if (x + 1 < x_length && mtx.gets(x + 1, y) !== 0) {count++; }
      // 주위의 유효값 개수가 2개 이상일 경우
      if (count >= 2) {
        const clone = mtx.copy().toCenter(x, y);
        Collect_Solve(clone, log.copy(), total, one);
      }
    }
  }
}

// console.time('Disperse');
// Disperse_Solve(matrix(6,6).sets(2,2,7), []);
// console.timeEnd('Disperse');
// console.log(UNIQUE_DB.length);
//
// console.time('Collect');
// Collect_Solve_All(UNIQUE_DB);
// console.timeEnd('Collect');
// console.log(CASE_DB.length);
//
// CASE_DB.sort((a, b)=>{return b.u_cases - a.u_cases; });
// console.log(CASE_DB[0].problem.mtxToStr());
// console.log(CASE_DB[0].u_xy);
// console.log(CASE_DB);