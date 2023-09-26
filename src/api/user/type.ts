// 登录接口携带参数类型
export interface loginForm {
  username: string
  password: string
}
// 登录接口返回参数类型
interface dataType {
  token: string
}
export interface loginResponseData {
  code: number
  data: dataType
}
// 服务器返回用户信息类型
interface user  {
  checkUser: {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
  }
}
export interface userResponseData {
  code: number,
  data: user
}
