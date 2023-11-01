import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 引入图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon, Pagination }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 注册图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
