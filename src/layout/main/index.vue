<template>
  <!-- 路由组件出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染一级路由的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  /* 旋转 */
  /* transform: rotate(0deg);   */
  /* 逐渐放大（从中心点） */
  transform: scale(0);  
}
.fade-enter-active {
  transition: all .3s;
}
.fade-enter-to {
  opacity: 1;
  /* transform: rotate(360deg); */
  transform: scale(1);  
}

</style>
