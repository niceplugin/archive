<template>
  <v-btn
    v-show="show"
    @click="installPWA"
    class="text-capitalize mb-8 px-6"
    color="light-blue"
    dark
  >Install App</v-btn>
</template>

<script>
export default {
  name: 'InstallApp',

  created() {
    const it = this
    window.onbeforeinstallprompt = event => {
      event.preventDefault()
      it.show = true
      it.deferredPrompt = event
    }
  },

  data: () => ({
    show: false,
    deferredPrompt: null,
  }),

  methods: {
    async installPWA() {
      if (!this.deferredPrompt) { return }

      this.deferredPrompt.prompt()

      const { outcome } = await this.deferredPrompt.userChoice
      const dismissed = outcome === 'dismissed'

      // https://web.dev/learn/pwa/installation-prompt/
      // 이곳에서 deferredPrompt 는 한번만 사용 가능하다고 말하지만
      // 사용자가 거부할 경우 수락 할 때까지 사용 가능함.
      // 따라서 위 링크 예시 코드와 약간 다름
      this.deferredPrompt = dismissed ? this.deferredPrompt : null
      // 앱 설치 수락 안함
      this.show = dismissed
    }
  }
}
</script>

<style scoped>

</style>