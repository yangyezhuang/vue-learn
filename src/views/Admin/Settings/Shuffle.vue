<template>
  <div>
    <el-card>
      <!--  -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-button>添加图片</el-button>
        </el-col>
      </el-row>

      <!-- 评论列表 -->
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
    async getShuffle() {
      const {data: res} = await this.$http.get("/shuffle")
      this.shuffleList = res.data
    },

    // 删除
    async delComment(id) {
      // const {data: res} = await this.$http.delete(`comments/del/${id}`)
      Message.info('暂未开放')
      // location.reload()
    }
  }
}
</script>

<style scoped>

</style>
