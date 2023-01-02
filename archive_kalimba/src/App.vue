<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component v-if="init.loaded" :is="Component" />
    </transition>
  </router-view>

  <Transition>
    <loading-view v-if="!init.loaded"/>
  </Transition>
</template>

<script setup>
import LoadingView from './views/LoadingView.vue'
import Kalimba from '/src/util/touchs.js'
import { useCommonStore } from '/src/stores/useCommonStore.js'

const init = useCommonStore()
Kalimba.setInstrument('kalimba', () => {
  setTimeout(() => init.loaded = true, 1000)
})

window.addEventListener('contextmenu', e => e.preventDefault())
const touchArr = []
window.addEventListener('touchmove', function(event) {
  let i = event.touches.length
  while (i--) {
    const x = event.touches[i].clientX
    const y = event.touches[i].clientY
    const id = event.touches[i].identifier
    const el = document.elementFromPoint(x, y)
    const note = el.dataset.note

    if (note && !touchArr[id]) {
      Kalimba.stopNote(note)
      touchArr[id] = note
    }
    else if (!note && touchArr[id]) {
      Kalimba.playNote(touchArr[id])
      touchArr[id] = null
    }
  }
})















</script>