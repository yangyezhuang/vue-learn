<template>
  <div>
    <el-card style="height: auto;width: 100%">
      <!--      用户ID： {{ uid }}-->

      <!--  左侧布局  -->
      <div class="nav">
        <el-card style="width: 500px;height: 150px;">
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
        <el-card style="width: 500px;height: 250px;margin-top: 15px">
          <div slot="header" class="clearfix">
            <span> 类型爱好分析</span>
          </div>
          <div class="s">专注度
            <el-progress type="circle" :percentage="Concentration"></el-progress>
          </div>
          <h3><i class="el-icon-pie-chart"></i> {{ userlabel }}</h3>
        </el-card>
        <br>
        <el-card style="width: 500px;height: 130px;">
          <div slot="header" class="clearfix">
            <h3 style="margin: 0 0 ">我的贡献</h3>
          </div>
          <h3 style="text-align: left">{{ commentCount }} 条评论 / {{ noteCount }} 条笔记</h3>
        </el-card>
      </div>

      <!--  右侧  -->
      <div style="float: right">
        <!--  用户登录时段  -->
        <el-card style="width: 650px;height: 150px;float:right;">
          <div slot="header" class="clearfix">
            <span>用户登录时段</span>
          </div>
          <ve-line :data="DurationData" height="250px"></ve-line>
        </el-card>
        <br>
        <el-card style="width: 650px">
          <div style="width: 600px;height: 400px" id="main">
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import jwt from "jsonwebtoken";

export default {
  name: "UserDraw",
  components: {
    VeLine
  },
  data() {
    return {
      uid: '',
      username: '',
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
    }
  },
  created() {
    this.uid = this.$route.params.uid
    this.username = jwt.decode(sessionStorage.getItem('token')).username
  },
  mounted() {
    this.echartsInit()
    this.getConcentration()
    this.getLearningDuration()
    this.getuserLabel()
    this.getCourseTotal()
    this.getCommentTotal()
    this.getNoteTotal()
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({

        title: {
          text: '用户行为分析'
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {name: '文学', max: 6500},
            {name: '现代', max: 16000},
            {name: '古典', max: 30000},
            {name: '近代', max: 38000},
            {name: '历史', max: 52000},
            {name: '社会', max: 25000}
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      })
    },

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
    }
  }
}
</script>

<style scoped>
.nav {
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
