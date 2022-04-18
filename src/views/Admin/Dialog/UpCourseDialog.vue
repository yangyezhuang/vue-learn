<template>
  <div>
    <el-dialog title="修改课程信息" :visible.sync="openCardDialog">
      <el-form :model="form" label-width="45%">
        <el-form-item label="ID">
          <el-col :span="6">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="标题">
          <el-col :span="6">
            <el-input v-model="form.title" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="简介">
          <el-col :span="6">
            <el-input v-model="form.info"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="学时">
          <el-col :span="6">
            <el-input v-model="form.hour"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="6">
            <el-input v-model="form.type"></el-input>
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
import {Message} from "element-ui";

export default {
  name: "UpCourseDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: ''
  },
  computed: {
    openCardDialog: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val) // openCardDialog改变的时候通知父组件
      }
    }
  },
  data() {
    return {
      form: ''
    }
  },
  watch: {
    form: function (newVal, oldVal) {
      this.form = newVal;  //newVal即是uid
    }
  },
  methods: {
    async save() {
      // const {data: res} = await this.$http.post("/notice/add", this.form)
      // if (res.data === "1") {
      Message.success('修改成功')
      //   location.reload()
      // } else {
      //   Message.success(res.data)
      // }
      // this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
