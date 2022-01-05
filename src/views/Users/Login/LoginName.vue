<template>
  <section>
    <el-container>
      <el-form label-width="120px" :model="User" :rules="Rules" ref="User">
        <el-row>
          <el-col>
            <el-form-item label="账号" prop="name">
              <el-input v-model.number="User.name" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="User.pass" auto-complete="new-password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <span class="pwwd">
          <router-link to="/">找回密码</router-link>|
          <router-link to="/register">注册账号</router-link>
        </span>

      </el-form>
    </el-container>
    <br>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="adminLogin()">管理员入口</el-button>
      <el-button type="primary" @click="submitForm()">登 录</el-button>
    </div>
  </section>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "LoginName",
  data() {
    return {
      Rules: '',
      User: {
        name: '',
        pass: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('ok')
      if (this.User.name == 'admin' & this.User.pass == 'admin') {
        let token = "YWRtaW46YWRtaW4="
        window.sessionStorage.setItem('token', token)
        Message.success('登陆成功')
        this.$router.push('/course')
      } else {
        Message.error('账号或密码错误')
      }
    },

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
    // },

    //  管理员登录入口
    adminLogin() {
      this.$router.push('/adminLogin')
    }
  }
}
</script>

<style scoped>
.pwwd {
  margin-left: 46%;
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
  width: 30%;
  margin-left: 20%;
}
</style>
