<template>
  <div>
    <el-header>
      <el-menu router mode="horizontal">
        <el-menu-item index="/">
          <img src="../../assets/image/logo.png" style="height: 100%" alt="logo">
        </el-menu-item>
        <el-menu-item index="/" style="font-size: 18px;">首页</el-menu-item>
        <el-menu-item index="/courses" style="font-size: 18px;">课程</el-menu-item>
        <el-menu-item index="/about" style="font-size: 18px;">关于</el-menu-item>

        <!-- 搜索框 -->
        <el-menu-item style="float: left">
          <el-input placeholder="请输入课程" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
          </el-input>
        </el-menu-item>

        <!-- 登录按钮 -->
        <el-menu-item style="float: right">
          <el-button round @click="loginDialog=true" v-show="show_login">登录</el-button>
          <!--  弹窗登录  -->
          <el-dialog title="登 陆" :visible.sync="loginDialog" :append-to-body='true' :lock-scroll="false"
                     width="30%" center>
            <Login></Login>
          </el-dialog>

          <!--  下拉列表  -->
          <el-submenu style="float: right" v-show="show_admin">
            <template slot="title">
              <el-avatar> {{ username }}</el-avatar>
            </template>
            <el-menu-item index="/user/info">个人信息</el-menu-item>
            <el-menu-item index="/user/courses">我的课程</el-menu-item>
            <el-menu-item index="/user/data">我的数据</el-menu-item>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
import Login from "./Login/Login";
import {Message} from "element-ui";

export default {
  name: "TopBar",
  components: {
    Login
  },

  // 接受父组件传来的参数
  // props: [
  //   'show_login',
  //   'show_login'
  // ],

  data() {
    return {
      keyword: '',
      username: sessionStorage.getItem('username'),
      show_login: true,
      show_admin: false,
      loginDialog: false,
    }
  },

  created() {
    this.isLogin()
  },

  methods: {
    // 搜索
    search(keyword) {
      if (!keyword) {
        Message.error("请输入关键字")
      } else {
        this.$router.push('/courses/search/' + keyword)
        // console.log(this.$route.path)
      }
    },

    //  根据token判断登录状态
    isLogin() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
      } else {
        this.show_login = false
        this.show_admin = true
      }
    },

    // 登出
    logout() {
      window.sessionStorage.clear(); // 清除token
      this.$router.push("/");
      this.show_login = true
      this.show_admin = false
    }
  }
}
</script>

<style scoped>

</style>
