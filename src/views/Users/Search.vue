<template>
  <div>
    <el-container>
      <!--   TopBar   -->
      <TopBar></TopBar>

      <!--   课程列表   -->
      <el-main>
        <div class="main">
          <h3 style="color: #009EDD;margin: 0">相关课程</h3>
          <el-divider></el-divider>

          <div id="class_list" v-for="item in classItems" :key="item.title">
            <div id="class_li">
              <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
              <div>
                <h3>{{ item.title }}</h3>
                <p style="color: #029FDD">{{ item.people }}人在学</p>
              </div>
            </div>
          </div>
        </div>


        <!--  backtop  -->
        <el-backtop :bottom="80">Top</el-backtop>
      </el-main>

      <!--   footer   -->
      <el-footer>
        <FootBar></FootBar>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopBar from "./TopBar"
import FootBar from "./FootBar";

export default {
  name: "Search",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      keyword: '',
      classItems: ''
    }
  },

  created() {
    this.searchCourses()
  },

  methods: {
    // 搜索相关课程
    async searchCourses() {
      let keyword = this.$route.params.keyword

      const {data: res} = await this.$http.get(`/courses/search/${keyword}`)
      this.classItems = res.data;
      // location.reload()
      console.log(res.data)
    },

    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push('/courses/detail/' + course_id);
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}

img {
  width: 100%;
  height: 50%;
}

#class_li {
  width: 200px;
  height: 200px;
  background-color: #FFFFFD;
  float: left;
  margin: 20px;
  box-shadow: 2px 2px 5px #888888
}

</style>
