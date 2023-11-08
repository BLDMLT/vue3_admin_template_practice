// 路由鉴权
import router from '@/router'
import setting from '@/setting'
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 获取仓库数据
import useUserStore from '@/store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + '_' + to.meta.title
  // 访问路由前触发
  NProgress.start()
  let token = userStore.token
  // 获取用户信息
  let username = userStore.username

  // 用户登录
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token 过期，
          // 用户手动修改cache
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  NProgress.done()
})
