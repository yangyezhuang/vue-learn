<template>
  <div>
    <el-row :gutter="40">
      <!--    上传  -->
      <el-col style="width: 400px">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-col>

      <!--    视频列表  -->
      <el-col v-for="course in chapterList" style="width: 400px;margin-left: 20px">
        <div style="width: 360px;float: left">
          <video width="360px" height="180px" controls :src="course.chapter_src" type="video/mp4"></video>
          <h3 style="text-align: center">章节标题： {{ course.chapter_title }}
            <el-button type="danger" icon="el-icon-delete" size="small" style="float: right"
                       @click="delChapter(course.chapter_id)"></el-button>
          </h3>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Message, MessageBox} from "element-ui";

export default {
  name: "ChapterList",
  data() {
    return {
      course_id: this.$route.params.course_id,
      hotCourse: '',
      chapterList: ''
    }
  },
  created() {
    this.getChapterList()
  },
  methods: {
    //  根据课程id查询章节列表
    async getChapterList() {
      let course_id = this.$route.params.course_id
      const {data: res} = await this.$http.get(`/courses/chapter/${course_id}`)
      this.chapterList = res.data;
    },


    delChapter(id) {
      MessageBox.confirm('是否删除该视频?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`chapter/del/${id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("取消收藏")
          location.reload()
        })
      }).catch(() => {
        Message.info('已取消删除');
      });
    },

    //  跳转到详情页面
    toCourseDetail(courseID) {
      let url = '/courses/detail/' + courseID
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

</style>

