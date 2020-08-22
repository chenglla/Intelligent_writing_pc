<template>
    <div class="app-container">
<!--      <h1>这是新的首页</h1>-->
      <el-container style="width: 100%">
<!--        <el-header class="el_header_style" height="80px">-->
<!--          <all-header @login="showLogin" @register="beginRegistered"></all-header>-->
          <all-header @login="showLogin" @register="beginRegistered" @selectWord="getSelectData" ></all-header>
<!--          <el-row>-->
<!--            <el-col :span="5">-->
<!--              <div class="pictureContainer">-->
<!--                <img src="http://114.242.223.253/zihui/images/mynewlogo.png" style="width:100%;height: 60px">-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="4" :offset="1">-->
<!--              <div class="logo_container">-->
<!--                <el-image-->
<!--                  style="width: 162px; height: 42px"-->
<!--                  :src=logo></el-image>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="6" :offset="3">-->
<!--              <div class="card-one">-->
<!--                <el-card shadow="never" style="height: 80px;width: 100%;border: unset;">-->
<!--                  <el-input placeholder="请输入关键字" v-model="input3" class="input-with-select">-->
<!--                    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px" @change="selectchange" value="">-->
<!--                      <el-option label="普通检索" value="普通检索"></el-option>-->
<!--                      <el-option label="AI检索" value="AI检索"></el-option>-->
<!--                    </el-select>-->
<!--                    <el-button slot="append" icon="el-icon-search" @click="research" style="color: #fff;" class="select_btn"></el-button>-->
<!--                  </el-input>-->
<!--                </el-card>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="2" :offset="1">-->
<!--              <div class="tubiao-contianer">-->
<!--                <div class="tubiao">-->
<!--&lt;!&ndash;                  <i class="el-icon-s-data"></i>&ndash;&gt;-->
<!--                  <i class="iconfont iconzhinengceping-"></i>-->
<!--                </div>-->
<!--                <div class="title">-->
<!--                  <span style="color: dimgrey;cursor: pointer" @click="goCompositionContent">智能测评</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <div class="tubiao-contianer">-->
<!--                <div class="tubiao">-->
<!--                  <i class="el-icon-s-custom"></i>-->
<!--                </div>-->
<!--                <div class="title">-->
<!--                  <span v-if="loginFlag==='否'" style="color: dimgrey;cursor: pointer" @click="showLogin">登录</span>-->
<!--                  <span v-if="loginFlag==='否'" style="color: dimgrey;cursor: pointer" @click="beginRegistered">注册</span>-->
<!--&lt;!&ndash;                  <span v-else style="color: dimgrey">我的</span>&ndash;&gt;-->
<!--                  <user-popover v-else></user-popover>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-header>-->
        <el-main class="home-main">
          <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="item" alt="">
<!--              <h3 class="medium">{{ item }}</h3>-->
            </el-carousel-item>
          </el-carousel>
          <el-container>
<!--            <el-aside width="30%">-->
<!--              <search-section style="padding-top: 20%"></search-section>-->
<!--            </el-aside>-->
<!--            <el-main>-->
              <composition-list :father="username" :total="total" :fatherArray="fatherData" ref="child"></composition-list>
<!--            </el-main>-->
          </el-container>
        </el-main>
        <el-footer>
          <div class="copyrightContainer">
            <span style="font-size: 12px">Copyright&nbsp;&nbsp;&nbsp;中科智禾教育大数据中心   ©2019</span>
          </div>
        </el-footer>
      </el-container>
     <!-- 登录弹框
      <el-dialog  :visible.sync="showDialog" width="30%">
        <el-form  :model="loginForm" class="login-form" auto-complete="on" label-position="left">
          <el-form-item>
            <el-input
              v-model="loginForm.user_name"
              placeholder="用户名"
              name="user_name"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              name="password"
              show-password
              auto-complete="on"/>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>
        </el-form>
      </el-dialog>
      <el-dialog  :visible.sync="showDialogTwo" width="30%">
        <el-form  :model="loginForm" class="login-form" auto-complete="on" label-position="left">
          <el-form-item>
            <el-input
              v-model="registerForm.user_name"
              placeholder="请输入用户名"
              name="user_name"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="registerForm.school_name"
              placeholder="请输入学校名称"
              name="user_name"
              type="text"
              auto-complete="on"
            />
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
          <el-form-item>
            <el-input
              v-model="registerForm.password"
              placeholder="请输入密码"
              name="password"
              show-password
              auto-complete="on"/>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="register">注册</el-button>
        </el-form>
      </el-dialog> -->
    </div>
</template>

