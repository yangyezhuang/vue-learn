<template>
  <div class="main">
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mg' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/mg/dataAnalyse">网站公告</a></el-breadcrumb-item>
    </el-breadcrumb>


    <!--  卡片区域  -->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="8">
          <!--发布公告-->
          <el-button type="primary" @click="dialogFormVisible = true">发布公告</el-button>
          <!--    弹窗    -->
          <el-dialog title="发布公告" :visible.sync="dialogFormVisible">
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
        </el-col>
      </el-row>

      <!-- 公告列表 -->
      <el-table :data="notices.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="id" prop="id" width="100px"></el-table-column>
        <el-table-column label="标题" prop="title" width="150px"></el-table-column>
        <el-table-column label="内容" prop="text"></el-table-column>
        <el-table-column label="日期" prop="date" width="200px"></el-table-column>
        <el-table-column label="操作" width="100px">
          <template v-slot="scope">
            <el-button type="danger" icon="el-icon-delete" @click="delNotice(scope.row.id)"></el-button>
          </template>
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
import {Message} from "element-ui";

export default {
  name: "Board",
  data() {
    return {
      notices: '',
      form: {
        title: '',
        text: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 10// 当前每页显示的条数
      },
      totalSize: '',
    }
  },
  created() {
    this.getAllNotice()
  },

  methods: {
    // 获取全部公告数据
    async getAllNotice() {
      const {data: res} = await this.$http.get('/notice/all')
      this.notices = res.data;
      this.totalSize = res.data.length
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    },

    //  删除公告
    async delNotice(id) {
      const {data: res} = await this.$http.delete(`/notice/del/${id}`)
      Message.success(res.data)
      location.reload()
    },

    // 发布公告
    async addNotice() {
      const {data: res} = await this.$http.post("/notice/add", this.form)
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
