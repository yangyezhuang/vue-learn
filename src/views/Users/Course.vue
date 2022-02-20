<template>
  <div>
    <el-container>
      <!--   TopBar   -->
      <TopBar></TopBar>

      <!--   课程列表   -->
      <el-main>
        <div class="main">
          <h3 style="color: #009EDD;margin: 0">课程列表</h3>
          <hr>
          <div id="class_list" v-for="item in classItems" :key="item.title">
            <div id="class_li">
              <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
              <div>
                <h3>{{ item.title }}</h3>
                <p style="color: #029FDD">{{ item.people }} 人在学</p>
                <el-rate disabled v-model="item.score">
                </el-rate>
              </div>
            </div>
          </div>
        </div>


        <!--  back top    -->
        <el-backtop :bottom="80">Top</el-backtop>
      </el-main>

      <!--   footer   -->
      <el-footer>
        <FootBar></FootBar>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopBar from "./TopBar"
import FootBar from "./FootBar";

export default {
  name: "Course",
  components: {
    TopBar,
    FootBar
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
    getAllCourses() {
      this.$http.get('/allCourses').then((res) => {
        this.classItems = res.data.data;
        console.log(res.data)
      })
    },

    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push('/detail/' + course_id);
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
  border-radius: 15px 15px 0px 0px
}

#class_li {
  width: 200px;
  height: 260px;
  background-color: #FFFFFD;
  float: left;
  margin: 20px;
  border-radius: 15px;
}

</style>
