import {Template} from 'meteor/templating'
import {Messages} from '/imports/collections'
import {FlowRouter} from 'meteor/ostrio:flow-router-extra'

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("_id")

  this.subscribe("chatMsg", roomId)

});

Template.chatRoomPage.onRendered(function () {
  this.autorun(function() {
    a.scroll(0,9104)
  })
});

// Template.chatMsg.onDestroyed(function(){
//   const self = this;
//   self.chatMsgSub.stop();
// })

Template.chatRoomPage.helpers({
  list() {
    return Messages.find({})
  },

  // division(item) {
  //   return item !== user._id
  // },

  getDate(date) {
    return date.toLocaleString();
  }
});

Template.chatRoomPage.events({
  "click .chat_button": function (e, t) {
    chat_room(e, t)
  },

  'keyup textarea': function (e, t) {
    if (e.which === 13) {
      chat_room(e, t)
    }
  }
})

function chat_room(e, t) {
  const user = Meteor.user();
  const username = user.profile.name
  const level = user.profile.level
  // console.log("user",user)
  // console.log("username",username)
  // console.log("userprofile",level)
  // console.log("date",new Date())

  const text = t.find("textarea[name=text]").value
  // console.log("Text",text)

  const data = {
    roomId: "3",
    userId: user._id,
    username: username,
    userAvatar: "",
    userLevel: level,
    createdAt: new Date(),
    message: text,
  }
  Meteor.call("messageInsert", data)

  t.find("textarea[name=text]").value = ""
}