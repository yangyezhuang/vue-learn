<template>
  <div>
    <!--    弹窗    -->
    <el-dialog title="修改用户信息" :visible.sync="openCardDialog">
      <el-form :model="form" label-width="45%">
        <el-form-item label="UID">
          <el-col :span="6">
            <el-input v-model="uid" :disabled="true"></el-input>
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
            <el-button type="primary" @click="save()">保存</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    uid: {}
  },

  computed: {
    openCardDialog: {
      get() {
        return this.visible
      },
      set(val) {
        // console.log(val)
        this.$emit('update:visible', val) // openCardDialog改变的时候通知父组件
      }
    }
  },
  data() {
    return {
      form: {
      },
    }
  },
  watch: {
    uid: function (newVal, oldVal) {
      this.uid = newVal;  //newVal即是uid
      this.getUserInfo();
    }
  },
  methods: {
    async getUserInfo() {
      const {data: res} = await this.$http.get(`/teacher/${this.uid}`)
      this.form = res.data
    },

    save() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
