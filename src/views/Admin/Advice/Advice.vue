<template>
  <div>
    <el-card>
      <!-- 搜索栏 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 列表 -->
      <el-table :data="adviceList.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="id" prop="id" width="100px"></el-table-column>
        <el-table-column label="标题" prop="title" width="120px"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="姓名" prop="name" width="100px"></el-table-column>
        <el-table-column label="联系方式" prop="phone" width="150px"></el-table-column>
        <el-table-column label="日期" prop="date" width="170px"></el-table-column>

        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <!-- {{scope.row}}-->
            <el-button type="danger" icon="el-icon-delete" @click="delAdvice(scope.row.id)"></el-button>
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
  name: "Advice",
  data() {
    return {
      adviceList: '',
      formLabelWidth: '120px',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      total: ''
    }
  },

  created() {
    this.getAllAdvice()
  },

  methods: {
    // 查询所有
    async getAllAdvice() {
      const {data: res} = await this.$http.get('/advice/all')
      this.adviceList = res.data
      this.total = res.data.length
    },

    // 删除
    async delAdvice(uid) {
      const {data: res} = await this.$http.delete(`advice/del/${uid}`)
      Message.success(res.data)
      location.reload()
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
