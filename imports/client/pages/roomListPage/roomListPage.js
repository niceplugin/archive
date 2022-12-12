import { Template } from "meteor/templating";
import "./roomListPage.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Read, Rooms } from "/imports/collections";
// todo - 설명: 미사용 모듈 삭제

Template.roomListPage.events({
  'click button[name=btn_search]': function(evt, tmpl) {  //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find('input[name=username]').value
    Session.set("searchName", search_name);
    // todo - 설명: 주석 삭제
  },

  "click button[name=btn_logout]": function () {
    FlowRouter.go("/signout");
  },

  "click button[name=btn_new]": function () {
    Meteor.call("roomInsert", (err, room_id) => {
      // todo - 설명: 주석 풀었음
      err ? alert(err) : FlowRouter.go("/chatRoom/" + room_id);
    });
  },

  "click li": function () {
    const room_id = this._id;

    // todo - 설명
    //  명확하게 하기 위해서 call 끝나는 시점의 콜백에서 기존 로직 실행되도록 변경.
    //  번잡해서 에이든 ALERT 삭제
    //  joinerUpdate와 readLastAtUpdate 두 개의 메서드를 joinerUpdate 하나로 병합함.
    Meteor.call('joinerUpdate', room_id, err => {
      err ? alert(err) : FlowRouter.go("/chatRoom/" + room_id);
    })
  }
});

Template.roomListPage.helpers({
  room_list() {
    return Rooms.find({}, { sort: { updatedAt: -1 } });
  },

  getDate(date) {
    return date.toLocaleString();
  },

  isJoinRead(join_bool) {
    // todo - 설명: 변경 없음. 코드 단순화.
    return join_bool === "참여중";
  },

  isRead(roomId) {
    const selector1 = {
      // todo - 설명: 자신의 아이디가 들어가야 본인의 read를 찾을 수 있음
      userId: Meteor.userId(),
      roomId,
    }
    const selector2 = {
      _id: roomId
    }
    const read_data = Read.findOne(selector1);
    const rooms_data = Rooms.findOne(selector2);

    // todo - 설명
    //  A가 B 보다 클때 읽지 않음(O).
    //  A가 B 보다 크거나 같을때, 여기서 같으면 읽음이 되어야 함. 따라서 <= 잘못됨(X)
    return (read_data?.lastAt) < (rooms_data.updatedAt);
  },

  isJoin(joiner) {
    const my_id = Meteor.userId();

    return joiner.includes(my_id) ? "참여중" : "참여하기"; // 삼항연산자
  }

})

Template.roomListPage.onCreated(function() {
  this.subscribe('roomList')
  this.subscribe('messageRead', Meteor.userId())

})

Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.onRendered(function () {});
