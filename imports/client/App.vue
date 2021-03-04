<template>
  <v-app>
    <v-main>
      <v-img
          lazy-src="https://picsum.photos/id/29/192/108"
          src="https://picsum.photos/id/29/1920/1080"
          gradient="rgba(255,255,255,.25), rgba(255,255,255,.5)"
          min-width="100%"
          min-height="100%"
      >
        <v-container fluid>
          <router-view/>
        </v-container>

        <v-footer
          v-if="$route.name === 'Home'"
          class="font-weight-medium"
          color="transparent"
        >
          © {{ new Date().getFullYear() }}.
          <a class="deep-orange--text" href="mailto:niceplugin@gmail.com">niceplugin</a>
          &nbsp;all rights reserved.
        </v-footer>
      </v-img>
    </v-main>
  </v-app>
</template>