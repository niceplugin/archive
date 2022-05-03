<template>
  <div class="content-wrap">
    <div v-if="!$store.state.resultList.length" class="text-center">
      <h1 class="text-h2 font-weight-bold my-4 mt-md-8 text-decoration-underline">
        Image Minify
      </h1>
      <p>Minify the filesize of your images so easy.</p>
    </div>

    <section>
      <div class="text-center text-sm-left">
        <div class="text-box">
          <h2 class="text-h3 font-weight-bold light-green--text mb-2">Smaller</h2>
          <p class="text-h5">
            Makes the images filesize smaller and lighter. You can custom the quality.
          </p>
        </div>
      </div>
      <div class="d-flex align-center justify-center justify-sm-end">
        <v-icon
          size="180"
          class="mt-n6 mt-sm-0"
          color="light-green"
          v-text="'mdi-image-size-select-large'"
        />
      </div>
    </section>

    <section>
      <div class="d-flex align-center justify-center justify-sm-start reverse-order">
        <v-icon
          size="180"
          class="mt-n6 mt-sm-0"
          color="light-green"
          v-text="'mdi-cloud-off-outline'"
        />
      </div>
      <div class="text-center text-sm-right">
        <div class="text-box">
          <h2 class="text-h3 font-weight-bold light-green--text mb-2">Secure</h2>
          <p class="text-h5">
            Image Minify does all the work locally. Not sent to server. So can use offline.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TextContents'
}
</script>

<style lang="sass" scoped>
.content-wrap
  max-width: 720px
  margin: auto
  padding: 0 1rem
section
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 16px
  margin-top: 48px
  @media (max-width: 599px)
    grid-template-columns: 1fr
    grid-template-rows: auto auto
    grid-gap: 0
    .reverse-order
      order: 1
  .text-box
    max-width: 300px
    display: inline-block
</style>