<template>
  <v-card
    class="mx-auto"
    width="270"
    flat
  >
    <v-card-title>

      <!--  아웃풋 확장자 설정  -->
      <v-select
        @change="$emit('changeOutputType', outputType)"
        v-model="outputType"
        label="Output option"
        color="green"
        item-color="green"
        :items="items"
        :disabled="isWorking"
        hide-details
        outlined
      />

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
        v-if="hasResult"
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
    </v-card-title>
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
  },

  data: () => ({
    // 지원되는 출력 포멧
    items: [
      { text: 'images → jpeg', value: 'jpeg'},
      { text: 'images → webp', value: 'webp'}
    ],

    // 선택된 출력 포맷
    outputType: 'jpeg'
  }),

  computed: {
    downloadText() {
      return this.enabledAllDownload ? 'Download All' : 'Download One'
    }
  }
}
</script>

<style scoped>

</style>