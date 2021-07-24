<template>
  <v-container>

    <!--  드랍존  -->
    <home-drop-zone
      @insertInputFileList="insertInputFileList"
    />

    <!--  압축기 컨트롤러  -->
    <home-minifier-controller
      @changeOutputType="changeOutputType"
      @minifierStop="minifierStop"
      @downloadAll="downloadAll"
      :isWorking="!!workList.length"
      :stopping="stopping"
      :enabledAllDownload="enabledAllDownload"
      :allDownloading="allDownloading"
    />

    <!--  아이템 리스트  -->
    <home-image-minified-list
      :inputFileList="inputFileList"
      :outputFileList="outputFileList"
    />

    <!--  메인 페이지 설명  -->
    <home-article/>

  </v-container>
</template>

<script>
import HomeDropZone from "../components/HomeDropZone"
import HomeMinifierController from "../components/HomeMinifierController"
import HomeImageMinifiedList from "../components/HomeImageMinifiedList"
import HomeArticle from "../components/HomeArticle"
import JSZip from "jszip"

export default {
  name: 'Home',

  components: {
    HomeDropZone,
    HomeMinifierController,
    HomeImageMinifiedList,
    HomeArticle
  },

  data: () => ({
    // 파일리스트를 인자로 가지는 배열 (작업 대기열)
    workList: [],

    // 인풋 파일리스트
    inputFileList: [],

    // 아웃풋 파일리스트
    outputFileList: [],

    // 아웃풋 포멧
    outputType: 'jpeg',

    // 상태: 작동 중지를 시도하는 중
    stopping: false,

    // 전체 다운로드 준비중
    allDownloading: false
  }),

  computed: {
    // 전체 다운로드 버튼 활성화
    enabledAllDownload() {
      const notWorking = this.workList.length === 0
      const many = this.outputFileList.filter(file => file).length > 1

      return notWorking && many
    }
  },

  methods: {
    // 파일리스트 추가
    insertInputFileList(fileList, arrList) {
      const it = this

      this.workList.push(fileList)

      if (this.workList.length === 1) {
        const data = {
          files: this.workList[0],
          onsuccess: this.onsuccess,
          onerror: this.onerror,
          onended: this.onended,
          outputType: this.outputType
        }

        this.imageMinifier(data)
      }

      arrList.forEach( file => it.inputFileList.push(file) )
    },

    // 아웃풋 타입 체인지
    changeOutputType(type) {
      this.outputType = type
      this.workList = []
      this.inputFileList = []
      this.outputFileList = []
    },

    // 압축기 작동 중지
    minifierStop() {
      this.stopping = true
      this.imageMinifier('stop', this.onstop)
    },

    // 전체 다운로드
    downloadAll() {
      const it = this
      const zip = new JSZip()
      const files = this.outputFileList.filter(file => file)
      const added = []

      this.allDownloading = true
      files.forEach( file => {
        let i = 1
        let name = file.name.replace(/\.[^.]+$/i, '')
        const type = file.name.replace(name, '')

        console.log(name, type)

        if (added.indexOf(name) > -1) {
          while (added.indexOf(`${name}(${i})`) > -1) { i++ }
          name = `${name}(${i})`
        }

        added.push(name)

        zip.file(`${name}${type}`, file)
      })

      zip.generateAsync({ type: 'base64' })
        .then( base64 => {
          let a = document.createElement('a')

          a.href = `data:application/zip;base64,${base64}`
          a.download = 'minified_images.zip'
          a.target = '_blank'

          a.click()
          a = null

          it.allDownloading = false
        }, error => console.log('zip error: ', error))
    }
  },
}
</script>
