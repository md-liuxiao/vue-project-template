import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/helloWorld.vue'
import Home from '@/pages/home.vue'

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
          name: 'helloWorld',
          component: HelloWorld
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
          component: () => import('@/pages/debounce-throttle-demo/index.vue')
        },
        {
          path: '/createQrCodeExport',
          name: 'createQrCodeExport',
          component: () => import('@/pages/create-qrCode-export-demo/index.vue')
        },
        {
          path: '/exportPdfDemo',
          name: 'exportPdfDemo',
          component: () => import('@/pages/export-pdf-demo/index.vue')
        }
      ]
    }
  ]
})
