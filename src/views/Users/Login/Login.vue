<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" status-icon label-width="80px">
          <h3>登 录</h3>
          <hr>
          <el-form-item prop="username" label="账号">
            <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <router-link to="/">找回密码</router-link>
          |
          <router-link to="/register">注册账号</router-link>
          <el-form-item>
            <span>
              <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
              <el-button type="primary" @click="adminLogin()" style="background-color: skyblue">管理员登录</el-button>
            </span>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      labelPosition: 'right',
      // user: {
      //   username: '',
      //   password: ''
      // }
    }
  },
  methods: {
    doLogin() {
      if (this.loginForm.username == 'admin' & this.loginForm.password == 'admin') {
        Message.success('登陆成功')
        let token = "YWRtaW46YWRtaW4="
        window.sessionStorage.setItem('token', token)
        this.$router.push('/')
      } else {
        Message.error('账号或密码错误')
      }


      // 调用后端接口进行登录
      // this.$http.post("/login", this.loginForm).then((res) => {
      //   console.log(loginForm)
      //   console.log(res.data)
      //   if (res.data === 0) {
      //     this.$router.push("/admin")
      //   } else {
      //     Message.error('账号或密码错误')
      //   }
      // })
    },

    //  管理员登录入口
    adminLogin() {
      this.$router.push('/adminLogin')
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../../assets/image/bc1.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}

.login-wrap {
  width: 400px;
  height: 360px;
  background-color: rgba(255, 255, 255, 0.3);
  background-size: cover;
  border-radius: 20px;
  margin: 215px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}

#password {
  margin-bottom: 5px;
}

h3 {
  color: #0c9a4c;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}

a:hover {
  color: coral;
}

.el-button {
  width: 50%;
  margin-left: -50px;
  background-color: #7dc49c;
}
</style>
