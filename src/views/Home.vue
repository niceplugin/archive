<template>
  <v-container>

    <!--  드랍존  -->
    <home-drop-zone
      @insertInputFileList="insertInputFileList"
    />

    <!--  압축기 컨트롤러  -->
    <home-minifier-controller
      @changeOutputType="changeOutputType"
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
    outputType: 'jpeg'
  }),

  watch: {
    workList() {}
  },

  methods: {
    // 파일리스트 추가
    insertInputFileList(fileList, arrList) {
      const it = this

      this.workList.push(fileList)
      arrList.forEach( file => it.inputFileList.push(file) )
    },

    // 아웃풋 타입 체인지
    changeOutputType(type) {
      this.outputType = type
    }
  },
}
</script>
