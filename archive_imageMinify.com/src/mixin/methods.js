import store from '@/store'
import imc from 'image-minify-client'

export default {
  minify() {
    const nothing = !store.state.requestList.length
    const toStop = store.state.minifyStop

    // 조건: 더이상 작업할 것이 없다 || 중지 요청 상태이다
    if (nothing || toStop) {
      return store.commit('workingState', false)
    }

    const it = this
    const data = store.state.requestList[0]
    const options = { ...store.state.options }

    data.state = 'working'

    imc(data.oldFile, options)
      .then(result => {
        const newFile = result[0]
        const oldFile = result[1]

        data.newFile =
          // 압축사이즈 < 원본사이즈 ? 압축파일
          newFile.size < oldFile.size ? newFile :
          // 압축타입 !== 원본타입 ? 압축파일 : 원본파일
          newFile.type !== oldFile.type ? newFile : oldFile
        data.state = 'done'
        it.analyticsResult(data)
      })
      .catch(error => {
        data.state = 'error'
        it.analyticsReject(error.code, data.oldFile.type)
      })
      .finally(() => {
        store.commit('subRequestList')
        store.commit('addResultList', data)
        it.minify()
      })
  },

  // byte 값 변환
  byteToString(value) {
    const type = [ 'byte', 'KB', 'MB', 'GB' ]
    let i = 0

    while (value > 999 && type[i + 1]) {
      value /= 1024
      i++
    }

    return `${ +value.toFixed(1) } ${ type[i] }`
  },

  analyticsResult(data) {
    const old_size = this.sizeRange(data.oldFile.size)
    const new_size = this.sizeRange(data.newFile.size)
    this.analytics('minify_result', {
      old_type: data.oldFile.type,
      new_type: data.newFile.type,
      old_size,
      new_size
    })
  },

  analyticsReject(error_code, file_type) {
    this.analytics('minify_error', {
      file_type,
      error_code
    })
  },

  // n ~ m 용량 구분 문자열 반환
  sizeRange(size) {
    return size < 1048576 ? '~ 1MB' :
      size < 5242880 ? '1MB ~ 5MB' :
        size < 10485760 ? '5MB ~ 10MB' :
          size < 26214400 ? '10MB ~ 25MB' : '25MB ~'
  },
}