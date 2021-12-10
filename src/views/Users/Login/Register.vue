<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>注 册</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="手机号">
            <el-input v-model="user.phoneNum" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="register()">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      labelPosition: 'right',
      user: {
        username: '',
        password: '',
        phoneNum: '',
        email: ''
      }
    }
  },

  methods: {
    register() {
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
  height: 450px;
  background-color: rgba(255, 255, 255, 0.3);
  background-size: cover;
  border-radius: 20px;
  margin: 120px auto;
}

#password {
  margin-bottom: 5px;
}

h3 {
  color: #00C758;
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
  width: 70%;
  margin-left: -50px;
  background-color: #7dc49c;
}

</style>
