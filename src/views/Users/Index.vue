<template>
  <el-container>
    <!--   导航栏   -->
    <el-header>
      <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <img src="../../assets/image/logo.png" style="height: 100%">
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
          </el-menu-item>
          <el-menu-item index="4" style="float: right">
            <router-link to="/login" style="font-size: 18px;text-decoration: none;" v-show="show_login">登录</router-link>
            <router-link to="/user/test1" style="font-size: 18px;text-decoration: none;" v-show="show_admin">
              <img src="../../assets/image/login.png" alt="" style="height: 30px">
            </router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <!--  main  -->
    <el-main style="width: 1200px;margin: 0 auto">
      <!--   轮播图   -->
      <div class="block">
        <!--        <el-carousel trigger="click" height="250px">-->
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in lunboImgs" :key="item">
            <img :src="item" style="width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <hr>

      <!--   热门课程   -->
      <div>
        <h1>热门课程</h1>
        <div style="height: 30px"></div>
        <el-row :gutter="40">
          <el-col :span="6" v-for="course in hotCourse">
            <div class="grid-content bg-purple">
              <div>
                <img :src="course.img"
                     style="width: 100%;border-radius: 20px 20px 0 0"
                     @click="toCourseDetail(id)">
              </div>
              <h3 style="color: orangered">{{ course.title }}</h3>
              <p style="color: #00C758">{{ course.people }}人在学</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <hr>
      <!--   下方图片   -->
      <div>
        <img src="../../assets/image/footer.png" alt="" style="width: 100%" @click="toCourses">
      </div>
    </el-main>

    <!--  footer  -->
    <el-footer>jssvc</el-footer>
  </el-container>
</template>

<script>
// import hotCourse from '../../assets/data/hotCourse.json'

export default {
  name: "Test",
  data() {
    return {
      show_login: true,
      show_admin: false,
      lunboImgs: [
        'https://img.sanhao.com/community_news/19882/20170923152036473.jpg',
        'https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8d5494eef01f3a297bbad39b9425bc315c607c70.jpg',
        'https://img.51miz.com/Element/00/81/05/84/f9f18671_E810584_8db240b4.jpg'
      ],
      // hotCourse: hotCourse,
      hotCourse: ""
    }
  },

  created() {
    // 课程列表前四
    this.$http.get('/hotCourses').then((res) => {
      this.hotCourse = res.data;
    })

    //  判断登录状态
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
    } else {
      this.show_login = false
      this.show_admin = true
    }
  },

  methods: {
    toCourses() {
      this.$router.push("/login")
    },
    //  跳转到详情页面
    toCourseDetail(id) {
      this.$router.push('/courseDetail')
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
