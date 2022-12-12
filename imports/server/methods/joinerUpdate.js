import { Read, Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(room_id) {
    let selector = { _id: room_id }
    let docs = {
      $addToSet: {
        joiner:this.userId
      }
    }
    Rooms.update(selector, docs)

    // todo - 설명:
    //  아래 로직은 readLastAtUpdate.js 코드를 이곳으로 병합한 것임
    //  (굳이 메서드 2번 부를 필요가 없어서...)

    // todo - 설명:
    //  룸 정보를 조회한 이유는 room_data.updatedAt 를 얻기 위함.
    //  기존에는 클라이언트에서 시간을 가지고 왔는데,
    //  그러면 절대로 시간 동기화 안됨 (시간 관리는 서버에서만)
    selector = { _id: room_id }
    const room_data = Rooms.findOne(selector)

    selector = {
      userId: this.userId,
      roomId: room_id,
    }
    docs = {
      userId: this.userId,
      roomId: room_id,
      lastAt: room_data.updatedAt,
      updatedAt: room_data.updatedAt,
    }
    Read.upsert(selector, docs)
  }
})