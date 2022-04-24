<template>
  <div>
    <!--   面包屑导航   -->
    <!--  <el-breadcrumb separator="/">-->
    <!--    <el-breadcrumb-item-->
    <!--        v-for="item in breadList"-->
    <!--        :key="item.path"-->
    <!--        :to="{ path: item.path }"-->
    <!--    >{{ item.meta.title }}-->
    <!--    </el-breadcrumb-item>-->
    <!--  </el-breadcrumb>-->

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Data",
  computed: {
    breadList() {
      return this.$route.matched;
    }
  }
}
</script>

<style scoped>

</style>
