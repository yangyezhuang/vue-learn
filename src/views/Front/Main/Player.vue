<template>
  <div>
    <!--    <el-container>-->
    <TopBar></TopBar>

    <!--  main  -->
    <el-main style="height: auto">
      <div style="width: 1200px;height: 474px;margin:0 auto">
        <!--播放器-->
        <div style="width: 70%;float: left">
          <video width="100%" height="100%" controls :src="resource.chapter_src" type="video/mp4"></video>
        </div>

        <!--章节栏-->
        <div style="width:30%;height: 100%;float: right;">
          <el-card style="width:100%;height: 100%;float: right;">
            <h3 style="text-align:left;margin-top: 5px">
              <i class="el-icon-caret-right"></i>
              当前播放：{{ resource.chapter_title }}</h3>
            <el-divider><h3>章节目录</h3></el-divider>

            <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto; max-height: 280px;width:90%;">
              <li v-for="chapter in chapterList" class="infinite-list-item"
                  @click="getVideo(chapter.course_id, chapter.chapter_id)">{{ chapter.chapter_title }}
              </li>
            </ul>
          </el-card>
        </div>
      </div>
      <br>


      <!--  下半部分  -->
      <div style="width: 1200px;height: 100%;background-color: white;margin:0 auto">
        <!--  分割线  -->
        <el-divider></el-divider>
        <!--  下左div  -->
        <div style="width: 70%;float: left">
          <!--  评论区  -->
          <div style="height: 120px;">
            <div style="float: left;margin-left: 50px">
              <el-avatar> {{ username }}</el-avatar>
              <p>{{ username }}</p>
            </div>
            <div style="float: right;margin-right: 50px;width: 670px">
              <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入评论内容"
                  v-model="textarea">
              </el-input>
            </div>
            <el-button type="primary" plain @click="pushComment">发表评论</el-button>
          </div>

          <!--  评论列表  -->
          <el-divider><h3>评论列表</h3></el-divider>
          <div v-for="item in comments">
            <div style="height: 100px;margin-top: 10px;">
              <div style="float: left;margin-left: 50px">
                <el-avatar> {{ item.username }}</el-avatar>
                <p>{{ item.username }}</p>
              </div>
              <div style="float: right;margin-right: 50px;width: 670px">
                <el-input
                    placeholder="请输入内容"
                    v-model="item.comment"
                    :disabled="true">
                </el-input>
                <br>
                {{ item.date }}
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>

        <!--  推荐  -->
        <div style="width:30%;height: 100%;float: right;">
          <h3>推荐课程</h3>
          <div v-for="course in hotCourse">
            <div style="height: 100px; width:90%;margin: 0 auto;background-color: #F5F7FA;margin-bottom: 20px"
                 @click="$router.push('/courses/detail/'+course.id)">
              <img :src="course.img" alt="" style="width: 50%;height: 100%;float:left;">
              <h4>{{ course.title }}</h4>
              <i class="el-icon-refresh-left"></i>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <!--  footer  -->
    <FootBar></FootBar>
    <!--    </el-container>-->
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import jwt from 'jsonwebtoken'

export default {
  name: "Player",
  components: {
    TopBar,
    FootBar,
    videoPlayer
  },
  data() {
    return {
      username: jwt.decode(sessionStorage.getItem('token')).username,
      textarea: '',
      comments: '',
      resource: '',
      hotCourse: '',
      chapterList: ''
    }
  },

  created() {
    this.getCourseSrc()
    this.getChapterList()
    this.getComments()
    this.getHotCourses()
  },

  methods: {
    //  根据章节id获取视频资源
    async getCourseSrc() {
      let course_id = this.$route.params.course_id
      let chapter_id = this.$route.params.chapter_id

      const {data: res} = await this.$http.get(`/courses/${course_id}/chapter/${chapter_id}`)
      this.resource = res.data
    },

    // 跳转其他章节
    async getVideo(course_id, chapter_id) {
      this.$router.push(`/courses/${course_id}/chapter/${chapter_id}`)
      location.reload()
    },

    //  根据课程id查询章节列表
    async getChapterList() {
      let course_id = this.$route.params.course_id

      const {data: res} = await this.$http.get(`/courses/chapter/${course_id}`)
      this.chapterList = res.data;
      console.log("章节列表" + res.data)
    },


    // 根据课程id获取评论
    async getComments() {
      let course_id = this.$route.params.course_id

      const {data: res} = await this.$http.get(`/comments/course/${course_id}`)
      this.comments = res.data.reverse()
    },

    // 发表评论
    async pushComment() {
      const params = {
        uid: jwt.decode(sessionStorage.getItem("token")).uid,
        username: this.username,
        course_id: this.$route.params.course_id,
        comment: this.textarea
      }

      const {data: res} = await this.$http.post('/comments/add', params)
      this.getComments()
    },

    // 推荐课程
    async getHotCourses() {
      const {data: res} = await this.$http.get('/courses/hot')
      this.hotCourse = res.data;
    }
  }
}
</script>

<style scoped>

</style>
