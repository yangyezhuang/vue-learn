<template>
  <div>
    <!--<el-container>-->
    <TopBar></TopBar>

    <!--   课程列表   -->
    <el-main>
      <div class="main">
        <h3 style="color: #009EDD;margin: 0">与“{{ keyword }}”相关课程</h3>
        <el-divider></el-divider>

        <!--  相关课程列表  -->
        <div v-for="item in classItems" :key="item.title">
          <el-card>
            <div id="card_box">
              <div id="card_box_left">
                <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
              </div>
              <div id="card_box_right">
                <h3 style="text-align:left;">{{ item.title }}</h3>
                <p style="text-align:left;">{{ item.info.toString().substr(0, 45) }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>


      <!--  backtop  -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <FootBar></FootBar>
    <!--   </el-container>  -->
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

export default {
  name: "Search",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      keyword: '',
      classItems: '',
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
    },

    // 根据id转跳课程详情页
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
  height: 100%;
}

#card_box {
  height: 120px;
  float: left;
  margin: 20px;
}

#card_box_left {
  float: left;
  height: 100%;
  width: 300px
}

#card_box_right {
  margin-left: 350px;
  width: 750px;
  margin-top: 0
}

</style>
