// layout相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () =>{
    return {
      fold: false,  // 控制左侧菜单折叠
      refresh: false, // 控制刷新
    }
  }
})

export default useLayoutSettingStore