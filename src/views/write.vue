<template>
    <div class="writenote">
        <Header></Header>
        <section class="writewrpaer w1170">
           <div class="writeinner">
                <div >
                    <h3>标题</h3>
                    <el-input type='text' placeholder = '标题' v-model="fordata.title"></el-input>
                </div>
                <div class="markden">
                     <div class="quill-wrap">
                        <quill-editor
                        v-model="fordata.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                         @change="onEditorChange($event)"
                        >
                        </quill-editor>
                    </div>
                </div>
                <div>
                    <div class="artivlefenlei">
                        <span>分类：</span>
                          <el-checkbox-group v-model="fordata.classes" size="medium">
                            <el-checkbox-button class="item" v-for="item in classes" :label="item.name" :key="item._id">{{item.name}}</el-checkbox-button>
                          </el-checkbox-group>
                    </div>
                    <div>
                        <el-button type='primary' @click="getconten">发布</el-button>
                    </div>
                </div>
           </div>
        </section>
    </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  name: "write",
  components: {
    Header: () => import("@/components/Header"),
    quillEditor
  },

  methods: {
    getconten() {
      this.fordata.contentext =
        this.fordata.contentext.substring(0, 200) + "...";
      this.fordata.id = this.$store.state.userinfo._id;
      console.log(this.fordata);
      this.$axios.post("/article", this.fordata).then(res => {
        if (res.data.code == 200) {
          this.$message.success({ message: res.data.msg + "正在前往首页" });
          setTimeout(() => this.$router.push("/"), 500);
        } else {
          this.$confirm(
            res.data.msg + "即将前往登录页面，是否保存文本",
            "确认信息",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "保存",
              cancelButtonText: "放弃修改"
            }
          )
            .then(() => {
              this.$store.commit("SAVECONTENT", this.fordata);
              this.$message({
                type: "info",
                message: "保存修改,正在前往登录页面"
              });
              setTimeout(() => this.$router.push("/"), 500);
            })
            .catch(action => {
              this.$message({
                type: "info",
                message: "取消保存正在前往登录页面"
              });
              setTimeout(() => this.$router.push("/"), 500);
            });
        }
      });
    },
    onEditorChange({ quill, html, text }) {
      // console.log("editor change!", text);
      this.fordata.contentext = text;
    }
  },
  created() {
    this.$axios.get("/class").then(res => {
      console.log(res);
      this.classes = res.data.classes;
    });
    if (
      this.$store.state.contentext &&
      (this.$store.state.userinfo._id = this.$store.state.contentext.id)
    ) {
      this.fordata = this.$store.state.contentext;
    } else {
      this.fordata = {
        id: "",
        title: "",
        classes: [],
        content: "",
        contentext: ""
      };
    }
  },
  data() {
    return {
      ti: "",
      classes: [],
      fordata: {
        id: "",
        title: "",
        classes: [],
        content: "",
        contentext: ""
      },
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "img",
            action: "https://qiniv.com",
            response: res => {
              return res.info;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped lang='scss'>
.item {
  margin-left: 20px;

  /deep/ .el-checkbox-button__inner {
    border-left: 1px solid #dcdfe6;
    border-radius: 2px;
  }
}
.writenote {
  background-color: #f3f3f3;
}
.writewrpaer {
  padding: 20px;
}
.writeinner {
  width: 900px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 5px;
  padding: 20px;
  .artivlefenlei {
    margin-bottom: 20px;
    font-size: 15px;
    color: #666;
  }
}
.markden {
  margin-top: 10px;

  height: 400px;
}
.quill-wrap {
  height: 300px;
  .quill-editor {
    height: 100%;
  }
}
</style>
