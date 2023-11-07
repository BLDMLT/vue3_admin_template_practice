<template>
  <!-- 路由组件出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染一级路由的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
// 获取layout 配置仓库
let layoutSettingStore = useLayoutSettingStore()

// 控制当前组件销毁和重建
let flag = ref(true)

watch(
  () => layoutSettingStore.refresh,
  () => {
    // 点击刷新,路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  /* 旋转 */
  /* transform: rotate(0deg);   */
  /* 逐渐放大（从中心点） */
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  /* transform: rotate(360deg); */
  transform: scale(1);
}
</style>
