<template>
  <div>
    <!--  <el-container>  -->
    <TopBar></TopBar>

    <!--   师资力量   -->
    <el-main>
      <div class="main">
        <h3 style="margin: 0">师资力量</h3>
        <el-divider></el-divider>
        <div id="class_list" v-for="item in teacherList" :key="item.title">
          <div id="class_li">
            <img :src="item.img" alt="" style="border-radius: 50%" @click="toTeacherDetail(item.uid)">
            <div>
              <h3 style="margin-top: 5px">{{ item.username }}</h3>
              <p style="text-align:left;margin-top: 5px">{{ item.info.slice(0, 30) }} 人在学
                <!--  <span>-->
                <!--  <el-tag size="mini" style="float:right;margin-right: 5px">{{ item.type }}</el-tag>-->
                <!--  </span>-->
              </p>
            </div>
          </div>
        </div>

      </div>

      <!--  back top    -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <FootBar></FootBar>
    <!--    </el-container>-->
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

export default {
  name: "Teacher",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      teacherList: ''
    }
  },

  created() {
    this.getAllCourses()
  },

  methods: {
    // 获取全部
    async getAllCourses() {
      const {data: res} = await this.$http.get('/teacher/all')
      this.teacherList = res.data;
      console.log(res.data)
    },

    // 根据id转跳对应的详情页
    toTeacherDetail(uid) {
      this.$router.push(`/teacher/${uid}`);
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
  width: 55%;
  height: 50%;
  border-radius: 50%
}

#class_li {
  width: 200px;
  height: 250px;
  background-color: lightyellow;
  float: left;
  margin: 20px;
  border-radius: 5px;
  /*box-shadow: 2px 2px 5px #888888*/
}

</style>
