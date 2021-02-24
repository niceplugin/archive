<template>
  <div v-if="$subReady.guest && $subReady.chat">
    <ChatHeader/>
    <ChatBody/>
    <ChatFooter/>
  </div>
  <ChatLoading v-else/>
</template>

<script>
import ChatHeader from '/imports/client/components/dump/chat_header.vue'
import ChatBody from '/imports/client/components/dump/chat_body.vue'
import ChatFooter from '/imports/client/components/dump/chat_footer.vue'
import ChatLoading from '/imports/client/components/dump/chat_loading.vue'

export default {
  components: {
    ChatHeader,
    ChatBody,
    ChatFooter,
    ChatLoading
  },
  meteor: {
    $subscribe: {
      chat: [],
      guest: []
    }
  }
}
</script>