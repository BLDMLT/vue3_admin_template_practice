// using vue-router
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

let router = createRouter({
  //路由模式，hash
  history: createWebHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
