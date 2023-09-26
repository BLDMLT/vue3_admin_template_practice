import { createApp } from 'vue'
import App from './App.vue'
// import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
// 安装 element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

// 引入svg插件配置
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
app.use(globalComponent)
// 引入scss样式
import '@/styles/index.scss'
// 将应用挂载到挂载点上
app.mount('#app')
