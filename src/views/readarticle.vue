<template>
    <div class="readarticle">
     <Header></Header>
     <section class="articlewraper w1170 ma60">
           <div class="inner">
                <div class="nav">
                    <div class="userimg" v-if="articl.avatar">
                       <img :src="articl.avatar.avatar" width="100%" height="100%" alt="">
                    </div>
                    <div class="usermessage">
                        <p>author: <span v-if="articl.avatar">{{articl.avatar.username}}</span></p>
                        <p>desc: <span v-if="articl.avatar">{{articl.avatar.desc}}</span></p>
                    </div>
                    <div class="other">
                      <span class="anser common"></span>  <el-badge :value="articl.anser" class="item">
                        <el-button size="small">评论</el-button>
                        </el-badge>
                       <span class="rating common"></span> <el-badge :value="articl.rasting" class="item">
                        <el-button size="small">阅读</el-button>
                        </el-badge>
                         <span class="like common"></span> <el-badge :value="articl.likenum" class="item">
                        <el-button size="small" @click="changelikenum">喜欢</el-button>
                        </el-badge>
                        <div class="editarticle">
                          <el-button @click="show3 = !show3">编辑</el-button>
                          <div style="margin-top: 20px; height: 200px;">
                            <el-collapse-transition>
                              <div v-show="show3">
                                <div class="transition-box"><el-button @click="removearticle" type="text">删除文章</el-button></div>
                                <div class="transition-box"><el-button type="text">修改</el-button></div>
                              </div>
                            </el-collapse-transition>
                          </div>
                        </div>
                    </div>
                </div>
              <div class="articlecontent">
                 <div class="articleimg">
                 <img src="../../static/img/article.jpg" width="100%" alt="">
                 </div>
                 <div class="articlecontent" v-html="articl.content">
                 </div>
             </div>
           </div>
          <div class="usercommonts">
                 <p class="comhead">评论</p>
                 <!-- 用户添加评论如下 -->
                 <div v-if="$store.state.userinfo.username">
                   <div class="inputcom">
                     <img :src="$store.state.userinfo.avatar" alt="">
                     <el-input id="iputcom" placeholder="输入评论..." @blur="onblure" @focus='infocus' v-model="comments" @keyup.enter="gitviews"></el-input>
                   </div>
                    <div class="fabucoment" v-show="ishow">
                          <span>enter && click button</span>
                          <el-button @click="gitviews" :loading="isloading">
                            {{isloading ? '发布中' : '发布评论'}}
                          </el-button>
                   </div>
                  
                  
                 </div>
                 <!-- 用户评论列表 -->
                 <div class="usercomlist" v-if="artview">
                    <ul>
                      <li class="comlistitem" v-for="view in artview" :key='view._id'>
                        <div class="comnlistimg" >
                          <img v-if="view.person.avatar" :src="view.person.avatar" alt="">
                        </div>
                        <div class="commonmessage">
                           <p class="usernamr" v-if="view.person"><span>{{view.person.username}}</span></p> 
                           <p class="comments"> {{view.commonts}}</p>  
                           <div class="commtimes ">
                            <div class="timess">
                              <span>{{view.created}}</span></div>
                            <div class="tumbs">
                              <span>点赞{{view.thumbs}}</span>
                              <span>回复</span>
                            </div>
                           </div>        
                        </div>
                      </li>
                    </ul>
                 </div>
          </div>
     </section>


    </div>
</template>

