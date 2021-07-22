<template>
  <v-card
    class="mx-auto"
    width="270"
    flat
  >
    <v-card-title>
      <v-select
        @change="$emit('changeOutputType', outputType)"
        v-model="outputType"
        label="Output option"
        color="green"
        item-color="green"
        :items="items"
        hide-details
        outlined
      ></v-select>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "HomeMinifierController",

  data: () => ({
    // 지원되는 출력 포멧
    items: [
      { text: 'images → jpeg', value: 'jpeg'},
      { text: 'images → webp', value: 'webp'}
    ],

    // 선택된 출력 포맷
    outputType: 'jpeg'
  })
}
</script>

<style scoped>

</style>