const udb = new UDB(6,6);
console.time('generator');
udb.generator(new Matrix(), true);
console.timeEnd('generator');
console.dir(udb);
/*
행렬 댑스 삭제함
 - 나중에 행렬의 가지수 추출할 때 각 way각 각각의 뎁스가 되므로
 - 구지 지금 그걸 연산할 필요 없음
 */