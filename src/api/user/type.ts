// 登录接口携带参数类型
export interface loginForm {
  username: string
  password: string
}

// interface dataType {
//   token?: string
//   message?: string
// }
// 全部接口返回数据ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录接口返回ts类型
export interface loginResponseData extends ResponseData {
  data: string
}
// info接口返回ts类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}
