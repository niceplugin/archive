import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueRouter);
Vue.use(VueMeteorTracker);

import router from '/imports/client/routes'
import AppLayout from '/imports/client/AppLayout.vue'

Meteor.startup(()=>{
  new Vue({
    el: '#app',
    render: c => c(AppLayout),
    router,
  });
});