const UNIQUE_DB = []; // 유일값 확인용 케이스
const CASE_DB = []; // 문제 케이스
const PROCESS_DB = []; // 과정 케이스

function Disperse_Number_Of_Case(mtx, log, x, y, num, case_arr) {
  // mtx: 매트릭스
  // log: 풀어내는 과정 로그
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
          .sets(x + 1, y, case_arr[3]), log.copy());
      }
      return;
    }
    else {return; }
  }
  for (let i = 0; i < (num + 1); i++) {
    if ((num - i) >= 0) {
      const clone_case_arr = case_arr.copy();
      clone_case_arr.push(i);
      Disperse_Number_Of_Case(mtx, log, x, y, num - i, clone_case_arr);
    }
  }
}

function Disperse_Solve(arr, log) {
  // 일단 실행되면 받은 행렬을 로그에 저장 (아래 조건문에 해당하지 않더라도 재귀 호출시 과정(로그)를 참고해야 하므로)
  const str = arr.toString();
  log.push(str);
  // 만약 행렬에 -1,0,1 이외의 숫자가 없을 경우 완료된 과정으로 판단
  if (str.replace(/\[|\]|\,|\-|0|1/g, '').length === 0) {
    // 이미 케이스 디비에 저장되어있는 케이스가 아닐경우
    if (UNIQUE_DB.isUnique(arr)) {
      CASE_DB.push(str);
      // PROCESS_DB.push(log);
    }
    return;
  }

  let y = arr.length, isBreak = false;
  while (y--) {
    let x = arr[0].length;
    while (x--) {
      const num = arr.gets(x, y);
      // 절대값 > 1 발견시 재귀 호출 후 반복문 종료
      if (Math.abs(num) > 1) {
        Disperse_Number_Of_Case(arr.copy().sets(x, y, 0), log.copy(), x, y, num, []);
        isBreak = true;
        break;
      }
    }
    if (isBreak) {break; }
  }
}

Disperse_Solve(matrix(4,4).sets(1,1,9), []);
console.log(CASE_DB.length);















// 이건 임시 보류
let rslt_level = {
  long: { // 몇번만에
    way: [
      {
        q: "나열된 문제",
        o: ["문제를 해결했을 때 원점", "..."],
        p: [["문제를", "풀어내는", "단계적", "과정"], "..."]
      }
    ]
  }
};