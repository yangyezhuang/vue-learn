<template>
  <div>
    <TopBar></TopBar>

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

            <!--  添加笔记  -->
            <el-button type="primary" @click="openNote()">添加笔记</el-button>
            <!--  添加笔记弹窗组件  -->
            <note :visible.sync="visible"></note>
          </el-card>
        </div>
      </div>
      <br>


      <!--  下半部分  -->
      <div style="width: 1200px;height: 100%;background-color: white;margin:0 auto">
        <!--  分割线  -->
        <el-divider></el-divider>
        <!--  评论模块  -->
        <comment :course_id="course_id"></comment>

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

    <el-backtop :bottom="80">Top</el-backtop>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "../layout/TopBar"
import FootBar from "../layout/FootBar";
import Note from "../Dialog/Note";
import Comment from "./Comment";
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import jwt from 'jsonwebtoken'

export default {
  name: "Player",
  components: {
    TopBar,
    FootBar, Comment,
    videoPlayer,
    Note
  },
  data() {
    return {
      uid: jwt.decode(sessionStorage.getItem('token')).uid,
      username: jwt.decode(sessionStorage.getItem('token')).username,
      visible: false,
      resource: '',
      hotCourse: '',
      chapterList: '',
      noteDialogShow: false,
      chapter_id: this.$route.params.chapter_id,
      course_id: this.$route.params.course_id
    }
  },

  created() {
    this.getCourseSrc(this.course_id, this.chapter_id)
    this.getChapterList(this.course_id)
    this.getHotCourses()
  },

  methods: {
    // 根据章节id获取视频资源
    async getCourseSrc(course_id, chapter_id) {
      const {data: res} = await this.$http.get(`/courses/${course_id}/chapter/${chapter_id}`)
      this.resource = res.data
    },

    // 跳转其他章节
    getVideo(course_id, chapter_id) {
      this.$router.push(`/courses/${course_id}/chapter/${chapter_id}`)
      location.reload()
    },

    //  根据课程id查询章节列表
    async getChapterList(course_id) {
      const {data: res} = await this.$http.get(`/courses/chapter/${course_id}`)
      this.chapterList = res.data;
    },

    openNote() {
      this.visible = true
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
