<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6">
      <ChatMsg/>
    </div>
  </div>
</template>

<script>
import ChatMsg from '/imports/client/ui/chat_msg_window'
export default {
  components: {
    ChatMsg
  }
}
</script>