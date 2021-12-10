<template>
  <div>
    <el-container>
      <!--  header  -->
      <el-header>
        <!--   导航栏   -->
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
              <img src="../../assets/image/logo.png" style="height: 100%">
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
            </el-menu-item>
            <el-menu-item index="4" style="float: right">
              <router-link to="/login" style="font-size: 18px;text-decoration: none;" v-show="show_login">登录</router-link>
              <router-link to="/user/test1" style="font-size: 18px;text-decoration: none;" v-show="show_admin">
                <img src="../../assets/image/login.png" alt="" style="height: 30px">
              </router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!--   main   -->
      <el-main style="width: 1200px;margin: 0 auto">
        <!--  左侧图片  -->
        <div style="width: 100%;height: 300px;">
          <div style="width:500px;height: 100%;float: left">
            <img src="http://edu-image.nosdn.127.net/B93FA693FB4D88432CF714AF6AED4717.jpg" alt=""
                 style="width: 100%;height: 100%">
          </div>

          <!--  右侧div  -->
          <div style="width: 550px;height:100%;background-color:white;margin-left: 600px;border-radius: 20px;">
            <h1>{{ title }}</h1>
            <p style="color: red">course_id:{{ id }}</p>
            <h4>共10节</h4>
            <el-button type="success" @click="addCourse">添加课程</el-button>
            <el-button type="success" @click="toPlayer">开始学习</el-button>
          </div>
        </div>

        <!--   课程简介    -->
        <div style="width: 100%;background-color: white;margin-top: 50px;border-radius: 30px">
          <h2>课程简介</h2>
          <p>{{ desc }}</p>
          <hr>
          <ul v-for="i in 10">
            <li>
              <a href="/player" style="text-decoration: none">第{{ i }}节 - 传统文学</a></li>
          </ul>
        </div>
      </el-main>

      <!--   footer   -->
      <el-footer>jssvc</el-footer>
    </el-container>
  </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
  name: "ClassInfo",
  data() {
    return {
      show_login: true,
      show_admin: false,
      title: '传统文学',
      id: '',
      desc: '苏州话是吴语的代表，也是中国最悠久的方言之一。早在商代泰伯奔吴的时候，苏州话的前身——上古吴语就已经形成了。苏州话发展有两个变动比较大的时期早在商代泰伯奔吴的时候，苏州话发展有两个变动比较大的时期…',
      courseInfo: ''
    }
  },

  created() {
    // 接收页面转跳携带的参数
    this.id = this.$route.query.id

    //  根据id查询详情页数据
    this.$http.get("/courseDetail").then((res) => {
      this.courseInfo = res.data;
      console.log(this.courseInfo)
    })

    //  判断登录状态
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
    } else {
      this.show_login = false
      this.show_admin = true
    }
  },

  methods: {
    //
    addCourse() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        Message.success("添加成功")
      }
    },
    //
    toPlayer() {
      //  判断用户是否登录(Y：跳转播放页/N：提示登录)
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        this.$router.push('/player')
      }
    },
    //
    toChapter(id) {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        this.$http.get("/player").then((res) => {
          console.log("即将播放...")
        })
      }
    }
  }
}


</script>

<style scoped>
img {
  border-radius: 20px;
}

.top_box {
  width: 700px;
  /*height: 250px;*/
  background-color: #D8D4EC;
  border-radius: 20px;
  margin: 0 auto;
}

</style>
