<template>
  <div>
    <!--   课程id：{{ course_id }}-->
<!--    <video width="320" height="240" controls>-->
<!--      <source src="movie.mp4" type="video/mp4">-->
<!--    </video>-->

    <el-row :gutter="40">
      <el-col v-for="course in hotCourse">
        <div class="grid-content bg-purple" style="box-shadow: 2px 2px 5px #888888"
             @click="toCourseDetail(course.id)">
          <img :src="course.img" style="width: 210px;height: 124px" alt="">
          <h4 style="text-align:left;margin-top: 5px">{{ course.title }}</h4>
          <div style="height: 40px;">
            <p style="text-align:left;margin-top: 5px">{{ course.people }} 在学 |
              <span style="color:limegreen;">免费</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ChapterList",
  data() {
    return {
      course_id: this.$route.params.course_id,
      hotCourse: ''
    }
  },
  created() {
    this.getHotCourses()
  },
  methods: {
    getChapter() {

    },
    // 热门课程
    getHotCourses() {
      this.$http.get('/courses/hot').then((res) => {
        this.hotCourse = res.data.data;
      })
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

