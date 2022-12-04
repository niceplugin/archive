import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '/imports/client/components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('/imports/client/components/NotFound.vue')
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router;
