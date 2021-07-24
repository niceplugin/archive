<template>
  <v-card
    v-if="!isWorking && hasResult"
    class="mx-auto mt-3"
    width="238"
    outlined
    flat
  >
    <v-card-title class="mx-2 mt-2 pb-0 blue-grey lighten-5 align-baseline justify-center">
      <span class="body-2 mr-4">Saved</span>
      <span class="text-h3">{{ efficiency(originalValue, minifiedValue) }}</span>
    </v-card-title>

    <v-card-text class="mx-2 mb-2 blue-grey lighten-5 body-2 text-center c-w-auto">
      Total:
      {{ sizeToString(originalValue) }}
      →
      {{ sizeToString(minifiedValue) }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HomImageMinifiedResult",

  props: {
    isWorking: {
      type: Boolean,
      default: false
    },
    hasResult: {
      type: Boolean,
      default: false
    },
    inputFileList: {
      type: Array,
      default: () => ([]),
    },

    outputFileList: {
      type: Array,
      default: () => ([]),
    }
  },

  computed: {
    // 압축된 원본 이미지 총 용량 바이트
    originalValue() {
      const it = this
      let value = 0

      this.outputFileList.forEach((file, index) => {
        value += file ? it.inputFileList[index].size : 0
      })

      return value
    },

    // 압축된 결과 이미지 총 용량 바이트
    minifiedValue() {
      let value = 0

      this.outputFileList.forEach( file => {
        value += file ? file.size : 0
      })

      return value
    }
  },

  methods: {
    // 압축된 용량 비율
    efficiency(a, c) {
      if (!a) { return '0 %' }

      const b = a - c

      return `${Math.floor(b / a * 100)}%`
    },
  }
}
</script>

<style lang="sass" scoped>
.c-w-auto
  width: auto !important
</style>