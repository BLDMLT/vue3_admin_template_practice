<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包菜单 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 定义响应式图标控制
let fold = ref(false) // 控制折叠
// 点击图标方法
const changeIcon = () => {
  fold.value = !fold.value
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped></style>
