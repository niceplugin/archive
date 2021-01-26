<template>
  <div @scroll="scrolling"
      class="msg-window">
    <div v-for="(msg, idx) in message"
        v-bind:class="position(msg)"
        class="msg-wrap">
      <div v-bind:class="nameskip(idx)"
           class="msg-name">{{ msg.name }}</div>
      <div class="msg-box">
        <div class="msg-text">{{ msg.text }}</div>
        <div v-bind:class="timeskip(idx)"
             class="msg-time">{{ time(msg.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Collections from '/imports/common/collections'

export default {
  updated() {
    const el = this.$el;
    const px = el.scrollHeight;
    this.auto_scroll && el.scrollTo(0, px);
  },
  data(){
    return {
      id: Collections.Guest.findOne().id,
      auto_scroll: true,
      window_height: 0
    }
  },
  methods: {
    scrolling() {
      const A = this.$el.scrollHeight;
      const B = this.$el.scrollTop;
      const C = this.$el.offsetHeight;
      const D = Math.ceil(B + C);
      this.auto_scroll = A === D;
    },
    position(msg) {
      if (msg.notice) {return 'msg-notice'; }
      else if (msg.id === this.id) {return 'msg-right'; }
      return 'msg-left';
    },
    time(date) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return date.toLocaleTimeString('ko-KR', options);
    },
    nameskip(idx) {
      const msg = this.message;
      if (0 < idx && msg[idx - 1].id === msg[idx].id) {
        return 'msg-none'
      }
    },
    timeskip(idx) {
      const now = this.message[idx];
      const next = this.message[idx + 1];
      const options = { hour: '2-digit', minute: '2-digit' };

      if (!next || now.id !== next.id) {return; }

      const time1 = now.createdAt.toLocaleTimeString('ko-KR', options);
      const time2 = next.createdAt.toLocaleTimeString('ko-KR', options);

      return time1 === time2 ? 'msg-hidden' : '';
    }
  },
  meteor: {
    message() {
      return Collections.ChatText.find();
    }
  }
}
</script>

<style scoped>
.msg-window {
  height: calc(100vh - 14.5rem);
  overflow-y: scroll;
}
.msg-none {
  display: none;
}
.msg-hidden {
  visibility: hidden;
}
.msg-window {
  background-color: #aaaaaa;
}
.msg-wrap {
  margin: 0.5rem;
}
.msg-left .msg-box,
.msg-right .msg-box {
  display: flex;
}
.msg-notice .msg-box {
  width: 100%;
}
.msg-left {
  margin-right: 2rem;
}
.msg-right {
  margin-left: 2rem;
}
.msg-right .msg-box {
  flex-direction: row-reverse;
}
.msg-notice .msg-time,
.msg-notice .msg-name,
.msg-right .msg-name {
  display: none;
}
.msg-name {
  padding-top: 0.5rem;
  font-weight: bold;
}
.msg-time {
  align-self: flex-end;
  padding: 0 0.25rem;
  white-space: nowrap;
  font-size: 0.6rem;
}
.msg-text {
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  max-width: 320px;
  word-break: break-all;
}
.msg-notice .msg-text {
  margin: 1.5rem 0;
  max-width: inherit;
  flex-direction: column;
  line-height: 1.25rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 0;
  border: 1px solid #888888;
  border-left: none;
  border-right: none;
}
.msg-left .msg-text {
  border-top-left-radius: 0;
  background-color: #ffffff;
}
.msg-right .msg-text {
  border-top-right-radius: 0;
  background-color: #ffd700;
}
</style>