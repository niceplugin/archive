<template>
  <v-row>
    <v-col
      class="text-center align-self-center pt-8 pt-sm-12 pt-md-16"
      cols="12"
    >
      <h1 class="h1class mx-n3 px-3 d-inline deep-orange--text text-h3 text-sm-h2 text-md-h1 font-weight-black">
        URL-Zip
      </h1>
      <p class="mt-10 mt-md-14 mb-0 text-h6">URL을 더 간결하게</p>
    </v-col>

    <v-col
      class="col-12 col-sm-10 col-md-8 col-lg-6 align-self-center"
      style="min-height: 10vh"
      offset="0"
      offset-sm="1"
      offset-md="2"
      offset-lg="3"
    >
      <v-text-field
        class="align-baseline mb-n8"
        outlined
        v-model="url"
        :disabled="compressing"
        :loading="compressing"
        @click:append="compress"
        @keypress.13="compress"
        loader-height="12"
        color="deep-orange"
        background-color="white"
        append-icon="mdi-arrow-collapse-horizontal"
        placeholder="압축 할 주소를 입력하세요"
      >
      </v-text-field>
    </v-col>

    <v-col
      class="col-12 col-sm-10 col-md-8 col-lg-6"
      style="min-height: 40vh;"
      offset="0"
      offset-sm="1"
      offset-md="2"
      offset-lg="3"
    >
      <v-list
        v-if="result.length"
        class="pa-0"
      >
        <v-list-item
          class="animate__animated"
          v-for="(doc, i) in result"
          :key="i"
          :ref="'list' + i"
        >
          <v-list-item-content>
            <v-list-item-title>
              https://u-z.me/{{ doc.zip }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ doc.url }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  small
                  text
                  v-on="on"
                  v-bind="attrs"
                  color="deep-orange"
                  @focus="resetTooltipText"
                  @blur="resetTooltipText"
                  @mouseover="resetTooltipText"
                  @mouseout="resetTooltipText"
                  @click="doCopy(doc.zip)"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>{{ tooltip }}</span>
            </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-col>

    <!-- 스넥바 -->
    <v-snackbar
      v-model="alert"
      timeout="2000"
    >
      압축 할 수 없습니다.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="deep-orange"
          text
          v-bind="attrs"
          @click="alert = false"
        >
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    url: '',
    compressing: false,
    result: [],
    tooltip: 'URL 복사하기',
    alert: false
  }),

  methods: {
    doCopy(url) {
      const it = this
      navigator.clipboard.writeText( 'https://u-z.me/' + url )
        .then( () => it.tooltip = '복사됨' )
    },
    resetTooltipText() {
      this.tooltip = 'URL 복사하기'
    },
    compress() {
      if (this.compressing || !this.url) { return }
      const it = this
      it.compressing = true

      Meteor.call('compressUrl', this.url, (err, result) => {
        it.compressing = false

        if (err) { return it.alert = true }

        // 중복되는 인덱스를 찾는다
        const overlap = it.result.findIndex( doc => doc.url === result.url )
        it.url = ''

        // 중복되지 않는다면 리스트에 추가
        if (overlap === -1) { it.result.push(result) }
        else {
          const el = it.$refs['list'+overlap][0].$el
          el.classList.add('animate__shakeX')
          el.onanimationend = () => el.classList.remove('animate__shakeX')
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.h1class
  border: 12px solid #fff
.row
  min-height: calc(100vh - 36px)
</style>