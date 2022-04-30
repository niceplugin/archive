interface promise {
  resolve: Function | null,
  reject: Function | null
}

interface options {
  quality: number,
  maxWidth: number,
  maxHeight: number
  outputType: 'jpeg' | 'webp'
}

interface error {
  code: number,
  message: string
}

class ImageMinifyClient {
  #canvas: HTMLCanvasElement | null = null
  #context: CanvasRenderingContext2D | null = null
  #image: HTMLImageElement | null = null
  #file: File | null = null
  #available: boolean = true // 모듈 사용 가능
  #processing: boolean = false // 모듈 작업 처리 중
  #promise: promise = { // 모듈 작업 종료 후 호출해야 하는 resolve, reject 참조 객체
    resolve: null,
    reject: null
  }
  #options: options = { // 출력될 이미지 옵션
    quality: 0.8,
    maxWidth: 0,
    maxHeight: 0,
    outputType: 'jpeg'
  }

  constructor() {
    try {
      this.#canvas = document.createElement('canvas')
      this.#context = this.#canvas.getContext('2d')
      this.#image = new Image()

      this.#image.onerror = this.#imageLoadError.bind(this)
      this.#image.onload = this.#imageLoaded.bind(this)
    }
    catch {
      this.#available = false
      return
    }
  }

  // 이미지 로드 애러
  #imageLoadError(): void {
    this.#reject({
      code: 404,
      message: 'The image could not be loaded.'
    })
  }

  // 이미지 로드 완료
  #imageLoaded(): void {
    // @ts-ignore
    const img: HTMLImageElement = this.#image
    const width: number = img.naturalWidth
    const height: number = img.naturalHeight

    // 조건: 정상적으로 이미지 로드가 안됬다
    if (width === 0 || height === 0) {
      return this.#imageLoadError()
    }

    const outputType: 'image/webp' | 'image/jpeg' =
      `image/${ this.#options.outputType }`
    // @ts-ignore
    const canvas: HTMLCanvasElement = this.#canvas
    // @ts-ignore
    const context: CanvasRenderingContext2D = this.#context
    const maxWidth: number = this.#options.maxWidth || width
    const maxHeight: number = this.#options.maxHeight || height
    const widthRatio: number = width / maxWidth
    const heightRatio: number = height / maxHeight
    const ratio: number =  Math.max(widthRatio, heightRatio, 1)
    const canvasWidth: number = Math.floor(width / ratio)
    const canvasHeight: number = Math.floor(height / ratio)

    let catched: boolean
    try {
      /* ********************************************************
        켄버스가 지원하는 사이즈라면,
        우하단 모서리에 빨간점을 그리고 해당 위치 색 코드를 불러올 수 있다.
        이 과정 중 애러 발생(firefox) 또는 색 코드가 빨간색이 아니라면,
        브라우저가 지원하는 사이즈를 넘어선 경우이다.
      ******************************************************** */

      const x: number = canvasWidth - 1
      const y: number = canvasHeight - 1
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      context.fillStyle = '#ff0000'
      context.fillRect(x, y, 1, 1)
      const rgba: Uint8ClampedArray = context.getImageData(x, y, 1, 1).data
      context.clearRect(x, y, canvasWidth, canvasHeight)

      catched = rgba[0] !== 255
    }
    catch {
      /* ********************************************************
        지원 사이즈를 넘어선 경우,
        켄버스의 사이즈를 조절하더라도 컨텍스트가 작동하지 않으므로
        켄버스와 컨텍스트를 새로 생성해야 한다.
      ******************************************************** */
      this.#canvas = document.createElement('canvas')
      this.#context = this.#canvas.getContext('2d')
      catched = true
    }

    if (catched) { return this.#reject({
      code: 413,
      message: 'Image is over than the size supported.'
    })}

    // 켄버스 크기를 출력될 이미지 크기로 조정
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    // 켄버스에 이미지 그리기
    context.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    // 이미지 데이터 blob 으로 출력
    canvas.toBlob(
      this.#resolve?.bind(this),
      outputType,
      this.#options.quality
    )
  }

  // 압축 성공 핸들러
  #resolve(blob: Blob | null): void {
    if (!blob) { return this.#reject({
      code: 412,
      message: 'Failed to minify image.'
    })}

    // @ts-ignore
    const originFile: File = this.#file
    const fileName: string = originFile.name.replace(/\.[a-z]+$/i, '')
    const outputName: string = `${ fileName }.${ this.#options.outputType }`
    const options = { type: this.#options.outputType }
    const minifyFile = new File( [blob], outputName, options )

    this.#promise.resolve?.([minifyFile, originFile])

    // 메모리 누수 방지 초기화 ******************************************
    // @ts-ignore
    const canvas: HTMLCanvasElement = this.#canvas
    canvas.width = canvas.height = 1
    // @ts-ignore
    this.#image.src = ''
    this.#promise.resolve = null
    this.#promise.reject = null
    this.#processing = false
    this.#file = null
  }

  // 압축 실패 핸들러
  #reject(error: error): void {
    this.#promise.reject?.(error)
    this.#promise.resolve = null
    this.#promise.reject = null
    this.#processing = false
  }

  // 압축
  minify(file: File, options: options): Promise<File> {
    return new Promise<File>(function(this: ImageMinifyClient, resolve: Function, reject: Function): void {
      const fileType: string = file.type.replace(/\/.+$/, '')
      const fileFormat: string = file.type.replace(/^[^\/]+\//, '')
      const formats: string[] = [
        'bmp',
        'gif',
        'png',
        'jpeg',
        'webp',
      ]
      let error: error | null = null

      this.#promise.resolve = resolve
      this.#promise.reject = reject

      // 예외처리 *************************************************
      // 예외: 모듈을 지원하지 않음
      if (!this.#available) { error = {
        code: 501,
        message: 'Does not support modules.'
      }}
      // 예외: 이미 작동중
      else if (this.#processing) { error = {
        code: 409,
        message: 'The process is already running.'
      }}
      // 예외: 파라미터 필요
      else if (file == null) { error = {
        code: 400,
        message: 'The first parameter cannot be empty.'
      }}
      // 예외: 첫번째 파라미터가 파일타입 객체가 아님
      else if (!(file instanceof File)) { error = {
        code: 400,
        message: 'The first parameter is not a File type.'
      }}
      // 예외: 파일 타입이 이미지가 아님
      else if (fileType !== 'image') { error = {
        code: 415,
        message: 'The first parameter is not a Image File type.'
      }}
      // 예외: 지원 포멧의 이미지가 아님
      else if (formats.indexOf(fileFormat) === -1) { error = {
        code: 415,
        message: `"${ fileFormat }" format is not support.`
      }}

      // 조건: 예외가 있을경우 예외처리
      if (error) {
        return this.#reject(error)
      }

      // 조건: 옵션이 없다 || 객체가 아니다
      if (!options) {
        this.#options.quality = 0.8
        this.#options.maxWidth = 0
        this.#options.maxHeight = 0
        this.#options.outputType = 'jpeg'
      }
      else {
        let quality: number = Math.abs(Number(options.quality)) || 0.8
        quality = isFinite(quality) ? quality : 0.8
        quality = quality > 1 ? 1 : quality
        this.#options.quality = quality

        let maxWidth: number = Math.abs(Number(options.maxWidth)) || 0
        maxWidth = isFinite(maxWidth) ? maxWidth : 0
        this.#options.maxWidth = Math.floor(maxWidth)

        let maxHeight: number = Math.abs(Number(options.maxHeight)) || 0
        maxHeight = isFinite(maxHeight) ? maxHeight : 0
        this.#options.maxHeight = Math.floor(maxHeight)

        this.#options.outputType =
          options.outputType === 'webp' ? 'webp' : 'jpeg'
      }

      this.#processing = true
      this.#file = file
      // @ts-ignore
      // 할당: 이미지 로드 시작 (로드 관련 이벤트 헨들러에서 프로세스 이어짐)
      this.#image.src = URL.createObjectURL(file)
    }.bind(this))
  }
}

const imc = new ImageMinifyClient

export default (file: File, options: options) => imc.minify(file, options)