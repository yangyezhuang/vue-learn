<template>
  <div>
    <el-card style="height: auto;width: 100%">
      <!--  左侧  -->
      <div class="nav">
        <!--    学习记录      -->
        <el-card style="width: 500px;height: 150px;">
          <div slot="header" class="clearfix">
            <h4 style="margin: 0"> 学习记录</h4>
          </div>
          <div class="s">课程总数
            <p style="font-size: 30px;margin: 0">{{ courseCount }}</p>
          </div>
          <div class="s">累计登录
            <p style="font-size: 30px;margin: 0">{{ countLogin }}</p>
          </div>
          <div class="s">学习时长
            <p style="font-size: 30px;margin: 0">{{ DurationData.totalDuration }}</p>
          </div>
        </el-card>
        <!--用户专注度分析-->
        <el-card style="width: 500px;height: 250px;margin-top: 20px">
          <div slot="header" class="clearfix">
            <h4 style="margin: 0"> 用户专注度分析</h4>
          </div>
          <el-progress type="circle" :percentage="Concentration"></el-progress>
        </el-card>
        <!--类型爱好分析-->
        <el-card style="width: 500px;margin-top: 20px">
          <div slot="header" class="clearfix">
            <span> 类型爱好分析</span>
          </div>
          <h3><i class="el-icon-pie-chart"></i> {{ userlabel }}</h3>
          <p>该用户学习范围集中于
            <el-tag size="small">经典</el-tag>
            类课程。
          </p>
        </el-card>
      </div>

      <!--  右侧  -->
      <div style="width: 650px;float: right">
        <!--  用户登录时段  -->
        <el-card style="width: 100%;float:right;">
          <div style="width: 600px;height: 200px" id="r1">
          </div>
        </el-card>

        <el-card style="width: 100%;margin-top: 20px">
          <div style="width: 600px;height: 300px" id="main">
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
  name: "UserDraw",
  data() {
    return {
      uid: '',
      username: '',
      countLogin: Math.ceil(Math.random() * 500),
      Concentration: '',
      userlabel: '喜欢经典文学',
      DurationData: {
        columns: ["dateLD", "learningDuration"],
        rows: [],
        totalDuration: ''
      },
      courseCount: ''
    }
  },
  created() {
    this.uid = this.$route.params.uid
    this.username = jwt.decode(sessionStorage.getItem('token')).username
  },
  mounted() {
    this.echartsInit()
    this.echartsInit1()
    this.getConcentration()
    this.getLearningDuration()
    this.getuserLabel()
    this.getCourseTotal()
    this.getCommentTotal()
    this.getNoteTotal()
  },
  methods: {
    echartsInit1() {
      this.$echarts.init(document.getElementById('r1')).setOption({
        title: {
          text: '用户登录统计'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [12, 4, 17, 23, 5, 9, 14],
            type: 'line'
          }
        ]
      })
    },
    echartsInit() {
      this.$echarts.init(document.getElementById('main')).setOption({
        title: {
          text: '用户爱好分析'
        },
        legend: {
          data: ['点击次数', '观看次数']
        },
        radar: {
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
                name: '点击次数'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '观看次数'
              }
            ]
          }
        ]
      })
    },

    // 获取用户专注度
    async getConcentration() {
      this.Concentration = Math.ceil(Math.random() * 100); // 生成随机数

      // const {data: res} = await this.$http.post(`/behavior/concentration/${this.uid}`)
      // this.Concentration = res.data
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
      const {data: res} = await this.$http.get(`users/course/total/${this.uid}`)
      this.courseCount = res.data
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
