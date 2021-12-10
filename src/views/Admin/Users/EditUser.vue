<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users">编辑用户</a></el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
  name: "EditUser"
}
</script>

<style scoped>
</style>
