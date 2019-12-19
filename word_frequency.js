// 문장에서 단어를 모두 추출하여 각 단어가 몇 회 쓰였는지 내림차순으로 반환해줌
// 한글과 영어 문장만 가능하며 대충 만든 것이라 조사 필터 안된상태로 쭉 나감
// 최적화 같은거 안함 테스트 '어린왕자' 추출했을 때 1초 내로 분석됬음
function wf(str) {
    var rslt, obj = {}, i;

    str = str.replace(/[^a-z가-힣\s\t\n]/gi, ' ').replace(/\t|\n|\s{2,}/gi, ' ').split(' ');

    str.forEach(function(v) {
        if (obj[v] !== undefined) {obj[v]++; }
        else {obj[v] = 1; }
    });

    str = [];

    for (i in obj) {
        rslt = {};
        rslt[i] = obj[i];
        str.push(rslt);
    }

    str.sort(function(a, b) {
        var i, j;
        for (i in a) {i = a[i]; }
        for (j in b) {j = b[j]; }
        return j - i;
    });

    str = JSON.stringify(str);
    str = str.replace(/\{|\}|\[|\]|"/gi, '').replace(/\,/gi, `
`);

    return str;
}