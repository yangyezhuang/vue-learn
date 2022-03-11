<template>
  <section>
    <el-container>
      <el-form label-width="120px" :model="loginForm" :rules="Rules" ref="User">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="new-password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label-width="70px">
          <el-button @click="forgetPasswdShow=true">忘记</el-button>
          <el-button @click=" $router.push('/adminLogin')">管理员</el-button>
          <br>

          <el-button type="primary" @click="registerShow = true">注 册</el-button>
          <el-button type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-container>

    <!--  内嵌视图  -->
    <!--  注册  -->
    <el-dialog title="注 册" :visible.sync="registerShow" center :append-to-body='true' :lock-scroll="false"
               width="30%">
      <Register></Register>
    </el-dialog>

    <!--  忘记密码  -->
    <el-dialog title="忘记密码" :visible.sync="forgetPasswdShow" center :append-to-body='true' :lock-scroll="false"
               width="30%">
      <ForgetPasswd></ForgetPasswd>
    </el-dialog>

  </section>
</template>

<script>
import {Message} from "element-ui"
import Register from "./Register";
import ForgetPasswd from "./ForgetPasswd";

export default {
  name: "Login",
  components: {
    Register,
    ForgetPasswd
  },
  data() {
    return {
      registerShow: false,
      forgetPasswdShow: false,
      Rules: '',
      loginForm: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post("/login", this.loginForm).then((res) => {
        console.log(this.loginForm)
        console.log(res.data)
        if (res.data.code === 1) {
          sessionStorage.setItem('uid', res.data.data.uid)
          sessionStorage.setItem('token', res.data.data.token)
          sessionStorage.setItem('username', res.data.data.username)
          Message.success('登陆成功')
          location.reload()
        } else {
          Message.error(res.data.data)
        }
      })
    }
  }
}
</script>

<style scoped>
.el-button {
  width: 25%;
  margin-left: 17%;
}
</style>
