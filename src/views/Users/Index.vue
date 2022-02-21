<template>
  <el-container>
    <!--   TopBar   -->
    <TopBar></TopBar>

    <!--  main  -->
    <el-main style="width: 1200px;margin: 0 auto">
      <!--   轮播图   -->
      <div class="block">
        <!--  <el-carousel trigger="click" height="250px">  -->
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in lunboImgs" :key="item">
            <img :src="item" alt="" style="width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <hr>

      <!--   热门课程   -->
        <div>
          <h1 style="color: #2BBAFF">热门课程</h1>
          <div style="height: 30px"></div>
          <el-row :gutter="70">
            <el-col :span="6" v-for="course in hotCourse">
              <div class="grid-content bg-purple">
                <div>
                  <img :src="course.img"
                       style="width: 100%;border-radius: 20px 20px 0 0"
                       alt=""
                       @click="toCourseDetail(course.id)">
                </div>
                <h3 style="color: #164B98">{{ course.title }}</h3>
                <p>id：{{ course.id }}</p>
                <strong style="color: #2BBAFF">{{ course.people }} 人在学</strong>
              </div>
            </el-col>
          </el-row>
        </div>
        <hr>

        <!--   下方图片   -->
        <div>
          <img src="../../assets/image/footer.png" alt="" style="width: 100%" @click="toCourses">
        </div>

      <!--  backtop  -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <el-footer>
      <FootBar></FootBar>
    </el-footer>

  </el-container>
</template>

<script>
import TopBar from "./TopBar"
import FootBar from "./FootBar";

export default {
  name: "Test",
  components: {
    TopBar,
    FootBar
  },

  data() {
    return {
      lunboImgs: [
        require('../../assets/image/lunbo1.jpg'),
        require('../../assets/image/lunbo2.jpg'),
        require('../../assets/image/lunbo3.jpg')
      ],
      hotCourse: ""
    }
  },

  created() {
    this.getHotCourses()
  },

  methods: {
    // 热门课程
    getHotCourses() {
      this.$http.get('/courses/hot').then((res) => {
        this.hotCourse = res.data.data;
        console.log(res.data)
      })
    },

    // 转跳到课程列表页
    toCourses() {
      this.$router.push("/courses/all")
    },

    //  跳转到详情页面
    toCourseDetail(courseID) {
      let url = '/courses/detail/' + courseID
      this.$router.push(url)

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
