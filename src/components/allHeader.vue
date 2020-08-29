<template>
  <div>
    <el-header class="el_header_style" height="80px">
      <el-row>
        <el-col :span="5">
          <div class="pictureContainer">
            <img src="http://114.242.223.253/zihui/images/mynewlogo.png" style="width:100%;height: 60px">
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="logo_container">
            <el-image
              style="width: 162px; height: 42px"
              :src=logo></el-image>
          </div>
        </el-col>
        <el-col :span="8" :offset="0" >
          <div class="card-one" >
            <el-card shadow="never" style="height: 80px;width: 100%;border: unset;">
              <el-input placeholder="请输入关键字" v-model="input3" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px" @change="selectchange" value="">
                  <el-option label="普通检索" value="普通检索"></el-option>
                  <el-option label="AI检索" value="AI检索"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="research" style="color: #fff;" class="select_btn"></el-button>
              </el-input>
            </el-card>
          </div>
        </el-col>
        <el-col :span="2" :offset="1">
          <div class="tubiao-contianer">
            <div class="tubiao">
              <i class="iconfont iconzhinengceping-"></i>
            </div>
            <div class="title">
              <span style="color: dimgrey;cursor: pointer" @click="goCompositionContent">智能测评</span>
            </div>
          </div>
        </el-col>
        <el-col :span="3" >
          <div class="tubiao-contianer">
            <div class="title">
              <div v-if="loginFlag==='true'">
                <div class="tubiao">
                  <img class="userImg" src="../assets/image/头像.png" alt="">
                </div>
                <user-popover  style="display: inline-block;"></user-popover>
              </div>
              <div v-else>
                <div class="tubiao">
                  <i class="el-icon-s-custom"></i>
                </div>
                <span  style="color: dimgrey;cursor: pointer" @click="showLogin">登录</span>
                <span  style="color: dimgrey;cursor: pointer" @click="beginRegistered">注册</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 登录弹框 -->
    <el-dialog  :visible.sync="showDialog" width="30%" custom-class="loginUp-dialog">
      <el-form  :model="loginForm"  class="loginUp" auto-complete="on" label-position="left">
        <el-form-item >
          <el-input
            v-model="loginForm.user_name"
            placeholder="请输入您的用户名"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input"
            >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconyonghu"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入您的密码"
            name="password"
            show-password
            auto-complete="on"
            class="login_input"
            >
            <template slot="prepend" class="login-icon">
              <i class="iconfont iconsuo"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input
            v-model="vcode"
            placeholder="请输入右侧验证码"
            name="Num"
            style="width: 65%;"
            auto-complete="on"
            ></el-input>
            <div class="ccode" @click="handleCode">{{ccode}}</div>
        </el-form-item >

        <el-form-item >
          <template>
            <!-- <span>
              <input type="checkBox" v-model="rememberName"  @click="changeRem" />
               <label for="adviceCheck" class="advice">记住用户名</label>
            </span>
            <span>
              <input type="checkBox" v-model="autoLogin" :checked="autoLogin" @click="!autoLogin" />
               <label for="adviceCheck" class="advice">自动登录</label>
            </span> -->
            <el-checkbox-group v-model="rememberName" style="display: inline-block;">
              <el-checkbox  label="1" checked="rememberName">记住用户名</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="autoLogin" style="display: inline-block;margin-left: 10px;">
              <el-checkbox  label="2" >自动登录</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-button type="primary" class="login-button"  @click="checkCode">登录</el-button>
      </el-form>
    </el-dialog>
    <!--注册弹框-->
    <el-dialog  :visible.sync="showDialogTwo" width="30%">
      <el-form  :model="loginForm" class="login-form" auto-complete="on" label-position="left">
        <el-form-item>
          <el-input
            v-model="registerForm.user_name"
            placeholder="请输入用户名"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input"
          >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconyonghu"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            name="password"
            show-password
            auto-complete="on"
            class="login_input">
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconsuo"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.school_name"
            placeholder="请输入学校名称"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input"
          >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconxuexiao"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="gradeValue" placeholder="请选择年级" @change="showGrade">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="login-button"  @click="register">注册</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {setCookie,getCookie,clearCookie} from '../utils/user.js'
