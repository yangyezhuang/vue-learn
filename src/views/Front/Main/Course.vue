<template>
  <div>
    <!--  <el-container>  -->
    <!--  TopBar  -->
    <TopBar></TopBar>

    <!--   课程列表   -->
    <el-main>
      <div class="main">
        <h3 style="margin: 0">全部课程</h3>
        <el-divider></el-divider>
        <div id="class_list" v-for="item in classItems" :key="item.title">
          <div id="class_li">
            <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
            <div>
              <h3 style="text-align:left;margin-top: 5px">{{ item.title }}</h3>
              <p style="text-align:left;margin-top: 5px">{{ item.people }} 人在学
                <span>
                  <el-tag size="mini" style="float:right;margin-right: 5px">{{ item.type }}</el-tag>
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>

      <!--  back top    -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <!--   footer   -->
    <FootBar></FootBar>
    <!--    </el-container>-->
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

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
      this.$http.get('/courses/all').then((res) => {
        this.classItems = res.data.data;
        console.log(res.data)
      })
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
