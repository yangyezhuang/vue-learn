<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/users">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/edituser">信息修改</a></el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form ref="form" :model="form" label-width="45%">
        <el-form-item label="用户名">
          <el-col :span="6">
            <el-input v-model="form.username" placeholder="admin" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="6">
            <el-input v-model="form.password" placeholder="admin"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="6">
            <el-input v-model="form.phoneNum" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col :span="6">
            <el-input v-model="form.email" placeholder="6666@qq.com"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-col>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      username: '',
      form: {
        uid: '',
        username: '',
        password: '',
        phoneNum: '',
        email: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {

    // 获取用户信息
    getUserInfo() {
      let uid = this.$route.params.uid
      let headers = {
        "token": sessionStorage.getItem('token')
      }

      this.$http.get(`/user/info/${uid}`, {headers: headers}).then((res) => {
        this.form = res.data.data[0]
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
</style>
