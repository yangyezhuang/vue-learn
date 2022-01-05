<template>
  <el-container>
    <!--   TopBar   -->
    <TopBar :show_login=true :show_admin=false></TopBar>

    <!--   主体展示   -->
    <el-main>
      <div style="height: 1000px;background-color: white;">
        <router-view></router-view>
      </div>
    </el-main>

    <!--   footer   -->
    <el-footer>
      <FootBar></FootBar>
    </el-footer>
  </el-container>
</template>

<script>
import TopBar from "../TopBar"
import FootBar from "../FootBar";

export default {
  name: "Admin",
  components: {
    TopBar,
    FootBar
  },
  created() {
    //  判断用户是否登录
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      this.$router.push('/')
    } else {
      //  修改状态栏
      this.show_login = false
      this.show_admin = true
    }
  }
}
</script>

<style scoped>
</style>
