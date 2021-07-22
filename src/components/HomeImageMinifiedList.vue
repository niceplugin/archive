<template>
  <v-list>
    <v-list-item
      v-for="i in 5"
      class="py-0 justify-space-between c-after-none"
      :key="`test-${i}`"
    >

      <!--  파일명  -->
      <v-list-item-content class="text-truncate flex-grow-0 flex-shrink-1 c-content-file-name">
        undefined.png
      </v-list-item-content>

      <!--  프로그레시브  -->
      <v-list-item-content class=" flex-grow-1 flex-shrink-0 c-content-progress body-2">
        <v-row class="mx-0">
          <v-col class="d-flex align-center justify-end flex-grow-0 c-file-size">
            <span>00.0 MB</span>
          </v-col>
          <v-col class="flex-grow-1 flex-shrink-0 px-0">
            <v-progress-linear
              class="rounded-lg"
              height="24"
              color="light-green"
              indeterminate
            >
              <strong>text</strong>
            </v-progress-linear>
          </v-col>
          <v-col class="d-flex align-center justify-start flex-grow-0 c-file-size">
            00.0 MB
          </v-col>
        </v-row>
      </v-list-item-content>

      <!--  결과  -->
      <v-list-item-content class="py-0 pr-2  flex-grow-0 flex-shrink-1 flex-row justify-end c-content-result">
        <template v-if="true">
          <v-btn
            v-if="BP.smAndUp"
            @click.stop=""
            class="text-lowercase text-decoration-underline c-contents"
            small
            text
          >
            <span>download</span>
          </v-btn>
          <v-btn
            v-else
            @click.stop=""
            class="mr-2 c-contents"
            small
            icon
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
          <div class="mr-n2 text-right c-contents c-result-percent">
            -00%
          </div>
        </template>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "HomeImageMinifiedList",

  props: {
    inputFileList: {
      type: Array,
      default: () => ([]),
    },

    outputFileList: {
      type: Array,
      default: () => ([]),
    }
  },

  mounted() {
    console.log(this.inputFileList)
  },

  watch: {
    inputFileList(cur, old) {
      console.log(cur, old)
    }
  }
}
</script>

<style lang="sass" scoped>
.c-after-none::after
  display: none !important
.c-contents
  flex-basis: auto !important
  flex-grow: 0 !important
.c-content-file-name
  display: inline-block
  flex-basis: 144px
  @media (max-width: 599px)
    flex-basis: 72px
.c-content-result
  flex-basis: 144px
  @media (max-width: 599px)
    flex-basis: 72px
  .c-result-percent
    min-width: 36px
.c-content-progress
  max-width: 520px
  width: 100%
  .c-file-size
    white-space: nowrap
    min-width: 96px
    @media (max-width: 639px)
      display: none !important


</style>