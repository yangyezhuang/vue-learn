<template>
  <el-container>
    <!-- 侧边栏  -->
    <el-aside style="width: 200px;">
      <el-menu
          router
          unique-opened
          background-color="#324c6d"
          text-color="white"
          active-text-color="#409EFF"
      >
        <!--    logo    -->
        <div style="height: 60px;margin-left: 30px">
          <img src="../../../public/logo.jpg" alt="" style="height: 40px;border-radius: 5px"
               @click="$router.push('/')"/>
        </div>
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
          <span>后台管理系统</span>
        </div>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>

      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>

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
  created() {
    // this.getMenuToTree()
  },

  methods: {
    // 获取菜单并转化为Tree
    async getMenuToTree() {
      const {data: res} = await this.$http.get("/menus")
      let list = res.data
    },

    // 退出
    logout() {
      // 清除token
      window.sessionStorage.clear();
      this.$router.push("/admin");
    }
  }
  ,
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: black;
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
  background-color: #324c6d;
  height: auto;

  .el-menu {
    border-right: none;
    height: auto;
  }

}

.el-main {
  height: 100%;
  width: 100%;
  background-color: #F7F7F7;
}
</style>
