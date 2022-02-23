<template>
  <div>
    <el-container>
      <!--  TopBar  -->
      <TopBar></TopBar>

      <!--  main  -->
      <el-main>
        <div style="width: 1200px;height: 474px;background-color: white;margin:0 auto">
          <!--播放器-->
          <div style="width: 70%;float: left">
            <video width="100%" height="100%" controls>
              <source :src="resource.chapter_src" type="video/mp4">
            </video>
          </div>

          <!--章节栏-->
          <div style="width:30%;height: 100%;float: right;background-color: #F1F2F3">
            <h2 style="margin:5px 0 5px 0">{{ resource.chapter_title }}</h2>
            <hr>
            <h3>章节</h3>
            <ui v-for="i in 9">
              <li style="color: #009EDD">第 {{ i }} 节</li>
            </ui>
            <!--  按钮区域  -->
            <span style="margin-bottom: 0">
            <el-button @click="lastChapter()">上一节</el-button>
            <el-button @click="nextChapter()">下一节</el-button>
          </span>
          </div>
        </div>
        <br>
        <hr>


        <!--  下半部分  -->
        <div style="width: 1200px;height: 100%;background-color: white;margin:0 auto">
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
              <el-button type="primary" round plain @click="pushComment">发表评论</el-button>
            </div>
            <hr>

            <!--  评论列表  -->
            <h3>评论列表</h3>
            <div v-for="item in comments">
              <div style="height: 100px;margin-top: 10px;">
                <div style="float: left;margin-left: 50px">
                  <el-avatar> {{ item.username }}</el-avatar>
                  <p>{{ item.username }}</p>
                </div>
                <div style="float: right;margin-right: 50px;width: 670px">
                  <el-input
                      placeholder="请输入内容"
                      type="textarea"
                      :rows="2"
                      v-model="item.comment"
                      :disabled="true">
                  </el-input>
                  <br>
                  发布时间：{{ item.date }}
                </div>
              </div>
            </div>
          </div>

          <!--  推荐  -->
          <div style="width:30%;height: 100%;float: right;">
            <h3>推荐课程</h3>
            <div v-for="course in hotCourse">
              <div style="height: 100px; width:90%;margin: 0 auto;background-color: #F1F2F3;margin-bottom: 20px"
                   @click="toDetail(course.id)">
                <img :src="course.img" alt="" style="width: 50%;height: 100%;float:left;">
                {{ course.title }}
              </div>
            </div>
          </div>
        </div>
      </el-main>

      <!--  footer  -->
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
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  name: "Player",
  components: {
    TopBar,
    FootBar,
    videoPlayer
  },
  data() {
    return {
      username: sessionStorage.getItem('username'),
      textarea: '',
      comments: '',
      resource: '',
      hotCourse: ''
    }
  },

  created() {
    this.getCourseSrc()
    this.getComments()
    this.getHotCourses()
  },

  methods: {
    //  根据章节id获取视频资源
    getCourseSrc() {
      let course_id = this.$route.params.course_id
      let chapter_id = this.$route.params.chapter_id
      // let chapter_id = course_id + '_' + 1

      let headers = {
        "token": sessionStorage.getItem('token')
      }

      console.log(headers)

      this.$http.get(`/courses/${course_id}/chapter/${chapter_id}`, {headers: headers}).then((res) => {
        this.resource = res.data.data
        console.log(res.data)
      })
    },

    // 上一节
    lastChapter() {
      let course_id = this.$route.params.course_id
      let thisChapterId = this.$route.params.chapter_id

      let _id = thisChapterId.split("_")
      let __id = parseInt(_id[_id.length - 1]) - 1
      if (__id === 0) Message.info("已经是第一节！" + id)
      let chapter_id = thisChapterId.split("_", 1)[0] + '_' + __id
      // console.log(nextChapterId)

      this.$http.get(`/courses/${course_id}/chapter/${chapter_id}`).then((res) => {
        if (res.data.code === 1) {
          this.$router.push(`/courses/${course_id}/chapter/${chapter_id}`)
          location.reload()
        } else (res.data.code === 0)
        {
        }
      })
    },

    // 下一节
    nextChapter() {
      let course_id = this.$route.params.course_id
      let thisChapterId = this.$route.params.chapter_id

      let _id = thisChapterId.split("_")
      let __id = parseInt(_id[_id.length - 1]) + 1
      let chapter_id = thisChapterId.split("_", 1)[0] + '_' + __id
      // console.log(nextChapterId)

      this.$http.get(`/courses/${course_id}/chapter/${chapter_id}`).then((res) => {
        if (res.data.code === 1) {
          this.$router.push(`/courses/${course_id}/chapter/${chapter_id}`)
          location.reload()
        } else (res.data.code === 0)
        {
          Message.info("暂无资源" + id)
        }
      })
    },

    // 根据课程id获取评论
    async getComments() {
      let course_id = this.$route.params.course_id

      let headers = {
        "token": sessionStorage.getItem('token')
      }

      const {data: res} = await this.$http.get(`/comments/course/${course_id}`, {headers: headers})
      this.comments = res.data
      console.log(res.data)
    },

    // 发表评论
    async pushComment() {
      const params = {
        uid: sessionStorage.getItem("uid"),
        username: this.username,
        course_id: this.$route.params.course_id,
        comment: this.textarea
      }
      console.log(params)


      let headers = {
        "token": sessionStorage.getItem('token')
      }

      const {data: res} = await this.$http.post('/comments/add', params, {headers: headers})
      // console.log(res.data)
    },

    // 推荐课程
    getHotCourses() {
      this.$http.get('/courses/hot').then((res) => {
        this.hotCourse = res.data.data;
        console.log(res.data)
      })
    },

    //  跳转到详情页面
    toDetail(courseID) {
      let url = '/courses/detail/' + courseID
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}

.player {
  width: 900px;
  height: 500px;
  margin: 0 auto;
}
</style>
