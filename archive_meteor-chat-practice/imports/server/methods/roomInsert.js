import { Meteor } from 'meteor/meteor'
import { Read, Rooms } from '/imports/collections'

Meteor.methods({
  roomInsert() {
    const time = new Date
    const roomsData = {
      lastUserId: '',
      lastUserName: 'new chat room',
      lastUserAvatar: "https://i.ibb.co/BcY2LyR/profile-img.png",
      lastMessage: '새로운 채팅방이 생성되었습니다!',
      updatedAt: time,
      joiner: [this.userId],
    }
    const room_id = Rooms.insert(roomsData)

    // todo - 설명: 불필요 변수선언 삭제
    Read.insert({
      userId: this.userId,
      roomId: room_id,
      lastAt: time,
      updatedAt: time,
    })
    // todo - 설명: 불필요 코드 삭제

    return room_id
  },

})