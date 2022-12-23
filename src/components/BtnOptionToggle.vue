<template>
  <button @click="toggleOption" class="position-fixed top-0 end-0 btn btn-secondary rounded-circle py-0 px-1 mt-2 me-2">
    <i class="bi bi-x-lg h4" v-if="toggle"/>
    <i class="bi bi-gear h4" v-else/>
  </button>
</template>

<script setup>
import router from '/src/router'
import { computed } from 'vue'

const toggle = computed(() => {
  const route = router.currentRoute
  return !!route.value.query.options
})

function toggleOption() {
  const route = router.currentRoute
  const value = route.value.query.options
  const toggle = value ? undefined : true
  const method = history.state.back ? 'replace' : 'push'
  router[method]({
    name: 'Home',
    query: {options: toggle},
  })
}
</script>

<style lang="sass" scoped>
</style>