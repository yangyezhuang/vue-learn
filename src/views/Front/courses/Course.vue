<template>
  <div>
    <!--  <el-container>  -->
    <TopBar></TopBar>

    <!--   课程列表   -->
    <el-main>
      <div class="main">
        <h3 style="text-align: center;margin: 0">全部课程</h3>
        <el-divider></el-divider>
        <!--课程列表-->
        <course-list :classItems="classItems"></course-list>
      </div>

      <!--  back top    -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <FootBar></FootBar>
    <!--    </el-container>-->
  </div>
</template>

<script>
import TopBar from "../layout/TopBar"
import FootBar from "../layout/FootBar";
import CourseList from "../layout/CourseList";

export default {
  name: "Course",
  components: {
    TopBar,
    FootBar,
    CourseList
  },
  data() {
    return {
      classItems: ''
    }
  },

  created() {
    this.getAllCourses()
  },

  methods: {
    // 获取全部课程
    async getAllCourses() {
      const {data: res} = await this.$http.get('/courses')
      this.classItems = res.data;
    },

    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push(`/courses/detail/${course_id}`);
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
  border-radius: 5px 5px 0 0
}

#class_li {
  width: 200px;
  height: 200px;
  background-color: #FFFFFD;
  float: left;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888888
}

</style>
