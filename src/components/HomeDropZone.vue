<template>
  <v-card
    @click="handlerZoneClick"
    @drop.prevent="handlerDrop"
    @dragover.prevent="handlerDragover"
    @dragleave="handlerDragleave"
    id="drop-zone-box"
    ref="dropZoneBox"
    class="mx-auto mt-2 mb-4 rounded-lg"
    color="light-green"
    width="480"
    height="270"
    flat
  >
    <v-card-text
      class="d-flex justify-center flex-column rounded-lg black--text c-border-dash"
    >
      <v-icon size="96">mdi-inbox-arrow-down</v-icon>
      <div class="text-center text-h5 font-weight-bold my-1">
        Drop your image files here!
      </div>
      <div class="text-center body-2">
        (*.bmp, *.gif, *.png, *.jpeg, *webp)
      </div>
    </v-card-text>

    <input
      @change="handlerChange"
      ref="input"
      type="file"
      accept="image/bmp,image/gif,image/jpeg,image/png,image/webp"
      multiple
      hidden
    >
  </v-card>
</template>

<script>
export default {
  name: "HomeDropZone",

  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    options() {
      // 옵션이 변경되면 인풋 파일리스트를 초기화 한다.
      // 이 로직이 없을경우 예를들어
      // a.png 를 jpeg 로 변경했고
      // 옵션을 변경 후 시각적으로 업로드 리스트는 초기화 됬지만
      // 인풋.벨류 를 초기화 하지 않을 경우
      // a.png 를 다시 업로드 할 경우
      // 이미 동일 파일이 인풋 파일리스트에 있으므로 업데이트 되지 않는다.
      // 이것은 사용자가 웹페이지가 동작하지 않는다고 생각할 수 있다
      // 따라서 이러한 악성 UX를 해결하기 위해 초기화 로직을 넣는다
      this.$refs.input.value = ''
    }
  },

  methods: {
    // 드랍존 클릭 핸들러
    handlerZoneClick() {
      const el = this.$refs.input

      el && el.click()
    },

    // 드롭 이벤트 핸들러
    handlerDrop(event) {
      const files = event.dataTransfer.files

      this.insertInputFileList(files)
    },

    // 드레그 오버 이벤트 핸들러
    handlerDragover() {
      this.$refs.dropZoneBox.$el.classList.add('c-dragover')
    },

    // 드레그 리브 이벤트 핸들러
    handlerDragleave() {
      this.$refs.dropZoneBox.$el.classList.remove('c-dragover')
    },

    // 인풋 체인지 핸들러
    handlerChange(event) {
      const files = event.target.files

      this.insertInputFileList(files)
    },

    // 파일리스트 인서트
    insertInputFileList(fileList) {
      const length = fileList.length

      if (length) {
        const arrList = []
        let i = 0

        while (i < length) {
          arrList[i] = fileList[i]
          i += 1
        }

        this.$emit('insertInputFileList', fileList, arrList)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../sass/variables"

#drop-zone-box
  position: relative
  cursor: pointer
  opacity: .75
  transition: opacity 250ms
  user-select: none
  .c-border-dash
    position: absolute
    top: 1rem
    left: 1rem
    right: 1rem
    bottom: 1rem
    width: auto
    border: thick dashed map-get($green, 'base')
#drop-zone-box.c-dragover
  opacity: 1
</style>