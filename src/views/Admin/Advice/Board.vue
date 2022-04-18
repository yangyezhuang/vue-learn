<template>
  <div class="main">
    <el-card>
      <el-row :gutter="30">
        <el-col :span="8">
          <!--发布公告-->
          <el-button type="primary" @click="openDialog()">发布公告</el-button>
          <!--    弹窗    -->
          <add-notice-dialog :visible.sync="visible"></add-notice-dialog>
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
import AddNoticeDialog from "../Dialog/AddNoticeDialog";

export default {
  name: "Board",
  components: {
    AddNoticeDialog
  },
  data() {
    return {
      notices: '',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 10// 当前每页显示的条数
      },
      totalSize: '',
      visible: false
    }
  },
  created() {
    this.getAllNotice()
  },

  methods: {
    // 获取全部公告数据
    async getAllNotice() {
      const {data: res} = await this.$http.get('/notice/list')
      this.notices = res.data;
      this.totalSize = res.data.length
    },

    //  删除公告
    async delNotice(id) {
      const {data: res} = await this.$http.delete(`/notice/del/${id}`)
      Message.success(res.data)
      location.reload()
    },

    // 发布公告
    openDialog() {
      this.visible = true
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
}
</script>

<style scoped>

</style>
