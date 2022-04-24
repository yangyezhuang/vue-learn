<template>
  <div>
    <!--课程列表-->
    <div v-for="course in myCourses" >
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

    <!--  空状态  -->
    <div v-show="dividerShow">
      <el-empty description="暂无课程"></el-empty>
    </div>

    <!--  back top    -->
    <el-backtop :bottom="80">Top</el-backtop>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import {MessageBox} from 'element-ui';
import jwt from "jsonwebtoken";

export default {
  name: "test1",
  data() {
    return {
      role: '',
      dividerShow: '',
      myCourses: ''
    }
  },

  created() {
    this.getUserLikes()
  },

  methods: {
    // 查看用户收藏的课程
    async getUserLikes() {
      //  判断用户是否登录
      const tokenStr = sessionStorage.getItem('token')
      if (!tokenStr) {
        this.$router.push('/')
      } else {
        // 查找用户的全部课程
        let str = jwt.decode(sessionStorage.getItem('token'))
        this.uid = str.uid
        let uid = this.uid
        this.role = str.role

        const {data: res} = await this.$http.get(`/users/${uid}/courses`)
        this.myCourses = res.data;
        if (res.data.length === 0) {
          this.dividerShow = true
        } else {
          this.dividerShow = false
        }
      }
    },

    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push('/courses/detail/' + course_id);
    },

    // 根据id取消课程
    delCourse(course_id) {
      MessageBox.confirm('是否取消收藏该课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/users/${this.uid}/course/${course_id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("取消收藏")
          location.reload()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
