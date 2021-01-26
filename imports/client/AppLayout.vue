<template>
  <div class="container-xl">
    <app-menu></app-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '/imports/client/ui/AppMenu.vue';

export default {
  components: {
    AppMenu
  }
}
</script>