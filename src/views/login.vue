//登录页
<template>
    <div class="singupbody">
        <Header></Header>
        
        <div class="loginwraper ma60">
          <div class="avatarimg">
          <el-upload
           :data = 'obj'
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="formdata.avatar" :src="formdata.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i>用户头像</i>
        </div>
            <el-form :model="formdata" >
                <el-form-item  >
                <el-input type="username" v-model="formdata.username" placeholder="用户名"  ></el-input>
                </el-form-item>
                <el-form-item  >
                    <el-input type="email" v-model="formdata.email" placeholder="邮箱"  ></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input type="password" v-model="formdata.password" placeholder="密码" ></el-input>
                </el-form-item>
                <el-form-item  >
                    <el-input type="textarea" v-model="formdata.desc" placeholder="签名"  ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="success" @click="singup">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      obj: {
        token: ""
      },
      formdata: {
        avatar: "",
        username: "",
        meail: "",
        password: "",
        desc: ""
      }
    };
  },
  methods: {
    singup() {
      if (!this.formdata.email) {
        this.$message.error("email必须填");
      } else if (this.formdata.password && this.formdata.password.length < 5) {
        this.$message.error("密码不合法");
      } else {
        this.$axios.post("/singup", this.formdata).then(res => {
          if (res.data.code == 200) {
            this.$message.success({ message: "注册成功,去登录吧" });
            this.$router.push("/");
          } else {
            this.$message.error("邮箱已经被注册了！");
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.formdata.avatar = res.url;
    },
    gettoken() {
      axios.get("http://upload.yaojunrong.com/getToken").then(res => {
        console.log(res);
        this.obj.token = res.data.data;
      });
    }
  },
  created() {
    this.gettoken();
  },
  components: {
    Header: () => import("@/components/Header"),
    Footer: () => import("@/components/footer")
  }
};
</script>

<style scoped lang='scss'>
.avatarimg {
  text-align: center;
  font-size: 14px;
  color: #444;
  margin-bottom: 20px;
  background-color: #fff;
  width: 80px;
}
.singupbody {
  background-color: #f2f2f2;
  height: 100%;
  padding-top: 30px;
}
.loginwraper {
  width: 400px;
  margin: 40px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
}
.btn {
  width: 200px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
