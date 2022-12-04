<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <app-footer/>
  </v-app>
</template>

<script>
import '@/sass/overrides.sass'
import appFooter from '@/components/AppFooter'

export default {
  name: 'App',

  components: {
    appFooter
  },

  created() {
    document.addEventListener('drop', e => e.preventDefault())
    document.addEventListener('dragover', e => e.preventDefault())
    document.addEventListener('dragenter', this.onDragenter)

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.analytics('pwa_view')
    }
  },

  methods: {
    onDragenter(event) {
      event.preventDefault()

      const items = event.dataTransfer.items
      const empty = items.length === 0
      const notFile = items[0]?.kind !== 'file'

      if (empty || notFile) {
        return this.$store.commit('dragState', false)
      }

      this.$store.commit('dragState', true)
    },
  }
}
</script>
