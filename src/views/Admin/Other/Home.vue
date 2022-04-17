<template>
  <div>
    <el-row :gutter="20">
      <el-col style="width: 100%">
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
        <el-card style="height: auto;width: 100%">
          <div style="width: auto;height: 400px" id="main">
          </div>
        </el-card>
        <el-card style="width: 100%;height: 600px">
          <div style="width: auto;height:600px" id="main1">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "Home2",
  data() {
    return {
      userNum: '',
      courseNum: ''
    }
  },
  mounted() {
    this.echartsInit()
    this.echartsInit1()
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
    },

    //初始化echarts
    echartsInit() {
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({
        title: {
          text: '用户访问统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['全体', '学生', '教师']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '全体',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '学生',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '教师',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      })
    },
    echartsInit1() {
      this.$echarts.init(document.getElementById('main1')).setOption(
          {
            legend: {},
            tooltip: {
              trigger: 'axis',
              showContent: false
            },
            dataset: {
              source: [
                ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
              ]
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top: '55%'},
            series: [
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {focus: 'series'}
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {focus: 'series'}
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {focus: 'series'}
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: {focus: 'series'}
              },
              {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                emphasis: {
                  focus: 'self'
                },
                label: {
                  formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                  itemName: 'product',
                  value: '2012',
                  tooltip: '2012'
                }
              }
            ]
          }
      )
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


