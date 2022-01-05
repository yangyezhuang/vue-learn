<template>
  <div>
    <!--  TopBar  -->
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <!-- Logo -->
        <el-menu-item index="1">
          <img src="../../assets/image/logo.png" style="height: 100%" alt="logo" @click="toHome">
        </el-menu-item>

        <!-- 首页 -->
        <el-menu-item index="2">
          <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
        </el-menu-item>

        <!-- 课程 -->
        <el-menu-item index="3">
          <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
        </el-menu-item>

        <!-- 关于 -->
        <el-menu-item index="4">
          <router-link to="/" style="font-size: 18px;text-decoration: none;">关于</router-link>
        </el-menu-item>

        <!-- 搜索框 -->
        <el-menu-item index="5" style="float: left">
          <el-input placeholder="请输入课程" v-model="input" class="searchClass">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </el-menu-item>

        <!-- 登录按钮 -->
        <el-menu-item index="6" style="float: right">
          <!--  弹窗  -->
          <el-button round @click="submitForm()" v-show="show_login">登录</el-button>
          <el-dialog title="登 陆" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false"
                     width="30%">
            <login-name></login-name>
          </el-dialog>

          <!--  下拉列表  -->
          <router-link to="/user/test1" style="font-size: 18px;text-decoration: none;" v-show="show_admin">
            <el-submenu index="7" style="float: right">
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
import {Message} from 'element-ui'
import LoginName from "./Login/LoginName";

export default {
  name: "TopBar",
  components: {
    LoginName
  },

  // 接受父组件传来的参数
  props: [
    'show_login',
    'show_login'
  ],

  data() {
    return {
      dialogTableVisible: false,
      input: ''
    }
  },

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
    submitForm() {
      this.dialogTableVisible = true;//默认页面不显示为false,点击按钮将这个属性变成true
    },

    toHome() {
      this.$router.push('/')
    },

    search() {
      Message.info('未找到相关课程')
    },

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
