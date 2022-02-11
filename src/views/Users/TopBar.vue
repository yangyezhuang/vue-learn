<template>
  <div>
    <el-header>
      <el-menu router mode="horizontal">
        <el-menu-item index="/">
          <img src="../../assets/image/logo.png" style="height: 100%" alt="logo">
        </el-menu-item>
        <el-menu-item index="/" style="font-size: 18px;">首页</el-menu-item>
        <el-menu-item index="/course" style="font-size: 18px;">课程</el-menu-item>
        <el-menu-item index="/about" style="font-size: 18px;">关于</el-menu-item>

        <!-- 搜索框 -->
        <el-menu-item style="float: left">
          <el-input placeholder="请输入课程" v-model="input">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </el-menu-item>

        <!-- 登录按钮 -->
        <el-menu-item style="float: right">
          <el-button round @click="login()" v-show="show_login">登录</el-button>
          <!--  弹窗  -->
          <el-dialog title="登 陆" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false"
                     width="30%">
            <!--  登录组件  -->
            <login-name></login-name>
          </el-dialog>

          <!--  下拉列表  -->
          <el-submenu style="float: right" v-show="show_admin">
            <!--  <template slot="title">User</template>  -->
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
import {Message} from 'element-ui'
import LoginName from "./Login/LoginName";

export default {
  name: "TopBar",
  components: {
    LoginName
  },

  // 接受父组件传来的参数
  // props: [
  //   'show_login',
  //   'show_login'
  // ],

  data() {
    return {
      username: window.sessionStorage.getItem('username'),
      input: '',
      show_login: true,
      show_admin: false,
      dialogTableVisible: false
    }
  },

  created() {
    //  根据token判断登录状态
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
    } else {
      this.show_login = false
      this.show_admin = true
    }
  },

  methods: {
    search() {
      Message.info('未找到相关课程')
    },

    // 登录
    login() {
      this.dialogTableVisible = true; //默认页面不显示为false,点击按钮将属性变成true
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
