import Vue from "vue"
import imageMinifier from 'image-minify-client'

Vue.mixin({
  computed: {
    BP() {
      return this.$vuetify.breakpoint
    }
  },
  methods: {
    imageMinifier
  }
})