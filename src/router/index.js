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
        },
        {
          path: '/postExport',
          name: 'postExport',
          component: () => import('@/pages/export-demo/index.vue')
        },
        {
          path: '/definedButtonDemo',
          name: 'definedButtonDemo',
          component: () => import('@/pages/defined-button-demo/index.vue')
        },
        {
          path: '/tableDemo',
          name: 'tableDemo',
          component: () => import('@/pages/table-demo/index.vue')
        },
        {
          path: '/debounceThrottle',
          name: 'debounceThrottle',
          component: () => import('@/pages/debounce-throttle/index.vue')
        }
      ]
    }
  ]
})
