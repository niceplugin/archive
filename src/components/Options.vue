<template>
  <div id="options-wrap">
    <v-menu
      v-model="menu"
      attach="#options-wrap"
      :close-on-content-click="false"
      offset-x
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          color="light-green"
          dark
          fab
        >
          <v-icon large>{{ menu ? 'mdi-close' : 'mdi-cog' }}</v-icon>
        </v-btn>
      </template>

      <v-card max-width="300">
        <v-card-title class="py-2">
          Options
        </v-card-title>

        <v-divider/>

        <v-card-text>
          <!--  파일 타입  -->
          <v-select
            v-model="options.outputType"
            :items="['jpeg', 'webp']"
            item-color="light-green"
            color="light-green"
            class="my-2"
            label="File type"
            hide-details
            outlined
            dense
          />
          <!--  퀄리티  -->
          <v-slider
            v-model="options.quality"
            class="my-2"
            color="light-green"
            track-color="grey lighten-3"
            label="Quality"
            :step="1"
            :max="100"
            :min="1"
            thumb-label
            hide-details
            dense
          />
          <!--  max-width  -->
          <v-text-field
            v-model="options.maxWidth"
            label="Max width"
            type="number"
            color="light-green"
            step="1"
            max="16383"
            min="1"
            :disabled="!options.enableMaxWidth"
            hide-details
            outlined
            dense
          >
            <template v-slot:append-outer>
              <v-switch
                v-model="options.enableMaxWidth"
                color="light-green"
                class="ma-0 mr-n4 pa-0 force-enable"
                hide-details
                dense
                inset
              />
            </template>
          </v-text-field>
          <!--  max-height  -->
          <v-text-field
            v-model="options.maxHeight"
            label="Max height"
            type="number"
            class="my-4"
            color="light-green"
            step="1"
            max="16383"
            min="1"
            :disabled="!options.enableMaxHeight"
            hide-details
            outlined
            dense
          >
            <template v-slot:append-outer>
              <v-switch
                v-model="options.enableMaxHeight"
                color="light-green"
                class="ma-0 mr-n4 pa-0 force-enable"
                hide-details
                dense
                inset
              />
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4 flex-column align-stretch">
          <div class="d-flex">
            <v-btn
              @click="onClickReset"
              class="text-capitalize flex-grow-1"
              :disabled="disabledResetBtn"
              depressed
            >reset</v-btn>
            <v-btn
              @click="onClickApply"
              class="text-capitalize ml-4 flex-grow-1"
              color="light-green"
              :disabled="disabledApplyBtn"
              :dark="!disabledApplyBtn"
              depressed
            >Apply</v-btn>
          </div>
          <v-btn
            v-if="$store.state.resultList.length"
            @click="onClickApplyWithResult"
            class="text-capitalize mt-4"
            color="light-green"
            :disabled="disabledApplyBtn"
            :dark="!disabledApplyBtn"
            block
          >Apply with result</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'Options',

  computed: {
    disabledResetBtn() {
      const ref = this.options

      return ref.quality === 75 &&
        ref.outputType === 'jpeg' &&
        !ref.enableMaxWidth &&
        !ref.enableMaxHeight
    },
    disabledApplyBtn() {
      const options = this.$store.state.options
      const ref = this.options

      return options.quality === Number((ref.quality / 100).toFixed(2)) &&
        options.maxWidth === Number(ref.maxWidth) &&
        options.maxHeight === Number(ref.maxHeight) &&
        options.outputType === ref.outputType
    },
  },

  watch: {
    quality(cur) {
      this.$store.state.options.quality = Number((cur / 100).toFixed(2))
    },
    'options.enableMaxWidth'(cur) {
      if (cur) { return }
      this.options.maxWidth = ''
    },
    'options.enableMaxHeight'(cur) {
      if (cur) { return }
      this.options.maxHeight = ''
    },
  },

  data: () => ({
    menu: false,

    options: {
      quality: 75,
      maxWidth: '',
      enableMaxWidth: false,
      maxHeight: '',
      enableMaxHeight: false,
      outputType: 'jpeg'
    },
  }),

  methods: {
    onClickReset() {
      this.options.quality = 75
      this.options.maxWidth = ''
      this.options.enableMaxWidth = false
      this.options.maxHeight = ''
      this.options.enableMaxHeight = false
      this.options.outputType = 'jpeg'
    },

    onClickApply() {
      const options = this.$store.state.options
      const ref = this.options

      options.quality = Number((ref.quality / 100).toFixed(2))
      options.maxWidth = Number(ref.maxWidth)
      options.maxHeight = Number(ref.maxHeight)
      options.outputType = ref.outputType
    },

    onClickApplyWithResult() {
      this.onClickApply()
      const result = this.$store.state.resultList
      const request = this.$store.state.requestList
      const ref = []

      while(result.length) {
        const data = result.shift()
        data.state = 'wait'
        data.newFile = null
        ref.push(data)
      }

      request.unshift(...ref)
    },
  }
}
</script>

<style lang="sass" scoped>
#options-wrap
  position: sticky
  height: 0
  right: 0
  top: 1rem
  overflow: visible
  text-align: right
  z-index: 1
  .force-enable
    pointer-events: initial !important
</style>