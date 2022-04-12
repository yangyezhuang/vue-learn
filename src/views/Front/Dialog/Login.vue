<template>
  <section>
    <el-container>
      <img src="../../../assets/image/login.jpg" style="width: 50%;" alt="">

      <el-form :model="loginForm" :rules="Rules" ref="User" style="margin: 0 auto">
        <h2 style="text-align: center">登 录</h2>
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="new-password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--权限选择-->
        <el-form-item>
          <el-radio style="margin-left: 30px" v-model="loginForm.radio" label="stu">学生</el-radio>
          <el-radio v-model="loginForm.radio" label="tch">教师</el-radio>
        </el-form-item>
        <!--登陆注册-->
        <el-form-item>
          <el-button @click="registerShow = true" type="primary" plain>注册账号</el-button>
          <el-button style="width: 100px" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
        <!--忘记密码-->
        <el-form-item>
          <p style="float: left;margin-top: 0" @click="$router.push('/admin')">后台管理</p>
          <p style="float: right;margin-top: 0" @click="forgetPasswdShow=true">忘记密码</p>
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
        password: '',
        radio: ''
      }
    }
  },
  methods: {
    async login() {
      const {data: res} = await this.$http.post("/login", this.loginForm)
      if (res.code === 1) {
        Message.success('登陆成功')
        sessionStorage.setItem('token', res.data)
        location.reload()
      } else {
        Message.error(res.data)
      }
    }
  }
}
</script>

<style scoped>
p {
  color: #409EFF;
}
</style>
