<template>
  <div @touchmove.capture="test" class="stick-wrap d-flex justify-content-center vh-100" :style="styles">
    <stick-note
      v-for="(note, i) in list"
      :key="`note-${ i }`"
      :note="note"
      :keyboard="keyboardCode[i]"
      :alpha="Math.abs(i - 8)"
    />
  </div>
</template>

<script setup>
import StickNote from './StickNote.vue'
import { computed } from 'vue'
import { useOptionsStore } from '../stores/useOptionsStore.js'

const options = useOptionsStore()
const normalNote = [ 'D6', 'B5', 'G5', 'E5', 'C5', 'A4', 'F4', 'D4', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5', 'C6', 'E6' ]
const baseNote = [ 'D4', 'B3', 'G3', 'E3', 'C3', 'A2', 'F2', 'D2', 'C2', 'E2', 'G2', 'B2', 'D3', 'F3', 'A3', 'C4', 'E4' ]
const keyboardCode = [ 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Space', 'J', 'K', 'L', ';', 'U', 'I', 'O', 'P' ]

const list = computed(() => options.base ? baseNote : normalNote)
const styles = computed(() => ({
  gap: options.gapX + 'rem',
}))
</script>

<style lang="sass" scoped>
</style>