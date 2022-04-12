<template>
  <div>
    uid:{{msg}}
    <el-form>
      <!-- 嵌入 Markdown 编辑器 -->
      <el-form-item label="">
        <mavon-editor
            style="height: 400px"
            v-model="ruleForm.content"
            @save=""
        ></mavon-editor>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button
            :plain="true"
            type="primary"
            @click.prevent="save"
        >发布笔记
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Message} from "element-ui"
import "mavon-editor/dist/css/index.css";

export default {
  name: "Note",
  props: ['msg'],
  data() {
    return {
      ruleForm: {
        uid: '',
        content: "",
      },
    }
  },
  methods: {
    async save() {
      let params = {
        uid: this.msg,
        note: this.ruleForm.content
      };
      const {data: res} = await this.$http.post("/note/add", params)
      if (res.code === 1) {
        Message.success('发布成功')
        // this.$router.push('/mg/home')
      }
    }
  }
}
</script>

<style scoped>

</style>
