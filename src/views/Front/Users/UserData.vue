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
            <p style="font-size: 30px;margin: 0">4</p>
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
          <h3> <i class="el-icon-pie-chart"></i> {{ userlabel }}</h3>
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
          <h3 style="margin: 0 0 ">课程积分</h3>
        </div>
        <h1 style="text-align: left">0 积分</h1>
      </el-card>
      <br>
      <el-card style="width: 350px;height: 150px;">
        <div slot="header" class="clearfix">
          <h3 style="margin: 0 0 ">讨论</h3>
        </div>
        <h3 style="text-align: left">发布 12 条评论</h3>
      </el-card>
      <br>

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
import VeBar from "v-charts/lib/bar.common";
import VeHistogram from "v-charts/lib/histogram.common";
import VePie from "v-charts/lib/pie.common";
import jwt from 'jsonwebtoken'

export default {
  name: "Test3",
  components: {
    VeLine,
    VeBar,
    VePie,
    VeHistogram
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
      }
    };
  },
  created() {
    let str = jwt.decode(sessionStorage.getItem('token'))
    this.uid = str.uid
    this.username = str.username

    this.getConcentration()
    this.getLearningDuration()
    this.getuserLabel()
  },
  methods: {
    // 获取用户专注度
    getConcentration() {
      this.$http.post(`/behavior/concentration/${this.uid}`).then((res) => {
        this.Concentration = res.data.data
      })
    },
    //  用户学习时长
    getLearningDuration() {
      this.$http.post(`/behavior/learningDuration/${this.uid}`).then((res) => {
        this.DurationData.rows = res.data.data.ld
        this.DurationData.totalDuration = res.data.data.totalLearningD
      })
    },
    // 类型推荐
    getuserLabel() {
      this.$http.post(`/behavior/userlabel/${this.uid}`).then((res) => {
        this.userlabel = res.data.data.userlabel
        console.log(res.data)
      })
    }
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
