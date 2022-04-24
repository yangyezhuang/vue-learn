<template>
  <div>
    <!--    <el-container>-->
    <TopBar></TopBar>

    <!--   课程列表   -->
    <el-main>
      <div class="main">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item v-for="i in options" @click="getCategory(i.label)">{{ i.label }}</el-menu-item>
        </el-menu>

        <!--    课程列表    -->
        <el-card>
          <course-list :classItems="classItems"></course-list>

          <!--  空状态   -->
          <el-empty v-show="emptyShow" description="暂未课程"></el-empty>
        </el-card>
      </div>
    </el-main>

    <!--    </el-container>-->
    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "../layout/TopBar";
import FootBar from "../layout/FootBar";
import CourseList from "../layout/CourseList";

export default {
  name: "Category",
  components: {
    TopBar,
    FootBar, CourseList
  },
  data() {
    return {
      options: [],
      classItems: '',
      emptyShow: ''
    }
  },
  created() {
    this.getCate()
    this.getDefaultCategory()
    this.getAllCourses()
  },
  methods: {
    // 获取课程类别
    async getCate() {
      const {data: res} = await this.$http.get("/category/catelabel")
      this.options = res.data
    },

    // 获取默认分类
    async getDefaultCategory() {
      let type = "经典"
      const {data: res} = await this.$http.get(`/courses/category/${type}`)
      this.classItems = res.data
    },

    // 获取响应分类
    async getCategory(type) {
      const {data: res} = await this.$http.get(`/courses/category/${type}`)
      this.classItems = res.data
      if (this.classItems.length === 0) {
        this.emptyShow = true
      } else {
        this.emptyShow = false
      }
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
