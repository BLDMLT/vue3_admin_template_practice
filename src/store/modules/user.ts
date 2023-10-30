// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储的工具方法
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
// 创建小仓库
let useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户标识
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
        this.token = result.data.token as string
        // 本地持久化存储
        SET_TOKEN(result.data.token as string)
        // 返回成功
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  //
  getters: {},
})

// 对外暴露小仓库
export default useUserStore
