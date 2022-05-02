<template>
  <div class="d-flex justify-center">
    <!--  버튼  -->
    <v-btn
      @click="$refs.input.click()"
      color="light-green"
      width="36vh"
      height="36vh"
      dark
      fab
    >
      <!--  점선  -->
      <span class="dash-round"/>
      <!--  아이콘 및 텍스트  -->
      <span class="d-flex flex-column pt-vh">
        <span class="icon-wrap">
          <v-icon
            size="15vh"
          >mdi-file-image-plus-outline</v-icon>
        </span>
        <span
          class="text-main"
        >Click to select</span>
        <span
          class="text-sub"
        >or</span>
        <span
          class="text-main"
        >Drag files</span>
      </span>
    </v-btn>
    <!--  인풋  -->
    <input
      @change="onChange"
      ref="input"
      type="file"
      accept="image/bmp,image/gif,image/jpeg,image/png,image/webp"
      multiple
      hidden
    >
  </div>
</template>

<script>
export default {
  name: 'UploadButton',

  watch: {
    '$store.state.requestList'() {
      if (this.$store.state.zipping) { return }

      const wait = !this.$store.state.minifyWorking
      const toStop = this.$store.state.minifyStop

      if (wait) {
        toStop && this.$store.commit('stopState', false)
        !toStop && this.$store.commit('workingState', true)
        !toStop && this.minify()
      }
    }
  },

  methods: {
    onChange(event) {
      const commit = this.$store.commit
      const files = [...event.target.files]

      files.forEach(file => commit('addRequestList', {
        oldFile: file,
        newFile: null,
        state: 'wait'
      }))
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

$max-height: 720px
.pt-vh
  padding-top: 7vh
.dash-round
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 33.5vh
  height: 33.5vh
  border-radius: 50%
  outline: 4px map-get($green, 'base') dashed
  @media (max-height: $max-height)
    outline: 2px map-get($green, 'base') dashed
.icon-wrap
  display: inline-block
  margin-bottom: 2vh
  height: calc(6vh + 24px)
  @media (max-height: $max-height)
    margin-bottom: 1vh
.text-main
  text-transform: capitalize
  font-size: 1.25rem
  font-weight: bold
  line-height: 1.25rem
  letter-spacing: 0.0125rem
  @media (max-height: $max-height)
    font-size: 1rem
    line-height: 1rem
.text-sub
  text-transform: lowercase
  font-size: 1rem
  font-weight: normal
  line-height: 1rem
  letter-spacing: 0
  @media (max-height: $max-height)
    font-size: 0.875rem
    line-height: 0.875rem
</style>