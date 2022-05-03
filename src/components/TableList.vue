<template>
  <div v-if="showComponent" class="dot-border">
    <table>
      <thead>
      <tr>
        <th class="ti-1">Name</th>
        <th class="ti-2">Before</th>
        <th class="ti-3">State</th>
        <th class="ti-4">After</th>
        <th
          class="ti-5"
          :aria-label="mobile ? 'Download' : ''"
        >
          <span v-if="!mobile">Download</span>
        </th>
        <th class="ti-6">Saved</th>
      </tr>
      </thead>
      <tbody>
      <!--  리스트: 결과  -->
      <tr
        v-for="(data, i) in $store.state.resultList"
        :key="`resultList-${ i }`"
      >
        <td class="ti-1">{{ data.oldFile.name }}</td>
        <td>{{ byteToString(data.oldFile.size) }}</td>
        <td>
          <v-progress-linear
            class="rounded"
            height="24"
            value="100"
            :color="data.state === 'done' ? 'light-green' : 'deep-orange'"
          >
            <strong>{{ data.state === 'done' ? 'success' : 'fail' }}</strong>
          </v-progress-linear>
        </td>
        <td>{{ data.newFile ? byteToString(data.newFile.size) : '' }}</td>
        <td>
          <v-btn
            v-if="data.state === 'done'"
            @click="download(data.newFile)"
            small
            :text="!mobile"
            :icon="mobile"
          >
            <v-icon v-if="mobile">mdi-download</v-icon>
            <span v-else class="text-lowercase">download</span>
          </v-btn>
        </td>
        <td>{{ data.newFile ? howMuchSave(data) : '' }}</td>
      </tr>
      <!--  리스트: 재시작 버튼  -->
      <tr v-if="needContinue">
        <td
          class="text-center pa-4 transparent"
          colspan="9"
        >
          <v-btn
            @click="continueMinify"
            class="ma-auto"
            width="240"
            color="deep-orange"
            :disabled="$store.state.zipping"
            depressed
            :dark="!$store.state.zipping"
          >
            <v-icon class="mr-1">mdi-play-box-outline</v-icon>
            Continue
          </v-btn>
        </td>
      </tr>
      <!--  리스트: 대기  -->
      <tr
        v-for="(data, i) in $store.state.requestList"
        :key="`requestList-${ i }`"
      >
        <td class="ti-1">{{ data.oldFile.name }}</td>
        <td>{{ byteToString(data.oldFile.size) }}</td>
        <td>
          <v-progress-linear
            class="rounded"
            height="24"
            value="0"
            :color="data.state === 'wait' ? 'grey' : 'deep-orange'"
            :indeterminate="data.state === 'working'"
          >
            <strong>{{ data.state === 'wait' ? 'wait' : 'progressing' }}</strong>
          </v-progress-linear>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  name: 'TableList',

  computed: {
    showComponent() {
      const requestLength = this.$store.state.requestList.length
      const resultLength = this.$store.state.resultList.length

      return requestLength + resultLength
    },

    mobile() {
      return this.$vuetify.breakpoint.width < 720
    },

    needContinue() {
      const length = this.$store.state.requestList.length
      const notWork = !this.$store.state.minifyWorking

      return length && notWork
    },
  },

  methods: {
    download(file) {
      saveAs(file, file.name)
    },

    howMuchSave(data) {
      const oldSize = data.oldFile.size
      const newSize = data.newFile.size - oldSize
      const saved = newSize / oldSize * 100

      return `${ saved > 0 ? Math.floor(saved) : Math.ceil(saved) } %`
    },

    continueMinify() {
      this.$store.commit('workingState', true)
      this.minify()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.dot-border
  border: 1px dotted map-get($grey, 'base')
  border-radius: 6px
  overflow: hidden
table
  width: 100%
  font-size: 0.875rem
  text-align: center
  border-collapse: collapse
  tr
    height: 32px
    border: 6px solid #FFFFFF
  td:first-child
    text-align: left
    border-top-left-radius: 16px
    border-bottom-left-radius: 16px
  td:last-child
    border-top-right-radius: 16px
    border-bottom-right-radius: 16px
  td
    padding: 0 0.5rem
    white-space: nowrap
    background-color: map-get($grey, 'lighten-3')
  .ti-1
    position: relative
    max-width: 192px
    width: 192px
    text-overflow: ellipsis
    overflow: hidden
  .ti-2
    width: 64px
  .ti-3
    width: 50%
  .ti-4
    width: 64px
  .ti-5
    width: 112px
  .ti-6
    width: 48px
  @media (max-width: 719px)
    th:nth-child(2),
    th:nth-child(4),
    td:nth-child(2),
    td:nth-child(4)
      display: none
    .ti-1
      max-width: 96px
      width: 96px
    .ti-5
      width: 32px
</style>