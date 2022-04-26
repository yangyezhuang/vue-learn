<template>
  <div>
    <TopBar></TopBar>

    <el-main>
      <div style="width: 1200px;min-height: 650px;margin: 0 auto">
        <el-container>
          <!--   侧边栏菜单   -->
          <el-aside width="250px">
            <!--  介绍卡片   -->
            <el-card style="height: 150px;">
              <el-avatar style="background-color: skyblue;margin-left: 75px" :size="55">{{ username }}</el-avatar>
              <h2 style="margin-top: -55px;text-align: center">{{ username }}</h2>
            </el-card>
            <el-divider></el-divider>


            <!--  菜单  -->
            <el-menu
                router
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
              <el-menu-item index="/user/info">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>我的信息</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/user/courses">
                <i class="el-icon-menu"></i>
                <span slot="title">我的课程</span>
              </el-menu-item>
              <el-menu-item index="/user/note">
                <i class="el-icon-s-management"></i>
                <span slot="title">我的笔记</span>
              </el-menu-item>
              <el-menu-item v-if="role==='stu'" index="/user/data">
                <i class="el-icon-s-data"></i>
                <span slot="title">数据中心</span>
              </el-menu-item>
              <el-menu-item v-if="role==='tch'" index="/user/push">
                <i class="el-icon-upload"></i>
                <span slot="title">发布课程</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <!--   中间主体区域   -->
          <el-container>
            <el-main style="margin-top: -20px">
              <el-card style="height:auto;min-height: 600px;">
                <router-view></router-view>
              </el-card>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </el-main>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "../layout/TopBar"
import FootBar from "../layout/FootBar";
import jwt from 'jsonwebtoken'

export default {
  name: "Admin",
  components: {
    TopBar,
    FootBar
  },

  data() {
    return {
      username: '',
      role: ''
    }
  },

  created() {
    this.isLogin()
  },

  methods: {
    //  判断用户是否登录
    isLogin() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        this.$router.push('/')
      } else {
        let str = jwt.decode(tokenStr)
        this.uid = str.uid
        this.username = str.username
        this.role = str.role
        // console.log("解析：" + JSON.stringify(str))
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>
