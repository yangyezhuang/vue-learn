<template>
  <div>
    <el-dialog title="发布公告" :visible.sync="openCardDialog">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,addNotice()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "AddNoticeDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
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
      formLabelWidth: '120px',
      form: {
        title: '',
        text: ''
      },
    }
  },
  methods: {
    // 发布公告
    async addNotice() {
      const {data: res} = await this.$http.post("/notices", this.form)
      if (res.data === "1") {
        Message.success('发布成功')
        location.reload()
      } else {
        Message.success(res.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
