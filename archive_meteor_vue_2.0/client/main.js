import Vue from 'vue'
import App from '/imports/client/App.vue'
import vuetify from '/imports/client/plugins/vuetify'
import router from '/imports/client/plugins/router'
import VueMeteorTracker from 'vue-meteor-tracker'

Meteor.startup(()=>{
  Vue.config.productionTip = false
  Vue.use(VueMeteorTracker)

  new Vue({
    vuetify,
    router,
    render: h => h(App),
  }).$mount('#app')
})