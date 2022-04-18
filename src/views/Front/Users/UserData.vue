<template>
  <div>
    <el-card>
      <!--  左侧卡片布局  -->
      <div class="nav">
        <el-card style="width: 650px;height: 200px;">
          <div slot="header" class="clearfix">
            <span> 类型爱好分析</span>
          </div>
          <div class="s">课程总数
            <p style="font-size: 30px;margin: 0">{{ courseCount }}</p>
          </div>
          <div class="s">累计登录
            <p style="font-size: 30px;margin: 0">124</p>
          </div>
          <div class="s">学习时长
            <p style="font-size: 30px;margin: 0">{{ DurationData.totalDuration }}</p>
          </div>
        </el-card>
        <br>

        <el-card style="width: 650px;height: 260px;margin-top: 15px">
          <div slot="header" class="clearfix">
            <span> 类型爱好分析</span>
          </div>
          <div class="s">专注度
            <el-progress type="circle" :percentage="Concentration"></el-progress>
          </div>
          <h3><i class="el-icon-pie-chart"></i> {{ userlabel }}</h3>
        </el-card>
      </div>

      <!--  右侧  -->
      <el-card style="width: 350px;height: 150px;">
        <div slot="header" class="clearfix">
          <h3 style="margin: 0 0 ">章节完成情况</h3>
        </div>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="90"></el-progress>
        <h3 style="text-align: left"> 完成进度：11/12</h3>
      </el-card>
      <br>
      <el-card style="width: 350px;height: 150px;">
        <div slot="header" class="clearfix">
          <h3 style="margin: 0 0 ">我的贡献</h3>
        </div>
        <h3 style="text-align: left">{{ commentCount }} 条评论 / {{ noteCount }} 条笔记</h3>
      </el-card>
      <br>
      <el-card style="width: 350px;height: 150px;">
        <div slot="header" class="clearfix">
          <h3 style="margin: 0 0 ">课程积分</h3>
        </div>
        <h1 style="text-align: left">0 积分</h1>
      </el-card>
      <br>

      <!--      用户登录时段-->
      <el-card style="margin-top: 10px">
        <div slot="header" class="clearfix">
          <span> 用户登录时段</span>
        </div>
        <ve-line :data="DurationData" height="250px"></ve-line>
      </el-card>
    </el-card>

    <!--  回到顶部  -->
    <el-backtop :bottom="80">Top</el-backtop>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import jwt from 'jsonwebtoken'

export default {
  name: "Test3",
  components: {
    VeLine
  },
  data() {
    return {
      username: '',
      uid: '',
      Concentration: '',
      userlabel: '喜欢经典文学',
      DurationData: {
        columns: ["dateLD", "learningDuration"],
        rows: [],
        totalDuration: ''
      },
      courseCount: '',
      commentCount: '',
      noteCount: ''
    };
  },
  created() {
    let str = jwt.decode(sessionStorage.getItem('token'))
    this.uid = str.uid
    this.username = str.username

    this.getConcentration()
    this.getLearningDuration()
    this.getuserLabel()
    this.getCourseTotal()
    this.getCommentTotal()
    this.getNoteTotal()
  },
  methods: {
    // 获取用户专注度
    async getConcentration() {
      const {data: res} = await this.$http.post(`/behavior/concentration/${this.uid}`)
      this.Concentration = res.data
    },
    //  用户学习时长
    async getLearningDuration() {
      const {data: res} = await this.$http.post(`/behavior/learningDuration/${this.uid}`)
      this.DurationData.rows = res.data.ld
      this.DurationData.totalDuration = res.data.totalLearningD

    },
    // 类型推荐
    async getuserLabel() {
      const {data: res} = await this.$http.post(`/behavior/userlabel/${this.uid}`)
      this.userlabel = res.data.userlabel
    },

    // 获取课程数量
    async getCourseTotal() {
      const {data: res} = await this.$http.get(`user/course/total/${this.uid}`)
      this.courseCount = res.data
    },
    // 获取笔记数量
    async getCommentTotal() {
      const {data: res} = await this.$http.get(`comments/total/user/${this.uid}`)
      this.commentCount = res.data
    },
    // 获取笔记数量
    async getNoteTotal() {
      const {data: res} = await this.$http.get(`/note/total/user/${this.uid}`)
      this.noteCount = res.data
    },
  }
}
</script>

<style scoped>
.nav {
  width: 65% !important;
  float: left;
  margin-right: 2%;
}

.s {
  float: left;
  width: 30%;
  height: 60px;
  margin-right: 3%;
  border-radius: 15px;
}
</style>
