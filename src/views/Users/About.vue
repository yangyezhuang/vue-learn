<template>
  <div>
    <TopBar :show_login=true :how_admin=false></TopBar>

    <h1>项目介绍</h1>
    <h3>本项目是基于vue2.0 + SpringBoot构建的在线学习平台，项目采用前后端分离。前端使用vue + element-ui，后端使用SpringBoot + MySQL实现。
    </h3>

    <hr>
    <h1>关于我们</h1>
    <h3>苏州市职业大学-攻玉工作室</h3>
  </div>
</template>

<script>
import TopBar from "./TopBar";

export default {
  name: "About",
  components: {
    TopBar
  },
  data() {
    return {
      show_login: true,
      show_admin: false,
    }
  }
}
</script>

<style scoped>

</style>
