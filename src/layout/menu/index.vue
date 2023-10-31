<template>
  <div>
    <!-- 插槽 -->
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children" :index="item.path">
        <template #title>
          <span>图标&nbsp;</span>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 只有一个子路由 -->
      <el-menu-item
        v-if="item.children && item.children.length == 1"
        :index="item.children[0].path"
      >
        <template #title>
          <span>图标&nbsp;</span>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有多个子路由 -->
      <el-sub-menu v-if="item.children && item.children.length > 1">
        <template #title>
          <span>图标&nbsp;</span>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
//获取父组件传递数据
defineProps(['menuList'])
</script>
<script lang="ts">
//获取父组件传递数据
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
