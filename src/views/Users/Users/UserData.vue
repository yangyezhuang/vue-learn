<template>
  <div>
    <el-card>
      <!--  左侧卡片布局  -->
      <div class="nav">
        <el-card>
          <div class="s">课程总数
            <p style="font-size: 30px;margin: 0">4</p>
          </div>
          <div class="s">累计登录
            <p style="font-size: 30px;margin: 0">124</p>
          </div>
          <div class="s">学习时长
            <p style="font-size: 30px;margin: 0">12</p>
          </div>
        </el-card>

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
        <div class="one">
          <ve-bar :data="chartData" height="100%"></ve-bar>
        </div>
        <div class="two">
          <ve-pie :data="chartData" height="100%"></ve-pie>
        </div>
      </el-card>
      <el-card>
        <div class="one">
          <ve-line :data="chartData" height="100%"></ve-line>
        </div>
        <div class="two">
          <ve-histogram :data="chartData" height="100%"></ve-histogram>
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
      chartData: {
        columns: ["日期", "在线时长"],
        rows: [
          {日期: "1月1日", 在线时长: 1623},
          {日期: "1月2日", 在线时长: 1223},
          {日期: "1月3日", 在线时长: 2123},
          {日期: "1月4日", 在线时长: 4123},
          {日期: "1月5日", 在线时长: 2123},
          {日期: "1月6日", 在线时长: 6123},
        ],
      }
    };
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
  height: 660px !important;
  float: left;
  margin-right: 2%;
}

.s {
  float: left;
  width: 30%;
  height: 60px;
  background-color: #29BFF7;
  margin-right: 3%;
  border-radius: 15px;
}
</style>
