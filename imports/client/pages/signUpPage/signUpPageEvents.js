import { Template } from 'meteor/templating'
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

//<form>에 novalidate라고 속성을 추가하여 부트스트랩에서 제공하는 폼API를 활용하여 유효성검사를 하였습니다!


Template.signUpPage.events({
  "submit #btn-signUp": function signIn(event){
    event.preventDefault()
    const target = event.target
    const avatar = target.picture.value;
    const name = target.name.value;
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;


    //어드민 level:0 , 일반 level:1 profile:{avatar, name, level:1} }
    const userInfo = {username,email,password,profile:{avatar, name, level:1} }
    Accounts.createUser(userInfo, function(error){
      if(error){
        alert(error)
      }else{
        alert("🚀회원가입 되셨습니다!")
        FlowRouter.go("/signin")
      }
    })

    // set $'' 필드 넣기
    //🚀picture  인코딩 필요함
    //아이디, 아바타가 안들어감  => 로그인 안됌

    // const reader = new FileReader();
    // reader.onload = function() {
    //   const result = reader.result;
    // }
    // console.log(result)
    //
    // const forms = document.querySelectorAll('.needs-validation')


    // await Array.prototype.slice.call(forms)
    //   .forEach(function (form) {
    //     form.addEventListener('submit', function (event) {
    //       if (!form.checkValidity()) {
    //         event.preventDefault()
    //         event.stopPropagation()
    //       }
    //       form.classList.add('was-validated')
    //     }, false)
    //   })
  },
})

// (function () {
//   'use strict'
//
//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')
//
//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//
//         form.classList.add('was-validated')
//       }, false)
//     })
// })()