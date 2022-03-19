<template>
  <el-container>
    <!--   TopBar   -->
    <TopBar></TopBar>

    <!--   主体展示   -->
    <el-main style="width: 1200px;margin: 0 auto">
      <div style="min-height:700px;height: auto;margin: 0 auto;background-color: white;">
        <!--  背景图片   -->
        <div class="cardBox">
          <div class="downDiv">
            <el-avatar :size=80 style="margin-top: 50px">{{ username }}</el-avatar>
            <h2>{{ username }}</h2>
          </div>
        </div>

        <!--  导航 -->
        <el-menu router mode="horizontal">
          <el-menu-item index="/user/info" style="font-size: 18px;">个人中心</el-menu-item>
          <el-menu-item index="/user/courses" style="font-size: 18px;">学习中心</el-menu-item>
          <el-menu-item v-if="role==='stu'" index="/user/data" style="font-size: 18px;">数据中心</el-menu-item>
          <el-menu-item v-if="role==='tch'" index="/user/push" style="font-size: 18px;">发布课程</el-menu-item>
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
      username: sessionStorage.getItem("username"),
      role: sessionStorage.getItem("role")
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
.cardBox {
  height: 180px;
  background-color: #F2ECF0;
}

.downDiv {
  /*background-color: gray;*/
  /*height: 50px;*/
}


</style>
