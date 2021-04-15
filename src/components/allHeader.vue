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
                  <img class="userImg" src='http://zhihejiaoyu.cn/reveal/img/xiezuo8.png' alt="">
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
    <el-dialog  :visible.sync="showDialog" width="30%" custom-class="loginUp-dialog" >
      <el-form  :model="loginForm" :rules="rules1" class="loginUp" auto-complete="on" label-position="left">
        <el-form-item  prop="user_name">
          <el-input
            v-model="loginForm.user_name"
            placeholder="请输入您的用户名"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input "
            style="width: 90%"
            >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconyonghu"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            minlength="8"
            maxlength="12"
            v-model="loginForm.password"
            placeholder="请输入8-12位密码"
            name="password"
            show-password
            auto-complete="on"
            class="login_input "
            style="width: 90%"
            >
            <template slot="prepend" class="login-icon">
              <i class="iconfont iconsuo"  style="color: white;"></i>
            </template>
          </el-input>
<!--          <div style="float: right">-->
<!--            <span v-show="loginPwdLevel === 1" style="color: red;font-weight: 900;">弱</span>-->
<!--            <span v-show="loginPwdLevel === 2" style="color: orange;font-weight: 900;">中</span>-->
<!--            <span v-show="loginPwdLevel === 3" style="color: green;font-weight: 900;">强</span>-->
<!--          </div>-->
        </el-form-item>
        <el-form-item prop="vcode">
          <el-input
            v-model="loginForm.vcode"
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
      <el-form  :model="registerForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item prop="user_name">
          <el-input
            v-model="registerForm.user_name"
            placeholder="请输入用户名"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input "
            style="width: 90%"
          >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconyonghu"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @input="registerPwd()"
            type="password"
            minlength="8"
            maxlength="12"
            v-model="registerForm.password"
            placeholder="请输入8-12位多种数据类型密码"
            name="password"
            show-password
            auto-complete="on"
            class="login_input "
            style="width: 90%">
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconsuo"  style="color: white;"></i>
            </template>
          </el-input>
          <div style="float: right">
            <span v-show="pwdLevel === 1" style="color: red">弱</span>
            <span v-show="pwdLevel === 2" style="color: orange">中</span>
            <span v-show="pwdLevel === 3" style="color: green">强</span>
          </div>
        </el-form-item>
        <el-form-item prop="school_name">
          <el-input
            v-model="registerForm.school_name"
            placeholder="请输入学校名称"
            name="user_name"
            type="text"
            auto-complete="on"
            class="login_input input_box"
            style="width: 90%"
          >
            <template slot="prepend" class="login-icon" style="background-color:#ee7f60;">
              <i class="iconfont iconxuexiao"  style="color: white;"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="gradeValue">
          <el-select style="" v-model="registerForm.gradeValue" placeholder="请选择年级" @change="showGrade">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="rvcode">
          <el-input
            v-model="registerForm.rvcode"
            placeholder="请输入右侧验证码"
            name="Num"
            style="width: 65%;"
            auto-complete="on"
          ></el-input>
          <div class="ccode" @click="handleCodeR">{{rccode}}</div>
        </el-form-item >
        <el-button v-if="buttonShow" v-model="register"  type="primary" class="login-button"  @click="checkForm">注册</el-button>
        <el-button v-else v-model="register"  type="primary" class="login-button"  style="background-color: gainsboro">注册</el-button>
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
      buttonShow:false, // 注册按钮是否可用
      pwdLevel:0,
      // loginPwdLevel:0,
      // 注册
      rules:{
        user_name: [{
          required: true,
          message: "请输入用户名",
          trigger: 'blur'
        }
        ],
        password:[
          {
            pattern: /^[0-9a-zA-Z]{8,12}$/,
            message: "请同时具备大小写字母及数字的8-12位密码",
            trigger: 'change'
          },{
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        },{
          min:8,
          max:12,
          message: "密码长度少于8位",
          trigger: 'blur'
        },],
        school_name: [{
          required: true,
          message: "请输入您所在的学校",
          trigger: 'blur'
        }
        ],
        rvcode: [{
          required: true,
          message: "请输入验证码",
          trigger: 'blur'
        }
        ],
      },
      // 登录
      rules1: {
        user_name: [{
          required: true,
          message: "请输入用户名",
          trigger: 'blur'
        }
        ],
        password:[
          {
            pattern: /^[0-9a-zA-Z]{8,12}$/,
            message: "密码为8-12位，且同时具备大小写字母、数字",
            trigger: 'change'
          },{
            required: true,
            message: "请输入密码",
            trigger: 'blur'
          },{
            min:8,
            max:12,
            message: "密码长度少于8位",
            trigger: 'blur'
          },],
        vcode: [{
          required: true,
          message: "请输入验证码",
          trigger: 'blur'
        }
        ],
      },

      select: '普通检索',
      input3: '',
      logo: logo,
      showDialogTwo: false,
      showDialog: false,
      loginFlag: false,
      researchFlag: false,
      compositionData: [], // 搜索到的所有数据
      // total: 0, // 搜索到的数据数量

      rememberName: false, // 记住用户名
      autoLogin: false, // 自动登录



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
        password: '',
        vcode: '', // 登录，用户输入的验证码
      },
      registerForm: {
        user_name: '',
        password: '',
        school_name: '',
        gradeValue: '',//选中的年级
        rvcode: '', // 注册，用户输入的验证码
      },

      ableToRegister:false,
      username: localStorage.username,
      ccode: '', // 登录，验证码
      rccode: '', // 注册，验证码
    }
  },
  watch: {
    registerForm: {
      handler(newName, oldName) {
        console.log(this.registerForm)
        if(this.registerForm.user_name.length>0&&this.registerForm.school_name.length>0&&this.registerForm.gradeValue.length>0&&this.registerForm.rvcode.length>0){
          if(this.registerForm.password.length>=8 && this.pwdLevel === 3){
            console.log("可以注册啦")
            this.buttonShow = true
          }
          else {
            console.log("密码不合格哦")
            this.buttonShow = false
            // this.$message("请同时具备大小写字母以及数字")
          }
        }
        else {
          console.log("表格不完整哦")
          this.buttonShow = false
        }
      },
      immediate: true,
      deep:true,
    },
     input3(newName, oldName) { // 查询的内容
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
    this.generatedCodeR()//加载验证码
    this.judgeFlag()
    this.clearLogin()//判断用户登录状态
  },
  methods: {
    // changeRem(){ // 记住密码多选框选中状态

    // },

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
        //var zcpwd = this.registerForm.password
        var zcpwd = this.$encruption(this.registerForm.password)
        console.log("注册时加密之后的密码",zcpwd)
        const prams = {
          name: this.registerForm.user_name,
          password: zcpwd,
          schoolname: this.registerForm.school_name,
          nianji: this.registerForm.gradeValue
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
      console.log("登录弹框之前")
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
        // let a = localStorage.getItem("REM_NAME")
        if(localStorage.getItem("REM_NAME")=="true"){
          this.rememberName = true
            console.log("变成布尔型了吗",typeof this.rememberName)
        }else if (localStorage.getItem("REM_NAME")=="false"){
          this.rememberName = false
            console.log("变成布尔型了吗",typeof this.rememberName)
        }
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
       var dlpwd = this.$encruption(localStorage.getItem("PASSWORD")) //经过RSA加密之后的密码
      //var dlpwd = localStorage.getItem("PASSWORD") //未经过加密的密码
      // var dlpwd = this.$md5('localStorage.getItem("PASSWORD")')//经过md5加密的密码
      console.log("加密之后的用户名",dlpwd)
      const prams = {
        username: localStorage.getItem("USERNAME"),
        password: dlpwd
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
    handleCodeR () {
      this.generatedCodeR()
    },
    // 生成登录界面的验证码
    generatedCode () {
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      let code = ''
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62)
        code += random[index]
      }
      this.ccode = code
    },
    // 生成注册页面的验证码
    generatedCodeR () {
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
      let code = ''
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 62)
        code += random[index]
      }
      this.rccode = code
    },
    // 登录界面，判断验证码是否输入准确
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
        let vcode = this.loginForm.vcode
        // vcode = vcode.toUpperCase() //不区分大小写
        let ccode = this.ccode
        // ccode = ccode.toUpperCase()
        if (vcode != ccode) {
          this.$message.error('请输入正确的验证码!')
          this.generatedCode()
          // this.$set(this.loginInfo, 'vcode', '')
          // this.$set(this.loginInfo, 'password', '')
        } else {
          this.login()
          // return 1
        }
        this.generatedCode()

    },
    // 注册界面，判断验证码是否输入准确
    checkCodeR () {
      let rvcode = this.registerForm.rvcode
      // rvcode = rvcode.toUpperCase() //不区分大小写
      let rccode = this.rccode
      // rccode = rccode.toUpperCase()
      if (rvcode != rccode) {
        this.$message.error('请输入正确的验证码!')
        this.generatedCodeR()
      }else {
        this.register()
      }
      this.generatedCodeR()

    },
    // 检查注册表单是否填写完整
    checkForm(){
      if(this.registerForm.user_name.length<=0){
        this.$message("用户名不能为空")
      }else if(this.registerForm.password.length<8 | this.pwdLevel!=3){
        this.$message("密码不符合要求")
      }else if(this.registerForm.school_name.length<=0){
        this.$message("学校名不能为空")
      }else if(this.registerForm.gradeValue.length<=0){
        this.$message("请选择您所在的年级")
      }else if(this.registerForm.rvcode.length <=1){
        this.$message("请输入验证码")
      }else{
        this.checkCodeR()
      }

    },
    // 注册页面密码强度
    registerPwd () {
      var a= this.registerForm.password;
      console.log("输入框中值改变了",a)
      var reg=/^[0-9]{1,12}$|^[a-z]{1,12}$|^[A-Z]{1,12}$/;    //全是数字或全是字母     1-12个字符
      var reg1=/^[A-Z0-9]{1,12}$|^[a-zA-Z]{1,12}$|^[a-z0-9]{1,12}$/;     //数字、26个英文字母      1-12个字符
      var reg2=/^[A-Za-z0-9]{1,12}$/;           // 由数字、26个英文字母组成的字符串    1-12个字符
      if(a.match(reg)){
        this.pwdLevel = 1
      }
      else if(a.match(reg1)){
        this.pwdLevel = 2
      }
      else if(a.match(reg2)){
        this.pwdLevel = 3
      }
      console.log(this.pwdLevel)
    },
    // 登录页面密码强度
    // loginPwd () {
    //   var a= this.loginForm.password;
    //   console.log("输入框中值改变了",a)
    //   var reg=/^[0-9]{1,12}$|^[a-zA-Z]{1,12}$/;    //全是数字或全是字母     6-16个字符
    //   var reg1=/^[A-Za-z0-9]{1,12}$/;     //数字、26个英文字母      6-16个字符
    //   var reg2=/^\w{1,12}$/;           // 由数字、26个英文字母或者下划线组成的字符串    6-16个字符
    //   if(a.match(reg)){
    //     this.loginPwdLevel = 1
    //   }
    //   else if(a.match(reg1)){
    //     this.loginPwdLevel = 2
    //   }
    //   else if(a.match(reg2)){
    //     this.loginPwdLevel = 3
    //   }
    //   console.log(this.loginPwdLevel)
    // },
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
  .login-button-before{
    width:100%;
    margin-bottom:30px;
    background-color: gray;
    border: 0;
    font-size: 20px;
    letter-spacing: 0.3em;
  }
  .login-button{
    width:100%;
    margin-bottom:30px;
    background-color: #FF7533;
    border: 0;
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
  .input-with-select .el-input-group__prepend{
    background-color: #ffffff;
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
    border: 1px solid #ee7f60 !important;
  }
  .el-select .el-input .el-select__caret {
    color: #ee7f60;
  }
  .el-input-group .el-input__inner {
    border: 1px solid #ee7f60;
  }

  .el-dialog .el-dialog__body{
    text-align: left;
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
