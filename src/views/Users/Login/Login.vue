<template>
  <section>
    <el-container>
      <el-form :model="loginForm" :rules="Rules" ref="User" style="margin: 0 auto">
        <el-form-item prop="username">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="new-password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button plain type="primary" style="width: 100px" @click="$router.push('/admin')">admin</el-button>
          <el-button style="width: 100px" type="primary" @click="login()">登 录</el-button>
        </el-form-item>

        <el-form-item>
          <div style="width: 200px;">
            <p style="float: left;margin-left: 20px" @click="registerShow = true">注册账号</p>
            <p style="float: right;margin-right: 20px" @click="forgetPasswdShow=true">忘记密码</p>
          </div>
        </el-form-item>
      </el-form>
    </el-container>

    <!--  内嵌视图  -->
    <!--  注册  -->
    <el-dialog title="注 册" :visible.sync="registerShow" center :append-to-body='true' :lock-scroll="false"
               width="30%" center>
      <Register></Register>
    </el-dialog>

    <!--  忘记密码  -->
    <el-dialog title="忘记密码" :visible.sync="forgetPasswdShow" center :append-to-body='true' :lock-scroll="false"
               width="30%" center>
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
        if (res.data.code === 1) {
          sessionStorage.setItem('token', res.data.data)
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
p {
  color: #409EFF;
}
</style>
