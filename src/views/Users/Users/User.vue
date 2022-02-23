<template>
  <el-container>
    <!--   TopBar   -->
    <TopBar></TopBar>

    <!--   主体展示   -->
    <el-main>
      <!--  背景图片   -->
      <div style="width: 80%;height: auto;margin: 0 auto;background-color: white;">
        <div style="z-index: -1;height: 200px;background-image: linear-gradient(0.45turn,pink,deepskyblue)">
          <div style="">
            <el-avatar :size=80 style="margin-top: 50px">{{ username }}</el-avatar>
            <h2>{{ username }}</h2>
          </div>
        </div>

        <!--  导航 -->
        <el-menu router mode="horizontal">
          <el-menu-item index="/user/info" style="font-size: 18px;">个人信息</el-menu-item>
          <el-menu-item index="/user/courses" style="font-size: 18px;">我的课程</el-menu-item>
          <el-menu-item index="/user/data" style="font-size: 18px;">数据中心</el-menu-item>
        </el-menu>

        <!--  视图  -->
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

  data() {
    return {
      username: sessionStorage.getItem("username")
    }
  },

  created() {
    this.isLogin()
  },

  methods: {
    isLogin() {
      //  判断用户是否登录
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        this.$router.push('/')
      } else {
      }
    }
  }
}
</script>

<style scoped>
</style>
