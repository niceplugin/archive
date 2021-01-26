<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 pb-5">
      <div class="input-group mb-3">
        <input
            @keypress="sendEnter"
            v-model="ipt_msg"
            class="form-control"
            type="text"
            maxlength="100"
            placeholder="전송할 메세지 입력하기 ...">
        <button
            @click="send"
            class="btn btn-primary"
            v-bind:class="{disabled: !ipt_msg.replace(/^\s+|\s+$/g,'')}"
            type="button">전송</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ipt_msg: '',
      btn_disabled: true
    }
  },
  methods: {
    sendEnter(eve) {
      eve.keyCode === 13 && this.send();
    },
    send() {
      const msg = this.ipt_msg.replace(/^\s+|\s+$/g,'');
      if (msg) {
        Meteor.call('addMsg', msg, e=>e&&alert(e.message));
        this.ipt_msg = '';
      }
    },
  }
}
</script>