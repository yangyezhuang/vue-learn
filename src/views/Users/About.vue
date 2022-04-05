<template>
  <div>
    <TopBar></TopBar>

    <el-main>
      <div class="main">
        <h3>项目介绍</h3>
        <el-divider></el-divider>
        <img src="../../assets/image/logo.png" alt="" style="height: 120px;border-radius: 50%">
        <p>本项目是基于Vue+ SpringBoot构建的在线学习平台，项目采用前后端分离。<br>
          前端使用vue + element-ui，后端使用SpringBoot + MySQL实现。
        </p>
        <el-divider></el-divider>

        <h3>关于我们</h3>
        <el-divider></el-divider>
        <h4>Coder_y</h4>
        <div style="width: 100%;height: 200px"></div>
      </div>
    </el-main>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "./TopBar"
import FootBar from "./FootBar";


export default {
  name: "About",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {}
  },
  created() {
    let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJ1cmwiOiJodHRwczovL3Rvb2x0dC5jb20ifV0sImlhdCI6MTY0NjExMDgwNSwiZXhwIjoyNTU2MTE1MTk5LCJhdWQiOiIiLCJpc3MiOiJ0b29sdHQuY29tIiwic3ViIjoiIn0.NhUwqiPfYey9pKHSfrG-ptqEOamIQFK3-K7IrTeBFYU'



  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #0B4393;
}
</style>
