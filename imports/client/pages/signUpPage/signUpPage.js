import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

//함수로 따로 빼서 사진을 base64인코딩하는 작업을 실행합니다
function toBase64(file) {
  const picture = new Promise((res) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = () => res("");
  });
  return picture;
}

Template.signUpPage.events({
  "submit #btn-signUp": async function signIn(event) {
    event.preventDefault();
    const target = event.target;
    const file = target.picture.files[0];
    const name = target.name.value;
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;

    if (file) {
      const avatar = await toBase64(file);
      console.log(avatar);
      if (avatar) {
        const userInfo = {
          username,
          email,
          password,
          profile: { avatar, name, level: 1 },
        };
        Accounts.createUser(userInfo, function (error) {
          if (error) {
            alert(error);
          } else {
            alert("🚀회원가입 되셨습니다!");
            FlowRouter.go("/signin");
          }
        });
      } else {
        alert("프로필을 입력해주세요!");
      }
    } else {
      alert("파일을 골라주세요!");
    }

    // <form>에 novalidate라고 속성을 추가하여 부트스트랩에서 제공하는 폼API를 활용하여 유효성검사를 하였습니다!
    const forms = document.querySelectorAll(".needs-validation");

    await Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
});

Template.signUpPage.helpers({});

Template.signUpPage.onCreated(function () {});

Template.signUpPage.onRendered(function () {});

Template.signUpPage.onDestroyed(function () {});
