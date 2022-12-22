<template>
  <v-card
    class="d-flex align-center justify-center text-h2 bg-blue font-weight-bold"
    width="160"
    height="96"
  >
    {{ codeText }}
  </v-card>
</template>

<script setup>
import codeArray from '@/composibles/codeArray'
import { computed } from 'vue'

const codeText = computed(() => codeArray.value.join('') || '-')

</script>

<style scoped>

</style>
