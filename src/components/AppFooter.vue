<template>
  <v-footer
    color="green"
    dark
  >
    <v-container>
      <v-row>
        <v-col class="px-0 text-center black--text">
          <span>Copyright {{ years }}.</span>
          <br v-if="BP.xsOnly">
          <v-btn
            class="text-capitalize px-2"
            href="mailto:receive_only@imageminify.com"
            text
          >imageMinify.com</v-btn>
          <span>all rights reserved.</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",

  computed: {
    years() {
      return new Date().getUTCFullYear()
    }
  }
}
</script>