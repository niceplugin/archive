import { Template } from 'meteor/templating'
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import "./signInPage.html"


Template.signInPage.events({
  "submit #btn-signIn": function login(event){
    event.preventDefault()

    const target = event.target
    const id = target.id.value;
    const password = target.password.value;

    Meteor.loginWithPassword(id, password, function(error){
      if(error) {
        alert(error)
      }else{
        alert("🚀로그인완료")
        FlowRouter.go("/")
      }}
    )
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

Template.signInPage.helpers({})

Template.signInPage.onCreated(function() {})

Template.signInPage.onDestroyed(function() {})

Template.signInPage.onRendered(function() {})
