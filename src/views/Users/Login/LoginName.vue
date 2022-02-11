<template>
  <section>
    <el-container>
      <el-form label-width="120px" :model="loginForm" :rules="Rules" ref="User">
        <el-row>
          <el-col>
            <el-form-item label="账号" prop="username">
              <el-input v-model.number="loginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" auto-complete="new-password"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <span class="pwwd">
          <router-link to="/">找回密码</router-link> |
          <router-link to="/adminLogin">管理员入口</router-link>
        </span>

      </el-form>
    </el-container>
    <br>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="register()">注 册</el-button>
      <el-dialog title="注 册" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false"
                 width="30%">
        <!--  注册组件  -->
        <RegisterName></RegisterName>
      </el-dialog>
      <el-button type="primary" @click="login()">登 录</el-button>
    </div>
  </section>
</template>

<script>
import {Message} from "element-ui"
import RegisterName from "./RegisterName";

export default {
  name: "LoginName",
  components: {
    RegisterName
  },
  data() {
    return {
      dialogTableVisible: false,
      Rules: '',
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
      this.dialogTableVisible = true;//默认页面不显示为false,点击按钮将这个属性变成true
    },
    login() {
      // 本地测试
      // if (this.User.name == 'admin' & this.User.pass == 'admin') {
      //   let token = "YWRtaW46YWRtaW4="
      //   window.sessionStorage.setItem('token', token)
      //   Message.success('登陆成功')
      //   this.$router.push('/')
      // } else {
      //   Message.error('账号或密码错误')
      // }


      // 调用后端接口进行登录
      this.$http.post("/login", this.loginForm).then((res) => {
        if (res.data.code === 0) {
          let token = res.data.token
          window.sessionStorage.setItem('token', token)
          window.sessionStorage.setItem('username', res.data.username)
          Message.success('登陆成功')
          this.$router.push("/course")
        } else {
          Message.error('账号或密码错误')
        }
      })
    },

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
  width: 25%;
  margin-left: 17%;
}
</style>
