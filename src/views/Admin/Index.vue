<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'">
      <el-menu
          router
          unique-opened
          background-color="#324c6d"
          text-color="white"
          active-text-color="deepskyblue"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
      >
        <!--logo-->
        <el-submenu>
          <template slot="title">
            <img src="../../assets/image/lg.png" alt="" style="width: 25px;float: left;margin-top: 15px">
            <span style="text-align: center;font-size: 17px;color: white;margin-top: 0;margin-bottom: 0">后台管理系统</span>
          </template>
        </el-submenu>

        <!-- 一级菜单 -->
        <el-submenu
            :index="item.id + ''"
            v-for="item in menus"
            :key="item.id"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.authName }}</span>
          </template>

          <!-- 二级菜单 -->
          <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
          >
            <template slot="title">
              <i :class="subItem.icon"></i>
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
          <!--  折叠/展开  -->
          <span>
            <i class="el-icon-s-fold" @click="Collapse"></i>
          </span>

          <!--  面包屑  -->
          <div style="margin-top: 12px;">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                  v-for="item in breadList"
                  :key="item.path"
                  :to="{ path: item.path }"
              >{{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>

        <!--  下拉列表  -->
        <el-menu>
          <el-menu-item>
            <el-popover
                v-show=true
                placement="bottom"
                width=100
                trigger="hover">
              <el-avatar slot="reference">admin</el-avatar>
              用户：admin
              <br>
              UID：001
              <el-menu-item @click="$router.push('/mg/adminInfo')">
                <i class="el-icon-user"></i>
                信息修改
              </el-menu-item>
              <el-menu-item @click="logout">
                <i class="el-icon-switch-button"></i>
                退出登录
              </el-menu-item>
            </el-popover>
          </el-menu-item>
        </el-menu>
      </el-header>

      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menus_data from '../../assets/data/Menu.json'

export default {
  name: "Home",
  data() {
    return {
      menus: Menus_data,
      isCollapse: false
    };
  },
  computed: {
    breadList() {
      return this.$route.matched;
    }
  },
  methods: {
    Collapse() {
      this.isCollapse = !this.isCollapse
    },
    logout() {
      window.sessionStorage.clear(); // 清除token
      this.$router.push("/admin");
    }
  }
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-main {
  height: 100%;
  width: 100%;
  background-color: #F7F7F7;
}


/* 加过渡给侧边导航*/
.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
}

/*加快侧边栏文字消失的速度*/
.el-menu {
  transition: all 10ms;
}

</style>
