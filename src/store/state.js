export default {
  // 유효한 드레그 중인 상태
  dragOn: false,

  options: {
    quality: 0.75,
    maxWidth:0,
    maxHeight: 0,
    outputType: 'jpeg'
  },

  // 결과 리스트
  resultList: [
    // {
    //   oldFile: File,
    //   newFile: File || null,
    //   state: 'done' || 'error'
    // }
  ],

  // 요청 리스트
  requestList: [
    // {
    //   oldFile: File,
    //   newFile: null,
    //   state: 'wait' || 'working'
    // }
  ],

  // 압축 진행 중
  minifyWorking: false,

  // 압축 진행 중지 필요
  minifyStop: false,

  // 전체 다운로드를 위한 zip 진행중
  zipping: false
}