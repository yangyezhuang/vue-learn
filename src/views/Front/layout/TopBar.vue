<template>
  <div>
    <el-header>
      <el-menu router mode="horizontal">
        <el-menu-item index="/">
          <img src="../../../assets/image/logo.jpg" style="height: 80%" alt="logo">
        </el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/courses">课程</el-menu-item>
        <el-menu-item index="/category">分类</el-menu-item>
        <el-menu-item index="/teacher">师资</el-menu-item>
        <el-menu-item index="/notice">公告</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>

        <!-- TopBar 右侧区域 -->
        <el-menu-item style="float: right">
          <!-- 搜索框 -->
          <el-input placeholder="请输入课程" v-model="keyword" style="width:250px;margin-right: 30px">
            <el-button slot="append" icon="el-icon-search" style="width: auto" @click="search(keyword)"></el-button>
          </el-input>
          <!--  公告牌  -->
          <i class="el-icon-bell" style="font-size: 25px;margin-right: 20px" @click="openBoard"></i>
          <!-- 登录按钮 -->
          <el-button circle size="medium" @click="openLogin" v-show="show_login">登录</el-button>
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
            <el-menu-item index="/user/info" style="font-size: 14px">
              <i class="el-icon-user"></i>
              个人中心
            </el-menu-item>
            <el-menu-item @click="logout" style="font-size: 14px">
              <i class="el-icon-switch-button"></i>
              退出
            </el-menu-item>
          </el-popover>

          <!--  弹窗登录  -->
          <login :visible.sync="visible"></login>
        </el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
import Login from "../Dialog/Login";
import {Message} from "element-ui";
import {Notification} from 'element-ui';
import jwt from "jsonwebtoken";


export default {
  name: "TopBar",
  components: {
    Login
  },
  data() {
    return {
      keyword: '',
      uid: '',
      username: '',
      visible: false,
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
      const {data: res} = await this.$http.get("/notices/new")
      let notice = res.data

      Notification({
        title: notice.title,
        message: h('i', {style: 'color: #409EFF'}, notice.text)
      });
    },

    //  根据token判断登录状态
    isLogin() {
      const tokenStr = sessionStorage.getItem('token')
      if (tokenStr) {
        this.show_login = false
        this.show_admin = true

        let str = jwt.decode(tokenStr)
        this.uid = str.uid
        this.username = str.username
      }
    },

    openLogin() {
      this.visible = true
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
.el-menu-item {
  font-size: 20px;
}
</style>
