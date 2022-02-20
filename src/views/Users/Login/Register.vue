<template>
  <section>
    <el-container>
      <!--   注册表单   -->
      <el-form label-width="120px" :model="UserForm" :rules="Rules" ref="User">

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="UserForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="UserForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="UserForm.password" auto-complete="new-password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model.number="UserForm.phoneNum" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="username">
          <el-input placeholder="请输入验证码" v-model.number="UserForm.verifyCode" style="width: 200px">
            <template slot="append">
              <el-button round @click="sendVerifyCode">验证码</el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </el-container>

    <!--  按钮区域  -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="register()">注 册</el-button>
    </div>
  </section>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Register",
  data() {
    return {
      Rules: '',
      UserForm: {
        email: '',
        verifyCode: '',
        username: '',
        password: '',
        phoneNum: ''
      }
    }
  },
  methods: {
    // 发送验证码
    sendVerifyCode() {
      this.$http.get(`/sendVerifyCode/${this.UserForm.email}`).then((res) => {
        console.log(res.data)
      })
      Message.success("已发送，请注意查收")
    },

    // 注册
    register() {
      if (!this.UserForm.username) {
        Message.error("请输入用户名！");
        return;
      } else if (!this.UserForm.email) {
        Message.error("请输入邮箱！");
        return;
      } else if (this.UserForm.email != null) {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.UserForm.email)) {
          Message.error("请输入有效的邮箱！");
        } else if (!this.UserForm.password) {
          Message.error("请输入密码！");
          return;
        } else {
          this.$http.post("/register", this.UserForm).then(res => {
            if (res.data.code == 1) {
              Message.success("注册成功，快去登陆吧")
              this.$router.push("/")
            } else {
              Message.error(res.data.data)
            }
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.el-button {
  width: 30%;
  margin-left: 35%;
}
</style>
