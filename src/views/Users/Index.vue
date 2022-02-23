<template>
  <el-container>
    <!--  TopBar  -->
    <TopBar></TopBar>

    <!--  轮播图  -->
    <div style="width: 98%;margin: 0 auto">
      <!--  <el-carousel trigger="click" height="200px">  -->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in shuffling" :key="item">
          <img :src="item" alt="" style="width: 100%;height: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>


    <!--  main  -->
    <el-main style="width: 1200px;margin: 0 auto">
      <!--  优势  -->
      <div style="margin: 0 auto;width: 1000px;height: 70px;">
        <el-row :gutter="10">
          <el-col :span="6" v-for="good in goods">
            <div
                style="width: 150px;height: 70px;border-radius: 20px 0;background-color: #FDF9F0;box-shadow: 2px 2px 5px #888888;margin-left: 170px">
              <i class="el-icon-success" :style="{color:green}"/>
              优势 {{ good.id }}
              <h2 style="margin-bottom: 5px">{{ good.text }}</h2>
            </div>
          </el-col>
        </el-row>
      </div>
      <br>
      <hr>


      <!--  精选课程  -->
      <h2 style="text-align:left;margin-left: 15px">精选课程</h2>
      <el-row :gutter="40">
        <el-col :span="6" v-for="course in hotCourse">
          <div class="grid-content bg-purple"
               style="box-shadow: 2px 2px 5px #888888" @click="toCourseDetail(course.id)">
            <div>
              <img :src="course.img"
                   style="width: 100%;height:80%;border-radius: 15px 15px 0 0"
                   alt=""
              >
            </div>
            <h4 style="margin:5px 130px 5px 0">{{ course.title }}</h4>
            <div style="height: 40px;">
              <p style="margin-left: 20px;float:left;">{{ course.people }} 人参加</p>
              <el-tag type="success" style="float:right;margin:5px 5px 5px 5px">免费</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
      <hr>

      <!--  热门课程  -->
      <h2 style="text-align:left;margin-left: 15px">热门课程</h2>
      <el-row :gutter="40">
        <el-col :span="6" v-for="course in hotCourse">
          <div class="grid-content bg-purple"
               style="box-shadow: 2px 2px 5px #888888" @click="toCourseDetail(course.id)">
            <div>
              <img :src="course.img"
                   style="width: 100%;height:80%;border-radius: 15px 15px 0 0"
                   alt=""
              >
            </div>
            <h4 style="margin:5px 130px 5px 0">{{ course.title }}</h4>
            <div style="height: 40px;">
              <p style="margin-left: 20px;float:left;">{{ course.people }} 人参加</p>
              <el-tag type="warning" style="float:right;margin:5px 5px 5px 5px">热门</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
      <hr>

      <!--   下方图片   -->
      <img src="../../assets/image/footer.png" alt="" style="width: 100%" @click="$router.push('/courses')">
    </el-main>


    <!--  back top  -->
    <el-backtop :bottom="80">Top</el-backtop>

    <!--  el-footer  -->
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
      shuffling: [
        require('../../assets/image/lunbo4.jpg'),
        require('../../assets/image/lunbo5.png'),
        require('../../assets/image/lunbo6.png'),
        require('../../assets/image/lunbo7.png'),
        require('../../assets/image/lunbo8.png')
      ],
      goods: [{id: 1, text: '优质'}, {id: 2, text: '高效'}, {id: 3, text: '免费'}],
      hotCourse: "",
      green: "green"
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
