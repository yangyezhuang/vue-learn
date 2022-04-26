<template>
  <div>
    <el-dialog title="添加笔记" :visible.sync="openCardDialog" width="60%" center>
      <el-form>
        <!-- 嵌入 Markdown 编辑器 -->
        <el-form-item label="">
          <mavon-editor
              style="height: 400px"
              v-model="ruleForm.note"
              @save=""
          ></mavon-editor>
        </el-form-item>
      </el-form>

      <!-- 提交按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button
            :plain="true"
            type="primary"
            @click="save"
        >发布笔记
          </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {Message} from "element-ui"
import "mavon-editor/dist/css/index.css";
import jwt from "jsonwebtoken";

export default {
  name: "Note",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        uid: jwt.decode(sessionStorage.getItem('token')).uid,
        note: "",
      },
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
  methods: {
    async save() {
      const {data: res} = await this.$http.post("/notes", this.ruleForm)
      if (res.code === 1) {
        Message.success('发布成功')
        location.reload()
      }
    }
  }
}
</script>

<style scoped>

</style>
