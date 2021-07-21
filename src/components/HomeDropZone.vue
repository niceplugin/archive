<template>
  <v-card
    @click="handlerZoneClick"
    @drop.prevent="handlerDrop"
    @dragover.prevent="handlerDragover"
    id="drop-zone-box"
    class="mx-auto rounded-lg"
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

  methods: {
    // 드랍존 클릭 핸들러
    handlerZoneClick() {
      const el = this.$refs.input
      el && el.click()
    },

    // 드롭 이벤트 핸들러
    handlerDrop() {
      console.log('handlerDrop')
    },

    // 드레그 오버 이벤트 핸들러
    handlerDragover() {
      console.log('handlerDragover')
    },

    // 인풋 체인지 핸들러
    handlerChange(event) {
      console.log(event)
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
  .c-border-dash
    position: absolute
    top: 1rem
    left: 1rem
    right: 1rem
    bottom: 1rem
    width: auto
    border: thick dashed map-get($green, 'base')
#drop-zone-box:hover
  opacity: 1
</style>