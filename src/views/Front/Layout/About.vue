<template>
  <div>
    <TopBar></TopBar>

    <el-main>
      <div class="main">
        <el-tabs :tab-position="tabPosition" style="height: 100%;">
          <el-tab-pane label="项目介绍">
            <h3>项目介绍</h3>
            <img src="../../../assets/image/logo.png" alt="" style="height: 120px;border-radius: 50%">
            <p>本项目是基于Vue+ SpringBoot构建的在线学习平台，项目采用前后端分离。<br>
              前端使用vue + element-ui，后端使用SpringBoot + MySQL实现。
            </p>
          </el-tab-pane>
          <el-tab-pane label="关于我们">
            <h3>关于我们</h3>
            <p>苏州市职业大学-杨业壮</p>
          </el-tab-pane>
          <el-tab-pane label="建议反馈">
            <h3>建议反馈</h3>
            <el-form label-width="120px" :model="AdviceForm" :rules="Rules" ref="User">
              <el-form-item label="标题" prop="email">
                <el-input v-model="AdviceForm.title" placeholder="请输入标题"></el-input>
              </el-form-item>

              <el-form-item label="内容" prop="username">
                <el-input v-model="AdviceForm.content" placeholder="请输入内容" type="textarea" :rows="6"></el-input>
              </el-form-item>

              <el-form-item label="姓名" prop="password">
                <el-input v-model="AdviceForm.name" placeholder="请输入联系姓名"></el-input>
              </el-form-item>

              <el-form-item label="联系方式" prop="password">
                <el-input v-model="AdviceForm.phone" placeholder="请输入联系方式"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" plain @click="submit()">提交</el-button>
              </el-form-item>

            </el-form>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>

    <FootBar></FootBar>
  </div>
</template>

<script>
import TopBar from "./TopBar"
import FootBar from "./FootBar";
import {Message} from "element-ui";

export default {
  name: "About",
  components: {
    TopBar,
    FootBar
  },
  data() {
    return {
      tabPosition: 'left',
      AdviceForm: {
        id: '',
        title: '',
        content: '',
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    async submit() {
      const {data: res} = await this.$http.post('/advice/add', this.AdviceForm)
      if (res.code === 1) {
        Message.success("提交成功");
        location.reload();
      }
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
}

h2 {
  color: #0B4393;
}
</style>
