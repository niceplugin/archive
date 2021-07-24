<template>
  <v-footer
    color="green"
    dark
  >
    <v-container>
      <v-row>
        <v-col class="text-center black--text">
          <span>Copyright {{ years }}.</span>
          <v-btn
            class="text-capitalize"
            href="mailto:receive_only@imageminify.com"
            text
          >imageMinify.com</v-btn>
          <span>all rights reserved</span>
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