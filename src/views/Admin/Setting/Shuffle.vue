<template>
  <div>
    <el-card>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-button type="primary" @click="dialogFormVisible = true">添加图片</el-button>
          <!--    弹窗    -->
          <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <br>
            <el-button type="primary" @click="dialogFormVisible = false,updateUserInfo()">上传</el-button>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 列表 -->
      <el-table
          :data="shuffleList"
          border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="图片" prop="url" width="400px">
          <!-- 图片的显示 -->
          <template v-slot="scope">
            <img :src="scope.row.url" min-width="70" height="70"/>
          </template>
        </el-table-column>

        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <el-button type="danger" icon="el-icon-delete"
                       @click="delComment(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Shuffle",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      shuffleList: [],
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      total: ''
    }
  },

  created() {
    this.getShuffle()
  },

  methods: {
    // 获取轮播图
    async getShuffle() {
      const {data: res} = await this.$http.get("/shuffle")
      this.shuffleList = res.data
    },

    // 删除
    async delComment(id) {
      // const {data: res} = await this.$http.delete(`comments/del/${id}`)
      Message.info('暂未开放')
      // location.reload()
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>

<style scoped>

</style>
