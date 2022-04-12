<template>
  <div>
    <div v-for="note in notelists">
      <el-card style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <strong style="margin: 0 0 "> {{ note.date }}
            <el-button size="small" icon="el-icon-delete" @click="delNote(note.note_id)"></el-button>
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
  </div>
</template>

<script>
import {Message} from "element-ui";
import jwt from 'jsonwebtoken'


export default {
  name: "UserNote",
  data() {
    return {
      codeStyle: "atom-one-dark", //设置主题 ，
      notelists: ''
    }
  },
  created() {
    this.getAllNotes()
  },
  methods: {
    async getAllNotes() {
      let uid = jwt.decode(sessionStorage.getItem("token")).uid
      const {data: res} = await this.$http.get(`/note/user/${uid}`)
      this.notelists = res.data
      console.log(res.data)
    },

    async delNote(note_id) {
      const {data: res} = await this.$http.delete(`/note/del/${note_id}`)
      if (res.code === 1) {
        Message.success("删除成功")
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.v-note-wrapper.shadow {
  box-shadow: none !important;
}

</style>
