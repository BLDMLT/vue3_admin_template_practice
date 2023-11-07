<template>
  <el-button type="default" size="small" circle icon="Refresh" @click="updateRefresh"></el-button>
  <el-button type="default" size="small" circle icon="FullScreen" @click="fullScreen"></el-button>
  <el-button type="default" size="small" circle icon="Setting"></el-button>
  <img
    :src="userStore.avatar"
    art=""
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%;"
  />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{userStore.username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user';
// 获取layout 配置仓库
let layoutSettingStore = useLayoutSettingStore()
// 获取用户相关小仓库
let userStore = useUserStore()
// 获得路由器对象
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 刷新点击回调
const updateRefresh = () =>{
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏点击回调
const fullScreen = () => {
  // dom 全屏属性, 用来判断是否全屏幕
  let full = document.fullscreenElement;
  if(!full){
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
// 退出登录点击的回调
const logout = () => {
  // 1. 发请求
  userStore.userLogout();
  $router.push({path: '/login', query: {redirect:  $route.path}});
}

</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
