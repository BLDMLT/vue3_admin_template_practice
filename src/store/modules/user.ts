// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData, userInfoResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由
import { constantRoute } from '@/router/routes'
// 创建小仓库
let useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户标识
      menuRoutes: constantRoute, // 菜单生成需要的数组（路由）
      username: '',
      avatar: '',
    }
  },
  //异步 | 逻辑
  actions: {
    // 登录方法
    async userLogin(data: loginForm) {
      // 登录请求
      let result: loginResponseData = await reqLogin(data)
      //成功=> 200
      // 失败=> 201
      if (result.code === 200) {
        console.log(result)
        this.token = result.data as string
        // 本地持久化存储
        SET_TOKEN(result.data as string)
        // 返回成功
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
         // 通知服务器登录标识失效
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }  
    },
  },
  //
  getters: {},
})

// 对外暴露小仓库
export default useUserStore
