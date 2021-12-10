<template>
<div>
  <!--   面包屑导航   -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/goods">商品管理</a></el-breadcrumb-item>
    <el-breadcrumb-item><a href="/goods">编辑商品</a></el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: "EditCourse"
}
</script>

<style scoped>

</style>
