import request from '@/utils/request'
import type { loginForm, loginResponseData, userInfoResponseData } from './type'

// 统一接口 枚举（enum）用户相关
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 暴露的请求函数
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
// Logout，token在请求头中
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
