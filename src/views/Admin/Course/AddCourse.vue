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
      <el-form :model="goodsForm" :label-position="left" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="goodsForm.region"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="goodsForm.type"></el-input>
        </el-form-item>
      </el-form>

      <!-- 上传图片 -->
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
        <el-button size="small" type="primary">点击上传封面</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <!-- 添加按钮 -->
      <el-row>
        <el-button type="primary" round @click="addCourse">添加课程</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data() {
    return {
      goodsForm: {
        name: '',
        region: '',
        type: ''
      }
    }
  },

  methods: {
    // 添加课程
    addCourse() {
      this.$message.success('添加成功')
      this.$router.push('admin/addCourse')
    }
  }
}

</script>

<style scoped>
</style>
