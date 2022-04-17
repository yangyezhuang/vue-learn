<template>
  <div>
    <!--  卡片区域  -->
    <el-card>
      <el-form ref="form" :model="form" label-width="45%">
        <el-form-item label="用户名">
          <el-col :span="6">
            <el-input v-model="form.username" placeholder="admin" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="6">
            <el-input v-model="form.password" placeholder="admin"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="6">
            <el-input v-model="form.phone" placeholder="13333333333"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col :span="6">
            <el-input v-model="form.email" placeholder="6666@qq.com"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditCourse",
  data() {
    return {
      form: {
        username: window.sessionStorage.getItem('username'),
        password: '',
        phone: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
