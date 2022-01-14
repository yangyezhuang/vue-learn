<template>
  <div>
    <el-container>
      <!--   TopBar   -->
      <TopBar></TopBar>

      <!--   main   -->
      <el-main style="width: 1200px;margin: 0 auto">
        <div style="width: 100%;height: 300px;">
          <!--  左侧图片  -->
          <div style="width:500px;height: 100%;float: left">
            <img :src="course_detail.img" alt="" style="width: 100%;height: 100%">
          </div>

          <!--  右侧div  -->
          <div style="width: 550px;height:100%;background-color:white;margin-left: 600px;border-radius: 20px;">
            <h1>《 {{ course_detail.title }} 》</h1>
            <p style="color: red">course_id:{{ course_id }}</p>
            <h4>共{{ course_detail.chapter }}节</h4>
            <el-button type="primary" @click="addCourse">添加课程</el-button>
            <el-button type="primary" @click="toPlayer">开始学习</el-button>
          </div>
        </div>

        <!--   课程简介    -->
        <div style="width: 100%;background-color: white;margin-top: 50px;border-radius: 30px">
          <h2>课程简介</h2>
          <p>{{ course_detail.info }}</p>
          <hr>
          <ul v-for="i in course_detail.chapter">
            <li>
              <a href="/player" style="text-decoration: none">第{{ i }}节 - 传统文学</a>
            </li>
          </ul>
        </div>
      </el-main>

      <!--   footer   -->
      <el-footer>
        <FootBar></FootBar>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import TopBar from "./TopBar"
import FootBar from "./FootBar";

export default {
  name: "ClassInfo",
  components: {
    TopBar,
    FootBar
  },

  data() {
    return {
      course_id: '',
      course_detail: ''
    }
  },

  created() {
    // 接收页面转跳携带的参数
    this.course_id = this.$route.query.id
    console.log(this.course_id)

    //  根据课程id查询详情页数据
    this.$http.post("/courseDetail", {course_id: this.course_id}).then((res) => {
      console.log(res.data)
      this.course_detail = res.data;
    })
  },

  methods: {
    // 添加课程
    addCourse() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        Message.success("添加成功")
      }
    },

    // 转跳到播放页
    toPlayer() {
      //  判断用户是否登录(Y：跳转播放页/N：提示登录)
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        this.$router.push('/player')
        // this.$http.get("/player").then((res) => {
        //   console.log("即将播放...")
        // })
      }
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 20px;
}

</style>
