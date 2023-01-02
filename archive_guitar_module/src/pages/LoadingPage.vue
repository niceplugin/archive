<template>
  <div @click="start" class="d-flex flex-column align-center justify-center fill-height bg-white position-fixed w-100">
    <before-start v-if="clicked"/>
    <p class="my-16">클릭하면 기타를 로딩합니다!</p>
  </div>
</template>

<script setup>
import guitar from '@/plugins/guitar'
import isLoading from '@/composibles/isLoading'
import BeforeStart from '@/components/BeforeStart.vue'
import { ref } from 'vue'

const clicked = ref(false)

async function start() {
  clicked.value = true
  await guitar.init()
  const uxWaitTime = 1000 + Math.random() * 1000
  setTimeout(() => isLoading.value = false, uxWaitTime)
}
</script>
