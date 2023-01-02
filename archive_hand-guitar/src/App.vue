<template>
  <v-app>
    <v-main>
      <Transition v-if="isLoading">
        <loading-page/>
      </Transition>
      <pad-page v-else/>
    </v-main>
  </v-app>
</template>

<script setup>
import LoadingPage from '@/pages/LoadingPage.vue'
import PadPage from '@/pages/PadPage.vue'
import isLoading from '@/composibles/isLoading'
</script>
