import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '/imports/client/components/dump/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('/imports/client/components/dump/chat.vue')
  },
  {
    path: '/zip',
    name: 'Zip',
    component: () => import('/imports/client/components/dump/zip.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('/imports/client/components/dump/NotFound.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router;
