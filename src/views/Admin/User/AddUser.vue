<template>
  <div>
    <el-card>
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" :label-position="left" label-width="80px">
        <el-form-item label="头像" prop="username">
          <el-upload
              style="float: left"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>        </el-form-item>
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
        <el-form-item label="角色">
          <div style="float: left">
            <el-radio v-model="userForm.radio" label="stu">学生</el-radio>
            <el-radio v-model="userForm.radio" label="tch">教师</el-radio>
          </div>
        </el-form-item>
        <el-button type="primary" round @click="addUser()">创建用户</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "AddGoods",
  data() {
    return {
      userForm: {
        username: '',
        password: '',
        phonenum: '',
        email: '',
        radio: ''
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
    addUser() {
      // 表单预验证
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          // 发起post请求，添加用户
          this.$http.post('/users', this.userForm).then((res) => {
            if (res.code === 1)
              Message.success(res.data)
          })

          // 添加成功后，返回用户列表页
          this.$router.push('/mg/userManager/users')
        }
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>

<style scoped>

</style>
