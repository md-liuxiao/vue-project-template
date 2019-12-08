import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        }
      ]
    }
  ]
})
