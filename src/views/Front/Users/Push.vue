<template>
  <div>
    <el-card>
      <!-- 表单 -->
      <el-form :model="infoForm" :label-position="left" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="infoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="infoForm.info"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="infoForm.hour"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <div style="float: left">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="上传文件">
          <div style="float: left">
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="submitUpload">上传课程</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Push",
  data() {
    return {
      infoForm: {
        title: '',
        info: '',
        hour: ''
      },
      options: '',
      value: '',
      fileList: []
    }
  },
  created() {
    this.getCategory()
  },

  methods: {
    // 获取课程类别
    async getCategory() {
      const {data: res} = await this.$http.get("/category")
      this.options = res.data
    },

    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用,function(file, fileList)
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。function(file, fileList)
    handleRemove(file, fileList) {
      this.fileList = fileList
    },

    //上传服务器
    submitUpload() {
      //判断是否有文件再上传
      if (this.fileList.length === 0) {
        return Message.error('请选取文件后再上传')
      }

      // 创建一个空的FormData对象:
      const formData = new FormData()
      // 使用FormData.append来添加键/值对到表单里面；
      this.fileList.forEach((file) => {
        formData.append('file', file.raw)
      })
      // 添加自定义参数，不传可删除
      formData.append('title', this.infoForm.title)
      formData.append('info', this.infoForm.info)
      formData.append('hour', this.infoForm.hour)

      // 发起请求
      this.$http.post('/upload', formData).then(res => {
        if (res.data.code === 1) {
          console.log(res.data)
          Message.success('上传成功');
        } else {
          console.log(res.data)
          Message.error('上传失败');
        }
        //清空fileList
        this.fileList = []
      })
    }
  }

}

</script>

<style scoped>
</style>
