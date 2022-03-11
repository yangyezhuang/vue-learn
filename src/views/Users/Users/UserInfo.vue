<template>
  <div>
    <el-card>
      <h1>个人信息</h1>
      <!--  表单  -->
      <el-form ref="form" :model="form" label-width="45%">
        <el-form-item label="UID">
          <el-col :span="6">
            <el-input v-model="form.uid" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="6">
            <el-input v-model="form.username" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="6">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="6">
            <el-input v-model="form.phoneNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col :span="6">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-button type="primary" @click="updateUserInfo">保存</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
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
      let uid = sessionStorage.getItem('uid')
      let headers = {
        "token": sessionStorage.getItem('token')
      }

      this.$http.get(`/user/info/${uid}`, {headers: headers}).then((res) => {
        this.form = res.data.data
        console.log(res.data.data)
      })
    },

    // 修改密码
    updateUserInfo() {

    }
  }
}
</script>

<style scoped>
</style>
