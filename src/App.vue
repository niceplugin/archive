<template>
  <v-app>
    <!--  앱 바  -->
    <app-bar/>

    <v-main>
      <router-view/>
    </v-main>

    <!--  앱 바  -->
    <app-footer/>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar"
import AppFooter from "./components/AppFooter"

export default {
  name: 'App',

  components: {
    AppBar,
    AppFooter
  },

  data: () => ({
    //
  }),
};
</script>
