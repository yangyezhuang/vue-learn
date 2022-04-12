<template>
  <div>
    <el-card>
      <el-form :model="msg" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="站点logo" prop="name">
          <div style="width: 100px;height: 100px;background-color: gainsboro">
            <img src="../../../assets/image/logo.png" alt="" style="width: 100%">
          </div>
        </el-form-item>

        <el-form-item label="站点名称" prop="name">
          <el-input v-model="msg.title" style="float: left;width: 700px"></el-input>
        </el-form-item>

        <el-form-item label="站点描述" prop="name">
          <el-input v-model="msg.info" type="textarea" style="float: left;width: 700px"></el-input>
        </el-form-item>

        <el-form-item label="友情链接" prop="name">
          <el-input v-model="msg.url" style="float: left;width: 700px"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :plain="true" type="primary" style="float: left;" @click.prevent="save">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      imageUrl: '',
      msg: {
        logo: "",
        title: "",
        info: "",
        url: ''
      },
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
