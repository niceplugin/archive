<template>
  <v-container class="py-4 py-sm-8">
    <upload-button/>
    <process-button/>
    <table-list/>
    <table-result/>
    <text-contents/>
    <drop-zone/>
  </v-container>
</template>

<script>
import uploadButton from '@/components/UploadButton'
import processButton from '@/components/ProcessButton'
import tableList from '@/components/TableList'
import tableResult from '@/components/TableResult'
import textContents from '@/components/TextContents'
import dropZone from '@/components/DropZone'
export default {
  name: 'Main',

  components: {
    uploadButton,
    processButton,
    tableList,
    tableResult,
    textContents,
    dropZone,
  },
}
</script>