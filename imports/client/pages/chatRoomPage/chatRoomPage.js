import { Template } from 'meteor/templating'
import { Messages } from '/imports/collections'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.chatRoomPage.onCreated(function() {
  const roomId = FlowRouter.getParam('_id')

  this.subscribe('chatMsg', roomId)
})

Template.chatRoomPage.onRendered(function() {
  const self = this
  this.autorun(function() {
    // todo - 코참
    //   매우 중요한 것을 놓쳤습니다!!!
    //   내가 이 방에서 마지막 메세지를 보았는지 기록하는 목적으로
    //   본인의 READ 컬렉션을 업데이트 해야 합니다.
    //   그래야 채팅방 리스트에서 메세지를 읽음 안읽음을 판다할 수 있습니다.
    //   만약 내가 이 방에 있지 않다면 나의 READ는 업데이트가 안 되어있을 것이고
    //   따라서 채팅방 리스트에서 읽지 않은 메세지가 있음을 표시할 수 있습니다.
    //   메서드 하나를 더 만들고 READ를 업데이트 할 수 있도록 합시다.
    Messages.find({}).count()
    const scroll = self.find('#scroll-box')
    setTimeout(function() {
      const msg_height = scroll.scrollHeight
      scroll.scrollTo(0, msg_height)
    }, 100)
  })
})

// todo - 코참
//   왜 필요할수도 있다고 생각했는지 내일 설명해주세요.
//   맞고 틀리고가 아닌 다른 시각의 의견을 듣고 싶어서 그렇습니다.
//todo:이거피료할수도있으니 남겨둠
// Template.chatMsg.onDestroyed(function(){
//   const self = this;
//   self.chatMsgSub.stop();
// })

Template.chatRoomPage.helpers({
  list() {
    return Messages.find({})
  },

  text_color(item) {
    const user = Meteor.user()

    if (item.userId !== user._id) {
      return 'text-bg-success'
    }
    else {
      return 'bg-warning'
    }
  },

  text_location(item) {
    const user = Meteor.user()

    if (item.userId !== user._id) {
      return 'align-items-start'
    }
    else {
      return 'align-items-end'
    }
  },

  getDate(date) {
    return date.toLocaleString()
  },
})

Template.chatRoomPage.events({
  'click .room_back': function() {
    FlowRouter.go('/roomList')
  },

  'click .room_out': function() {
    const roomId = FlowRouter.getParam('_id')
    Meteor.call('roomExit', roomId)
    FlowRouter.go('/roomList')
  },

  // todo - 코참
  //   인자 명을 e,t 또는 자신만 알아볼 수 있는 것으로 짓는 것은 좋자 않습니다.
  //   내일 당장 누가 와서 보더라도 명확한 이름으로 지어야 합니다.
  //   좋은 이름으로 다시 지어봅시다.
  //   시간 낭비라도 생각되면 원래의 목적인 event, instance로 하는 것도 나쁘지 않습니다.
  'click .chat_button': function(e, t) {
    chat_room(e, t)
  },

  'keyup textarea': function(e, t) {
    // todo - 코참
    //   which는 더이상 사용하면 안되는 속성입니다.
    //   다른 것으로 바꾸도록 합시다.
    //   참고링크: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/which
    if (e.which === 13) {
      chat_room(e, t)
    }
  },
})

function chat_room(e, t) {
  const user = Meteor.user()
  const username = user.profile.name
  const level = user.profile.level

  // todo - 코참
  //   이 페이지에서 textarea는 매우 중요한 역할을 하고 있습니다.
  //   따라서 ID 속성을 사용하는 것이 좋습니다.
  //   또한 엘리먼트를 찾을 때 태그명을 사용하는 것응 좋지 않습니다.
  //   참고: https://meteorjs.kr/styles/css.html#selectors
  //   ID 선택자로 바꿔봅시다.
  const text = t.find('textarea[name=text]').value
  const roomId = FlowRouter.getParam('_id')

  const data = {
    roomId: roomId,
    userId: user._id,
    username: username,
    // todo - 코참
    //   아바타 데이터도 넣도록 합시다.
    userAvatar: '',
    userLevel: level,
    // todo - 코참
    //   시간은 클라이언트에서 전달해주면 안됩니다.
    //   만약 홍길동이 컴퓨터 시간이르 2002년으로 설정했다면,
    //   이 메세지는 2002년에 쓴 메세지로 나올 것입니다.
    //   시간 데이터는 서버에서 넣어야 합니다.
    createdAt: new Date(),
    message: text,
  }

  // todo - 코참
  //   조건문이 너무 깁니다. 간략하게 줄여볼 수 있을까요?
  //   (중요한 것은 아니지만 조금 코드가 아쉬워서 그렇습니다.)
  if (text === '' || text === null || text === undefined) {
    return
  }
    // todo - 코참
  //   else 문법이 꼭 필요했을까요?
  else {
    Meteor.call('messageInsert', data)
  }
  t.find('textarea[name=text]').value = ''
}