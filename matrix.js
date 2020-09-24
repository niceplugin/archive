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