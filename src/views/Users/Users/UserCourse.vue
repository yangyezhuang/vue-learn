<template>
  <div>
    <el-tabs tab-position="left" style="height: auto">
      <el-tab-pane label="我的课程">
        <el-card>
          <div v-show="dividerShow">
            <el-empty description="暂无课程"></el-empty>
          </div>

          <div v-for="course in myCourses" :v-show="listShow">
            <el-card style="width: 90%;height: 170px;margin: 20px auto;">
              <!--  左图 -->
              <img :src="course.img" alt=""
                   style="height: 120px;width: 220px;border-radius: 10px;float: left;margin: 5px 20px 10px">

              <!-- 右div -->
              <div style="width: 63%;float: left;margin-left: 10px">
                <h3 style="text-align:left;margin-top: 10px">{{ course.title }}</h3>
                <p style="text-align:left;margin-top: 0;color: gray">{{ course.info.toString().substr(0, 50) }}</p>
                <!--                <br>-->
                <span style="float: right;margin-top: 0">
                  <el-button type="primary" size="small" @click="toCourseDetail(course.id)">观看课程</el-button>
                  <el-button type="danger" size="small" @click="delCourse(course.id)">取消课程</el-button>
                </span>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="课程兑换">
        <el-empty description="暂未开放"></el-empty>
      </el-tab-pane>
    </el-tabs>

    <!--  back top    -->
    <el-backtop :bottom="80">Top</el-backtop>

  </div>
</template>

<script>
import {Message} from 'element-ui'
import jwt from "jsonwebtoken";

export default {
  name: "test1",
  data() {
    return {
      dividerShow: '',
      listShow: '',
      myCourses: ''
    }
  },

  created() {
    this.getUserLikes()
  },

  methods: {
    // 查看用户收藏的课程
    getUserLikes() {
      //  判断用户是否登录
      const tokenStr = sessionStorage.getItem('token')
      if (!tokenStr) {
        this.$router.push('/')
      } else {
        // 查找用户的全部课程
        let str = jwt.decode(sessionStorage.getItem('token'))
        this.uid = str.uid
        let uid = this.uid

        this.$http.get(`/user/courses/${uid}`).then((res) => {
          this.myCourses = res.data.data;
          if (res.data.data.length === 0) {
            this.dividerShow = true
            this.listShow = false
          } else {
            this.dividerShow = false
            this.listShow = true
          }
        })
      }
    },

    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push('/courses/detail/' + course_id);
    },

    // 根据id取消课程
    delCourse(course_id) {
      let uid = this.uid

      this.$http.delete(`/user/${uid}/course/${course_id}`).then((res) => {
        console.log(res.data)
      })
      Message.success("课程删除成功")
      location.reload() // 重新加载当前页面
    }
  }
}
</script>

<style scoped>

</style>
