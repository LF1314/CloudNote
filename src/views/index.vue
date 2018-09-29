<template>
    <div class="indexwraper">
        <Header></Header>
        <section class="bodysection w1170">
            <div class="bodyheader claerfix">
                <div class="lunbo">
                 
                </div>
                <div class="login">
                   <div class="nologin" v-if="!userinfo.username">
                     <el-form :model="formdata" >
                        <el-form-item  >
                            <el-input type="email" v-model="formdata.email" placeholder="邮箱"  ></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-input type="password" v-model="formdata.password" placeholder="密码" ></el-input>
                        </el-form-item>
                
                        <el-form-item>
                            <el-button  class="btn" type="primary" @click="loginbtn">登录</el-button>
                            <el-button class="btn"  @click="jump">去注册</el-button>
                        </el-form-item>
                     </el-form>
                   </div>
                   <div class="islogin" v-else >
                       <div class="imges">
                             <img :src="userinfo.avatar" width="100%" height="100%" alt="">
                       </div>
                       <div class="username">
                         <span>{{userinfo.username}}</span>
                       </div>
                       <div class="nobtn">
                         <el-button @click="loginout">注销登录</el-button>
                       </div>
                   </div>
                </div>
            </div>

            <div class="articles claerfix" >
                <ul>
                    <li class="articleitem" v-for="item in articles" :key="item._id" @click="jumptoread(item._id)">
                       <div class="avatarimg">
                          <img v-if="item.avatar" :src="item.avatar.avatar" alt="">
                       </div>
                       <div class="articlemessage">
                         <p>
                             <span class="username">{{item.avatar.username}}</span>
                             <span>|</span>
                             <span class="fenlei">{{item.title}}</span>
                         </p>
                         <p class="minddlemeessage">
                             <span v-for='cla in item.classes' :key="cla">{{cla}}</span>
                         </p>
                         <p class="rating">
                             <span>回复：{{item.anser}}</span>
                             <span>阅读：{{item.rasting}}</span>
                             <span>喜欢：{{item.likenum}}</span>
                         </p>
                       </div>
                       <div class="content">
                           <p>{{item.contentext}}</p>
                       </div>
                    </li>
                </ul>
            </div>
        </section>
       
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      articles: [],
      formdata: {
        email: "",
        password: ""
      }
    };
  },
  computed: mapState(["userinfo"]),
  components: {
    Header: () => import("@/components/Header"),
    Footer: () => import("@/components/footer")
  },
  methods: {
    //跳转到阅读文章页面
    jumptoread(id) {
      this.$router.push({ path: "/read", query: { id } });
    },
    //获取文章列表
    getarticles() {
      this.$axios.get("/article").then(res => {
        console.log(res);
        if ((res.data.code = 200)) {
          this.articles = res.data.data;
        }
      });
    },
    loginout() {
      this.$axios.get("/loginout").then(res => {
        if (res.data.code == 200) {
          this.$message.success({ message: res.data.msg });
          this.$store.commit("CHANGEUSERINFO", {
            userdata: {
              avatar: "",
              username: "",
              desc: ""
            }
          });
        } else {
          this.$message.error(res.data.msg);
          this.$store.commit("CHANGEUSERINFO", {
            userdata: {
              avatar: "",
              username: "",
              desc: ""
            }
          });
        }
      });
    },
    jump() {
      this.$router.push("/login");
    },
    loginbtn() {
      this.$axios.post("/login", this.formdata).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$store.commit("CHANGEUSERINFO", res.data.userdata);
          this.$message.success({ message: res.data.msg });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.getarticles();
  }
};
</script>
<style scoped lang='scss'>
.articleitem {
  margin-top: 20px;
}
.articleitem:hover {
  cursor: pointer;
}
.islogin {
  margin-top: 50px;
  .imges {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
  }
  .username {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #409eff;
  }
  .nobtn {
    margin-top: 30px;
    .el-button {
      box-sizing: border-box;
      width: 100%;
      background-color: rgb(245, 234, 89);
      color: #fff;
    }
  }
}
.indexwraper {
  background-color: #f2f2f2;
}
.bodyheader {
  margin-top: 40px;
  .lunbo {
    float: left;
    height: 364px;
    width: 800px;
    border-radius: 5px;
    background-image: url("../../static/img/lunbo.jpg");
    background-size: 100%;
    overflow: hidden;
  }
  .login {
    width: 330px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    float: right;
    height: 364px;
    .btn {
      width: 100%;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .el-button + .el-button {
      margin-left: 0;
      margin-top: 30px;
    }
  }
}
.articles {
  margin-top: 10px;
  width: 100%;
  background: #fff;
  ul {
    padding: 10px;
  }
  .avatarimg {
    float: left;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 3px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .articlemessage {
    width: 90%;
    float: right;
    height: 100px;
    p {
      text-align: left;
      padding: 5px;
    }
    .username {
      font-size: 18px;
      color: #409eff;
      font-weight: 700px;
    }
    .fenlei {
      font-size: 20px;
      color: #000;
      font-weight: 700;
    }
    .minddlemeessage {
      background-color: #ccc7c7;
      border-radius: 3px;
      color: #fff;
      span {
        display: inline-block;
        margin-left: 5px;
      }
    }
    .rating {
      font-size: 15px;
      color: #333;
    }
  }
  .content {
    clear: both;
    font-size: 14px;
    color: #666;
  }
}
</style>
