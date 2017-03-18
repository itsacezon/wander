import Vue from 'vue'
import Router from 'vue-router'

// Import pages
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
