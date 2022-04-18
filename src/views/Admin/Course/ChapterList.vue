<template>
  <div>
    <el-row :gutter="40">
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

      <el-col v-for="course in chapterList" style="width: 400px;margin-left: 20px">
        <div style="width: 360px;float: left" @click="viewChapter(course.chapter_id)">
          <video width="360px" height="180px" controls :src="course.chapter_src" type="video/mp4"></video>
          <span>id:{{ course.chapter_id }} </span>
          <span> {{ course.chapter_title }}</span>
          <div style="height: 40px;">
            <el-button type="success" icon="el-icon-view" @click="viewChapter(course.chapter_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delChapter(course.chapter_id)"></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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

    viewChapter() {

    },

    delChapter() {

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

