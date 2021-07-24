<template>
  <v-app-bar
    class="px-0"
    color="light-green"
    height="64"
    max-height="64"
    dark
    flat
  >
    <v-container class="d-flex align-center pl-1">

      <v-img
        class="shrink mr-2"
        alt="Image Minify Website Logo"
        :width="222"
        :height="64"
        :src="require('../assets/logo.svg')"
        contain
      />

      <v-spacer/>

      <v-btn
        href="https://github.com/niceplugin/image-minify-client"
        target="_blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>

    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar"
}
</script>