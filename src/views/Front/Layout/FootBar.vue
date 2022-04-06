<template>
  <div>
    <el-footer>
      <div class="footer">
        <div><h5 style="margin: 0">友情链接</h5>
          <a href="https://www.icourse163.org/">MOOC慕课</a> |
          <a href="https://ke.qq.com/">腾讯课堂</a>
          <br>
          <!--  <img src="../../assets/image/logo.png" alt="" style="height: 40px"> -->
          <p>Copyright © 2022 杨业壮. All Rights Reserved.</p>
        </div>
      </div>
    </el-footer>

  </div>
</template>

<script>
export default {
  name: "FootBar"
}
</script>

<style lang="less" scoped>

.footer {
  height: 120px;
  background-color: #272727;
}

p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

a {
  font-size: 13px;
  color: #8A8A8A;
  text-decoration: none;
}

</style>
