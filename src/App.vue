<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus" @click="">
      主要按钮
    </el-button>
    <h1>111</h1>
  </div>
  <Test></Test>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>
