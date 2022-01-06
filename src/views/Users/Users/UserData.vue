<template>
  <div class="main">
    <h1>用户数据分析</h1>
    <!--  左侧卡片布局  -->
    <div class="five">
      <div>
        <el-card shadow='hover'>
          <div class="user">
            <img src="../../../assets/image/logo.png" style="height: 100px"/>
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2019-10-20</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>
      </div>
      <div class="s">总计课程数
        <p style="font-size: 50px;margin: 0">4</p>
      </div>
      <div class="s">累计登录数
        <p style="font-size: 50px;margin: 0">124</p>
      </div>
      <div class="s">总计学习
        <p style="font-size: 50px;margin: 0">12</p>
      </div>
    </div>
    <!--  echarts图  -->
    <div class="one" id="myChart1"></div>
    <div class="two" id="myChart2"></div>
    <hr>
    <h3>在线时间统计</h3>
    <div class="three" id="myChart3"></div>
    <div class="four" id="myChart4"></div>


    <!--  回到顶部  -->
    <el-backtop :bottom="80">Top</el-backtop>
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
  width: 32% !important;
  height: 300px !important;
  background-color: #efefef;
  float: left;
  margin-right: 2%;
}

.two {
  width: 32% !important;
  height: 300px !important;
  background-color: #efefef;
  float: left;
}

.three {
  width: 32% !important;
  height: 300px !important;
  background-color: #efefef;
  float: left;
}

.four {
  width: 32% !important;
  height: 300px !important;
  background-color: #efefef;
  float: right;
}

.five {
  width: 32% !important;
  height: 660px !important;
  background-color: #efefef;
  float: left;

  margin-right: 2%;
}

.s {
  float: left;
  width: 30%;
  height: 100px;
  background-color: #73C0DE;
  margin-right: 3%;
  border-radius: 15px;
}
</style>
