<template>
  <div class="main">
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users">数据分析</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/analyse">用户数据分析</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- echarts图 -->
    <div class="one">
      <ve-line :data="chartData" height="100%"></ve-line>
    </div>
    <div class="two">
      <ve-histogram :data="chartData" height="100%"></ve-histogram>
    </div>
    <div class="three">
      <ve-Pie :data="chartData" height="100%"></ve-Pie>
    </div>
    <div class="four">
      <ve-line :data="chartData" height="100%"></ve-line>
    </div>
  </div>
</template>


<script>
import VeLine from "v-charts/lib/line.common";
import Vehistogram from "v-charts/lib/line.common";
import VePie from "v-charts/lib/pie.common";

export default {
  components: {
    VeLine,
    Vehistogram,
    VePie,
  },
  data() {
    return {
      chartData: {
        columns: ["日期", "销售额"],
        rows: [
          {日期: "1月1日", 销售额: 123},
          {日期: "1月2日", 销售额: 1223},
          {日期: "1月3日", 销售额: 2123},
          {日期: "1月4日", 销售额: 4123},
          {日期: "1月5日", 销售额: 3123},
          {日期: "1月6日", 销售额: 7123},
        ],
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 85%;
  position: absolute;
}

.one {
  width: 33% !important;
  height: 300px !important;
  background-color: whitesmoke;
  float: left;
}

.two {
  width: 34% !important;
  height: 300px !important;
  background-color: whitesmoke;
  float: left;
}

.three {
  width: 33% !important;
  height: 300px !important;
  background-color: whitesmoke;
  float: left;
}

.four {
  width: 100% !important;
  height: 320px !important;
  background-color: whitesmoke;
  float: left;
}

</style>
