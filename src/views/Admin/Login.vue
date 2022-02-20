<template>
  <div class="login_container">
    <h1 style="margin-top: 0">后台管理系统</h1>
    <a href="http://localhost:8080">网站首页</a>


    <div class="login_box">
      <!--  头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/image/logo.png" alt="">
      </div>

      <!--  登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_info">
        <!-- 用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <!--   按钮   -->
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据
      loginForm: {
        username: 'admin',
        password: '1212'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    // 登录
    login() {
      this.$router.push('/admin/home')
      // 表单预验证
      // this.$refs.loginFormRef.validate(async valid => {
      //   if (!valid) return;
      //   const {data: res} = await this.$http.post('login', this.loginForm);
      //   if (res.meta.status !== 200)
      //     return this.$message.error('账号或密码错误')
      //   this.$message.success('登陆成功')
      //   // console.log(res)
      //
      //   //  1.将登陆成功之后的token保存到客户端的sessionStorage中
      //   //   1.1 除了登录页，其他页面必须在登录之后才能访问
      //   //   1.2 token之应该在网站打开期间生效，所以保存到sessionStorage
      //   console.log(res)
      //   window.sessionStorage.setItem('token', res.data.token)
      //   //  2. 登录成功后转跳到 '/Home'
      //   this.$router.push('/Home')
      // })
    },

    // 点击重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #9DD3E8;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #a4e3ce;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: lightgray;
    }
  }
}

.login_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>

