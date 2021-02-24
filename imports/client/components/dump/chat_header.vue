<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6">
      <div class="input-group">
        <span class="input-group-text">닉네임:</span>
        <input
            v-model="myname"
            v-bind:disabled="disabled"
            @keypress="enter"
            type="text"
            maxlength="16"
            class="form-control text-end">
        <button
            v-if="disabled && !wait"
            @click="edit"
            class="btn btn-secondary"
            type="button">변경</button>
        <button
            v-else-if="!disabled && !wait"
            @click="change"
            v-bind:disabled="!myname.replace(/\s/g,'')"
            class="btn btn-primary"
            type="button">확인</button>
        <button
            v-else
            class="btn btn-primary"
            type="button" disabled>
          <span class="spinner-border spinner-border-sm mx-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Collections from '/imports/common/collections'

export default {
  updated() {
    const input = this.$el.querySelector('input');
    if (this.need_select) {
      this.need_select = false;
      input.focus();
      input.select();
    }
  },
  data() {
    return {
      wait: false,
      disabled: true,
      need_select: false,
      old_name: ''
    }
  },
  methods: {
    edit() {
      this.old_name = this.myname;
      this.disabled = false;
      this.need_select = true;
    },
    enter(eve) {
      eve.keyCode === 13 &&
      this.myname.replace(/\s/g,'') &&
      this.change();
    },
    change() {
      const that = this;
      const { id } = Collections.Guest.findOne() || {};
      const new_name = this.myname.replace(/\s/g,'');

      this.wait = true;
      this.disabled = true;
      getSelection().removeAllRanges();

      Meteor.call('changeGuestName',
          id, new_name, this.old_name,
          (err, rslt)=>{
        that.wait = false;
        if (err) {
          that.myname = that.old_name;
          alert(err.message);
        }
      });
    }
  },
  meteor: {
    myname() {
      const { name } = Collections.Guest.findOne() || {};
      return name;
    }
  }
}
</script>