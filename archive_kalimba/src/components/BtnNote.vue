<template>
  <div
    @mousedown="play"
    class="btn-note rounded-circle"
    :data-note="props.note"
  />
</template>

<script setup>
import Kalimba from '/src/util/touchs.js'
const props = defineProps([ 'note' ])

function play() {
  Kalimba.stopNote(props.note)
  Kalimba.playNote(props.note)
}
</script>

<style lang="sass" scoped>
.btn-note
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 11vh
  background: radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))
</style>