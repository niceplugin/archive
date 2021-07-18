// error code
//   0: 모듈 미지원
//   1: 파라미터가 유효하지 않음
//   2: 파일이 유효하지 않음
//   3: 실행 오류
//   999: 기타 애러

// todo: 허용가능한 인풋 이미지 포멧확인 필요
// bmp, webp(파일포멧 지원여부),
// jpeg(비슷한 확장자명들 파싱여부),
// png(투명도)

// 지원되는 인풋 이미지 포멧 종류
const supInputFormat = [
  'bmp',
  'png',
  'jpeg',
  'webp',
]
// 지원되는 아웃풋 이미지 포멧 종류
const supOutputFormat = [
  'png',
  'jpeg',
  'webp',
]

class ImageMinifyClient {
  #canvas = document.createElement('canvas')
  #ctx
  #image = new Image()
  #idx = 0 // FileList 포인터 인덱스
  #idxMaximum = 0 // #idx 의 유효 가능한 최대 값
  #isRunning = false // 모듈 실행중 여부
  #needStop = false // 모듈 실행 중지 필요
  #onstop = ()=>{} // 모듈 실행 중지 이후 실행할 콜백

  constructor() {
    this.#ctx = this.#canvas.getContext ?
      this.#canvas.getContext('2d') : null
    this.enable = !!this.#ctx && !!this.#canvas.toBlob
    this.data = null

    this.#image.onload = this.imageLoad
    this.#image.onerror = this.imageError
  }

  // 모듈 초기화 및 최적화 작업 시작 메서드
  run(data) {
    // 이미 실행중일 경우
    if (this.#isRunning) {
      return this.throwError(3,
        `The "ImageMinifyClient" module is already running.`
      )
    }

    // 내부 변수를 초기화
    {
      this.#idx = 0
      this.#idxMaximum = data.files.length - 1
      this.#isRunning = true
      this.#needStop = false
      this.#onstop = ()=>{}
      this.data = data
    }

    this.toMinify()
  }

  // 실행 중지 메서드
  stop(onstop) {
    // 모듈이 실행중일 경우 중지 처리
    if (this.#isRunning) {
      this.#needStop = true
      this.#onstop = typeof(onstop) === 'function' ? onstop : ()=>{}
    }
    // 모듈이 실행중이지 않을 경우 중지 처리
    else {
      typeof(onstop) === 'function' && onstop()
    }
  }

