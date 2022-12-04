<template>
  <div v-show="$store.state.dragOn" class="drop-zone">
    <div>
      <v-icon
        color="white"
        size="25vmin"
        v-text="'mdi-archive-arrow-down-outline'"
      />
      <div
        class="text-center text-h5 font-weight-bold white--text"
        v-text="'Drop images here.'"
      />
    </div>
    <div
      class="drag-area"
      @drop.prevent="onDrop"
      @dragleave="onDragleave"
      @dragover.prevent
    />
  </div>
</template>

<script>
export default {
  name: 'DropZone',

  methods: {
    onDrop(event) {
      const commit = this.$store.commit
      const files = [...event.dataTransfer.files]

      files.forEach(file => commit('addRequestList', {
        oldFile: file,
        newFile: null,
        state: 'wait'
      }))

      this.$store.commit('dragState', false)
    },

    onDragleave() {
      this.$store.commit('dragState', false)
    }
  }
}
</script>

<style lang="sass" scoped>
.drop-zone
  display: flex
  position: fixed
  justify-content: center
  align-items: center
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0,0,0,.5)
  &:before
    content: ''
    position: absolute
    top: 2rem
    left: 2rem
    right: 2rem
    bottom: 2rem
    border-radius: 32px
    border: 6px dashed #FFFFFF
  .drag-area
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
</style>