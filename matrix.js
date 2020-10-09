class UDB {

  constructor(max_value = 1, max_size = 3) {
    this.unique_patterns = {};
    /* unique_patterns
     각 키는 v0w0h0 으로 value, width, height 값을 키로 하는 Map 자료형
     맵 자료형 내 각각의 키는 Matrix.data.toString 이고 값은 true 로 이루어짐
    */
    this.db = new Map(); // 프로퍼티는 Matrix로 이루어짐
    this.max_value = max_value; // 허용 가능한 최대 행렬 내 숫자 합계
    this.max_size = max_size; // 행렬의 허용 가능한 최대 가로 또는 세로 사이즈
    this.chip = [
      [1,1,0,0], [0,1,1,0], [0,0,1,1], [1,0,0,1],
      [1,0,1,0], [0,1,0,1],
      [1,1,1,0], [0,1,1,1], [1,0,1,1], [1,1,0,1],
      [1,1,1,1]
    ];
    this._numOfRecursion = 0;
    this._numOfUnique = 0;
    this._numSolve = 0;
  }

  // 경우의 수 생성
  generator(mtx, isFirst = false) {
    this._numOfRecursion++;
    // 허용 범위를 초과할 경우 종료
    if (mtx.total > this.max_value ||
      mtx.width > this.max_size ||
      mtx.height > this.max_size) {
      return;
    }
    // 가로가 세로보다 길 경우 (중복 페턴을 방지하기 위해)
    else if (mtx.width > mtx.height) {
      return;
    }
    // 유니크 패턴이 아닐경우 리턴
    else if (this.pushUnique(mtx)) {
      return;
    }

    const chip = this.chip;
    let idx = mtx.data.indexOf(1);
    // 행렬 내 1의 개수만큼 루프
    while (idx !== -1) {
      const loc = mtx.idxToXY(idx);
      let l = chip.length;
      // 다음루프를 위한 idx 계산
      idx = mtx.data.indexOf(1, idx + 1);
      // chip 개수만큼 루프
      while (l--) {
        const clone = mtx.copy();
        const direction = loc.concat(chip[l]);
        // 값을 분배했을 경우 재귀
        if (clone.splitAround(direction)) {
          this.generator(clone);
        }
      }
    }
  }

  // 유니크 패턴 저장
  pushUnique(mtx) {
    const key = `v${mtx.total}w${mtx.width}h${mtx.height}`;
    this.unique_patterns[key] =
      this.unique_patterns[key] ? this.unique_patterns[key] : new Map();
    const unique = this.unique_patterns[key];

    // 없는 패턴일 경우
    if (this._checkUnique(mtx, unique)) {
      this._numOfUnique++;

      if (this._numOfUnique % 1000 === 0) {
        console.log('loop: ', this._numOfRecursion,
          ', unique: ', this._numOfUnique,
          ', solve: ', this._numSolve);
      }

      // todo 이 코드 한줄이 정말 시간 많이 잡아먹음 이것도 개선이 필요함
      // 행렬 합 과정 구하기
      mtx.collectSolve();

      // 해당 벨류 최초 저장일 경우
      if (!this.db.get(mtx.total)) {this.db.set(mtx.total, []); }
      const db = this.db.get(mtx.total);

      // 유효한 유니크 패턴으로 판단되므로 유니크 디비에 저장
      unique.set(mtx.toString(), true);
      db.push(mtx);

      // todo 행렬 합 과정 종류 개수에 따른 분기 테스트
      // total = 11, max_size = 20
      // total = 10, max_size = 19
      if (mtx.total > 9 && mtx.more.size < mtx.total + 8) {return true; }
      // total = 9, max_size = 16
      else if (mtx.total > 8 && mtx.more.size < mtx.total + 6) {return true; }
      // total = 8, max_size = 14
      else if (mtx.total > 7 && mtx.more.size < mtx.total + 5) {return true; }
      // total = 7, max_size = 11
      else if (mtx.total > 6 && mtx.more.size < mtx.total + 3) {return true; }
      // total = 6, max_size = 8
      else if (mtx.total > 5 && mtx.more.size < mtx.total + 1) {return true; }
      // total = 5, max_size = 5
      else if (mtx.total > 4 && mtx.more.size < mtx.total) {return true; }
      return false;
    }
    else {return true; }
  }

  // 유니크 패턴 채크 (유니크일 경우: true, 아닐경우: false)
  _checkUnique(mtx, unique) {
    const patterns = mtx.getPatterns();
    let l = patterns.length;

    // 페턴이 이미 유니크 디비에 있을경우 false 반환
    while (l--) {
      if (unique.get(patterns[l])) {return false; }
    }
    // 모든 페턴을 확인한 결과 유니크 디비에 없으므로 유니크 mtx로 판단
    return true;
  }

  // db 맵의 각 키의 값을 정렬한다 (map.size 기준)
  sort() {
    this.db = new Map([...this.db.entries()].sort());
    this.db.forEach((arr)=>{
      arr.sort((b, a)=>{return a.more.size - b.more.size; });
    });
  }
}

