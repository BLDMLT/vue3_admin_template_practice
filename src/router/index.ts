// using vue-router
import { createRouter, createWebHashHistory } from "vue-router";

let router = createRouter({
  //路由模式，hash
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login', // 命名路由
    }
  ]
})




export default router;