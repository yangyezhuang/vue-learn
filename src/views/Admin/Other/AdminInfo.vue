<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="45%">
        <el-form-item label="头像">
          <el-col :span="6">
            <el-avatar>admin</el-avatar>
          </el-col>
        </el-form-item>
        <el-form-item label="UID">
          <el-col :span="6">
            <el-input v-model="form.uid" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="6">
            <el-input v-model="form.username" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="6">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="6">
            <el-input v-model="form.phoneNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-col :span="6">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-button type="primary" @click="dialogFormVisible = false,updateUserInfo()">保存</el-button>
          </el-col>
        </el-form-item>
      </el-form>


    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminInfo",
  data(){
    return{
      form: {
        uid: '',
        username: '',
        password: '',
        phoneNum: '',
        email: ''
      },
    }
  }
}
</script>

<style scoped>

</style>
