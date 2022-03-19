<template>
  <div>
    <el-container>
      <!--   TopBar   -->
      <TopBar></TopBar>

      <!--   main   -->
      <el-main style="width: 1200px;margin: 0 auto">
        <el-card>
          <div v-if="cardShow">
            <div style="width: 100%;height: 200px;">
              <!--  左侧图片  -->
              <div style="width:400px;height: 100%;float: left;margin-left: 100px">
                <img :src="course_detail[0].img" alt="" style="width: 100%;height: 100%;border-radius: 5px">
              </div>

              <!--  右侧div  -->
              <div style="width: 550px;height:100%;background-color:white;margin-left: 600px;border-radius: 20px;">
                <h1>《 {{ course_detail[0].title }} 》</h1>
                <p style="color: red">id:{{ course_id }}</p>
                <h4>共 {{ course_detail.length }} 节</h4>
                <el-button type="primary" @click="addCourse">加入课程</el-button>
                <el-button type="primary" @click="toPlayer(course_id,course_detail[0].chapter_id)">开始学习</el-button>
              </div>
            </div>

            <!--   课程简介    -->
            <div style="width: 100%;background-color: white;margin-top: 50px;border-radius: 30px">
              <el-divider></el-divider>

              <h2>课程简介</h2>
              <p>{{ course_detail[0].info }}</p>
              <el-divider></el-divider>

              <ul v-for="i in course_detail">
                <li @click="toPlayer(course_id,i.chapter_id)" style="color: #409EFF">
                  第{{ i.chapter_title }} - {{ course_detail[0].title }} （ {{ i.chapter_id }}）
                </li>
              </ul>

              <div style="width: 100%;height: 150px"></div>
            </div>
          </div>

          <div style="height: 600px" v-show="emptyShow">
            <el-empty description="课程暂时没有上架"></el-empty>
          </div>
        </el-card>
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
      course_id: this.$route.params.id,
      course_detail: '',
      cardShow: true,
      emptyShow: ''
    }
  },

  created() {
    this.getCourseDetail()
  },

  methods: {
    //  根据课程id查询详情页数据
    async getCourseDetail() {
      let course_id = this.course_id;
      const {data: res} = await this.$http.get(`/courses/detail/${course_id}`)
      this.course_detail = res.data;
      if (this.course_detail.length !== 0) {
        this.emptyShow = false
      } else {
        this.emptyShow = true
        this.cardShow = false
      }
    },

    // 收藏课程
    addCourse() {
      const tokenStr = window.sessionStorage.getItem('token')
      if (!tokenStr) {
        Message.error("请先登陆")
      } else {
        let course_id = this.course_id
        let uid = sessionStorage.getItem("uid")

        this.$http.post(`/user/${uid}/addCourse/${course_id}`).then(res => {
          if (res.data.code === 1) {
            Message.success("添加成功")
          } else {
            Message.error("课程已存在")
          }
        })
      }
    },

    // 转跳到播放页
    toPlayer(course_id, chapter_id) {
      let token = sessionStorage.getItem("token")
      if (token) {
        this.$router.push('/courses/' + course_id + '/chapter/' + chapter_id)
      } else {
        Message.error("请先登录")
      }
    }
  }
}
</script>

<style scoped>
</style>
