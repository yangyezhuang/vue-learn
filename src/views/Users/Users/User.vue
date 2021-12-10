<template>
  <el-container>
    <!--   导航栏   -->
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">
          <img src="../../../assets/image/logo.png" style="height: 100%">
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
        </el-menu-item>
        <el-submenu index="4" style="float: right">
          <template slot="title">User</template>
          <el-menu-item index="2-1" @click="toTest1">我的课程</el-menu-item>
          <el-menu-item index="2-2" @click="toTest2">我的数据</el-menu-item>
          <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>

    <!--   主体展示   -->
    <el-main>
      <div style="height: 1000px;background-color: white;">
        <router-view></router-view>
      </div>
    </el-main>

    <!--   footer   -->
    <el-footer>Banana</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {}
  },

  methods: {
    toTest1() {
      this.$router.push('/user/test1')
    },
    toTest2() {
      this.$router.push('/user/test2')
    },

    // 退出登录
    logout() {
      // 清除token
      window.sessionStorage.clear();
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
</style>
