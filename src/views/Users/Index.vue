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
            <img :src="item" style="width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <hr>

      <!--   热门课程   -->
      <div>
        <h1 style="color: #2BBAFF">热门课程</h1>
        <div style="height: 30px"></div>
        <el-row :gutter="40">
          <el-col :span="6" v-for="course in hotCourse">
            <div class="grid-content bg-purple">
              <div>
                <img :src="course.img"
                     style="width: 100%;border-radius: 20px 20px 0 0"
                     @click="toCourseDetail(id)">
              </div>
              <h3 style="color: #164B98">{{ course.title }}</h3>
              <strong style="color: #2BBAFF">{{ course.people }}人在学</strong>
            </div>
          </el-col>
        </el-row>
      </div>
      <hr>

      <!--   下方图片   -->
      <div>
        <img src="../../assets/image/footer.png" alt="" style="width: 100%" @click="toCourses">
      </div>

      <!--  backtop    -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <el-footer>
      <FootBar></FootBar>
    </el-footer>

  </el-container>
</template>

<script>
import hotCourse from '../../assets/data/hotCourse.json'
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
        'https://img.sanhao.com/community_news/19882/20170923152036473.jpg',
        'https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8d5494eef01f3a297bbad39b9425bc315c607c70.jpg',
        'https://img.51miz.com/Element/00/81/05/84/f9f18671_E810584_8db240b4.jpg'
      ],
      // hotCourse: hotCourse,
      hotCourse: ""
    }
  },

  created() {
    // 课程列表前四
    this.$http.get('/hotCourses').then((res) => {
      this.hotCourse = res.data;
      console.log(res.data)
    })
  },

  methods: {
    toCourses() {
      this.$router.push("/course")
    },

    //  跳转到详情页面
    toCourseDetail(id) {
      let url = '/courseDetail?id=' + 10001
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
