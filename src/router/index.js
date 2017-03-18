import Vue from 'vue'
import Router from 'vue-router'

// Import pages
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: { needAuth: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { guest: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('wander-session')

  if (to.meta.needAuth) {
    if (!token || token === null) {
      next('/login')
    }
  }
  if (to.meta.guest) {
    if (token) {
      next('/')
    }
  }

  next()
})

export default router
