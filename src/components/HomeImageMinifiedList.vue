<template>
  <v-list>
    <v-list-item
      v-for="(file, index) in inputFileList"
      class="justify-space-between blue-grey lighten-5 c-after-none c-list-item"
      :key="`file-list-${index}`"
    >

      <!--  파일명  -->
      <v-list-item-content class="pa-0 text-truncate flex-grow-0 flex-shrink-1 c-content-file-name">
        {{ file.name }}
      </v-list-item-content>

      <!--  프로그레시브  -->
      <v-list-item-content class="pa-0 flex-grow-1 flex-shrink-0 c-content-progress body-2">
        <v-row class="mx-0">
          <v-col class="py-0 d-flex align-center justify-end flex-grow-0 c-file-size">
            <span>{{ sizeToString(file.size) }}</span>
          </v-col>
          <v-col class="flex-grow-1 flex-shrink-0 px-0">
            <v-progress-linear
              class="rounded-lg"
              height="24"
              :value="value(index)"
              :color="color(index)"
              :indeterminate="file === undefined"
            >
              <strong>{{ state(index) }}</strong>
            </v-progress-linear>
          </v-col>
          <v-col class="py-0 d-flex align-center justify-start flex-grow-0 c-file-size">
            <span  v-if="outputFileList[index]">
              {{ sizeToString(outputFileList[index].size) }}
            </span>
          </v-col>
        </v-row>
      </v-list-item-content>

      <!--  결과  -->
      <v-list-item-content class="py-0 pr-2  flex-grow-0 flex-shrink-1 flex-row justify-end c-content-result">
        <template v-if="outputFileList[index]">
          <v-btn
            @click="downloadOne(index)"
            :class="`c-contents${BP.smAndUp ? ' text-lowercase text-decoration-underline' : ''}`"
            small
            :text="BP.smAndUp"
            :icon="!BP.smAndUp"
          >
            <span v-if="BP.smAndUp">download</span>
            <v-icon v-else>mdi-download</v-icon>
          </v-btn>
          <div class="mr-n2 body-2 text-right c-contents c-result-percent">
            <span>{{ efficiency(index) }}</span>
          </div>
        </template>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "HomeImageMinifiedList",

  props: {
    inputFileList: {
      type: Array,
      default: () => ([]),
    },

    outputFileList: {
      type: Array,
      default: () => ([]),
    }
  },

  methods: {
    // 프로그래시브 컬러
    color(index) {
      return this.outputFileList[index] ?
        'light-green' : this.outputFileList[index] === false ?
          'orange' : 'blue-grey'
    },

    // 프로그래시브 진행률
    value(index) {
      const result = this.outputFileList[index]
      return result || result === false ?
        100 : 0
    },

    // 파일 진행 상태
    state(index) {
      return this.outputFileList[index] ?
        'success' : this.outputFileList[index] === false ?
          'fail' : 'wait'
    },

    // 압축된 용량 비율
    efficiency(index) {
      // 결과가 없을 경우 빈값으로 리턴
      if (!this.outputFileList[index]) { return '' }

      const a = this.inputFileList[index].size
      const b = this.outputFileList[index].size - a

      return `${Math.floor(b / a * 100)} %`
    },

    // 단일 파일 다운로드
    downloadOne(index) {
      let a = document.createElement('a')
      const base64 = URL.createObjectURL(this.outputFileList[index])

      a.href = base64
      a.download = this.outputFileList[index].name
      a.target = '_blank'

      a.click()
      a = null
    }
  }
}
</script>

<style lang="sass" scoped>
.c-after-none::after
  display: none !important
.c-contents
  flex-basis: auto !important
  flex-grow: 0 !important
.c-content-file-name
  display: inline-block
  flex-basis: 144px
  @media (max-width: 599px)
    flex-basis: 72px
.c-content-result
  flex-basis: 144px
  @media (max-width: 599px)
    flex-basis: 72px
  .c-result-percent
    min-width: 36px
.c-content-progress
  max-width: 520px
  width: 100%
  .c-file-size
    white-space: nowrap
    min-width: 96px
    @media (max-width: 639px)
      display: none !important
.c-list-item
  border-radius: 8px
  cursor: default
  user-select: none
  &:hover
    background-color: #CFD8DC
  &:not(:last-child)
    margin-bottom: 8px
</style>