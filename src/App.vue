<template>
  <div id="app">
<!--    <TopBar v-show="!(path ==='/**')"></TopBar>-->
    <router-view/>
  </div>
</template>

<script>
import TopBar from "./views/Users/TopBar";
import FootBar from "./views/Users/FootBar";

export default {
  name: 'App',
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      path: ''
    }
  },
  // 判断路由
  mounted() {
    this.path = this.$route.path;
    // console.log(this.$route.path)
  },
  watch: {
    $route(to, from) {
      this.path = to.path
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
