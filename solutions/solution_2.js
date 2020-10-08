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
    this.chip_only_first = [
      [0,1,1,0], [0,1,0,1], [0,1,1,1], [1,1,1,1]
    ];
    this.chip = [
      [1,1,0,0], [0,1,1,0], [0,0,1,1], [1,0,0,1],
      [1,0,1,0], [0,1,0,1],
      [1,1,1,0], [0,1,1,1], [1,0,1,1], [1,1,0,1],
      [1,1,1,1]
    ];
    this._numOfRecursion = 0;
    this._numOfUnique = 0;
  }

  // 경우의 수 생성
  generator(mtx, isFirst = false) {
    this._numOfRecursion++;
    // 허용 범위를 초과할 경우 종료
    if (mtx.value > this.max_value ||
      mtx.size[0] > this.max_size ||
      mtx.size[1] > this.max_size) {
      return;
    }
    // 유니크 패턴이 아닐경우 리턴
    else if (!this.pushUnique(mtx)) {
      return;
    }
    this._numOfUnique++;

    if (this._numOfUnique % 1000 === 0) {
      console.log('loop: ', this._numOfRecursion, ', unique: ', this._numOfUnique);
    }

    const chip = isFirst ? this.chip_only_first : this.chip;
    let idx = mtx.data.indexOf(1);
    // 행렬 내 1의 개수만큼 루프
    while (idx !== -1) {
      const loc = mtx.idxToLocation(idx);
      const x = loc[0];
      const y = loc[1];
      let l = chip.length;
      // 다음루프를 위한 idx 계산
      idx = mtx.data.indexOf(1, idx + 1);
      // chip 개수만큼 루프
      while (l--) {
        const clone = mtx.copy();
        const prev_val = mtx.value;
        const direction = [x, y].concat(chip[l]);
        clone.splitAround(direction);
        // 복사본이 원본과 같지 않을 경우 재귀
        if (prev_val !== clone.value) {
          this.generator(clone);
        }
      }
    }
  }

  // 유니크 패턴 저장
  pushUnique(mtx) {
    mtx.wide();
    const key = `v${mtx.value}w${mtx.size[0]}h${mtx.size[1]}`;
    this.unique_patterns[key] =
      this.unique_patterns[key] ? this.unique_patterns[key] : new Map();
    const unique = this.unique_patterns[key];

    // 없는 패턴일 경우
    if (this._checkUnique(mtx, unique)) {
      if (mtx.size[0] === mtx.size[1]) { // 정사각형 행렬은 90도 회전후 다시 검사
        mtx.wide(true);
        // 없는 패턴이 아닐경우 리턴
        if (!this._checkUnique(mtx, unique)) {return false; }
      }

      // todo 이 코드 한줄이 정말 시간 많이 잡아먹음 이것도 개선이 필요함
      // 행렬 합 과정 구하기
      mtx.collectSolve();

      // 해당 벨류 최초 저장일 경우
      if (!this.db.get(mtx.value)) {this.db.set(mtx.value, []); }
      const db = this.db.get(mtx.value);

      // 유효한 유니크 패턴으로 판단되므로 유니크 디비에 저장
      unique.set(mtx.toString(), true);
      db.push(mtx);

      // todo 행렬 합 과정 종류 개수에 따른 분기 테스트
      if (mtx.value > 6 && mtx.more.size < 3) {return false; }
      return true;
    }
    else {return false; }
  }

  // 유니크 패턴 채크 (유니크일 경우: true, 아닐경우: false)
  _checkUnique(mtx, unique) {
    if (!unique.get(mtx.toString()) &&
      !unique.get(mtx.reverse(0,1).toString()) &&
      !unique.get(mtx.reverse(1,0).toString()) &&
      !unique.get(mtx.reverse(0,1).toString())) {
      return true;
    } else {
      return false;
    }
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
    this.size = [x, y];
    this.value = 0; // 행렬내 숫자의 총합 (splitAround 에서 값 추가)
    this.more = new Map();
    /*
    this.more: {
      key(end 좌표): value(진행 과정 배열)
    }
    * */

    // init
    this.sets(1,1,1);
  }

  toString() {
    return this.data.toString();
  }

  copy() {
    const clone = new Matrix();
    clone.data = this.data.slice(0);
    clone.size = this.size.slice(0);
    clone.value = this.value;

    return clone;
  }

  print(rsltStr = false) {
    const x = this.size[0];
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
    if (this.size[0] === x || this.size[1] === y ||
      x < 0 || y < 0) {return undefined; }
    return this.data[this.size[0] * y + x];
  }

  sets(x, y, n) {
    this.data[this.size[0] * y + x] += n;
    this.value += n;
    return this;
  }

  // 인덱스를 좌표로 변환
  idxToLocation(i) {
    const y = Math.floor(i / this.size[0]);
    const x = i % this.size[0];
    return [x, y];
  }

  // 해당 위치의 주위가 비어있는지 확인
  isEmptyAround(direction = [0,0,0,0,0,0]) {
    // direction = [x, y, 상,우,하,좌] 순서로 0이 아니면 실행.
    if (direction.length !== 6) {throw new Error('방향배열이 길이4가 아님'); }

    let rslt = true;
    if (direction[2]) {
      const val = this.gets(direction[0], direction[1]-1);
      if (val === undefined) {
        this.appendLine(2);
        direction[1]++;
      } else if (val !== 0) {rslt = false; }
    }
    if (direction[3]) {
      const val = this.gets(direction[0]+1, direction[1]);
      if (val === undefined) {
        this.appendLine(3);
      } else if (val !== 0) {rslt = false; }
    }
    if (direction[4]) {
      const val = this.gets(direction[0], direction[1]+1);
      if (val === undefined) {
        this.appendLine(4);
      } else if (val !== 0) {rslt = false; }
    }
    if (direction[5]) {
      const val = this.gets(direction[0]-1, direction[1]);
      if (val === undefined) {
        this.appendLine(5);
        direction[0]++;
      } else if (val !== 0) {rslt = false; }
    }
    return rslt;
  }

  // 해당 위치의 주위가 비어있지 않은 셀의 개수
  nonemptyAroundCount(direction = [0,0]) {
    const x = direction[0];
    const y = direction[1];
    let count = 0;

    count += this.gets(x, y-1) ? 1 : 0;
    count += this.gets(x, y+1) ? 1 : 0;
    count += this.gets(x-1, y) ? 1 : 0;
    count += this.gets(x+1, y) ? 1 : 0;

    return count;
  }

  // 원점을 0으로 만들고 원점으로부터 값을 복제한다
  splitAround(direction = [0,0,0,0,0,0]) {
    if (this.gets(direction[0], direction[1]) === 0 ||
      this.isEmptyAround(direction) === false) {
      // const mtx = this.print(true) + '\n\n';
      return this;
    }

    this.sets(direction[0], direction[1], -1);
    if (direction[2]) {this.sets(direction[0], direction[1]-1, 1); }
    if (direction[3]) {this.sets(direction[0]+1, direction[1], 1); }
    if (direction[4]) {this.sets(direction[0], direction[1]+1, 1); }
    if (direction[5]) {this.sets(direction[0]-1, direction[1], 1); }
    return this;
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

    return this;
  }

  // 행렬의 상하좌우 끝에 라인을 추가하여 사이즈를 늘린다
  appendLine(direction = -1, n = 0) {
    /// 2: 상, 3: 우, 4: 하, 5: 좌
    if (direction === 2) { // 상단 라인 추가
      const line = Array.from(new Array(this.size[0]), i => n);
      this.data = line.concat(this.data);
      this.size[1]++;
    } else if (direction === 4) { // 하단 라인 추가
      const line = Array.from(new Array(this.size[0]), i => n);
      this.data = this.data.concat(line);
      this.size[1]++;
    } else if (direction === 3) { // 우측 라인 추가
      const x = this.size[0];
      let y = this.size[1];
      this.size[0]++;
      while (y--) {
        this.data.splice(x * y + x, 0, n);
      }
    } else if (direction === 5) { // 좌측 라인 추가
      const x = this.size[0];
      let y = this.size[1];
      this.size[0]++;
      while (y--) {
        this.data.splice(x * y, 0, n);
      }
    }
    return this;
  }

  // 반전 행렬: 축에 해당하는 부분을 반전 시킴
  reverse(xAxis = 0, yAxis = 0) {
    if (xAxis && yAxis) {
      this.data.reverse();
    }
    else {
      const arr = [];
      const x = this.size[0];
      let y = this.size[1];
      while (y--) {
        const start = x * y;
        const end = start + x;
        arr.push(this.data.slice(start, end));
      }

      if (xAxis) {
        arr.forEach((cur)=>{cur.reverse(); });
        this.data = arr.reduceRight((acc, cur)=>{return acc.concat(cur)}, []);
      }
      else if (yAxis) {
        this.data = arr.reduce((acc, cur)=>{return acc.concat(cur)}, []);
      }
    }
    return this;
  }

  // 행렬이 정사각형이 아닐 경우 가로축이 더 길도록 회전
  wide(force = false) {
    if (this.size[0] < this.size[1] || force) {
      const arr = [];
      let y = this.size[1];
      while (y--) {
        let x = this.size[0];
        while (x--) {
          arr[this.size[1] * x + y] = this.data[this.size[0] * y + x];
        }
      }
      this.size.reverse();
      this.data = arr;
    }
    return this;
  }

  // 행렬 내 값을 모두 모으기 전 준비단계
  collectSolve() {
    this._collectSolve_(this.copy(), []);

    return this;
  }

  // 행렬 내 값을 모두 모은다
  _collectSolve_(mtx, way) {
    const data = mtx.data;
    const more = this.more;
    const endIdx = data.indexOf(this.value);

    // 과정 저장
    way.push(mtx.toString());

    // 행렬 내 숫자를 모두 한곳으로 모았다고 판단된 경우
    if (endIdx !== -1) {
      const key = this.idxToLocation(endIdx).toString();
      if (more.get(key) === undefined) {
        more.set(key, way);
      }
      return;
    }

    // 아직 행렬 내 숫자를 모두 한곳으로 모으지 못했다고 판단된 경우
    let y = this.size[1];
    while (y--) {
      let x = this.size[0];
      while (x--) {
        if (mtx.gets(x, y) !== 0) {continue; } // 합쳐야 할 위치가 비어있는지 확인
        if (mtx.nonemptyAroundCount([x, y]) >= 2) { // 주위 숫자를 합칠수 있는 경우
          const clone = mtx.copy();
          clone.collectAround([x, y]);
          this._collectSolve_(clone, way.slice(0));
        }
      }
    }
  }
}
const udb = new UDB(8,5);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
udb.sort();
console.dir(udb);