<script>
import {login} from '@/api/login'
import {register} from '@/api/register'
import logo from '@/assets/image/logo.png'
import searchSection from '@/components/searchSection'
import allHeader from '@/components/allHeader'
import compositionList from '@/components/compositionList'
import userPopover from '@/components/user/userPopover'
import {getCompositionListData, getfindByTitle2, getResearchListData} from '@/api/getCompositionData'
export default {
  name: 'homePage',
  components: { searchSection, compositionList, userPopover, allHeader },
  data () {
    return {
      gradeValue: '',
      researchFlag: false,
      imgList: [require('../assets/image/banner1.png'), require('../assets/image/banner2.png'), require('../assets/image/banner4.png')],
      select: '普通检索',
      input3: '',
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
      logo: logo,
      showDialogTwo: false,
      showDialog: false,
      loginFlag: false,
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
      fatherData: [],
      selectWord: '',
      total: 0
    }
  },
  inject: ['reload'],
  mounted () {
    // 修改
    if (localStorage.getItem('username') === 'null') {
      localStorage.clear()
    }
    this.judgeFlag()
    if (this.selectWord === '') {
      console.log('zhixinglemounted')
      this.getData()
    }
  },
  watch: {
    selectWord (newVal, oldWord) {
      console.log('改变了么：', newVal, oldWord)
      this.selectWord = newVal
      this.getSelectContent()
    }
  },
  methods: {
    showGrade: function () {
      console.log('我变了')
      console.log(this.gradeValue)
    },
    showLogin: function (val) {
      // this.loginFlag = '是'
      console.log('字串符传过来的：', val)
      this.showDialog = val
      // alert('登录成功')
    },
    beginRegistered: function (val) {
      console.log('开始注册')
      this.showDialogTwo = val
    },
    getSelectContent () {
      // this.fatherData = []
      if (this.select === '') {
        this.$message.warning('请选择搜索类型')
      } else if (this.select === '普通检索') {
        this.researchFlag = true
        const prams = {
          title: this.selectWord,
          page: 0
        }
        this.loading = true
        getfindByTitle2(prams).then(respone => {
          console.log('测试搜索')
          console.log(respone.data)
          this.fatherData = respone.data.data.list
          // changesize(){
          // Bus.$emit('add', this.arg)
          // }
          // this.total = respone.data.data.total
          // this.$emit('compositionData', this.compositionData)
          console.log('传过去了么')
          if (respone.data.data.total === 0) {
            this.$message({
              message: '未查询到相关文章',
              type: 'warning'
            })
          }
          // console.log(this.total)
          this.loading = false
        })
      } else {
        this.researchFlag = true
        const prams = {
          query: this.selectWord,
          page: 1
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          console.log('测试搜索')
          console.log(respone.data)
          this.fatherData = respone.data.data.list
          // this.$emit('compositionData', this.compositionData)
          console.log('传过去了么')
          this.total = parseInt(respone.data.data.total)
          if (respone.data.data.total === 0) {
            this.$message({
              message: '未查询到相关文章',
              type: 'warning'
            })
          }
          console.log(this.total)
          this.loading = false
        })
      }
      console.log('改变玩以后的值；', this.fatherData)
    },
    getSelectData (selectWord) {
      console.log('收到了吗', selectWord)
      this.selectWord = selectWord
      this.getSelectContent()
      // this.getData()
      // this.fatherData = selectData
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
    login: function () {
      // this.loginFlag = '是'
      // // alert('登录成功')
      // this.showDialog = false
      const prams = {
        username: this.loginForm.user_name,
        password: this.loginForm.password
      }
      login(prams).then(respone => {
        localStorage.clear()
        if (respone.data.code === 0) {
          localStorage.setItem('username', respone.data.data)
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 5000
          })
          this.loginFlag = true
          // alert('登录成功')
          this.showDialog = false
          this.username = localStorage.username
          const prams = {
            page: 1,
            user: this.username
          }
          getCompositionListData(prams).then(respone => {
            this.fatherData = respone.data.data
            console.log('输出要传给子组件显示的作文数据')
            console.log(this.fatherData)
            this.$refs.child.handleCurrentChange(1)
            this.reload()
          })
        } else {
          this.$message.error('用户名或密码错误！')
        }
      })
    },
    goCompositionContent: function () {
      console.log('初次加载username')
      console.log(this.username)
      if (this.username === '' || this.username === undefined) {
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
      if (localStorage.username === '' || localStorage.username === undefined) {
        this.loginFlag = false
      } else {
        this.loginFlag = true
      }
      console.log('我调用完方法了')
    },
    // selectchange () { // 选择框选择改变
    //   console.log(this.select)
    // },
    research: function () {
      if (this.select === '') {
        this.$message.warning('请选择搜索类型')
      } else if (this.select === '普通检索') {
        this.researchFlag = true
        const prams = {
          title: this.input3,
          page: 0
        }
        this.loading = true
        getfindByTitle2(prams).then(respone => {
          console.log('测试搜索')
          console.log(respone.data)
          this.compositionData = respone.data.data.list
          this.total = respone.data.data.total
          if (this.total === 0) {
            this.$message({
              message: '未查询到相关文章',
              type: 'warning'
            })
          }
          console.log(this.total)
          this.loading = false
        })
      } else {
        this.researchFlag = true
        const prams = {
          query: this.input3,
          page: 1
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          console.log('测试搜索')
          console.log(respone.data)
          this.compositionData = respone.data.data.list
          this.total = respone.data.data.total
          if (this.total === 0) {
            this.$message({
              message: '未查询到相关文章',
              type: 'warning'
            })
          }
          console.log(this.total)
          this.loading = false
        })
      }
    },
  }
}
</script>

<style scoped>
  .home-main{
    margin-top: 80px;
    /* position: relative;
    top: 80px; */
  }
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
  /*.el_header_style {*/
  /*  position:  fixed;*/
  /*  z-index: 99;*/
  /*  background-color: #333;*/
  /*}*/
  .el_header_style:after {
    content: '';
    position: absolute;
    height: 1px;
    width:100%;
    background-color: #ececec;
    top: 80px;
    /*border-bottom: 1px solid #ececec;*/
  }
</style>
<style>
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
</style>
