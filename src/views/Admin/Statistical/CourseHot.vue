<template>
  <div>
    <!-- 课程热度  -->
    <el-card shadow="hover" style="height:600px;">
      <template #header>
        <div class="clearfix">
          <span>课程热度</span>
        </div>
      </template>
      <div style="width: auto;height: 500px" id="main">
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "CourseHot",
  data() {
    return {
      userNum: '',
      courseNum: ''
    }
  },
  mounted() {
    this.echartsInit()
  },
  methods: {
    echartsInit() {
      this.$echarts.init(document.getElementById('main')).setOption({
        title: {
          text: '课程热度'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['经典导读', '欣赏与批评', '文学经典导读', '网络经典文集', '中国现代文学', '儿童故事文学']
        },
        series: [
          {
            name: '男',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '女',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
