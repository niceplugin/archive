<template>
  <v-card
    class="mx-auto"
    width="270"
    flat
  >
    <!--  그룹: 옵션  -->
    <v-card-title
      :class="`flex-column${showOptions ? ' c-outline' : ' pb-0'}`"
    >
      <v-form :disabled="isWorking">
        <!--  아웃풋 확장자 설정  -->
        <v-select
          @change="$emit('changeOptions', {
            outputType: options.outputType
          })"
          v-model="options.outputType"
          label="Output type"
          color="green"
          item-color="green"
          :items="items"
          hide-details
          outlined
        >
          <template slot="append-outer">
            <v-btn
              @click.stop="showOptions = !showOptions"
              class="mt-n2"
              icon
            >
              <v-icon v-if="showOptions">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-cog-outline</v-icon>
            </v-btn>
          </template>
        </v-select>

        <template v-if="showOptions">
          <!--  설정: Width  -->
          <v-text-field
            @change="$emit('changeOptions', {
              width: options.width
            })"
            v-model="options.width"
            ref="width"
            placeholder="Original image width"
            class="mt-8"
            label="Width"
            type="number"
            min="1"
            :readonly="!active.width"
            :color="active.width ? '' : 'grey'"
            outlined
          >
            <template slot="append-outer">
              <v-switch
                v-model="active.width"
                class="mt-n2 mr-n2"
                color="light-green"
              />
            </template>
          </v-text-field>

          <!--  설정: Height  -->
          <v-text-field
            @change="$emit('changeOptions', {
              height: options.height
            })"
            v-model="options.height"
            ref="height"
            placeholder="Original image height"
            label="Height"
            type="number"
            min="1"
            :readonly="!active.height"
            :color="active.height ? '' : 'grey'"
            outlined
          >
            <template slot="append-outer">
              <v-switch
                v-model="active.height"
                class="mt-n2 mr-n2"
                color="light-green"
              />
            </template>
          </v-text-field>

          <!--  설정: Quality  -->
          <v-text-field
            @change="$emit('changeOptions', {
              quality: options.quality
            })"
            v-model="options.quality"
            ref="quality"
            placeholder="Default: 0.8"
            label="Quality"
            type="number"
            min="0.1"
            max="1"
            step="0.1"
            :readonly="!active.quality"
            :color="active.quality ? '' : 'grey'"
            outlined
          >
            <template slot="append-outer">
              <v-switch
                v-model="active.quality"
                class="mt-n2 mr-n2"
                color="light-green"
              />
            </template>
          </v-text-field>

          <p class="body-2 mb-0 pl-5">
            <v-icon
              class="ml-n5"
              small
            >mdi-information-outline</v-icon>
            Image resizing keeps the original ratio.
          </p>

          <p class="body-2 mt-3 mb-0 pl-5">
            <v-icon
              class="ml-n5"
              small
            >mdi-information-outline</v-icon>
            If the original image is smaller than the input value, the size is maintained.
          </p>
        </template>
      </v-form>
    </v-card-title>

    <!--  그룹: 버튼  -->
    <v-card-text v-if="showButtonGroup">
      <!--  정지  -->
      <v-btn
        v-if="isWorking"
        @click="$emit('minifierStop')"
        class="mt-5 text-capitalize"
        elevation="0"
        color="red"
        :loading="stopping"
        x-large
        block
        dark
      >
        <template slot="default">
          <v-icon class="ml-n4 mr-2">mdi-stop-circle-outline</v-icon>
          STOP
        </template>
        <template slot="loader">
          <v-progress-circular
            class="ml-n4 mr-2"
            size="24"
            indeterminate
          />
          Stopping
        </template>
      </v-btn>

      <!--  전체 다운로드  -->
      <v-btn
        v-if="!isWorking && hasResult"
        @click="enabledAllDownload ? $emit('downloadAll') : $emit('downloadOne')"
        class="mt-5 text-capitalize"
        elevation="0"
        color="light-blue"
        :loading="allDownloading"
        x-large
        block
        dark
      >
        <template slot="default">
          <v-icon class="ml-n4 mr-2">mdi-cloud-download-outline</v-icon>
          {{ downloadText }}
        </template>
        <template slot="loader">
          <v-progress-circular
            class="ml-n4 mr-2"
            size="24"
            indeterminate
          />
          {{ downloadText }}
        </template>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HomeMinifierController",

  props: {
    isWorking: {
      type: Boolean,
      default: false
    },
    stopping: {
      type: Boolean,
      default: false
    },
    enabledAllDownload: {
      type: Boolean,
      default: false
    },
    allDownloading: {
      type: Boolean,
      default: false
    },
    hasResult: {
      type: Boolean,
      default: false
    },
    showButtonGroup: {
      type: Boolean,
      default: false
    },
    _options: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    // 상세 옵션 표시
    showOptions: true,

    // 사용중인 상세 옵션
    active: {
      width: false,
      height: false,
      quality: false
    },

    // 지원되는 출력 포멧
    items: [
      { text: 'images → jpeg', value: 'jpeg'},
      { text: 'images → webp', value: 'webp'}
    ],

    options: {
      // 선택된 출력 포맷
      outputType: 'jpeg',
      // 선택된 출력 width
      width: undefined,
      // 선택된 출력 height
      height: undefined,
      // 선택된 출력 quality
      quality: undefined
    }
  }),

  watch: {
    _options(cur) {
      this.options = { ...cur }
    },

    'active.width'(cur) {
      !cur && this.$emit('changeOptions', { width: undefined })
      this.$refs.width.focus()
    },

    'active.height'(cur) {
      !cur && this.$emit('changeOptions', { height: undefined })
      this.$refs.height.focus()
    },

    'active.quality'(cur) {
      !cur && this.$emit('changeOptions', { quality: undefined })
      this.$refs.quality.focus()
    }
  },

  computed: {
    downloadText() {
      return this.enabledAllDownload ? 'Download All' : 'Download One'
    }
  }
}
</script>

<style lang="sass" scoped>
p
  word-break: break-word
.c-outline
  outline-width: thin
  outline-style: dotted
  margin-bottom: 1px
</style>