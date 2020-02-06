import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home.vue'
import Test from '@/components/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/helloWorld',
      children: [
        {
          path: '/helloWorld',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/test',
          name: 'test',
          component: Test
        }
      ]
    }
  ]
})
