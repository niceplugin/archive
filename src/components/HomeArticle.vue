<template>
  <v-card
    class="mx-auto"
    width="460"
    flat
  >
    <v-card-title>
      <h1 class="mx-auto d-flex flex-column align-center">
        <span class="text-h6 text-sm-h4 font-weight-bold">
          Image file size to smaller.
        </span>
        <span class="text-sm-h6 body-2">
          Free forever!
        </span>
      </h1>
    </v-card-title>

    <v-card-text class="text-center">
      The <b>imageMinify</b> uses lossy compression techniques supported by the browser to reduce the file size of your images.
      So fewer bytes are required to store the data.
      The effect is nearly invisible but it makes a very large difference in file size!
    </v-card-text>

    <v-card-text class="text-center">
      <b>This website supports PWA</b>.
      <br>
      If you install this website as an app using your Chrome browser,
      <br>
      you can even use it offline!
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HomeArticle"
}
</script>