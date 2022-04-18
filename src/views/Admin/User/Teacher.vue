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

      <!-- 用户列表 -->
      <el-table :data="userslist.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="头像" prop="img" width="75px">
          <!-- 图片的显示 -->
          <template v-slot="scope">
            <img :src="scope.row.img" min-width="70" height="70"/>
          </template>
        </el-table-column>
        <el-table-column label="uid" prop="uid" width="80px"></el-table-column>
        <el-table-column label="用户名" prop="username" width="80px"></el-table-column>
        <!--        <el-table-column label="密码" prop="password" width="120px"></el-table-column>-->
        <!--        <el-table-column label="手机号" prop="phoneNum" width="120px"></el-table-column>-->
        <!--        <el-table-column label="邮箱" prop="email" width="170px"></el-table-column>-->
        <el-table-column label="备注" prop="info"></el-table-column>
        <el-table-column label="状态" prop="status" width="150px">
          <template slot-scope="scope">
            <el-switch
                style="display: block"
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="激活"
                inactive-text="冻结"
                @change=" userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="145px">
          <template v-slot="scope">
            <!-- {{scope.row}}-->
            <!--            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>-->
            <el-button type="primary" icon="el-icon-edit" @click="openDialog(scope.row.uid)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.uid)"></el-button>
            <!--    弹窗    -->
            <update-dialog :visible.sync="visible" :uid="uid"></update-dialog>
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
import UpdateDialog from "../Dialog/UpTchDialog";

export default {
  name: "Teacher",
  components: {
    UpdateDialog
  },
  data() {
    return {
      userslist: '',
      form: {
        uid: '',
        username: '',
        password: '',
        phoneNum: '',
        email: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 4 // 当前每页显示的条数
      },
      total: '',
      visible: false,
      uid: ''
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    openDialog(uid) {
      this.visible = true
      this.uid = uid
    },
    // 查询所有用户
    async getUserList() {
      const {data: res} = await this.$http.get('/teacher/list')
      this.userslist = res.data
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

    // 监听 switch 状态
    async userStateChanged(userinfo) {
      const {data: res} = await this.$http.put(`/user/${userinfo.uid}/state/${userinfo.status}`)
      if (res.meta.status != 200) {
        userinfo.status = !userinfo.status
        return Message.error('更新用户状态失败！')
      }
      Message.success('更新用户状态成功')
    },

    // 删除用户
    async delUser(uid) {
      const {data: res} = await this.$http.post(`user/del/${uid}`)
      Message.success(res.data)
      location.reload()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
