<template>
  <div>
    <!--  笔记列表  -->
    <div v-for="note in notelists">
      <el-card style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <strong style="margin: 0 0 "> {{ note.date }}
            <el-button style="float: right" size="small" icon="el-icon-delete" type="danger" circle plain
                       @click="delNote(note.note_id)"></el-button>
          </strong>
        </div>
        <div style="height: 100px">
          <!-- Markdown 查看器 -->
          <mavon-editor
              class="md"
              style="height: 100%"
              :value="note.note"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="true"
              :ishljs="true"
              :codeStyle="codeStyle"
          ></mavon-editor>
        </div>
      </el-card>
    </div>

    <div v-show="dividerShow">
      <el-empty description="暂无笔记"></el-empty>
    </div>
  </div>
</template>

<script>
import {Message, MessageBox} from "element-ui";
import jwt from 'jsonwebtoken'

export default {
  name: "UserNote",
  data() {
    return {
      codeStyle: "atom-one-dark", //设置主题 ，
      notelists: '',
      dividerShow: ''
    }
  },
  created() {
    this.getAllNotes()
  },
  methods: {
    async getAllNotes() {
      let uid = jwt.decode(sessionStorage.getItem("token")).uid
      const {data: res} = await this.$http.get(`/notes/user/${uid}`)
      this.notelists = res.data.reverse()
      if (res.data.length === 0) {
        this.dividerShow = true
        this.listShow = false
      } else {
        this.dividerShow = false
        this.listShow = true
      }
    },

    // 删除笔记
    delNote(note_id) {
      MessageBox.confirm('是否删除这条笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/notes/${note_id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("删除成功")
          location.reload()
        })
      });
    }
  }
}
</script>

<style scoped>
.v-note-wrapper.shadow {
  box-shadow: none !important;
}

</style>
