<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 py-3">
      <div class="input-group mt-3">
        <input @keypress="enter"
               @focus="focus"
               v-model="url"
               v-bind:disabled="zipping"
               type="text" class="form-control" placeholder="압축할 URL을 입력하세요 ...">
        <button @click="to_zip"
                v-bind:disabled="zipping || !url"
                class="btn btn-outline-primary" type="button">
          압축<span v-if="!zipping">하기</span>
          <span v-else class="spinner-border spinner-border-sm mx-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </span>
        </button>
      </div>
      <div class="input-group my-5">
        <p id="zip_url_text" class="form-control m-0">{{ zip_url }}</p>
        <button @click="copy"
                @blur="copy_text"
                @mouseout="copy_text"
                v-bind:disabled="!zip_url"
                class="btn btn-secondary"
                type="button">{{ copy_btn_text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      zip_url: '',
      copy_btn_text: '복사',
      zipping: false
    };
  },
  methods: {
    enter(eve) {
      this.url && eve.keyCode === 13 && this.to_zip();
    },
    focus(eve) {
      eve.target.select();
    },
    copy() {
      const selection = window.getSelection();
      const range = document.createRange();
      const node = document.getElementById('zip_url_text');

      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');
      this.copy_btn_text = '복사됨!!'
    },
    copy_text() {
      this.copy_btn_text = '복사';
    },
    to_zip() {
      const regex = new RegExp("^(?:(?:https?|ftp):\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!10(?:\\.\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-z\u00a1-\uffff]{2,})))(?::\\d{2,5})?(?:\\/[^\\s]*)?$", 'i');

      if (!this.url.match(regex)) {
        return alert('올바른 URL 형식이 아닙니다.');
      }

      const that = this;
      this.zipping = true;
      this.zip_url = '';

      Meteor.call('zipUrl', this.url, function(err, rslt) {
        that.zipping = false;
        that.zip_url = !err ? `${origin}/${rslt}` : '';
        err && alert(err.message);
      });
    }
  }
}
</script>