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
        <el-col :span="6" :offset="3">
          <div class="card-one">
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
        <el-col :span="2">
          <div class="tubiao-contianer">
            <div class="tubiao">
              <i class="el-icon-s-custom"></i>
            </div>
            <div class="title">
              <span v-if="loginFlag==='否'" style="color: dimgrey;cursor: pointer" @click="showLogin">登录</span>
              <span v-if="loginFlag==='否'" style="color: dimgrey;cursor: pointer" @click="beginRegistered">注册</span>
              <user-popover v-else></user-popover>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
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
      select: '普通检索',
      input3: '',
      logo: logo,
      showDialogTwo: false,
      showDialog: false,
      loginFlag: '否',
      researchFlag: false,
      compositionData: [], // 搜索到的所有数据
      // total: 0, // 搜索到的数据数量
    }
  },
  methods: {
    selectchange () { // 选择框选择改变
      console.log(this.select)
    },
    research: function () {
      this.$emit('selectWord', this.input3)
    },
    showLogin: function () {
      // this.loginFlag = '是'
      this.showDialog = true
      console.log('daozheyibumei :')
      this.$emit('login', this.showDialog)
      // alert('登录成功')
    },
    beginRegistered: function () {
      console.log('开始注册')
      this.showDialogTwo = true
      this.$emit('register', this.showDialogTwo)
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
