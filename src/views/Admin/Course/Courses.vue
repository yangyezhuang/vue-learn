<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/goods">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/goods">课程列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片区域  -->
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-button type="primary">添加课程</el-button>
          </el-row>
        </el-col>
      </el-row>

      <!-- 课程列表 -->
      <el-table :data="classItems" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="课程id" prop="id" width="150px"></el-table-column>
        <el-table-column label="课程名称" prop="title" width="300px"></el-table-column>
        <el-table-column label="课程介绍" prop="info"></el-table-column>
        <el-table-column label="学时" prop="hour" width="100px"></el-table-column>
        <el-table-column label="学习人数" prop="people" width="100px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <el-button type="primary" icon="el-icon-edit" @click="editGoods"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteGoods"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[30, 60, 90, 120]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Courses",
  data() {
    return {
      // 课程数据
      classItems: ''
    };
  },

  created() {
    // //获取全部课程数据
    this.$http.get('/courses').then((res) => {
      this.classItems = res.data;
    })
  },

  methods: {
    //  编辑课程信息
    editGoods() {
      // this.$router.push('/editgoods')
    },

    //  删除课程
    deleteGoods() {
      console.log('delete')
      // this.$message.error('课程已删除！')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
