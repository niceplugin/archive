import { Messages, Rooms, Read } from '/imports/collections'
import { Meteor } from 'meteor/meteor'

const UID = []
const MSG = ['동해물과백두산이', '마르고닳도록', '하느님이보우하사', '우리나라만세', '남산위에저소나무', '철갑을두른듯', '바람서리불변함은', '우리기상일세', '무궁화삼천리화려강산', '대한사람대한으로길이보전하세', '가을하늘공활한데', '높고구름없이', '밝은달은우리가슴', '일편단심일세', '이기상과이맘으로', '충성을다하여', '괴로우나즐거우나', '나라사랑하세']

if (Meteor.isDevelopment && !Rooms.find({}).count()) {
  createData()
}
// removeDate()
function removeDate() {
  console.log('모든 데이터 삭제를 시작합니다.')
  Messages.remove({})
  Rooms.remove({})
  Read.remove({})
  console.log('모든 데이터 삭제 완료.')
}

function createData() {
  getUID()
  createRooms(20)
  createMsg(2000)
  updateRooms()
  updateReads()
}

function randArrData(_arr) {
  const arr = _arr.slice()
  const rIdx = [Math.floor(Math.random() * arr.length)]

  return arr[rIdx]
}

function getUID() {
  const users = Meteor.users.find({}, { fields: { _id: true } })

  users.forEach(data => UID.push(data._id))
}

function createRooms(num) {
  if (isNaN(num) || num <= 0) { return }

  console.log(`방 ${ num }개 생성을 시작합니다.`)

  while (num--) {
    !(num % 10) && console.log(num)
    const uidIdx = Math.floor(Math.random() * 4)

    // 방에 입장할 랜덤 조이너 추출
    let i2 = Math.floor(Math.random() * 4)
    const joinerArr = [] // 랜덤 유저 배열
    let uidArr = UID.slice()

    uidArr.splice(uidIdx, 1)

    while (i2--) {
      const joinUserIdx = Math.floor(Math.random() * uidArr.length)
      const joinerUid = uidArr.splice(joinUserIdx, 1)[0]
      joinerUid && joinerArr.push(joinerUid)
    }

    // 방 생성
    const time = new Date(Date.now() + num * 1000)
    const roomsData ={
      lastUserId: UID[uidIdx],
      lastUserName: "new chat room",
      lastMessage: "새로운 채팅방이 생성되었습니다!",
      updatedAt:time,
      joiner: [UID[uidIdx], ...joinerArr],
    }
    const room_id = Rooms.insert(roomsData)

    // 채팅방 조이너들 리드 데이터 생성
    roomsData.joiner.forEach(_uid => {
      const docs = {
        userId: _uid,
        roomId: room_id,
        lastAt: time,
        updatedAt: time,
      }
      Read.insert(docs)
    })
  }

  console.log('방 생성 완료.')
}

function createMsg(num) {
  if (isNaN(num) || num <= 0) { return }

  console.log(`메세지 ${ num }개 생성을 시작합니다.`)

  const option = { fields: { _id: true } }
  const roomUidArr = Rooms
    .find({}, option)
    .fetch()
    .map(data => data._id)

  while(num--) {
    !(num % 10) && console.log(num)
    const userId = randArrData(UID)
    const user = Meteor.users.findOne({ _id: userId })
    const messages = {
      roomId: randArrData(roomUidArr),
      userId,
      userName: user.username,
      userAvatar: user.userAvatar,
      userLevel: user.userLevel,
      createdAt: new Date(Date.now() + num * 1000),
      message: randArrData(MSG)
    }

    Messages.insert(messages)
  }

  console.log('메세지 생성 완료.')
}

function updateRooms() {
  console.log('룸 업데이트를 시작합니다.')

  const option = { fields: { _id: true } }
  const roomUidArr = Rooms
    .find({}, option)
    .fetch()
    .map(data => data._id)

  // 해당 룸 마지막 메세지 찾기
  roomUidArr.forEach(roomId => {
    const query1 = { roomId }
    const option = { sort: { createdAt: -1 } }
    const msg = Messages.findOne(query1, option)

    // 해당 룸 업데이트
    const query2 = { _id: roomId }
    const docs = {
      lastUserId: msg.userId,
      lastUserName: msg.userName,
      lastUserAvatar: msg.lastUserAvatar,
      lastMessage: msg.message,
      updatedAt: msg.createdAt,
    }
    Rooms.update(query2, { $set: docs })
  })

  console.log('룸 업데이트 완료.')
}

function updateReads() {
  console.log('리드 업데이트를 시작합니다.')

  const readArr = Read.find({}).fetch()

  readArr.forEach((data, i) => {
    const query = { _id: data.roomId }
    const room = Rooms.findOne(query)
    const docs1 = { updatedAt: room.updatedAt }

    Read.update({ _id: data._id }, { $set: docs1 })

    if (i % 2) { return }

    const docs2 = { lastAt: room.updatedAt }

    Read.update({ _id: data._id }, { $set: docs2 })
  })

  console.log('리드 업데이트 완료.')
}
