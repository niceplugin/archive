<template>
  <div class="stick-body position-relative d-flex justify-content-center pb-5" :style="styles">
    <span :class="`stick-line d-flex align-items-end pb-3 fw-bold rounded-bottom ${ classList }`">
      <span class="stick-text">{{ text }}</span>
    </span>
    <btn-note :note="note"/>
  </div>
</template>

<script setup>
import { useOptionsStore } from '../stores/useOptionsStore.js'
import { computed } from 'vue'
import BtnNote from './BtnNote.vue'

const options = useOptionsStore()
const props = defineProps([
  'note', 'keyboard', 'alpha',
])
const classList = computed(() => [ 0, 3, 6 ].includes(props.alpha) ? 'bg-success' : '')
const styles = computed(() => ({
  width: options.width + 'rem',
  'margin-top': -options.marginTop + 'vh',
  transform: `translateY(-${ options.gapY * props.alpha }vh)`,
}))
const text = computed(() => {
  switch (options.show) {
    case 'note':
      return props.note
    case 'keyboard':
      return props.keyboard
    default:
      return ''
  }
})
</script>

<style lang="sass" scoped>
.stick-body
  border-bottom-left-radius: 100vw
  border-bottom-right-radius: 100vw
  height: 85vh
  background-image: url("/src/assets/bg-stick.png")
  background-size: cover
  background-position: center bottom
  .stick-line
    position: relative
    width: 0.6rem
  .stick-text
    position: absolute
    left: 50%
    bottom: 1rem
    transform: translateX(-50%)
</style>