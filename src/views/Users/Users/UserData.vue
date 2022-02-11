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
              <p class="name">用户名：{{ username }}</p>
              <p class="access">身份：普通用户</p>
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
    <div class="one">
      <ve-bar :data="chartData" height="100%"></ve-bar>
    </div>
    <div class="two">
      <ve-pie :data="chartData" height="100%"></ve-pie>
    </div>
    <hr>
    <h3>在线时间统计</h3>
    <div class="three">
      <ve-line :data="chartData" height="100%"></ve-line>
    </div>
    <div class="four">
      <ve-histogram :data="chartData" height="100%"></ve-histogram>
    </div>


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
      username: window.sessionStorage.getItem('username'),
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
    };
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
