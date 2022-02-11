<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/users">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/adduser">创建用户</a></el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" :label-position="left" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.phonenum"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <!--  创建按钮  -->
        <el-button type="primary" round @click="addUser()">创建用户</el-button>
      </el-form>
    </el-card>

    <!-- 表单 -->
  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data() {
    return {
      // 表单数据
      userForm: {
        username: '',
        password: '',
        phonenum: '',
        email: ''
      },
      //  表单规则
      userFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    // 创建用户
    addUser() {
      // 表单预验证
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          // 请求参数
          var req_Info = {
            username: this.userForm.username,
            password: this.userForm.password,
            phonenum: this.userForm.phonenum,
            email: this.userForm.email
          }
          // 发起post请求，添加用户
          this.$http.post('addUser', req_Info).then((res) => {
            console.log(res)
          })
          Message.success('用户创建成功')
          // 添加成功后，返回用户列表页
          this.$router.push('/users')
        } else {
          console.log('')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
