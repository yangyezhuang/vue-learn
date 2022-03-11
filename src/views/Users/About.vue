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

    <el-footer>
      <FootBar ></FootBar>
    </el-footer>
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
