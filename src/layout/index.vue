import { bg } from 'element-plus/es/locale';
<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 菜单滚动条 -->
      <el-scrollbar class="scrollbar">
        <el-menu background-color="$base-menu-background" text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <!-- <p style="height: 5000px"></p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo组件
import Logo from './logo/index.vue'
// 引入左侧菜单组件
import Menu from './menu/index.vue'

//获取用户小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  color: white;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: wheat;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellow;
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
  }
}
</style>
