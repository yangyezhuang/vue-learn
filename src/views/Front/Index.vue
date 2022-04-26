<template>
  <div>
    <TopBar></TopBar>

    <el-main style="width: 1240px;margin: 0 auto">
      <!--  轮播图  -->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in shuffle" :key="item">
          <img :src="item.url" alt="" style="width: 100%;height: 100%">
        </el-carousel-item>
      </el-carousel>

      <!--  优势  -->
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" style="font-size: 18px;margin-left: 40%">优质</el-menu-item>
        <el-menu-item index="1" style="font-size: 18px;">高效</el-menu-item>
        <el-menu-item index="1" style="font-size: 18px;">免费</el-menu-item>
      </el-menu>

      <!--  精选课程  -->
      <h2 style="text-align:center;">精选课程</h2>
      <course-list :classItems="hotCourse"></course-list>

      <!--  热门课程  -->
      <h2 style="text-align:center;margin-top: 300px">热门课程</h2>
      <course-list :classItems="goodCourse"></course-list>

      <!--   下方图片   -->
      <img src="../../assets/image/footer.png" alt="" style="width: 100%" @click="$router.push('/courses')">
    </el-main>

    <!--  back top  -->
    <el-backtop :bottom="80">Top</el-backtop>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "./layout/TopBar"
import FootBar from "./layout/FootBar";
import CourseList from "./layout/CourseList";

export default {
  name: "Test",
  components: {
    TopBar,
    FootBar,
    CourseList
  },
  data() {
    return {
      shuffle: '',
      hotCourse: "",
      goodCourse: ''
    }
  },

  created() {
    this.getShuffle()
    this.getHotCourses()
  },

  methods: {
    // 获取轮播图
    async getShuffle() {
      const {data: res} = await this.$http.get("/shuffles")
      this.shuffle = res.data
    },

    // 热门课程
    async getHotCourses() {
      const {data: res} = await this.$http.get('/courses/hot')
      this.hotCourse = res.data;
      this.goodCourse = res.data.reverse()
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

</style>
