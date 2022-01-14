<template>
  <div>
    <TopBar></TopBar>

    <el-main>
      <div class="main">
        <h1>项目介绍</h1>
        <img src="../../assets/image/logo.png" style="height: 120px;border-radius: 50%">
        <h3>本项目是基于vue2.0 + SpringBoot构建的在线学习平台，项目采用前后端分离。<br>
          前端使用vue + element-ui，后端使用SpringBoot + MySQL实现。
        </h3>

        <hr>
        <h1>关于我们</h1>
        <h3>苏州市职业大学-攻玉工作室</h3>
      </div>
    </el-main>

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

h1 {
  color: #0B4393;
}

/*h3 {*/
/*  color: #009EDD;*/
/*}*/
</style>
