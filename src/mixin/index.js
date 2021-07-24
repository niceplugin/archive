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
    }
  }
})