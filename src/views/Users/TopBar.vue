<template>
  <div id="nav">
    <el-container>
      <!--   topbar   -->
      <el-header>
        <!--  Logo  -->
        <div style="float: left">
          <img class="logo" src="./assets/logo.png" alt="logo" @click="toHome">
          <span class="logo_title">  苏州话学习平台</span>
          <br>
        </div>
        <!--  导航   -->
        <div class="link">
          <router-link to="/">主页</router-link>
          |
          <router-link to="/class">课程</router-link>
        </div>

        <!--  登录/注册  -->
        <div class="link_r">
          <router-link to="/register">注册</router-link>
          |
          <router-link to="/login">登录</router-link>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
  background-color: #FFFFFF;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #00C758;
}

.logo {
  width: 90px;
  margin: auto;
  position: absolute;
  top: 25px;
}

.logo_title {
  font-size: 30px;
  margin: auto;
  position: absolute;
  top: 50px;
  left: 150px;
  bottom: 0;
}

.link {
  font-size: 25px;
  margin: auto;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}

.link_r {
  font-size: 20px;
  margin: auto;
  position: absolute;
  top: 50px;
  right: 50px;
  bottom: 0;
}

</style>
