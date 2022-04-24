<template>
  <div>
    <!--   课程列表 -->
    <div id="class_list" v-for="item in classItems" :key="item.title">
      <div id="class_li">
        <img :src="item.img" alt="" @click="toCourseDetail(item.id)">
        <div>
          <h3 style="text-align:left;margin-top: 5px">{{ item.title }}</h3>
          <p style="text-align:left;margin-top: 5px">{{ item.people }} 人在学
            <span>
              <el-tag size="mini" style="float:right;margin-right: 5px">{{ item.type }}</el-tag>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props: ['classItems'],
  data() {
    return {
      classItems: ''
    }
  },
  watch: {
    classData: function (newData, oldData) {
      this.classItems = newData
    }
  },

  methods: {
    //  跳转到详情页面
    toCourseDetail(courseID) {
      let url = '/courses/detail/' + courseID
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 50%;
  border-radius: 5px 5px 0 0
}

#class_li {
  width: 200px;
  height: 200px;
  background-color: #FFFFFD;
  float: left;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888888
}
</style>
