<template>
  <div>
    <h1 style="color: #009EDD">课程管理</h1>
    <hr>
    <el-row :gutter="80">
      <el-col :span="6" v-for="course in myCourses">
        <div style="background-color: #d0e5ee;border-radius: 20px;margin: 30px ">
          <img src="https://img.51miz.com/Element/00/81/05/84/f9f18671_E810584_8db240b4.jpg" alt=""
               style="height: 150px;width: 100%;border-radius: 20px 20px 0px 0px">
          <span>
<!--           <p>NO:{{ course.id }}</p>-->
             <h2>{{ course.title }}</h2>
          </span>

          <span>
            <!-- 查看课程  -->
            <el-button type="success" icon="el-icon-check" circle @click="toCourseDetail(id)"></el-button>
            <!--  删除课程  -->
            <el-button type="danger" icon="el-icon-delete" circle @click="delCourse(id)"></el-button>
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
      // myCourses: ''
      myCourses: myCourses
    }
  },

  created() {
    //  判断用户是否登录
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      this.$router.push('/')
    } else {
      // 查找用户添加的全部课程
      this.$http.get('/myCourses').then((res) => {
        this.myCourses = res.data;
      })
    }
  },

  methods: {
    // 去课程详情页
    toCourseDetail(id) {
      this.$router.push("/courseDetail")
    },

    // 根据id取消课程
    delCourse(id) {
      this.$http.post('/delCourse', {course_id: id}).then((res) => {
        console.log('delete success')
      })
      Message.success("课程删除成功")
      this.$router.push('/user/test1')
    }
  }
}
</script>

<style scoped>
</style>
