<template>
  <div>
    <el-card>
      <div style="width: auto;height: 400px" id="main">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClassType",
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
          text: '课程类别统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   top: '5%',
        //   left: 'center'
        // },
        legend: {
          // orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '热度',
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
              {value: 1048, name: '现代'},
              {value: 735, name: '历史'},
              {value: 580, name: '儿童'},
              {value: 484, name: '经典'},
              {value: 300, name: '社会'},
              {value: 500, name: '当代'}
            ]
          }
        ]
        // title: {
        //   text: '课程类别统计',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        // tooltip: {
        //   trigger: 'item'
        // },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        // series: [
        //   {
        //     name: 'Access From',
        //     type: 'pie',
        //     radius: '50%',
        //     data: [
        //       {value: 1048, name: '现代'},
        //       {value: 735, name: '历史'},
        //       {value: 580, name: '儿童'},
        //       {value: 484, name: '经典'},
        //       {value: 300, name: '社会'},
        //       {value: 500, name: '当代'}
        //     ],
        //     emphasis: {
        //       itemStyle: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //       }
        //     }
        //   }
        // ]
      })
    }

  }
}
</script>

<style scoped>

</style>