<script>
export default {
  name: "read",
  data() {
    return {
      ishow: false,
      show3: false,
      articleid: "",
      articl: {},
      artview: [],
      comments: "",
      isloading: false
    };
  },
  components: {
    Header: () => import("@/components/Header")
  },
  methods: {
    //获取文章
    getariticl(id) {
      this.$axios.get(`/article/art/${id}`).then(res => {
        // console.log(res.data.data);
        this.articl = res.data.data;
      });
    },
    //删除文章
    removearticle() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/article/art/${this.articleid}`).then(res => {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            setTimeout(() => this.$router.push("/"), 1000);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //改变阅读数量
    changerasting() {
      this.$axios.get(`/article/rasting/${this.articleid}`).then(res => {
        // console.log(res);
      });
    },
    infocus(e) {
      this.ishow = true;
    },
    onblure(e) {
      if (!this.comments) {
        this.ishow = false;
      } else {
        this.ishow = true;
      }
    },
    //获取评论列表
    getarticleview() {
      this.$axios.get(`/articleview/${this.articleid}`).then(res => {
        // console.log(res.data.data);
        this.artview = res.data.data;
      });
    },
    //发布评论
    gitviews() {
      this.isloading = true;
      this.$axios
        .post("/articleview", {
          commonts: this.comments,
          articleid: this.articleid
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$axios.get(`/article/anser/${this.articleid}`).then(res => {
              if (res.data.code == 200) {
                this.isloading = false;
                this.ishow = false;
                this.$message.success({ message: "发布成功！" });
                this.getariticl(this.articleid);
                this.getarticleview();
                this.comments = "";
              }
            });
          } else {
            this.$message.error(res.data.msg);
            this.isloading = false;
          }
        });
    },
    //改变喜欢
    changelikenum(){
      this.$axios.put(`/addlike/${this.$store.state.userinfo._id}`
      ,{articleid:this.articleid}).then(res=>{
        if(res.data.code == 200){
          let num = res.data.com == 0 ? 1 : -1
              this.$axios.get(`/article/likenum/${this.articleid}`,{num})
              .then(res=>{
                if(res.data.code == 200){
                  this.getariticl(this.articleid)
                }
              })
        }
      })
    }

  },
  created() {
    // console.log(this.$route.query.id);
    this.articleid = this.$route.query.id;
    this.getariticl(this.articleid);
    this.changerasting();
    this.getarticleview();
  }
};
</script>

<style scoped lang = 'scss'>
//用户评论列表css代码如下
.usercomlist {
  width: 900px;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 6px;
  .comlistitem {
    display: flex;
    margin-top: 20px;
    .comnlistimg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .commonmessage {
      width: 80%;
      .usernamr {
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
      .comments {
        font-size: 14px;
        color: #505050;
        line-height: 1.5;
        margin-top: 5px;
      }
      .commtimes {
        font-size: 13px;
        line-height: 1.5;
        color: #abab99;
        padding-top: 8px;
        overflow: hidden;
        .timess {
          float: left;
        }
        .tumbs {
          float: right;
        }
      }
    }
  }
}

//评论css
.usercommonts {
  width: 900px;
  padding: 20px;
  margin: 20px auto;
  background-color: #fff;

  .comhead {
    font-size: 15px;
    color: #409eff;
    text-align: center;
  }
  .inputcom {
    padding: 20px;
    display: flex;
    height: 60px;
    margin-top: 5px;
    line-height: 60px;
    background-color: #f2f2f2;
    border-radius: 5px;
    img {
      vertical-align: middle;
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .fabucoment {
    padding: 10px 20px 20px;
    text-align: right;
    background-color: #f2f2f2;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
.readarticle {
  height: 100%;
  width: 100%;
}
.editarticle {
  width: 56px;
  margin: 0 auto;
  margin-top: 25px;
  text-align: center;
  /deep/ .el-button {
    color: #333;
    font-size: 10px;
    width: 56px;
    height: 32px;
    text-align: center;
    padding: 0;
  }
}
.transition-box {
  margin-bottom: 10px;
  width: 56px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background-color: #84857b;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  margin-right: 20px;
  /deep/ .el-button {
    color: #fff;
    font-size: 10px;
  }
}
.common {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100%;
  vertical-align: middle;
}
.other {
  margin-top: 20px;
  margin-left: 10px;
  width: 110px;
  .anser {
    background-image: url("../../static/img/pinglun.png");
  }
  .rating {
    background-image: url("../../static/img/yuedu1.png");
  }
  .like {
    background-image: url("../../static/img/like.png");
  }
  .item {
    margin-top: 30px;
  }
}
.inner {
  border-radius: 7px;
  width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  display: block;
  display: flex;

  justify-content: space-between;
  .nav {
    width: 150px;

    .userimg {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: 5px;
    }
    .usermessage {
      color: #666;
      font-size: 15px;
      margin-left: 10px;
      line-height: 20px;
      p {
        line-height: 1.5;
      }
    }
  }
  .articlecontent {
    width: 780px;
    .articleimg {
      width: 93%;
      margin: 0 auto;
      height: 200px;
      margin-top: 10px;
      overflow: hidden;
      border-radius: 5px;
    }
    .articlecontent {
      width: 90%;
      margin: 0 auto;
      padding-top: 6px;
      overflow: hidden;
    }
  }
}
</style>

























