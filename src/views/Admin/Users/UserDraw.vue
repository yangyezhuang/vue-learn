<template>
  <div>
    <el-card style="height: 600px">
      用户ID： {{ uid }}
      <div style="width: auto;height: 400px" id="main">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserDraw",
  data() {
    return {
      uid: ''
    }
  },
  created() {
    this.uid = this.$route.params.uid
  },
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
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {name: 'Sales', max: 6500},
            {name: 'Administration', max: 16000},
            {name: 'Information Technology', max: 30000},
            {name: 'Customer Support', max: 38000},
            {name: 'Development', max: 52000},
            {name: 'Marketing', max: 25000}
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      })
    }

  }
}
</script>

<style scoped>

</style>
