import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.methods({
  messageInsert(messages) {
    // todo - 코참
    //   이곳에서 시간 관련된 데이터를 넣어야 합니다.
    //   사실 유저 정보도 이곳에서 넣어야 합니다.
    //   (클라이언트에서 조작해서 정보를 보낼수 있으니)
    //   이후
    //   Messages.insert(messages)
    //   를 실행하는 것이 좋습니다.

    // todo - 코참
    //   메세지 생성하면 끝나는 것이 아닙니다!!
    //   메세지가 새로 생성되어 들어갔으니 Rooms 컬렉션이 업데이트 되었습니다.
    //   따라서 Rooms 정보도 업데이트 해야 합니다.
    return Messages.insert(messages)
  },

})