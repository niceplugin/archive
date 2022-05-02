<template>
  <div v-show="showComponent" class="table-result">
    <div class="content-box">
      <div class="main-content">
        <span class="px-4">saved</span>
        <span class="text-h4">{{ savedText }}</span>
      </div>
      <div>
        <span class="text-right pr-2">Total:</span>
        <span class="text-left">{{ footerText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableResult',

  computed: {
    showComponent() {
      const wait = !this.$store.state.minifyWorking
      let count = 0
      this.$store.state.resultList.forEach(data => {
        if (data.state === 'done') {
          count++
        }
      })

      return count > 1 && wait
    },

    savedText() {
      const oldSize = this.totalSize('old')
      const newSize = this.totalSize('new') - oldSize

      return `${ Math.floor(newSize / oldSize * 100) } %`
    },

    footerText() {
      let oldSize = this.totalSize('old')
      oldSize = this.byteToString(oldSize)
      let newSize = this.totalSize('new')
      newSize = this.byteToString(newSize)

      return `${ oldSize } → ${ newSize }`
    }
  },

  methods: {
    totalSize(key) {
      let size = 0

      this.$store.state.resultList.forEach(data => {
        if (data.state === 'done') {
          size += data[`${key}File`]?.size || 0
        }
      })

      return size
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.table-result
  position: sticky
  bottom: 3rem
  margin: 1rem auto
  padding: 8px
  width: max-content
  height: max-content
  border: 1px dotted map-get($grey, 'base')
  background-color: #FFFFFF
  border-radius: 6px
  overflow: hidden
  box-shadow: 0 0 0 10px #FFFFFF
.content-box
  display: flex
  flex-direction: column
  padding: 12px 16px
  background-color: map-get($grey, 'lighten-3')
  border-radius: 4px
  height: 100%
  align-items: center
  justify-content: center
  .main-content
    display: flex
    align-items: end
    padding: 4px 0
</style>