class Matrix {

  constructor(x = 3, y = 3, n = 0) {
    this.data = Array.from(new Array(x * y), i => n);
    this.more = new Map(); // key(end 좌표): value(진행 과정 배열)
    // this.log = [];
    this.width = x;
    this.height = y;
    this.total = 0; // 행렬내 숫자의 합계

    // init
    this.sets(1,1,1);
  }

  toString() {
    return this.data.toString();
  }

  copy() {
    const clone = new Matrix();
    clone.data = this.data.slice(0);
    // clone.log = this.log.slice(0);
    clone.width = this.width;
    clone.height = this.height;
    clone.total = this.total;

    return clone;
  }

  print(rsltStr = false) {
    const x = this.width;
    const reg = new RegExp(`(\\s+\\-*[0-9]+\\,){${x}}`, 'g');
    let str = this.data.toString();
    str = ' ' + str;
    str = str.replace(/\,/g, ', ');
    str = str.replace(/\s[0-9]{2}/g, ' $&');
    str = str.replace(/(\s[0-9]{1}\,)|(\s[0-9]{1})$/g, '  $&');
    str = str.replace(/\s\-[0-9]{1}\,/g, ' $&');
    str = str.replace(reg, '$&\n');
    str = str.replace(/\,\n/g, '\n');
    str = str.replace(/\,/g, '');
    return rsltStr ? str : console.log(str);
  }

  gets(x, y) {
    return (this.width === x || this.height === y || x < 0 || y < 0) ?
      undefined : this.data[this.width * y + x];
  }

  sets(x, y, n) {
    this.data[this.width * y + x] += n;
    this.total += n;
    return this;
  }

  // 인덱스를 좌표로 변환
  idxToXY(i) {
    const y = Math.floor(i / this.width);
    const x = i % this.width;
    return [x, y];
  }

  // 해당 위치의 주위가 비어있는지 확인
  isEmptyAround(direction = [0,0,0,0,0,0]) {
    // direction 인자의 [2~5]는 해당 위치에 값을 삽입할 예정이므로
    // gets 리턴값이 undefined가 나올경우 라인을 추가해야 함.
    // 하지만 최종적으로 false를 리턴해야 할 경우
    // 라인 추가를 할 필요가 없음
    const appendArr = [];
    let num;

    if (direction[2]) { // 상단
      num = this.gets(direction[0], direction[1]-1);
      if (num === undefined) {appendArr.push(2); }
      else if (num !== 0) {return false; }
    }
    if (direction[3]) { // 우측
      num = this.gets(direction[0]+1, direction[1]);
      if (num === undefined) {appendArr.push(3); }
      else if (num !== 0) {return false; }
    }
    if (direction[4]) { // 하단
      num = this.gets(direction[0], direction[1]+1);
      if (num === undefined) {appendArr.push(4); }
      else if (num !== 0) {return false; }
    }
    if (direction[5]) { // 좌측
      num = this.gets(direction[0]-1, direction[1]);
      if (num === undefined) {appendArr.push(5); }
      else if (num !== 0) {return false; }
    }

    // 확인한 셀이 빈 공간이라 판단되었음
    // 이제 라인 추가가 필요할 경우를 처리
    num = appendArr.length;
    while (num--) {
      this.appendLine(appendArr[num]);
      if (appendArr[num] === 2) {direction[1]++; }
      else if (appendArr[num] === 5) {direction[0]++; }
    }

    return true;
  }

  // 해당 위치의 주위가 비어있지 않은 셀의 개수
  nonemptyAroundCount(direction = [0,0]) {
    const x = direction[0];
    const y = direction[1];
    let count = 0;

    count += +!!this.gets(x, y-1);
    count += +!!this.gets(x, y+1);
    count += +!!this.gets(x-1, y);
    count += +!!this.gets(x+1, y);

    return count;
  }

  // 해당 위치의 대각선 주위가 비어있지 않은 셀의 개수
  nonemptyAroundCountX(direction = [0,0]) {
    const x = direction[0];
    const y = direction[1];
    let count = 0;

    count += +!!this.gets(x-1, y-1);
    count += +!!this.gets(x-1, y+1);
    count += +!!this.gets(x+1, y-1);
    count += +!!this.gets(x+1, y+1);

    return count;
  }

  // 원점을 0으로 만들고 원점으로부터 값을 복제한다
  splitAround(direction = [0,0,0,0,0,0]) {
    // 원점이 0이거나
    // 복제한 값이 들어갈 셀이 비지 않았거나
    // 그외 사방에 비어있지 않은 셀이 있다면
    if (this.gets(direction[0], direction[1]) === 0 ||
      this.isEmptyAround(direction) === false ||
      this.nonemptyAroundCount(direction) !== 0) {
      return false;
    }

    this.sets(direction[0], direction[1], -1);
    if (direction[2]) {this.sets(direction[0], direction[1]-1, 1); }
    if (direction[3]) {this.sets(direction[0]+1, direction[1], 1); }
    if (direction[4]) {this.sets(direction[0], direction[1]+1, 1); }
    if (direction[5]) {this.sets(direction[0]-1, direction[1], 1); }

    // this.log.push(`${this.width},${this.height}-${this.toString()}`);

    return true;
  }

