<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mg' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/mg">数据统计</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/mg/statistic1">用户性别统计</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div style="width: auto;height: 400px" id="main">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Proportion",
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit()
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({
        title: {
          text: '用户男女占比',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '男'},
              {value: 735, name: '女'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
