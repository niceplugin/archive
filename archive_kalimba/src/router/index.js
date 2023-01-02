import Home from '../pages/Home.vue'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    path: '/:notFound*',
    redirect: '/',
  },
]
const history = createWebHistory()

export default createRouter({
  routes,
  history,
})