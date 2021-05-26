<template>
  <div class="app-container">
    <el-container style="width: 100%">
      <all-header
        @login="showLogin"
        @register="beginRegistered"
        @selectWord="getSelectData"
      ></all-header>
      <el-main class="home-main">
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
        <el-container>
          <composition-list
            :father="username"
            :total="total"
            :fatherArray="fatherData"
            ref="child"
          ></composition-list>
        </el-container>
      </el-main>
      <el-footer>
        <div class="copyrightContainer">
          <span style="font-size: 12px"
            >Copyright&nbsp;&nbsp;&nbsp;中科智禾教育大数据中心 ©2019</span
          >
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { register } from "@/api/register";
import logo from "@/assets/image/logo.png";
import searchSection from "@/pages/homePage/searchSection";
import allHeader from "@/components/allHeader";
import compositionList from "@/pages/homePage/compositionList";
import userPopover from "@/pages/user/userPopover";
import {
  getCompositionListData,
  getfindByTitle2,
  getResearchListData,
} from "@/api/getCompositionData";
export default {
  name: "homePage",
  components: { searchSection, compositionList, userPopover, allHeader },
  data() {
    return {
      gradeValue: "",
      researchFlag: false,
      imgList: [
        "http://zhihejiaoyu.cn/reveal/img/xiezuo1.png",
        "http://zhihejiaoyu.cn/reveal/img/xiezuo2.png",
        "http://zhihejiaoyu.cn/reveal/img/xiezuo3.png",
      ],
      
      select: "普通检索",
      input3: "",
      options: [
        {
          value: "chuyi",
          label: "初一",
        },
        {
          value: "chuer",
          label: "初二",
        },
        {
          value: "chusan",
          label: "初三",
        },
        {
          value: "gaoyi",
          label: "高一",
        },
        {
          value: "gaoer",
          label: "高二",
        },
        {
          value: "gaosan",
          label: "高三",
        },
      ],
      logo: logo,
      showDialogTwo: false,
      showDialog: false,
      loginFlag: false,
      loginForm: {
        user_name: "",
        password: "",
      },
      registerForm: {
        user_name: "",
        password: "",
        school_name: "",
      },
      username: localStorage.username,
      fatherData: [],
      selectWord: "",
      total: 0,
    };
  },
  watch: {
    input3(newName, oldName) {
      localStorage.setItem("INPUT3", newName);
    },
  },
  inject: ["reload"],
  mounted() {
    // 修改
    if (localStorage.getItem("username") === "null") {
      localStorage.clear();
    }
    this.judgeFlag();
    if (this.selectWord === "") {
      console.log("zhixinglemounted");
    }
  },
  watch: {
    selectWord(newVal, oldWord) {
      console.log("改变了么：", newVal, oldWord);
      this.selectWord = newVal;
      this.getSelectContent();
    },
  },
  methods: {
    showGrade: function () {
      console.log("我变了");
      console.log(this.gradeValue);
    },
    showLogin: function (val) {
      // this.loginFlag = '是'
      console.log("字串符传过来的：", val);
      this.showDialog = val;
      // alert('登录成功')
    },
    beginRegistered: function (val) {
      console.log("开始注册");
      this.showDialogTwo = val;
    },
    getSelectContent() {
      //点击搜索之后滚动条位置下滑至全部
      document.documentElement.scrollTop = 400;
      // this.fatherData = []
      if (this.select === "") {
        this.$message.warning("请选择搜索类型");
      } else if (this.select === "普通检索") {
        this.researchFlag = true;
        const prams = {
          title: this.selectWord,
          page: 0,
          size: 10,
        };
        this.loading = true;
        getfindByTitle2(prams).then((respone) => {
          console.log("测试搜索");
          console.log(respone.data);
          this.fatherData = respone.data.data.list;
          
          console.log("传过去了么");
          if (respone.data.data.total === 0) {
            this.$message({
              message: "未查询到相关文章",
              type: "warning",
            });
          }
          // console.log(this.total)
          this.loading = false;
        });
      } else {
        this.researchFlag = true;
        const prams = {
          query: this.selectWord,
          page: 1,
        };
        this.loading = true;
        getResearchListData(prams).then((respone) => {
          console.log("测试搜索");
          console.log(respone.data);
          this.fatherData = respone.data.data.list;
          // this.$emit('compositionData', this.compositionData)
          console.log("传过去了么");
          this.total = parseInt(respone.data.data.total);
          if (respone.data.data.total === 0) {
            this.$message({
              message: "未查询到相关文章",
              type: "warning",
            });
          }
          console.log(this.total);
          this.loading = false;
        });
      }
      console.log("改变玩以后的值；", this.fatherData);
    },
    getSelectData(selectWord) {
      console.log("收到了吗", selectWord);
      this.selectWord = selectWord;
      this.getSelectContent();
      // this.getData()
      // this.fatherData = selectData
    },
    register: function () {
      if (
        this.registerForm.user_name === "" ||
        this.registerForm.password === ""
      ) {
        this.$message({
          message: "密码或用户名不能为空",
          type: "warning",
        });
      } else {
        // console.log('注册成功')
        const prams = {
          name: this.registerForm.user_name,
          password: this.registerForm.password,
          schoolname: this.registerForm.school_name,
          nianji: this.gradeValue,
        };
        register(prams).then((response) => {
          console.log("测试注册数据");
          console.log(response.data);
          this.$message({
            message: "恭喜你，注册成功 请登录",
            type: "success",
          });
        });
        this.showDialogTwo = false;
      }
    },

    login: function () {
      const prams = {
        username: this.loginForm.user_name,
        password: this.loginForm.password,
      };
      login(prams).then((respone) => {
        localStorage.clear();
        if (respone.data.code === 0) {
          localStorage.setItem("username", respone.data.data);
          this.$message({
            message: "登录成功",
            type: "success",
            duration: 5000,
          });
          this.loginFlag = true;
          // alert('登录成功')
          this.showDialog = false;
          this.username = localStorage.username;
          const prams = {
            page: 1,
            user: this.username,
          };
          getCompositionListData(prams).then((respone) => {
            this.fatherData = respone.data.data;
            console.log("输出要传给子组件显示的作文数据");
            console.log(this.fatherData);
            this.$refs.child.handleCurrentChange(1);
            this.reload();
          });
        } else {
          this.$message.error("用户名或密码错误！");
        }
      });
    },
    goCompositionContent: function () {
      console.log("初次加载username");
      console.log(this.username);
      if (this.username === "" || this.username === undefined) {
        this.$message({
          message: "您未登录，无法使用智能测评功能",
          type: "warning",
        });
      } else {
        let routeData = this.$router.resolve({ path: "/compositionContent" });
        window.open(routeData.href, "_blank");
      }

    },
    judgeFlag: function () {
      if (localStorage.username === "" || localStorage.username === undefined) {
        this.loginFlag = false;
      } else {
        this.loginFlag = true;
      }
      console.log("我调用完方法了");
    },

    research: function () {
      localStorage.setItem("INPUT3", this.input3);
      console.log("INPUT3", localStorage.getItem("INPUT3"));
      console.log("此时的选择类型", this.select);
      if (this.select === "") {
        this.$message.warning("请选择搜索类型");
      } else if (this.select === "普通检索") {
        this.researchFlag = true;
        localStorage.setItem("RESEARCH_FLAG", true);
        const prams = {
          title: this.input3,
          page: 0,
          size: 10,
        };
        this.loading = true;
        getfindByTitle2(prams).then((respone) => {
          console.log("测试搜索");
          console.log(respone.data);
          this.compositionData = respone.data.data.list;
          this.total = respone.data.data.total;
          if (this.total === 0) {
            this.$message({
              message: "未查询到相关文章",
              type: "warning",
            });
          }
          console.log(this.total);
          this.loading = false;
        });
      } else {
        // AI查询
        this.researchFlag = true;
        localStorage.setItem("RESEARCH_FLAG", true);
        const prams = {
          query: this.input3,
          page: 1,
          size: 10,
        };
        this.loading = true;
        getResearchListData(prams).then((respone) => {
          console.log("测试搜索");
          console.log(respone.data);
          this.compositionData = respone.data.data.list;
          this.total = respone.data.data.total;
          if (this.total === 0) {
            this.$message({
              message: "未查询到相关文章",
              type: "warning",
            });
          }
          console.log(this.total);
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.home-main {
  margin-top: 80px;
  /* position: relative;
    top: 80px; */
}
.logo_container {
  padding-top: 20px;
}
.tubiao-contianer {
  padding-top: 25px;
}
.el-icon-s-custom,
.iconzhinengceping- {
  /*padding-top: 25px;*/
  font-size: 33px;
  display: inline-block;
}
.iconzhinengceping- {
  color: #ee7f60;
}
.el-icon-s-custom {
  color: #b9b9b9;
}
.tubiao-contianer {
  display: inline-block;
}
.tubiao {
  display: inline-block;
  vertical-align: middle;
}
.title {
  display: inline-block;
}

.el-main {

}
.copyrightContainer {
  padding-top: 20px;
  text-align: center;
}
.pictureContainer {
  padding-top: 10px;
}
.select_btn {
  background: linear-gradient(to right, #ee7f60 0%, #f19b78 100%);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el_header_style:after {
  content: "";
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #ececec;
  top: 80px;
}
</style>
<style>
.el-input-group__append,
.el-input-group__prepend {
  color: #ee7f60;
  background-color: #fff;
  font-size: 14px;
  border: 1px solid #ee7f60;
}
.el-select .el-input .el-select__caret {
  color: #ee7f60;
}
.el-input-group .el-input__inner {
  border: 1px solid #ee7f60;
}
</style>
