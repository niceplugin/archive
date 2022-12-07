import { Template } from 'meteor/templating'
import { Modal } from 'bootstrap'

Template.alert.events({
  'click .btn-alert'() {
    // todo - 에이든
    //  var 변수 선언 금지합니다. 변경해주세요
    var myModal = new Modal(document.getElementById('Mymodal'), {
      keyboard: false,
    })
    myModal.show()
  },
})

var moduleTest3;

(function(window) {
  var module1 = {
    name: function() {
      alert('module1 in moduleTest3!!')
    },
  }

  moduleTest3 = module1
})(window)

var moduleTest4 = (function(window) {
  var module1 = {
    name: function() {
      alert('module1 in moduleTest4!!')
    },
  }

  return module1
})(window)

// todo - 에이든
//   다른 인원이 `import ALERT from '/import/client/ui/alert'` 해서
//   ALERT('바디 내용')
//   을 하면 알림 창이 뜨도록 만들어 봅시다.

// moduleTest3.name(); //module1 in moduleTest3!!
//
// moduleTest4.name(); //module1 in moduleTest4!!
