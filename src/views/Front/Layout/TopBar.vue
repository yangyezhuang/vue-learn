<template>
  <div>
    <el-header>
      <el-menu router mode="horizontal">
        <el-menu-item index="/">
          <img src="../../../assets/image/logo.jpg" style="height: 80%" alt="logo">
        </el-menu-item>
        <el-menu-item index="/" style="font-size: 18px;">首页</el-menu-item>
        <el-menu-item index="/courses" style="font-size: 18px;">课程</el-menu-item>
        <el-menu-item index="/category" style="font-size: 18px;">分类</el-menu-item>
        <el-menu-item index="/notice" style="font-size: 18px;">公告</el-menu-item>
        <el-menu-item index="/about" style="font-size: 18px;">关于</el-menu-item>

        <!-- TopBar 右侧区域 -->
        <el-menu-item style="float: right">
          <!-- 搜索框 -->
          <el-input placeholder="请输入课程" v-model="keyword" style="width:250px;margin-right: 30px">
            <el-button slot="append" icon="el-icon-search" style="width: auto" @click="search(keyword)"></el-button>
          </el-input>
          <!--  公告牌  -->
          <i class="el-icon-bell" style="font-size: 25px;margin-right: 20px" @click="openBoard"></i>
          <!-- 登录按钮 -->
          <el-button circle size="medium" @click="loginDialog=true" v-show="show_login">登录</el-button>
          <!--  弹窗登录  -->
          <el-dialog title="登 陆" :visible.sync="loginDialog" :append-to-body='true' :lock-scroll="false"
                     width="30%" center>
            <Login></Login>
          </el-dialog>

          <!--  下拉列表  -->
          <el-popover
              v-show="show_admin"
              placement="bottom"
              width=100
              trigger="hover">
            <el-avatar slot="reference">{{ username }}</el-avatar>
            用户：{{ username }}
            <br>
            UID：{{ uid }}
            <el-menu-item index="/user/info">
              <i class="el-icon-user"></i>
              个人中心
            </el-menu-item>
            <el-menu-item @click="logout">
              <i class="el-icon-switch-button"></i>
              退出登录
            </el-menu-item>
          </el-popover>

        </el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
import Login from "../Login/Login";
import {Message} from "element-ui";
import {Notification} from 'element-ui';
import jwt from "jsonwebtoken";


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
      uid: '',
      username: '',
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
      }
    },

    // 公告牌
    async openBoard() {
      const h = this.$createElement;
      const {data: res} = await this.$http.get("/notice/new")
      let notice = res.data

      Notification({
        title: notice.title,
        message: h('i', {style: 'color: #409EFF'}, notice.text)
      });
    },

    //  根据token判断登录状态
    isLogin() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
      } else {
        this.show_login = false
        this.show_admin = true

        let str = jwt.decode(tokenStr)
        this.uid = str.uid
        this.username = str.username
        // console.log("解析：" + JSON.stringify(str))
      }
    },

    // 登出
    logout() {
      window.sessionStorage.clear(); // 清除token
      this.$router.push("/")
      this.show_login = true
      this.show_admin = false
    }
  }
}
</script>

<style scoped>

</style>