  // 원점 주위를 0으로 만들고 원점으로 값을 합한다
  collectAround(direction = [0,0]) {
    const x = direction[0];
    const y = direction[1];
    let sum = 0;

    let num;
    num = this.gets(x, y-1);
    if (num) {
      sum += num;
      this.sets(x, y-1, -num);
    }
    num = this.gets(x, y+1);
    if (num) {
      sum += num;
      this.sets(x, y+1, -num);
    }
    num = this.gets(x-1, y);
    if (num) {
      sum += num;
      this.sets(x-1, y, -num);
    }
    num = this.gets(x+1, y);
    if (num) {
      sum += num;
      this.sets(x+1, y, -num);
    }

    this.sets(x, y, sum);

    return sum;
  }

  // 행렬의 상하좌우 끝에 라인을 추가하여 사이즈를 늘린다
  appendLine(direction = -1, n = 0) {
    /// 2: 상, 3: 우, 4: 하, 5: 좌
    if (direction === 2) { // 상단 라인 추가
      const line = Array.from(new Array(this.width), i => n);
      this.data = line.concat(this.data);
      this.height++;
    } else if (direction === 4) { // 하단 라인 추가
      const line = Array.from(new Array(this.width), i => n);
      this.data = this.data.concat(line);
      this.height++;
    } else if (direction === 3) { // 우측 라인 추가
      const x = this.width;
      let y = this.height;
      this.width++;
      while (y--) {
        this.data.splice(x * y + x, 0, n);
      }
    } else if (direction === 5) { // 좌측 라인 추가
      const x = this.width;
      let y = this.height;
      this.width++;
      while (y--) {
        this.data.splice(x * y, 0, n);
      }
    }
    return this;
  }

  // 반전 행렬
  reverse(xAxis = 0, yAxis = 0) {
    let result;

    if (xAxis && yAxis) { // 원점반전
      result = this.data.slice(0);
      return result.reverse();
    }

    const arr = [];
    const x = this.width;
    let y = this.height;
    while (y--) {
      const start = x * y;
      const end = start + x;
      arr.push(this.data.slice(start, end));
    }

    if (xAxis) { // 좌우반전
      arr.forEach((cur)=>{cur.reverse(); });
      result = arr.reduceRight((acc, cur)=>{return acc.concat(cur)}, []);
    }
    else if (yAxis) { // 상하반전
      result = arr.reduce((acc, cur)=>{return acc.concat(cur)}, []);
    }
    return result;
  }

  // 행렬이 정사각형이 아닐 경우 가로축이 더 길도록 90도 회전
  rotatie() {
    const arr = [];
    let x = this.width;
    while (x--) {
      let y = 0;
      while (y < this.height) {
        arr.push(this.data[this.width * y + x]);
        y++;
      }
    }
    this.data = arr;

    return this;
  }

  // 행렬이 가질수 있는 모든 페턴 문자열을 배열로 반환
  getPatterns() {
    const patterns = new Map();

    patterns.set(this.toString(), 0);
    patterns.set(this.reverse(1,0).toString(), 0);
    patterns.set(this.reverse(0,1).toString(), 0);
    patterns.set(this.reverse(1,1).toString(), 0);

    if (this.width === this.height) {
      const clone = this.copy();
      clone.rotatie();
      patterns.set(clone.toString(), 0);
      patterns.set(clone.reverse(1,0).toString(), 0);
      patterns.set(clone.reverse(0,1).toString(), 0);
      patterns.set(clone.reverse(1,1).toString(), 0);
    }

    return [...patterns.keys()];
  }

  // 행렬 내 값을 모두 모으기 전 준비단계
  collectSolve() {
    this._collectSolve_(this.copy()/*, []*/);

    return this;
  }

  // 행렬 내 값을 모두 모은다
  _collectSolve_(mtx/*, way*/, done = false) {
    const data = mtx.data;
    const more = this.more;
    udb._numSolve++;

    // 과정 저장
    // way.push(mtx.toString());

    // 행렬 내 숫자를 모두 한곳으로 모았다고 판단된 경우
    if (done) {
      const endIdx = data.indexOf(this.total);
      const key = this.idxToXY(endIdx).toString();
      if (more.get(key) === undefined) {
        // more.set(key, way);
        more.set(key, 0);
      }
      return;
    }

    // 아직 행렬 내 숫자를 모두 한곳으로 모으지 못했다고 판단된 경우
    let i = mtx.data.length;
    while (i--) {
      // 합쳐야 할 위치가 비어있지 않다면
      if (mtx.data[i] !== 0) {continue; }

      const xy = mtx.idxToXY(i);
      // 주위에 합칠수 있는 셀이 없다면
      if (mtx.nonemptyAroundCount(xy) < 2) {continue; }

      const clone = mtx.copy();
      const done = clone.total === clone.collectAround(xy);
      this._collectSolve_(clone/*, way.slice(0)*/, done);
    }
  }
}