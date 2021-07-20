// error code
//   0: 모듈 미지원
//   1: 파라미터가 유효하지 않음
//   2: 파일이 유효하지 않음
//   3: 실행 오류

// 지원되는 인풋 이미지 포멧 종류
const supInputFormat = [
  'bmp',
  'gif',
  'png',
  'jpeg',
  'webp',
]
// 지원되는 아웃풋 이미지 포멧 종류
const supOutputFormat = [
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
  #validSize = [16384, 8192, 4096, 2048, 1024] // 허용 가능 켄버스 크기 리스트
  #onstop = ()=>{} // 모듈 실행 중지 이후 실행할 콜백

  constructor() {
    const it = this

    this.#ctx = this.#canvas.getContext ?
      this.#canvas.getContext('2d') : null
    this.enable = !!this.#ctx && !!this.#canvas.toBlob
    this.data = null

    this.#image.onload = event => it.imageLoad.call(it, event)
    this.#image.onerror = event => it.imageError.call(it, event)
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
    // 정상적으로 로드 된 이미지이지만 사이즈에 문제가 있는경우
    if (!this.#image.naturalWidth || !this.#image.naturalHeight) {
      return this.imageError()
    }

    const it = this

    // 원본 이미지 가로/세로 비율
    const ratio = this.#image.naturalWidth / this.#image.naturalHeight

    // 원본 이미지 사이즈 정보 객체
    const oSize = {
      width: this.#image.naturalWidth,
      height: this.#image.naturalHeight
    }

    // 리사이징 정보 객체
    const resize = {
      width: this.data.width === undefined ?
        oSize.width : this.data.width,
      height: this.data.height === undefined ?
        oSize.height : this.data.height
    }

    // 리사이징이 필요할 경우 contain 타입으로 리사이징 값 재계산
    {
      // 원본사이즈 가로가 리사이징 가로보다 클 경우
      if (oSize.width > resize.width) {
        resize.height = Math.floor(resize.width / ratio)
      }
      // 원본사이즈 세로가 리사이징 세로보다 클 경우
      if (oSize.height > resize.height) {
        resize.width = Math.floor(resize.height * ratio)
      }
      // 리사이징 사이즈를 원본 이미지 비율에 맞게 수정
      resize.height = Math.floor(resize.width / ratio)
    }

    // 브라우저가 허용 가능한 켄버스 크기 정보 객체
    const cvsSize = {
      width: resize.width,
      height: resize.height
    }

    // 브라우저에서 지원하는 켄버스 크기 찾아서 적용하는 함수
    function validateSupportSize(validSize) {
      // 사용 가능한 캔버스 크기를 찾을 수 없을 때 예외처리
      if (!validSize.length) {
        it.error(2,
          `Could not find any available canvas sizes.`,
          it.#idx
        )
        return false
      }

      // 켄버스 width 가 허용가능 수치보다 클 때 사이즈 수정
      if (cvsSize.width > validSize[0]) {
        cvsSize.width = validSize[0]
        cvsSize.height = validSize[0] / ratio
      }
      // 켄버스 height 가 허용가능 수치보다 클 때 사이즈 수정
      if (cvsSize.height > validSize[0]) {
        cvsSize.height = validSize[0]
        cvsSize.width = validSize[0] * ratio
      }

      // 켄버스 사이즈 찾기 시도
      try {
        // 적용된 켄버스 크기를 브라우저가 허용할 수 있다면
        // 마지막 위치에 빨간색 점을 그리고 그 위치를 다시 읽어서
        // 색 코드를 불러올 수 있다.
        // 이 과정중에 애러가 생기거나(ex: firefox),
        // 불러오는 색상코드가 빨간색이 아닐경우
        // 현재 켄버스 사이즈가 브라우저가 지원하는 사이즈보다 크다는 의미이다.
        it.#canvas.width = cvsSize.width
        it.#canvas.height = cvsSize.height
        it.#ctx.fillStyle = '#ff0000'
        it.#ctx.fillRect(
          cvsSize.width-1,cvsSize.height-1,
          cvsSize.width,cvsSize.height
        )

        const rgba =
          it.#ctx.getImageData(cvsSize.width-1,cvsSize.height-1,1,1).data

        if (rgba[0] !== 255) { throw new Error() }
      }
      catch (error) {
        // 허용 가능한 켄버스 리스트를 쉬프트 하고 재귀
        validSize.shift()
        return validateSupportSize(validSize)
      }

      return true
    }

    // 지원되는 크기를 찾을 수 없을 때 종료 (실행된 함수 내부에서 예외처리 함)
    if (!validateSupportSize([...it.#validSize])) {
      return
    }

    // 켄버스에 이미지 그리기
    this.#ctx.drawImage(
      this.#image,
      0, 0,
      cvsSize.width, cvsSize.height
    )

    // 켄버스 toBlob 실행 (요청옵션에 맞게 이미지 출력)
    this.#canvas.toBlob(
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
      this.#isRunning = false
      this.data.onended && this.data.onended()
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

    const bits = [blob]
    const originalFile = this.data.files[this.#idx]
    const fullName = originalFile.name
    const prevName = fullName.replace(/\.[a-z]+$/i, '')
    const minifyTypeName = this.data.minifyTypeName
    const outputName= `${prevName}.${minifyTypeName}`
    const originalTypeName = originalFile.type.replace(/^.+\//i, '')
    const options = { type: this.data.outputType }

    const minifyFile = new File( bits, outputName, options )

    // 원본과 축소본의 확장자가 다르다 || 확장자는 같으나 축소본 사이즈가 더 작다
    const minified =
      ( minifyTypeName !== originalTypeName ) ||
      ( originalFile.size > minifyFile.size )
    const file = minified ? minifyFile : originalFile

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

export default function(_data = {}, onstop) {
  // 다중 인자일 경우
  // data: String
  // onstop: Function
  //
  // 단일 객체 인자 스키마
  // {
  //   files: FileList (require),
  //   onsuccess: Function (require),
  //                  이미지 최적화를 성공할 때마다 호출되는 콜백
  //   onended: Function (options - default: undefined),
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
  //   outputType: String (options - default: 'jpeg')
  //   minifyTypeName: String
  //                  (사용자 입력이 아닌 내부 로직으로 생성되는 값으로 축소 이미지 확장자 명)
  // }

  const data = { ..._data }

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
  if (typeof(_data) === 'string' && _data.toLowerCase() === 'stop') {
    imageMinifyClient.stop(onstop)
    return
  }

  // 인자 유효성 검사
  {
    // 숫자 기본값 설정 함수
    function detectValidNumber(value, defaulted, max) {
      value = Number(value)

      const isNaN = Number.isNaN(value)
      const isFin = Number.isFinite(value)
      const isPos = value >= 0

      value = (max && value > max) ? max : value

      return (value && !isNaN && isFin && isPos) ? value : defaulted
    }

    // 단일 인자가 비정상적일 경우 예외처리
    if (!data || typeof(data) !== 'object') {
      return throwError(1,
        `Argument is invalid. It must be an object or a string called "stop".`
      )
    }

    data.onerror = typeof(data.onerror) !== 'function' ?
      undefined : data.onerror
    data.onended = typeof(data.onended) !== 'function' ?
      undefined : data.onended
    data.width = detectValidNumber(data.width)
    data.width = data.width ?
      Math.floor(data.width) : data.width
    data.height = detectValidNumber(data.height)
    data.height = data.height ?
      Math.floor(data.height) : data.height
    data.quality = detectValidNumber(data.quality, .8, 1)
    data.outputType = !data.outputType ?
      'jpeg' : data.outputType.toLowerCase()
    data.outputType = (supOutputFormat.indexOf(data.outputType) === -1) ?
      'jpeg' : data.outputType
    data.minifyTypeName = data.outputType
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
  imageMinifyClient.run( data )
}