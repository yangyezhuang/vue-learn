<template>
  <div class="main">
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 课程列表 -->
      <el-table :data="classItems.slice((queryInfo.pagenum-1)*queryInfo.pagesize,queryInfo.pagenum*queryInfo.pagesize)"
                border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="课程id" prop="id" width="80px"></el-table-column>
        <el-table-column label="课程名称" prop="title" width="150px"></el-table-column>
        <el-table-column label="课程介绍" prop="info"></el-table-column>
        <el-table-column label="学时" prop="hour" width="50px"></el-table-column>
        <el-table-column label="学习人数" prop="people" width="80px"></el-table-column>
        <el-table-column label="操作" width="210px">
          <template v-slot="scope">
            <el-button type="success" icon="el-icon-view" @click="viewChapter(scope.row.id)"></el-button>
            <el-button type="primary" icon="el-icon-edit" @click="openDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delCourse"></el-button>
            <!--    修改课程信息弹窗    -->
            <up-course-dialog :visible.sync="visible" :form="row"></up-course-dialog>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 7, 9]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {Message, MessageBox} from "element-ui";
import UpCourseDialog from "../Dialog/UpCourseDialog";

export default {
  name: "Courses",
  components: {UpCourseDialog},
  data() {
    return {
      classItems: '',
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      totalSize: '',
      form: {
        id: '',
        title: '',
        info: '',
        time: '',
        type: ''
      },
      visible: false,
      row: ''
    };
  },

  created() {
    this.getAllCourses()
  },

  methods: {
    // 获取全部课程数据
    async getAllCourses() {
      const {data: res} = await this.$http.get('/courses')
      this.classItems = res.data;
      this.totalSize = res.data.length
    },

    // 查看课程详情
    viewChapter(course_id) {
      this.$router.push(`/mg/courseManager/course/${course_id}`)
    },

    // 修改课程信息弹窗
    openDialog(row) {
      this.visible = true
      this.row = row
    },

    //  删除课程
    delCourse(id) {
      MessageBox.confirm('是否删除该课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`courses/${id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("删除成功")
          location.reload()
        })
      })
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
