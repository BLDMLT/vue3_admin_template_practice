// 封装本地存储
// 存
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 取
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
