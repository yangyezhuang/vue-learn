<template>
  <section>
    <el-container>
      <!--   注册表单   -->
      <el-form label-width="120px" :model="User" :rules="Rules" ref="User">
        <el-row>
          <el-col>
            <el-form-item label="账号" prop="username">
              <el-input v-model.number="User.username" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="User.password" auto-complete="new-password"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model.number="User.phoneNum" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="邮箱" prop="email">
              <el-input type="password" v-model="User.email" auto-complete="new-password"
                        placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-container>
    <br>

    <!--  按钮区域  -->
    <div slot="footer" class="dialog-footer">
      <!--  <el-button type="primary" @click="adminLogin()">管理员入口</el-button>  -->
      <el-button type="primary" @click="register()">注 册</el-button>
    </div>
  </section>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "RegisterName",
  data() {
    return {
      Rules: '',
      User: {
        username: '',
        password: '',
        phoneNum: '',
        email: ''
      }
    }
  },
  methods: {
    // 用户注册
    register() {
      Message.success("注册成功，快去登陆吧")
      this.closeDialog()

      if (!this.user.username) {
        this.$msg.error("请输入用户名！");
        return;
      } else if (!this.user.email) {
        this.$msg.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$msg.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$msg.error("请输入密码！");
          return;
        } else {
          this.$http
              .post("/register/", {
                name: this.user.username,
                email: this.user.email,
                password: this.user.password
              })
              .then(res => {
                // console.log("输出response.data", res.data);
                // console.log("输出response.data.status", res.data.status);
                if (res.data.status === 200) {
                  this.$router.push({path: "/"});
                } else {
                  alert("您输入的用户名已存在！");
                }
              });
        }
      }
    },

    // 管理员登录
    adminLogin() {
      this.$router.push('/adminLogin')
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