import {login} from '@/api/login'
import {register} from '@/api/register'
import logo from '@/assets/image/logo.png'
import userPopover from '@/components/user/userPopover'
import {getfindByTitle2, getResearchListData} from '@/api/getCompositionData'
// import Bus from '@/utils/eventBus'
export default {
  name: 'allHeader',
  inject: ['reload'],
  components: {userPopover},
  data () {
    return {
      //checkList:[],
      //rememberName:false,
      gradeValue: '',//选中的年级
      select: '普通检索',
      input3: '',
      logo: logo,
      showDialogTwo: false,
      showDialog: false,
      loginFlag: false,
      researchFlag: false,
      compositionData: [], // 搜索到的所有数据
      // total: 0, // 搜索到的数据数量

      // rememberName:false,//记住用户名
      // autoLogin:false,//自动登录
      // vcode:'',//用户输入的验证码
      // ccode:'',//验证码

      rememberName: false, // 记住用户名
      autoLogin: false, // 自动登录
      vcode: '', // 用户输入的验证码
      ccode: '', // 验证码

      options: [{
        value: 'chuyi',
        label: '初一'
      }, {
        value: 'chuer',
        label: '初二'
      }, {
        value: 'chusan',
        label: '初三'
      }, {
        value: 'gaoyi',
        label: '高一'
      }, {
        value: 'gaoer',
        label: '高二'
      }, {
        value: 'gaosan',
        label: '高三'
      }],
      // loginFlag: '否',
      loginForm: {
        user_name: '',
        password: ''
      },
      registerForm: {
        user_name: '',
        password: '',
        school_name: ''
      },
      username: localStorage.username,
    }
  },
  watch: {
     input3(newName, oldName) {
       localStorage.setItem("INPUT3",newName)
       console.log("watch到的input3",localStorage.getItem("INPUT3"))
     }
   } ,
  mounted() {
    // getCookie()
    // if (localStorage.getItem('username') === 'null') {
    //   localStorage.clear()
    // }
    this.generatedCode()//加载验证码
    this.judgeFlag()
    this.clearLogin()//判断用户登录状态
  },
  methods: {
    changeRem(){ // 记住密码多选框选中状态
      this.rememberName = !this.rememberName
    },
    clearLogin(){ //更换登录状态
      console.log("页面刷新后，登录状态",localStorage.getItem("LOGINFLAG"))
      this.loginFlag = localStorage.getItem("LOGINFLAG")
    },
    showGrade: function () {
      //console.log('我变了')
      //console.log(this.gradeValue)
    },
    selectchange () { // 选择框选择改变
      //console.log(this.select)
    },
    research: function () {
      // this.researchFlag = true
      // localStorage.setItem("RESEARCH_FLAG",true)
      localStorage.setItem("INPUT3",this.input3)
      console.log("INPUT3",localStorage.getItem("INPUT3"))
      localStorage.setItem("RESEARCH_FLAG",true)
      this.$emit('selectWord', this.input3)
      // localStorage.setItem("SELECT_WORD",this.input3)
    },

    beginRegistered: function () {
      //console.log('开始注册')
      this.showDialogTwo = true
      this.$emit('register', this.showDialogTwo)
    },
    goCompositionContent: function () {
      //console.log('初次加载username')
      //console.log(this.username)
      // if (this.username === '' || this.username === undefined) {
      if (this.loginFlag != 'true') {
        this.$message({
          message: '您未登录，无法使用智能测评功能',
          type: 'warning'
        })
      } else {
        let routeData = this.$router.resolve({ path: '/compositionContent' })
        window.open(routeData.href, '_blank')
      }
      // let routeData = this.$router.resolve({ path: '/compositionContent' })
      // window.open(routeData.href, '_blank')
    },
    judgeFlag: function () {
      // if (!(localStorage.username === '' || localStorage.username === undefined)) {
      //   console.log("无用户信息")
      //   this.loginFlag = 'true'
      // } else {
      //   console.log("用户信息已存在")
      //   this.loginFlag = false
      // }
      // console.log('我调用完方法了')
    },
    register: function () {
      if (this.registerForm.user_name === '' || this.registerForm.password === '') {
        this.$message({
          message: '密码或用户名不能为空',
          type: 'warning'
        })
      } else {
        // console.log('注册成功')
        const prams = {
          name: this.registerForm.user_name,
          password: this.registerForm.password,
          schoolname: this.registerForm.school_name,
          nianji: this.gradeValue
        }
        register(prams).then(response => {
          console.log('测试注册数据')
          console.log(response.data)
          this.$message({
            message: '恭喜你，注册成功 请登录',
            type: 'success'
          })
        })
        this.showDialogTwo = false
      }
    },
    getData: function () {
      const prams = {
        page: 1
      }
      getCompositionListData(prams).then(respone => {
        this.fatherData = respone.data.data.list
        console.log('输出测试111')
        console.log(this.fatherData)
      })
    },
    showLogin: function () {
      console.log("弹框之前")
      console.log("USERNAME",localStorage.getItem("USERNAME"))
      console.log("PASSWORD",localStorage.getItem("PASSWORD"))
      console.log("AUTO_LOGIN",localStorage.getItem("AUTO_LOGIN"))
      //localStorage.setItem("AUTO_LOGIN",false)//自动登录
      if(localStorage.getItem("AUTO_LOGIN") == 'true'){
        this.login()
      }else{
        //console.log("自动登录",localStorage.getItem("AUTO_LOGIN"))
        console.log("REM_NAME",localStorage.getItem("REM_NAME"))
        if(localStorage.getItem("REM_NAME")==="false"){//如果未记录用户名则清空缓存
          console.log("统统清空")
          localStorage.setItem("REM_NAME",false)
          localStorage.setItem("USERNAME",'')
          localStorage.setItem("PASSWORD",'')
        }
        //console.log("USERNAME2",localStorage.getItem("USERNAME"))
        //console.log("PASSWORD2",localStorage.getItem("PASSWORD"))
        this.loginForm.user_name = localStorage.getItem("USERNAME")
        this.loginForm.password = localStorage.getItem("PASSWORD")
        this.rememberName = localStorage.getItem("REM_NAME")
        // this.loginForm.user_name = "tpp"
        // this.loginForm.password = 'xgg'
        //console.log("自动登录的本地存储",localStorage.getItem("AUTO_LOGIN"))

        // this.loginFlag = '是'
        this.showDialog = true // 登录弹框
        //console.log('daozheyibumei :')
        this.$emit('login', this.showDialog)
        // alert('登录成功')
      }

    },
    login: function () {
      console.log("login")
      console.log(this.loginForm.user_name)
      // if(this.rememberName == true){}
      // if(){}
      // this.loginFlag = '是'
      // // alert('登录成功')
      // this.showDialog = false

      const prams = {
        username: localStorage.getItem("USERNAME"),
        password: localStorage.getItem("PASSWORD")
      }
      login(prams).then(respone => {
        //localStorage.clear()
        if (respone.data.code === 0) {
          localStorage.setItem('username', respone.data.data)
          //console.log("username",localStorage.getItem('username'))
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 5000
          })
          this.loginFlag = 'true'
          localStorage.setItem("LOGINFLAG",true)
          // alert('登录成功')
          this.showDialog = false
          this.username = localStorage.username
          const prams = {
            page: 1,
            user: this.username
          }
          getCompositionListData(prams).then(respone => {
            this.fatherData = respone.data.data
            //console.log('输出要传给子组件显示的作文数据')
            //console.log(this.fatherData)
            this.$refs.child.handleCurrentChange(1)
            this.reload()
          })
        } else {
          this.$message.error('用户名或密码错误！')
        }
      })
    },
    // 点击生成验证码
    handleCode () {
      this.generatedCode()
    },
    // 生成验证码
    generatedCode () {
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      let code = ''
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 36)
        code += random[index]
      }
      this.ccode = code
    },
    // 判断验证码是否输入准确
    checkCode () {
      //保存的账号
        // let name=this.loginForm.username;
        // //保存的密码
        // let pass=this.loginForm.password;
        // //判断复选框是否被勾选 勾选则调用配置cookie方法
        // if(this.autoLogin == true){
        //   //传入账号名，密码，和保存天数3个参数
        //   setCookie(name,pass,7);
        // }else{
        //   clearCookie()
        // }

      //console.log("this.autoLogin",this.autoLogin)
      localStorage.setItem('USERNAME',this.loginForm.user_name)
      localStorage.setItem('PASSWORD',this.loginForm.password)
      localStorage.setItem('REM_NAME',this.rememberName)
      //console.log("USERNAME",localStorage.getItem("USERNAME"))
      //console.log("PASSWORD",localStorage.getItem("PASSWORD"))
      console.log("存入REM_NAME",localStorage.getItem("REM_NAME"))
      if(this.autoLogin==true){//自动登录，AUTO_LOGIN为真
        localStorage.setItem("AUTO_LOGIN",'true')
        //console.log("自动存储存入本地",localStorage.getItem("AUTO_LOGIN"))
      }
        //console.log("checkCode") //校验验证码
        let vcode = this.vcode
        vcode = vcode.toUpperCase() //不区分大小写
        let ccode = this.ccode
        ccode = ccode.toUpperCase()
        if (vcode !== ccode) {
          this.$message.error('Please enter the correct verification code!')
          this.generatedCode()
          // this.$set(this.loginInfo, 'vcode', '')
          // this.$set(this.loginInfo, 'password', '')
        } else {
          this.login()
          // return 1
        }
        this.generatedCode()

    },
  }
}
</script>
<style scoped>
  .logo_container{
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
  .iconzhinengceping-{
    color: #ee7f60;
  }
  .el-icon-s-custom {
    color: #b9b9b9;
  }
  .tubiao-contianer{
    display: inline-block;
  }
  .tubiao{
    display: inline-block;
    vertical-align: middle;
  }
  .userImg{
    width: 30px;
    height: 30px;
  }
  .title{
    display: inline-block;
  }
  /*.title span {*/
  /*  display: inline-block;*/
  /*}*/
  .el-main{
    /*background-color: #F5F5F5;*/
    /*margin-bottom: 20px;*/
  }
  .copyrightContainer{
    padding-top: 20px;
    text-align: center;
  }
  .pictureContainer{
    padding-top: 10px;
  }
  .select_btn {
    background: linear-gradient(to right, #ee7f60 0%, #f19b78 100%);
    /*font-size: 16px;*/
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
  .el_header_style{

    position: fixed;
    top: 0;
    z-index: 10;
    background-color: white;

  }
  .el_header_style:after {
    content: '';
    position: absolute;
    height: 1px;
    width:100%;
    background-color: #ececec;
    top: 80px;
    /*border-bottom: 1px solid #ececec;*/
  }
  .ccode{ /* 验证码 */
    display: inline-block;
    border: 1px solid #E1E1E1;
    width: 25%;
    margin-left: 10px;
    text-align:center;
    border-radius: 4px;
    color: #0061E4;
    font-weight: 600;
    background-color: white;
  }
  .login-button{
    width:100%;
    margin-bottom:30px;
    background-color: #FF7533;border: 0;
    font-size: 20px;
    letter-spacing: 0.3em;
  }
  .login_input .iconfont {
    font-size: 22px;
  }
</style>
<style>
  .el-header {
    padding: 0 0  0 20px;
    width:100vw;
  }
  .login_input .el-input-group__prepend {
    background-color: #ee7f60;
    padding: 0 15px;
    /*border: 1px solid #ececec;*/
  }
  .el-form-item__content .login_input .el-input__inner {
    border: 1px solid #ececec;
  }
  .el-input-group__append, .el-input-group__prepend {
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
  .loginUp-dialog{ /* 弹框 */
    background-color: #fff;
    /*background-color: #FAF9FE;*/
  }
  /* .el-card__body {
    padding: 20px 0;
  } */
  /* .el-input-group__prepend{
    background-color: #FE7756;
  } */
</style>
