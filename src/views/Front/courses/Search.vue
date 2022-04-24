<template>
  <div>
    <!--<el-container>-->
    <TopBar></TopBar>

    <el-main>
      <div class="main">
        <h3 style="color: #009EDD;text-align: center">与“{{ keyword }}”相关课程</h3>
        <el-divider></el-divider>

        <!--  相关课程列表  -->
        <course-list :classItems="classItems"></course-list>

        <!--空状态-->
        <el-empty v-show="emptyShow" description="暂未课程"></el-empty>
      </div>

      <!--  backtop  -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <FootBar></FootBar>
    <!--   </el-container>  -->
  </div>
</template>

<script>
import TopBar from "../layout/TopBar"
import FootBar from "../layout/FootBar";
import CourseList from "../layout/CourseList";

export default {
  name: "Search",
  components: {
    TopBar,
    FootBar,
    CourseList
  },
  data() {
    return {
      keyword: '',
      classItems: '',
      emptyShow: false
    }
  },

  created() {
    this.searchCourses()
  },

  methods: {
    // 搜索相关课程
    async searchCourses() {
      this.keyword = this.$route.params.keyword
      let keyword = this.keyword
      const {data: res} = await this.$http.get(`/courses/search/${keyword}`)
      this.classItems = res.data

      if (this.classItems.length === 0) {
        this.emptyShow = true
      } else {
        this.emptyShow = false
      }
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
  height: 100%;
}
</style>
