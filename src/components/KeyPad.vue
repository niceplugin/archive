<template>
  <div class="key-pad-grid">
    <v-btn
      @click="guitar.playStroke(-1, 0)"
      class="pad-side-stroke grid-start text-h2"
    >∏
    </v-btn>

    <v-btn
      @click="setCode('A')"
      class="pad-key"
    >A/Am
    </v-btn>
    <v-btn
      @click="setCode('C')"
      class="pad-key"
    >C/Cm
    </v-btn>
    <v-btn
      @click="setCode('F')"
      class="pad-key"
    >F/Fm
    </v-btn>
    <v-btn
      @click="setCode('B')"
      class="pad-key"
    >B/Bm
    </v-btn>
    <v-btn
      @click="setCode('D')"
      class="pad-key"
    >D/Dm
    </v-btn>
    <v-btn
      @click="setCode('G')"
      class="pad-key"
    >G/Gm
    </v-btn>
    <v-btn
      @click="setSeven()"
      class="pad-key"
    >7
    </v-btn>
    <v-btn
      @click="setCode('E')"
      class="pad-key"
    >E/Em
    </v-btn>
    <v-btn
      @click="setSeven()"
      class="pad-key"
    >7
    </v-btn>

    <v-btn
      @click="guitar.playStroke(1, 0)"
      class="pad-side-stroke grid-end text-h1"
    >∨
    </v-btn>

    <v-btn
      @click="guitar.playTick()"
      class="pad-bottom-tick"
    >Hand
    </v-btn>
  </div>
</template>

<script setup>
import guitar from '@/plugins/guitar'
import codeArray from '@/composibles/codeArray'
import { watch } from 'vue'

watch(codeArray, () => {
  const code = codeArray.value.join('')
  console.log(code)
  guitar.setCode(code)
}, {deep: true})

function setCode(code) {
  const arr = codeArray.value

  if (arr[0] !== code) {
    arr[0] = code
    arr[1] = arr[2] = ''
  }
  else {
    arr[1] = arr[1] ? '' : 'm'
  }

  codeArray.value = arr
}

function setSeven() {
  const arr = codeArray.value
  arr[2] = arr[2] ? '' : '7'
  codeArray.value = arr
}
</script>

<style
  lang="sass"
  scoped
>
.key-pad-grid
  display: grid
  grid-template-rows: repeat(4, 1fr)
  grid-template-columns: repeat(5, 1fr)
  gap: 0.5rem

  .pad-side-stroke
    min-height: 30vh
    grid-row: 1/5

    &.grid-start
      grid-column-start: 1

    &.grid-end
      grid-column-end: -1

  .pad-key
    height: auto
    text-transform: capitalize

  .pad-bottom-tick
    height: auto
    text-transform: capitalize
    grid-column: 2/5
</style>
