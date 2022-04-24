<template>
  <div>
    <el-card>
      <!-- 搜索栏 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入用户名">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="userslist.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="uid" prop="uid" width="100px"></el-table-column>
        <el-table-column label="用户名" prop="username" width="100px"></el-table-column>
        <el-table-column label="密码" prop="password" width="120px"></el-table-column>
        <el-table-column label="手机号" prop="phoneNum" width="120px"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="170px"></el-table-column>
        <el-table-column label="备注"></el-table-column>
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
        <el-table-column label="操作" width="220px">
          <template v-slot="scope">
            <!-- {{scope.row}}-->
            <el-button type="success" icon="el-icon-pie-chart" @click="toUserDraw(scope.row.uid)"></el-button>
            <!--  <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>-->
            <el-button type="primary" icon="el-icon-edit" @click="openDialog(scope.row.uid)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.uid)"></el-button>
            <!--    弹窗    -->
            <up-stu-dialog :visible.sync="visible" :uid="uid"></up-stu-dialog>
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
import {Message, MessageBox} from "element-ui";
import UpStuDialog from "../Dialog/UpStuDialog";

export default {
  name: "Users",
  components: {
    UpStuDialog
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
      dialogTableVisible: false,
      // dialogFormVisible: false,
      formLabelWidth: '120px',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 6 // 当前每页显示的条数
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
      const {data: res} = await this.$http.get('/users')
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
      const {data: res} = await this.$http.put(`/users/${userinfo.uid}/state/${userinfo.status}`)
      if (res.code != 1) {
        userinfo.status = !userinfo.status
        return Message.error('更新用户状态失败！')
      }
      Message.success('更新用户状态成功')
    },

    // 去用户画像页
    toUserDraw(uid) {
      this.$router.push(`/mg/userManager/draw/${uid}`)
    },

    // 修改用户信息
    async updateUserInfo() {
      // const {data: res} = await this.$http.post("/notice/add", this.form)
      // if (res.data === "1") {
      Message.success('修改成功')
      //   location.reload()
      // } else {
      //   Message.success(res.data)
      // }
    },

    // 删除用户
    delUser(uid) {
      MessageBox.confirm('是否删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`users/${uid}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("删除成功")
          location.reload()
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
