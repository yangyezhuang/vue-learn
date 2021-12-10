<template>
  <div class="main">
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users">数据分析</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/analyse">用户数据分析</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- echarts图 -->
    <div class="one" id="myChart1"></div>
    <div class="two" id="myChart2"></div>
    <div class="three" id="myChart3"></div>
    <div class="four" id="myChart4"></div>
  </div>
</template>

<script>
//在组件引入基本模板
let echarts = require("echarts/lib/echarts");
//在组件引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");

export default {
  mounted() {
    this.drawBar();
    this.drawPie();
    this.drawLine()
  },

  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        title: {text: "柱状图"},
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        tooltip: {},
        xAxis: {
          data: ["a", "b", "c", "d", "e", "f"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },

    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct'},
              {value: 580, name: 'Email'},
              {value: 484, name: 'Union Ads'},
              {value: 300, name: 'Video Ads'}
            ]
          }
        ]
      });
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart4"));
      // 绘制图表
      myChart.setOption({
        title: {text: "Line"},
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        tooltip: {},
        xAxis: {
          data: ["a", "b", "c", "d", "e", "f"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
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
  background-color: #eae0e0;
  float: left;
}

.two {
  width: 34% !important;
  height: 300px !important;
  background-color: #e5d4d4;
  float: left;
}

.three {
  width: 33% !important;
  height: 300px !important;
  background-color: #ccbaba;
  float: left;
}

.four {
  width: 100% !important;
  height: 320px !important;
  background-color: #d7e8d7;
  float: left;
}

</style>
