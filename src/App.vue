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

  created() {
    document.addEventListener( 'drop', eve => eve.preventDefault() )
    document.addEventListener( 'dragover', eve => eve.preventDefault() )
  },

  components: {
    AppBar,
    AppFooter
  },

  data: () => ({
    //
  }),
};
</script>
