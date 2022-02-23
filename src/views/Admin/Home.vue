<template>
  <el-container>
    <!-- 侧边栏  -->
    <el-aside style="width: 200px;">
      <el-menu
          router
          unique-opened
          background-color="#324157">
        <div style="height: 110px">
          <img src="../../assets/image/logo.png" alt="" style="height: 80px;border-radius: 50px"/>
        </div>
      </el-menu>
      <hr>

      <el-menu
          router
          unique-opened
          background-color="#324157"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <!-- 一级菜单 -->
        <el-submenu
            :index="item.id + ''"
            v-for="item in menus"
            :key="item.id"
        >
          <!-- 一级菜单模板区 -->
          <template slot="title">
            <i class="el-icon-caret-right"></i>
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
          >
            <template slot="title">
              <i class="el-icon-paperclip"></i>
              <span>{{ subItem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>



    <!--  页面主体  -->
    <el-container>
      <!--  头部区域  -->
      <el-header>
        <div>
<!--          <img src="../../assets/image/logo.png" alt=""/>-->
          <span>后台管理系统</span>
        </div>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>

      <el-container>

        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menus_data from '../../assets/data/Menus.json'

export default {
  name: "Home",
  data() {
    return {
      menus: Menus_data
    };
  },

  methods: {
    // 退出
    logout() {
      // 清除token
      window.sessionStorage.clear();
      this.$router.push("/adminLogin");
    }


    // 获取所有菜单
    // async getMenuList() {
    //   const { data: res } = this.$http.get("menus");
    //   // if (res.meta.status !== 200) return this.$message.error("菜单获取失败");
    //   // this.$message.success("菜单获取成功");
    //   console.log(res);
    // },
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #242F42;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 25px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  img {
    height: 60px;
    border-radius: 50%;
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #324157;

  .el-menu {
    border-right: none;
  }

}

.el-main{
  height: 100%;
  width: 100%;
}
</style>
