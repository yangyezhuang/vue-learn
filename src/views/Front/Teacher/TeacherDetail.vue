<template>
  <div>
    <TopBar></TopBar>

    <el-main>
      <div class="main">
        <el-card>
          <img :src="teacherInfo.img" alt="" @click="toTeacherDetail(item.uid)">
          <h3 style="margin-top: 5px">{{ teacherInfo.username }}</h3>
          <h3 style="text-align: left">简介：</h3>
          <p style="text-align:left;margin-top: 5px">{{ teacherInfo.info }}
            <span>
            <el-tag size="mini" style="float:right;margin-right: 5px">{{ teacherInfo.type }}</el-tag>
            </span>
          </p>
          <el-divider></el-divider>
          <h3>所教课程</h3>
        </el-card>
      </div>

      <!--  back top    -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "../Layout/TopBar"
import FootBar from "../Layout/FootBar";

export default {
  name: "TeacherDetail",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      uid: this.$route.params.id,
      teacherInfo: ''
    }
  },

  created() {
    this.getInfo(this.uid)
  },

  methods: {
    async getInfo(uid) {
      const {data: res} = await this.$http.get(`/teacher/${uid}`)
      this.teacherInfo = res.data;
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
  width: 120px;
  height: 150px;
}
</style>

