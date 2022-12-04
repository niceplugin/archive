// import Home from '@/views/Home'
import Main from '@/views/Main'

export default [
  {
    path: '/',
    name: 'Home',
    component: Main
  },

  // 404
  {
    path: '*',
    beforeEnter(to, from, next) {
      next('/')
    }
  }
]