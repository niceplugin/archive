import { Template } from 'meteor/templating'
import './roomListPage.html'

Template.roomListPage.events({
  "click #btn_search": function (evt,tmpl) {
    const search_name = tmpl.find("input[name=username]").value;
    console.log(search_name)
    tmpl.find("input[name=username]").value="";
  },

  "click #btn_logout": function () {
    Meteor.logout();
    alert('로그아웃 완료!')
  }
  //
  // "keyup input": function (evt, tmpl) {
  //   if (evt.which === 13) {
  //
  //     console.log('되고있니')
  //     const search_name = tmpl.find("input[name=username_search]").value;
  //     console.log(search_name)
  //   }
  // },
});

Template.roomListPage.helpers({})

// todo - 미사용 상태라 파일 합치면서 주석 처리 했습니다. 확인 필요합니다.
// Template.roomListPage.onCreated(function() {
//   var self = this;
//   self.roomListSub = self.subscribe("roomList",{profession:up})
// })

Template.roomListPage.onDestroyed(function() {})

Template.roomListPage.onRendered(function() {})
