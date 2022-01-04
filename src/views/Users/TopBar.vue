<template>
  <div>
    <!--  TopBar  -->
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">
          <img src="../../assets/image/logo.png" style="height: 100%" alt="logo">
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/" style="font-size: 18px;text-decoration: none;">关于</router-link>
        </el-menu-item>
        <el-menu-item index="4" style="float: right">
          <router-link to="/login" style="font-size: 18px;text-decoration: none;" v-show="show_login">登录</router-link>
          <router-link to="/user/test1" style="font-size: 18px;text-decoration: none;" v-show="show_admin">
            <el-submenu index="4" style="float: right">
              <!--  <template slot="title">User</template>  -->
              <template slot="title">
                <img src="../../assets/image/login.png" alt="" style="height: 30px">
              </template>
              <el-menu-item index="2-1" @click="toTest1">我的课程</el-menu-item>
              <el-menu-item index="2-2" @click="toTest2">我的数据</el-menu-item>
              <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
            </el-submenu>
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  // 接受父组件传来的参数
  props: [
    'show_login',
    'show_login'
  ],
  created() {
    //  判断登录状态
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
    } else {
      this.show_login = false
      this.show_admin = true
    }
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
      this.show_login = true
      this.show_admin = false

    }
  }
}
</script>

<style scoped>
</style>
