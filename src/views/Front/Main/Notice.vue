<template>
  <div>
    <TopBar></TopBar>

    <div class="block" style="width: 1200px;margin: 0 auto">
      <h3>网站公告</h3>
      <el-divider></el-divider>
      <el-timeline v-for="notie in noties.reverse()">
        <el-timeline-item :timestamp="notie.date" placement="top">
          <el-card>
            <h3>{{ notie.title }}</h3>
            <p>{{ notie.text }}</p>
            <p style="float: right">发布人：在线学习平台</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

export default {
  name: "Board",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      noties: ""
    }
  },
  created() {
    this.getAllNotice()
  },
  methods: {
    // 获取全部公告
    async getAllNotice() {
      const {data: res} = await this.$http.get("/notice/all")
      this.noties = res.data
    }
  }
}
</script>

<style scoped>

</style>
