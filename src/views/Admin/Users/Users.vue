<template>
  <div>
    <!--   面包屑导航   -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/users">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/admin/users">用户列表</a></el-breadcrumb-item>
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

      <!-- 用户列表 -->
      <el-table :data="userslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="uid" prop="_id" width="220px"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="密码" prop="password" width="170px"></el-table-column>
        <el-table-column label="手机号" prop="phoneNum" width="170px"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="170px"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="scope">
            <!-- {{scope.row}}-->
            <el-button type="primary" icon="el-icon-edit" @click="editUser()"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.username)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import users_data from "../../../assets/data/Users.json";
import {Message} from "element-ui";

export default {
  name: "Users",

  data() {
    return {
      userslist: ''
      // userslist: users_data
    }
  },

  created() {
    // 查询所有用户
    this.$http.get('/allUser').then((res) => {
      this.userslist = res.data
    })
  },

  methods: {
    // 编辑用户信息
    editUser() {
      this.$router.push('/admin/edituser')
    },

    // 删除用户
    delUser(username) {
      this.$http.post('delUser', {username: username}).then((res) => {
        console.log(res.data)
      })
      Message.success('删除成功')
      location.reload()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
