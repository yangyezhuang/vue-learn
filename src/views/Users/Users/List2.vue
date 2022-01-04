<template>
  <div class="main">
    <!-- echarts图 -->
    <h1>数据分析</h1>
    <div class="one" id="myChart1"></div>
    <div class="two" id="myChart2"></div>
    <div class="three" id="myChart3"></div>
    <h3>在线时间统计</h3>
    <div class="four" id="myChart4"></div>
  </div>
</template>

<script>
// 在组件引入基本模板
let echarts = require("echarts/lib/echarts");
// 在组件引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");

export default {
  name: "Test3",
  data() {
    return {};
  },

  created() {
    //  判断用户是否登录
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      this.$router.push('/')
    } else {
      //  修改状态栏
      this.show_login = false
      this.show_admin = true
    }
  },
  mounted() {
    this.drawBar();
    this.drawPie();
    this.drawLine()
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
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
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart2.setOption({
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
      let myChart3 = echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart3.setOption({
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
.one {
  width: 33% !important;
  height: 300px !important;
  background-color: #eae0e0;
  float: left;
}

.two {
  width: 33% !important;
  height: 300px !important;
  background-color: #e5d4d4;
  float: left;
}

.three {
  width: 34% !important;
  height: 300px !important;
  background-color: #ccbaba;
  float: left;
}

.four {
  width: 100% !important;
  height: 320px !important;
  background-color: #b8d0b8;
  float: left;
}

</style>
