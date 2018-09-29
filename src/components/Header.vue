<template>
    <div class="noteheader"> 
        <div class="inner w1170 claerfix">
              <div class="fl">
                  <router-link to="/">
                  云笔记
                  </router-link>
              </div>
              <div class="fr">
                  <el-button @click="jump">写笔记</el-button>
              </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    jump() {
      if (this.$store.state.userinfo.username) {
        this.$router.push("/write");
      } else {
        this.$message.error("未登录状态不能写笔记！");
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.noteheader {
  background-color: #409eff;
}
.inner {
  height: 50px;
  line-height: 50px;

  .fl {
    float: left;
    a {
      display: block;
      text-decoration: none;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
    }
  }
  .fr {
    float: right;
  }
}
</style>
