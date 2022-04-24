<template>
  <div>
    <div style="width: 70%;float: left">
      <!--  评论区  -->
      <div style="height: 120px;">
        <div style="float: left;margin-left: 50px">
          <el-avatar> {{ username }}</el-avatar>
          <p>{{ username }}</p>
        </div>
        <div style="float: right;margin-right: 50px;width: 670px">
          <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入评论内容"
              v-model="textarea">
          </el-input>
        </div>
        <el-button type="primary" plain @click="pushComment">发表评论</el-button>
      </div>

      <!--  评论列表  -->
      <el-divider><h3>评论列表</h3></el-divider>
      <div v-for="item in comments">
        <div style="height: 100px;margin-top: 10px;">
          <div style="float: left;margin-left: 50px">
            <el-avatar> {{ item.username }}</el-avatar>
            <p>{{ item.username }}</p>
          </div>
          <div style="float: right;margin-right: 50px;width: 670px">
            <el-input
                placeholder="请输入内容"
                v-model="item.comment"
                :disabled="true">
            </el-input>
            <br>
            {{ item.date }}
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import {Message} from "element-ui";

export default {
  name: "Comment",
  props: ['course_id'],
  data() {
    return {
      uid: jwt.decode(sessionStorage.getItem('token')).uid,
      username: jwt.decode(sessionStorage.getItem('token')).username,
      textarea: '',
      comments: '',
      course_id: '',
    }
  },

  watch: function (newData, oldData) {
    id:{
      this.course_id = newData
    }
  },

  created() {
    this.getComments(this.course_id)
  },

  methods: {
    // 根据课程id获取评论
    async getComments(id) {
      const {data: res} = await this.$http.get(`/comments/course/${id}`)
      this.comments = res.data.reverse()
    },

    // 发表评论
    async pushComment() {
      const params = {
        uid: this.uid,
        username: this.username,
        course_id: this.course_id,
        comment: this.textarea
      }

      const {data: res} = await this.$http.post('/comments', params)
      if (res.code === 1)
        Message.success('发表成功')
      this.getComments(this.course_id)
    },
  }
}
</script>

<style scoped>

</style>
