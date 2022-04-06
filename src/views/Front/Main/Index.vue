<template>
  <div>
    <!--  <el-container>-->

    <!--  TopBar  -->
    <TopBar></TopBar>


    <!--  轮播图  -->
    <!--  <el-carousel trigger="click" height="200px"style="width: 90%;margin: 0 auto">  -->
    <el-carousel :interval="4000" type="card" height="200px" style="width: 90%;margin: 0 auto">
      <el-carousel-item v-for="item in shuffle" :key="item">
        <img :src="item.url" alt="" style="width: 100%;height: 100%">
      </el-carousel-item>
    </el-carousel>
    <br>


    <!--  main  -->
    <el-main style="width: 1200px;margin: 0 auto">
      <!--  优势  -->
      <div style="margin: 0 auto;width: 1000px;height: 70px;">
        <el-row :gutter="10">
          <el-col :span="6" v-for="good in goods">
            <div style="width: 130px;height: 70px;border-radius: 10px 0;background-color: white;
            box-shadow: 2px 2px 5px #1368D3;margin-left: 170px">
              <i class="el-icon-success" :style="{color:green}"/>
              优势 {{ good.id }}
              <h2 style="margin-bottom: 5px">{{ good.text }}</h2>
            </div>
          </el-col>
        </el-row>
      </div>
      <br>
      <el-divider></el-divider>


      <!--  精选课程  -->
      <h2 style="text-align:left;">精选课程</h2>
      <el-row :gutter="50">
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
      <el-divider></el-divider>


      <!--  热门课程  -->
      <h2 style="text-align:left;">热门课程</h2>
      <el-row :gutter="40">
        <el-col :span="4" v-for="course in hotCourse.reverse()">
          <div class="grid-content bg-purple"
               style="box-shadow: 2px 2px 5px #888888" @click="toCourseDetail(course.id)">
            <img :src="course.img" style="width: 210px;height: 124px" alt="">
            <h4 style="text-align:left;margin-top: 5px">{{ course.title }}</h4>
            <div style="height: 40px;">
              <p style="text-align:left;margin-top: 5px">{{ course.people }} 在学
                <span>
                  <el-tag type="warning" size="mini" style="float:right;">热门</el-tag>
                </span>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>


      <!--   下方图片   -->
      <img src="../../../assets/image/footer.png" alt="" style="width: 100%" @click="$router.push('/courses')">
    </el-main>


    <!--  back top  -->
    <el-backtop :bottom="80">Top</el-backtop>

    <!--  el-footer  -->
    <FootBar></FootBar>

    <!--  </el-container>  -->
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

export default {
  name: "Test",
  components: {
    TopBar,
    FootBar
  },

  data() {
    return {
      shuffle: '',
      goods: [{id: 1, text: '优质'}, {id: 2, text: '高效'}, {id: 3, text: '免费'}],
      hotCourse: "",
      green: "green",
    }
  },

  created() {
    this.getShuffle()
    this.getHotCourses()
  },

  methods: {
    // 获取轮播图
    async getShuffle() {
      const {data: res} = await this.$http.get("/shuffle")
      console.log(res.data)
      this.shuffle = res.data
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
