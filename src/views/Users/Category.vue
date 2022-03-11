<template>
  <div>
    <!--    <el-container>-->
    <!--   TopBar   -->
    <TopBar></TopBar>

    <!--   课程列表   -->
    <el-main>
      <div class="main">
        <div>
          <el-tag>经典</el-tag>
          <el-tag>现代</el-tag>
          <el-tag>儿童</el-tag>
          <el-tag>网络</el-tag>
        </div>
        <el-divider></el-divider>


        <el-empty description="暂未开放"></el-empty>

      </div>
    </el-main>
    <!--    </el-container>-->

    <el-footer>
      <FootBar ></FootBar>
    </el-footer>
  </div>
</template>

<script>
import TopBar from "./TopBar";
import FootBar from "./FootBar";

export default {
  name: "Category",
  components: {
    TopBar,
    FootBar
  },
}
</script>

<style scoped>
.main {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}
</style>
