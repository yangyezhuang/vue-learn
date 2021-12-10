<template>
  <div>
    <el-container>
      <!--  header  -->
      <el-header>
        <!--   导航栏   -->
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

      <!--   main   -->
      <el-main>
        <div class="main">
          <!--   课程列表   -->
          <div id="class_list" v-for="item in classItems" :key="item.title">
            <div id="class_li">
              <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
              <div>
                <h3>{{ item.title }}</h3>
                <p style="color: #00CC7E">{{ item.people }}人参加</p>
              </div>
            </div>
          </div>
        </div>
      </el-main>

      <!--   footer   -->
      <el-footer>jssvc</el-footer>
    </el-container>
  </div>
</template>

<script>
// import data from '../../assets/data/data.json'

export default {
  name: "Course",
  data() {
    return {
      show_login: true,
      show_admin: false,
      // classItems: data,
      classItems: ''
    }
  },
  created() {
    // 获取全部课程
    this.$http.get('/courses').then((res) => {
      this.classItems = res.data;
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
    // 根据id转跳对应的课程详情页
    toCourseDetail(id) {
      this.$router.push({
        path: '/coursedetail',
        query: {
          id: id
        }
      });
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
