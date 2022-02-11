<template>
  <div>
    <h1 style="color: #009EDD">课程管理</h1>
    <hr>
    <el-row :gutter="80">
      <el-col :span="6" v-for="course in myCourses">
        <div style="background-color: #d0e5ee;border-radius: 20px;margin: 30px ">
          <img :src="course.img" alt="" style="height: 150px;width: 100%;border-radius: 20px 20px 0px 0px">
          <span>
           <p>NO:{{ course.id }}</p>
             <h2>{{ course.title }}</h2>
          </span>

          <span>
            <!-- 查看课程  -->
            <el-button type="success" icon="el-icon-check" circle @click="toCourseDetail(course.id)"></el-button>
            <!--  删除课程  -->
            <el-button type="danger" icon="el-icon-delete" circle @click="delCourse(course.id)"></el-button>
          </span>
        </div>
      </el-col>
    </el-row>

    <!--  backtop    -->
    <el-backtop :bottom="80">Top</el-backtop>
  </div>
</template>

<script>
import myCourses from '../../../assets/data/hotCourse.json'
import {Message} from 'element-ui'

export default {
  name: "test1",
  data() {
    return {
      myCourses: ''
      // myCourses: myCourses
    }
  },

  created() {
    //  判断用户是否登录
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      this.$router.push('/')
    } else {
      let username = window.sessionStorage.getItem('username')
      // 查找用户添加的全部课程
      this.$http.post('/userCourse', {username: username}).then((res) => {
        this.myCourses = res.data;
        console.log(JSON.stringify(res.data))
      })
    }
  },

  methods: {
    // 根据id转跳对应的课程详情页
    toCourseDetail(course_id) {
      this.$router.push({
        path: '/courseDetail',
        query: {
          id: course_id
        }
      });
    },

    // 根据id取消课程
    delCourse(course_id) {
      let username = window.sessionStorage.getItem('username')
      this.$http.post('/userDelCourse', {username: username, course_id: course_id}).then((res) => {
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
