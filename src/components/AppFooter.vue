<template>
  <v-footer
    id="footer"
    color="light-green"
    dark
  >
    <v-container class="d-flex flex-wrap align-center justify-end pa-0">
      <v-img
        :src="require('../assets/logo.svg')"
        alt="Image Minify Website Logo"
        width="180"
        height="48"
        position="left center"
        contain
      />
      <v-spacer/>
      <v-btn
        href="https://github.com/niceplugin/image-minify-client"
        class="px-2 text-capitalize"
        target="_blank"
        text
      >
        <v-icon class="mr-1">mdi-github</v-icon>
        Source on Github
      </v-btn>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style lang="sass" scoped>
#footer
  display: none
  @media (display-mode: browser)
    display: block
</style>