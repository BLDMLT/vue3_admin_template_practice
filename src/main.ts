import { createApp } from 'vue'
import App from './App.vue'
// 引入scss样式
import '@/styles/index.scss'
// import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入svg插件配置
import 'virtual:svg-icons-register'
// components 文件夹中所有组件打包， 自定义插件对象
import globalComponent from '@/components'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 获取应用实例对象
const app = createApp(App)
// 安装 element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

// 安装插件
app.use(globalComponent)
// 安装仓库
app.use(pinia)
// 注册路由
app.use(router)
// 将应用挂载到挂载点上
app.mount('#app')
