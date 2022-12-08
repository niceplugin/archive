import { Template } from "meteor/templating";
import "./roomListPage.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Read, Rooms } from "/imports/collections";

Template.roomListPage.events({
  // todo - 에밀리
  //   책에서 엘리먼트 선택을 아래와 같이 가르쳤습니다.
  //   하지만 여기에서 버튼 목적에 맞는 방식은 아닙니다.
  //   화면 내 유일한 버튼일 경우 ID를,
  //   그렇지 않을 경우 class를 사용하는 것이 좋습니다.
  //   (input의 경우 상관 없음)
  //   또한 태그이름은 아래와 같은 이유로 포함하지 않는 것이 좋습니다.
  //   예제: https://meteorjs.kr/styles/css.html#selectors
  //   버튼 셀렉터를 변경해봅시다.
  "click button[name=btn_search]": function (evt, tmpl) {
    //서치 기능은 채팅기능 다 구현되면..해볼 것
    const search_name = tmpl.find("input[name=username]").value;
    console.log(search_name);
    tmpl.find("input[name=username]").value = "";
  },

  "click button[name=btn_logout]": function () {
    // todo - 에밀리
    //  우리에게는 로그아웃 페이지가 있습니다.
    //  이곳에서 직접 로그아웃 하지 말고 로그아웃 페이지로 이동시켜주세요.
    // Meteor.logout();
    // alert("로그아웃 완료!");
    FlowRouter.go("/signout");
  },

  "click button[name=btn_new]": function () {
    Meteor.call("roomInsert", (err, room_id) => {
      // todo - 에밀리
      //   조금 아쉽습니다.
      //   코드를 좀 더 간결하게 써볼까요?
      //   예를들면 삼항 연산자를 이용해서?
      if (err) {
        alert(err);
      } else {
        FlowRouter.go("/chatRoom/" + room_id);
      }
    });
  },

  "click li": function () {
    const room_id = this._id;

    Meteor.call("joinerUpdate", room_id);

    FlowRouter.go("/chatRoom/" + room_id);
  },
});

Template.roomListPage.helpers({
  room_list() {
    return Rooms.find({}, { sort: { updatedAt: -1 } });
  },

  getDate(date) {
    return date.toLocaleString();
  },

  // 메세지 읽음 여부 반환
  // todo - undefined ....가 존재
  isRead(room_id) {
    // console.log(Read.find({}).fetch())
    const ms_read = Read.findOne({ roomId: room_id });
    console.log("hey", room_id, ms_read);
    // const ms_read = Read.findOne({sort:{lastAt:-1}})
    // console.log(111, ms_read)
    // if (!ms_read) return
    //
    if (ms_read.lastAt >= ms_read.updatedAt) {
      console.log("메세지 다 읽음");
      return true;
    } else {
      console.log("읽을 메세지 남음");
      return false;
    }
  },

  isJoin(joiner) {
    const my_id = Meteor.userId();

    return joiner.includes(my_id) ? "참여중" : "참여하기"; // 삼항연산자
  },
});

Template.roomListPage.onCreated(function () {
  // todo - 에밀리
  //   var를 사용하여 변수를 선언하지 마세요.
  //   변경해야 하지만, 굳이 여기서 this를 변수로 선언해 사용할 필요가 있었을까요?
  //   코드를 정리해봅시다.
  var self = this;
  self.roomListSub = self.subscribe("roomList");
  self.messageReadSub = self.subscribe("messageRead", Meteor.userId());
});

Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.onRendered(function () {});
