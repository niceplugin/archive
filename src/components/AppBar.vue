<template>
  <v-app-bar
    class="px-0"
    color="light-green"
    elevate-on-scroll
    dark
    app
  >
    <v-container class="pl-1">

      <v-img
        class="shrink mr-2"
        alt="Image Minify Website Logo"
        :width="$vuetify.breakpoint.width >= 960 ? 222 : 194"
        :height="$vuetify.breakpoint.height >= 960 ? 64 : 56"
        :src="require('../assets/logo.svg')"
        contain
      />

    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
}
</script>