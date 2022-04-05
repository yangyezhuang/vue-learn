<template>
  <div>
    <el-row :gutter="20">
      <el-col style="width: 30%">
        <!-- 课程热度  -->
        <el-card shadow="hover" style="height:250px;">
          <template #header>
            <div class="clearfix">
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
        <!-- 饼图  -->
        <el-card shadow="hover" class="mgb20" style="height:auto;margin-top: 15px">
          <template #header>
            <div class="clearfix">
              <span>统计分析</span>
            </div>
          </template>
          <div style="height: auto">
            <ve-Pie :data="chartData" height="350px"></ve-Pie>
          </div>
        </el-card>
      </el-col>

      <!--  用户数量  -->
      <el-col style="width: 65%">
        <!--   小方块   -->
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ userNum }}</div>
                  <div>用户数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">3231</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ courseNum }}</div>
                  <div>课程数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-4">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ courseNum }}</div>
                  <div>在线人数</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!--  echarts  -->
        <el-card style="height: auto">
          <div class="one">
            <ve-bar :data="chartData" height="100%" ></ve-bar>
          </div>
          <div class="one">
            <ve-histogram :data="chartData" height="100%"></ve-histogram>
          </div>
          <hr>
          <div class="four">
            <ve-line :data="chartData" height="100%"></ve-line>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import Vehistogram from "v-charts/lib/line.common";
import VePie from "v-charts/lib/pie.common";
import VeBar from "v-charts/lib/bar.common"

export default {
  name: "Home2",
  components: {
    VeLine,
    Vehistogram,
    VePie,
    VeBar
  },
  data() {
    return {
      userNum: '',
      courseNum: '',
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
  },

  created() {
    this.totalUser()
    this.totalCourses()
  },

  methods: {
    async totalUser() {
      const {data: res} = await this.$http.get("/user/all")
      this.userNum = res.data.length
    },

    async totalCourses() {
      const {data: res} = await this.$http.get("/courses/all")
      this.courseNum = res.data.length
    }
  }
}
</script>

<style scoped>

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
  background: yellowgreen;
}

.grid-con-4 .grid-num {
  color: yellowgreen;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}


.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}


* {
  margin: 0;
  padding: 0;
}


.one {
  width: 50% !important;
  height: 300px !important;
  float: left;
}

.four {
  width: 100% !important;
  height: 280px !important;
  float: left;
}

</style>


