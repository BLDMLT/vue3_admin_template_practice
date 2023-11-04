<template>
  <el-button type="default" size="small" circle>
    <el-icon>
      <Refresh />
    </el-icon>
  </el-button>
  <el-button type="default" size="small" circle>
    <el-icon>
      <FullScreen />
    </el-icon></el-button>
  <el-button type="default" size="small" circle icon="Setting"></el-button>
  <img src="../../../public/logo.png" art="" style="width:24px; height:24px; margin: 0 10px">
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      Admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: "Setting"
}
</script>
<style scoped></style>