<template>
  <div>
    <el-card>
      <!--  左侧卡片布局  -->
      <div class="nav">
        <el-card>
          <div slot="header" class="clearfix">
            <span> 用户数据统计</span>
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

        <el-card>
          <div slot="header" class="clearfix">
            <span> 学习专注度</span>
          </div>
          <el-progress type="circle" :percentage="Concentration"></el-progress>
        </el-card>

        <el-card>
          <div slot="header" class="clearfix">
            <span> 类型爱好分析</span>
          </div>
          <p>{{ userlabel }}</p>
        </el-card>

        <!-- 课程热度  -->
        <el-card>
          <template #header>
            <div>
              <span>课程热度</span>
            </div>
          </template>
          唐诗
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          传统文化
          <el-progress :percentage="63.1" color="#f1e05a"></el-progress>
          吴文化
          <el-progress :percentage="45.7"></el-progress>
          传统美德
          <el-progress :percentage="18.9" color="#f56c6c"></el-progress>
        </el-card>
      </div>

      <!--  echarts图  -->
      <el-card>
        <div slot="header" class="clearfix">
          <span> 用户学习时长</span>
        </div>
        <div class="one">
          <ve-bar :data="DurationData" height="100%"></ve-bar>
        </div>
        <div class="two">
          <ve-pie :data="DurationData" height="100%"></ve-pie>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span> 用户学习时长</span>
        </div>
        <div class="one">
          <ve-line :data="DurationData" height="100%"></ve-line>
        </div>
        <div class="two">
          <ve-histogram :data="DurationData" height="100%"></ve-histogram>
        </div>
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
      username: sessionStorage.getItem('username'),
      uid: sessionStorage.getItem('uid'),
      Concentration: '',
      userlabel: '',
      DurationData: {
        columns: ["dateLD", "learningDuration"],
        rows: [],
        totalDuration: ''
      }
    };
  },
  created() {
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
.one {
  width: 45% !important;
  height: 300px !important;
  float: left;
}

.two {
  width: 45% !important;
  height: 300px !important;
  float: right;
}

.nav {
  width: 32% !important;
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
