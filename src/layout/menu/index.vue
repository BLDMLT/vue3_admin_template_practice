<template>
  <div>
    <!-- 插槽 -->
    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="">
          <template #title>
            <span>
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>

              &nbsp;
            </span>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
        >
          <template #title>
            <span>
              <el-icon>
                <component :is="item.children[0].meta.icon"></component>
              </el-icon>
              &nbsp;
            </span>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有多个子路由 -->
      <el-sub-menu v-if="item.children && item.children.length > 1">
        <template #title>
          <span>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            &nbsp;
          </span>
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
// 点击菜单回调
const goRoute = () => {
  
}
</script>
<script lang="ts">
//获取父组件传递数据
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
