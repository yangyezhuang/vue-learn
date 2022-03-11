<template>
  <div>
    <el-row :gutter="20">
      <el-col style="width: 350px">
        <!-- 卡片  -->
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <el-avatar :size="70"> admin</el-avatar>

            <div class="user-info-cont">
              <div class="user-info-name">admin</div>
              <div>管理员</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2019-11-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>北京</span>
          </div>
        </el-card>
        <!-- 课程热度  -->
        <el-card shadow="hover" style="height:252px;">
          <template #header>
            <div class="clearfix">
              <span>课程热度</span>
            </div>
          </template>
          唐诗
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          传统文化
          <el-progress :percentage="63.1" color="#f1e05a"></el-progress>
          吴文化
          <el-progress :percentage="45.7"></el-progress>
          传统美德
          <el-progress :percentage="18.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>

      <!--  用户数量  -->
      <el-col :span="16" style="width: 800px">
        <el-row :gutter="20" class="mgb20">
          <el-col>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ userNum }}</div>
                  <div>用户数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">3231</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ courseNum }}</div>
                  <div>课程数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:220px;">
          <template #header>
            <div class="clearfix">
              <span>各项指标</span>
            </div>
          </template>
          <div>
            <el-progress type="circle" :percentage="25"></el-progress>
            <el-progress type="circle" :percentage="100" status="success"></el-progress>
            <el-progress type="circle" :percentage="70" status="warning"></el-progress>
            <el-progress type="circle" :percentage="50" status="exception"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>

export default {
  name: "Home2",
  data() {
    return {
      userNum: '',
      courseNum: ''
    }
  },

  created() {
    this.totalUser()
    this.totalCourses()
  },

  methods: {
    async totalUser() {
      const {data: res} = await this.$http.get("/user/all")
      this.userNum = res.data.length
    },

    async totalCourses() {
      const {data: res} = await this.$http.get("/courses/all")
      this.courseNum = res.data.length
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

</style>