  // 이미지 최적화 진행 시작 메서드
  toMinify() {
    const file = this.data.files[this.#idx]
    const base64Original = URL.createObjectURL(file)
    const fileType = file.type.replace(/\/.+$/, '')
    const fileFormat = file.type.replace(/^[^\/]+\//, '')

    // 예외처리
    {
      // 이미지 타입이 아닐 경우
      if (fileType !== 'image') {
        return this.error(2,
          `FileList[${this.#idx}] is not image type file.`,
          this.#idx
        )
      }
      // 지원되는 포멧이 아닐 경우
      else if (supInputFormat.indexOf(fileFormat) === -1) {
        return this.error(2,
          `FileList[${this.#idx}] image format is ${fileFormat}. It is not support format.`,
          this.#idx
        )
      }
    }

    // 이미지를 로드할 수 있도록 값을 src 에 삽입.
    // 이후 imageLoad 헨들러에서 진행이 이어짐.
    this.#image.src = base64Original
  }

  // 오리지날 이미지 로드 완료 이벤트 헨들러
  imageLoad() {
    const it = this

    // 리사이징 정보 객체
    const resize = {
      width: this.data.width === undefined ?
        this.#image.naturalWidth : this.data.width,
      height: this.data.height === undefined ?
        this.#image.naturalHeight : this.data.height
    }
    // todo: contain 타입으로 리사이징 하기 위한 resize 값 재계산 로직 필요

    // 브라우저가 허용 가능한 켄버스 크기 정보 객체
    const canvasSize = {
      width: resize.width,
      height: resize.height
    }
    // todo: 켄버스가 지원하는 최대크기 이내인지 계산하고 조정하는 로직 필요

    // 켄버스에 이미지 그리기
    this.#ctx.drawImage(
      this.#image,
      0, 0,
      canvasSize.width, canvasSize.height
    )

    // 켄버스 toBlob 실행 (요청옵션에 맞게 이미지 출력)
    canvas.toBlob(
      blob => it.success(blob, it.#idx),
      it.data.outputType,
      it.data.quality
    )
  }

  // 오리지날 이미지 로드 애러 이벤트 헨들러
  imageError() {
    this.error(2,
      `FileList[${this.#idx}] image can not loaded.`,
      this.#idx
    )
  }

  // 다음 동작 처리 메서드
  next() {
    // 최적화 진행을 실행할 파일이 더 있는 경우
    if (this.#idx < this.#idxMaximum) {
      this.#idx += 1
      this.toMinify()
    }
    // 모든 실행이 종료된 경우
    else {
      this.data.onend && this.data.onend()
    }
  }

  // 최적화 완료 처리 메서드
  success(blob, index) {
    // 중지 요청이 있을 경우 처리
    if (this.#needStop) {
      this.#isRunning = false
      this.#onstop()
      return
    }

    const name = this.data.files[this.#idx].name
    const file = new File(blob, name)

    this.data.onsuccess({
      file,
      index
    })
    this.next()
  }

  // 애러 처리 메서드
  error(code, message, index = -1) {
    // 중지 요청이 있을 경우 처리
    if (this.#needStop) {
      this.#isRunning = false
      this.#onstop()
      return
    }

    this.throwError(code, message, index)
    this.next()
  }

  // 예외처리 실행 메서드
  throwError(code, message, index) {
    // onerror 콜백이 있는경우
    if (typeof(this.data.onerror) === 'function') {
      return this.data.onerror({
        code,
        message,
        index
      })
    }
    throw new Error(`Code: ${code}, Index: ${index}\nMessage: ${message}`)
  }
}

const imageMinifyClient = new ImageMinifyClient()

export default function(data = {}, onstop) {
  // 다중 인자일 경우
  // data: String
  // onstop: Function
  //
  // 단일 객체 인자 스키마
  // {
  //   files: FileList (require),
  //   onsuccess: Function (require),
  //                  이미지 최적화를 성공할 때마다 호출되는 콜백
  //   onend: Function (options - default: undefined),
  //                  FileList 내에 모든 이미지 최적화 작업이 끝났을 때 호출되는 콜백
  //   onerror: Function (options - default: undefined),
  //                  (모듈 실행간 애러가 발생할 경우 || 이미지 최적화에 실패할 때마다)
  //                  호출되는 콜백
  //   width: Number (options - default: undefined === originalWidth),
  //                  (min: 0, max: browserSupportValue)
  //   height: Number (options - default: undefined === originalHeight),
  //                  (min: 0, max: browserSupportValue)
  //   quality: Number (options - default: 0.8),
  //                  (min: 0, max: 1)
  //   outputType: String (options - default: 'jpeg'),
  //                  (valid: ['png', 'jpeg', 'webp'])
  // }

  // 예외처리 실행 함수
  function throwError(code, message, index = -1) {
    if (typeof(data.onerror) === 'function') {
      return data.onerror({
        code,
        message,
        index
      })
    }
    throw new Error(`Code: ${code}\nMessage: ${message}`)
  }

  // 모듈 사용 불가 예외처리
  if (!imageMinifyClient.enable) {
    return throwError(0,
      `"Image Minify Client" module not support.`
    )
  }

  // 실행 중지 요청처리
  if (data && data.toLowerCase() === 'stop') {
    imageMinifyClient.stop(onstop)
    return
  }

  // 인자 유효성 검사
  {
    // 숫자 기본값 설정 함수
    function detectValidNumber(value, max) {
      value = Number.parseInt(value)

      const isNaN = Number.isNaN(value)
      const isFin = Number.isFinite(value)
      const isPos = value >= 0

      value = (max && value > max) ? max : value

      return (!isNaN && isFin && isPos) ? value : max
    }

    // 단일 인자가 비정상적일 경우 예외처리
    if (!data || typeof(data) !== 'object') {
      return throwError(1,
        `Argument is invalid. It must be an object or a string called "stop".`
      )
    }

    data.onerror = typeof(data.onerror) !== 'function' ?
      undefined : data.onerror
    data.onend = typeof(data.onend) !== 'function' ?
      undefined : data.onend
    data.width = detectValidNumber(data.width)
    data.height = detectValidNumber(data.height)
    data.quality = detectValidNumber(data.quality, 0.8)
    data.outputType = !data.outputType ?
      'jpeg' : data.outputType.toLowerCase()
    data.outputType = (supOutputFormat.indexOf(data.outputType) === -1) ?
      'jpeg' : data.outputType
    data.outputType = `image/${data.outputType}`
  }

  // 초기 예외 처리
  {
    // files 예외처리
    {
      // 인자가 비었을 경우
      if (!data.files) {
        return throwError(1,
          `"files" not found.`
        )
      }
      // FileList 타입이 아닐 경우
      else if (!(data.files instanceof FileList)) {
        return throwError(1,
          `"files" is not "FileList" type.`
        )
      }
      // FileList 가 비었을 경우
      else if (!data.files.length) {
        return throwError(1,
          `"files" length is 0.`
        )
      }
    }

    // onsuccess 예외처리
    {
      // 인자가 비었을 경우
      if (!data.onsuccess) {
        return throwError(1,
          `"onsuccess" not found.`
        )
      }
      // 함수가 아닐경우
      else if (typeof(data.onsuccess) !== 'function') {
        return throwError(1,
          `"onsuccess" is not function then can not use for callback.`
        )
      }
    }
  }

  // 이미지 최적화 실행
  //
  // data 객체의 참조값은 비동기 실행중에 변경될 수 있으므로,
  // 값을 복사하여 미연에 객체 참조값에 의한 오작동을 방지한다
  imageMinifyClient.run({...data})
}
