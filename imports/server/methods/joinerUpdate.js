import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(room_id) {
    // todo - 에밀리
    //   코드를 보기좋게 정리해 봅시다.
    return Rooms.update({_id:room_id}, {$addToSet: {joiner:this.userId}})
  }
})