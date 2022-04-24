<template>
  <div>
    <h3>信息修改</h3>
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
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  name: "UserInfo",
  data() {
    return {
      role: jwt.decode(sessionStorage.getItem("token")).role,
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
    async getUserInfo() {
      let str = jwt.decode(sessionStorage.getItem('token'))
      this.uid = str.uid

      let uid = this.uid
      let headers = {
        "token": sessionStorage.getItem('token')
      }

      const {data: res} = await this.$http.get(`/users/${uid}`, {headers: headers})
      this.form = res.data
    },

    // 修改密码
    updateUserInfo() {

    }
  }
}
</script>

<style>

.el-tabs__item {
  width: 110px;
  color: black !important;
  text-align: center;
  font-size: 15px !important;
  background-color: white;
}


.el-tabs__item.is-active {
  color: white !important;
  background-color: #5B6066 !important;
}

.el-tabs- {
  width: 120px;
}

.el-tabs__active-bar.is-left {
  width: 100%;
  background-color: #5B6066 !important;
}

</style>
