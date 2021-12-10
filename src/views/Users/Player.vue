<template>
  <div>
    <el-container>
      <!--header-->
      <el-header>
        <!--   导航栏   -->
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
              <img src="../../assets/image/logo.png" style="height: 100%">
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/" style="font-size: 18px;text-decoration: none;">首页</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/course" style="font-size: 18px;text-decoration: none;">课程</router-link>
            </el-menu-item>
            <el-menu-item index="4" style="float: right">
              <router-link to="/login" style="font-size: 18px;text-decoration: none;" v-show="show_login">登录
              </router-link>
              <router-link to="/user/test1" style="font-size: 18px;text-decoration: none;" v-show="show_admin">
                <img src="../../assets/image/login.png" alt="" style="height: 30px">
              </router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!--main-->
      <el-main>
        <div class="main">
          <h2>1.1 吴文化的形成</h2>
          <!--  播放器  -->
          <div class="player">
            <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
          </div>

          <div>
            <span>
              <el-button @click="lastChapter">上一节</el-button>
            </span>
            <!--            <p>{{ playerOptions }}</p>-->
            <span>
              <el-button @click="nextChapter()">下一节</el-button>
            </span>
          </div>

          <!--  下方内容  -->
          <div>
            <h2>内容</h2>
            <p>苏州话是吴语的代表，也是中国最悠久的方言之一。早在商代泰伯奔吴的时候，苏州话的前身——上古吴语就已经形成了。苏州话发展有两个变动比较大的时期早在商代泰伯奔吴的时候，苏州话发展有两个变动比较大的时期…</p>
            <hr>
          </div>
        </div>
      </el-main>

      <!--footer-->
      <el-footer>
        jssvc
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  name: "Player",
  components: {videoPlayer},
  data() {
    return {
      show_login: true,
      show_admin: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.25, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时, player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', //url地址
            src: 'https://mooc1vod.stu.126.net/nos/mp4/2018/07/03/1009821001_293fe31b086e487bafd2ee1ac818461f_sd.mp4', //url地址
          },
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 全屏按钮
        },
      },
    }
  },

  created() {
    //  判断用户是否登录(Y：跳转播放页/N：提示登录)
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      this.$router.push('/')
    } else {
      this.$router.push('/player')

      //  修改状态栏
      this.show_login = false
      this.show_admin = true
    }
  },

  methods: {
    // 上一节
    lastChapter() {
      // let lastChapterId = id - 1
      // console.log(lastChapterId)
      // this.playerOptions.sources.src = '../../' + lastChapterId + '.mp4'
      // this.playerOptions.sources.src = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      // console.log(this.playerOptions.sources.src)
      Message.info("暂无资源")
    },
    // 下一节
    nextChapter(id) {
      // let nextChapterId = id + 1
      // console.log(nextChapterId)
      Message.info("暂无资源")
    }
  }
}
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 0 auto;
}

.player {
  width: 900px;
  height: 500px;
  margin: 0 auto;
}
</style>
