<template>
  <div class="main">
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/courses">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/courses">课程列表</a></el-breadcrumb-item>
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
      </el-row>

      <!-- 课程列表 -->
      <el-table :data="classItems.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="课程id" prop="id" width="100px"></el-table-column>
        <el-table-column label="课程名称" prop="title" width="150px"></el-table-column>
        <el-table-column label="课程介绍" prop="info"></el-table-column>
        <el-table-column label="学时" prop="hour" width="50px"></el-table-column>
        <el-table-column label="学习人数" prop="people" width="100px"></el-table-column>
        <el-table-column label="操作" width="150px">
          <el-button type="primary" icon="el-icon-edit" @click="editCourse"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delCourse"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 7, 9]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Courses",
  data() {
    return {
      classItems: '',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      totalSize: '',
    };
  },

  created() {
    this.getAllCourses()
  },

  methods: {
    // 获取全部课程数据
    getAllCourses() {
      this.$http.get('/courses/all').then((res) => {
        this.classItems = res.data.data;
        this.totalSize = res.data.data.length

      })
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    },

    //  编辑课程信息
    editCourse() {
      this.$router.push('/admin/editCourse')
    },

    //  删除课程
    delCourse() {
      Message.success("删除成功")
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
