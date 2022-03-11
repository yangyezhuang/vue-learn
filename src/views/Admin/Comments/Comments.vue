<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/comments">评论管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/comments">评论列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片区域  -->
    <el-card>
      <!-- 搜索栏 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 评论列表 -->
      <el-table
          :data="commentsList.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
          border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="评论ID" prop="comment_id" width="100px"></el-table-column>
        <el-table-column label="uid" prop="uid" width="100px"></el-table-column>
        <el-table-column label="用户名" prop="username" width="100px"></el-table-column>
        <el-table-column label="课程id" prop="course_id" width="120px"></el-table-column>
        <el-table-column label="日期" prop="date" width="160px"></el-table-column>
        <el-table-column label="评论内容" prop="comment"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <!-- {{scope.row}}-->
            <el-button type="danger" icon="el-icon-delete"
                       @click="delComment(scope.row.comment_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Comments",

  data() {
    return {
      commentsList: '',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      total: ''
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    // 查询所有评论
    async getUserList() {
      const {data: res} = await this.$http.get('/comments/all')
      this.commentsList = res.data
      this.total = res.data.length
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    },


    // 删除评论
    delComment(comment_id) {
      this.$http.delete(`comments/del/${comment_id}`).then((res) => {
      })
      Message.success('删除成功')
      location.reload()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
