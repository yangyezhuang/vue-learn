<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/courses">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/addcourse">添加课程</a></el-breadcrumb-item>
    </el-breadcrumb>


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
      </el-form>

      <!--  上传文件  -->
      <el-upload
          class="pop-upload"
          ref="upload"
          action=""
          :file-list="fileList"
          :auto-upload="false"
          :multiple="true"
          :on-change="handleChange"
          :on-remove="handleRemove"
      >
        <el-button round type="success" slot="trigger" size="small">选取文件</el-button>
      </el-upload>

      <hr>

      <!-- 添加按钮 -->
      <el-row>
        <el-button type="primary" @click="submitUpload">上传课程</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "AddGoods",
  data() {
    return {
      infoForm: {
        title: '',
        info: '',
        hour: ''
      },
      fileList: []
    }
  },

  methods: {
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
