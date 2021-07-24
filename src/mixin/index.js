import Vue from "vue"
import imageMinifier from 'image-minify-client'

Vue.mixin({
  computed: {
    BP() {
      return this.$vuetify.breakpoint
    }
  },

  methods: {
    imageMinifier,

    onsuccess(result) {
      this.outputFileList.push(result.file)
    },
    onerror() {
      this.outputFileList.push(false)
    },
    onended() {
      this.workList.shift()
      if (this.workList.length) {
        this.imageMinifier(this.workList[0])
      }
    },
    onstop() {
      const it = this
      this.inputFileList.forEach((file, i) => {
        if (it.outputFileList[i] === undefined) {
          it.outputFileList.push(false)
        }
      })
      this.workList = []
      this.stopping = false
    },

    // 파일 사이즈
    sizeToString(value) {
      const type = [ 'byte', 'KB', 'MB', 'GB' ]
      let i = 0

      while (value > 999) {
        value /= 1024
        i++
      }

      return `${+value.toFixed(1)} ${type[i]}`
    },
  }
})