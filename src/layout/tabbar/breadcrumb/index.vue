<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包菜单 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <!-- 展示图标 -->
      <el-icon v-if="item.meta.icon" style="margin: 0px 5px; align-items: center; top: 3px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 展示标题 -->
      <span style="margin: 0px 5px;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting'
// 获取layout 配置仓库
let layoutSettingStore = useLayoutSettingStore()

let $route = useRoute()

// 点击图标方法
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}

</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped></style>
