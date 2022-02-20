<template>
  <div>
    <el-container>
      <!--  TopBar  -->
      <TopBar></TopBar>

      <!--  main  -->
      <el-main>
        <div class="main">
          <h2>{{ resource.chapter_title }}</h2>
          <!--  播放器  -->
          <div class="player">
            <video width="100%" height="100%" controls>
              <source :src="resource.chapter_src" type="video/mp4">
            </video>
          </div>
          <br>

          <!--  按钮区域  -->
          <span>
            <el-button @click="lastChapter()">上一节</el-button>
            <el-button @click="nextChapter()">下一节</el-button>
          </span>
          <hr>

          <!--  评论区  -->
          <div>
            <div style="float: left;margin-left: 50px">
              <el-avatar> {{ username }}</el-avatar>
              <p>{{ username }}</p>
            </div>
            <div style="float: right;margin-right: 50px;width: 1000px">
              <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入评论内容"
                  v-model="textarea">
              </el-input>
            </div>
            <el-button type="primary" round plain @click="pushComment">发表评论</el-button>
            <hr>

            <h3>评论列表</h3>
            <div v-for="item in comments">
              <div style="height: 100px;margin-top: 10px;">
                <div style="float: left;margin-left: 50px">
                  <el-avatar> {{ item.username }}</el-avatar>
                  <p>{{ item.username }}</p>
                </div>
                <div style="float: right;margin-right: 50px;width: 1000px">
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
      resource: ''
    }
  },

  created() {
    this.getCourseSrc()
    this.getComments()
  },

  methods: {
    //  根据章节id获取视频资源
    getCourseSrc() {
      let course_id = this.$route.params.course_id
      let chapter_id = this.$route.params.chapter_id
      // let chapter_id = course_id + '_' + 1

      this.$http.get(`/course/${course_id}/chapter/${chapter_id}`).then((res) => {
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

      this.$http.get(`/course/${course_id}/chapter/${chapter_id}`).then((res) => {
        if (res.data.code === 1) {
          this.$router.push(`/course/${course_id}/chapter/${chapter_id}`)
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

      this.$http.get(`/course/${course_id}/chapter/${chapter_id}`).then((res) => {
        if (res.data.code === 1) {
          this.$router.push(`/course/${course_id}/chapter/${chapter_id}`)
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

      const {data: res} = await this.$http.get(`/chapter/${course_id}`)
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
      const {data: res} = await this.$http.post('/addComment', params)
      // console.log(res.data)
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
