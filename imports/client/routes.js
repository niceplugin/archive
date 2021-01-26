import VueRouter from 'vue-router'

import Home from '/imports/client/ui/home.vue'
import Chat from '/imports/client/ui/chat.vue'
import Zip from '/imports/client/ui/zip.vue'
import NotFound from '/imports/client/ui/NotFound.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/chat', component: Chat},
  {path: '/zip', component: Zip},
  {path: '*', component: NotFound},
];

const Router = new VueRouter({
  mode: 'history',
  routes
})

export default Router;
