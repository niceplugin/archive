<template>
  <div v-if="showComponent" class="d-flex justify-center my-6">
    <!--  버튼: 중지  -->
    <v-btn
      v-if="$store.state.minifyWorking"
      @click="$store.commit('stopState', true)"
      class="p-relative"
      color="red"
      width="35vh"
      :loading="$store.state.minifyStop"
      large
      dark
    >
      <v-icon class="mr-1">mdi-stop-circle-outline</v-icon>
      Stop
      <template v-slot:loader>
        <v-icon class="mr-1">mdi-stop-circle-outline</v-icon>
        Stop
        <v-progress-linear
          color="white"
          indeterminate
          absolute
          bottom
        />
      </template>
    </v-btn>
    <!--  버튼: 단일 다운로드  -->
    <v-btn
      v-else-if="hasOneResult"
      @click="downloadOne"
      color="light-blue"
      width="35vh"
      large
      dark
    >
      <v-icon class="mr-1">mdi-file-download-outline</v-icon>
      Download
    </v-btn>
    <!--  버튼: 모두 다운로드  -->
    <v-btn
      v-else-if="hasResults"
      @click="downloadAll"
      color="light-blue"
      width="35vh"
      :loading="$store.state.zipping"
      large
      dark
    >
      <v-icon class="mr-1">mdi-download-box-outline</v-icon>
      Download All
      <template v-slot:loader>
        <v-icon class="mr-1">mdi-download-box-outline</v-icon>
        Download All
        <v-progress-linear
          color="white"
          indeterminate
          absolute
          bottom
        />
      </template>
    </v-btn>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import JSZip from "jszip"

export default {
  name: 'ProcessButton',

  computed: {
    showComponent() {
      const a = this.$store.state.minifyWorking
      const b = this.hasOneResult
      const c = this.hasResults

      return a || b || c
    },
    // 다운 가능한 결과가 하나이다
    hasOneResult() {
      let count = 0
      this.$store.state.resultList.forEach(data => count += data.newFile ? 1 : 0)
      return count === 1
    },
    // 다운 가능한 결과가 여러개이다
    hasResults() {
      let count = 0
      this.$store.state.resultList.forEach(data => count += data.newFile ? 1 : 0)
      return count > 1
    },
  },

  methods: {
    downloadOne() {
      const data = this.$store.state.resultList.find(data => Boolean(data.newFile))
      const file = data.newFile

      saveAs(file, file.name)
    },
    downloadAll() {
      const zip = new JSZip()
      const commit = this.$store.commit
      const dataList = this.$store.state.resultList.filter(data => data.newFile)

      commit('zippingState', true)

      // 프로세스: zip 파일에 이미지 추가
      dataList.forEach( data => {
        const file = data.newFile

        file && zip.file(file.name, file)
      })

      // 프로세스: zip 파일 다운로드
      zip.generateAsync({type: 'blob'})
        .then( blob => saveAs(blob, "images.zip"))
        .catch(() => alert('Failed to convert files to zip.'))
        .finally(() => commit('zippingState', false))
    },
  }
}
</script>

<style lang="sass" scoped>
.progress-linear
  position: absolute
  bottom: 0
</style>