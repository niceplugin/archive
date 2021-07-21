<template>
  <v-container>

    <!--  드랍존  -->
    <home-drop-zone/>

    <!--  드랍존  -->
    <home-image-minified-list/>

    <!--  드랍존  -->
    <home-article/>

  </v-container>
</template>

<script>
import HomeDropZone from "../components/HomeDropZone"
import HomeImageMinifiedList from "../components/HomeImageMinifiedList"
import HomeArticle from "../components/HomeArticle"

export default {
  name: 'Home',

  components: {
    HomeDropZone,
    HomeImageMinifiedList,
    HomeArticle
  }
}
</script>
