<template>
  <div class="app-container">
    <el-container style="width: 100%" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 1)">
      <el-header height="80px">
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
          <el-col :span="2" :offset="10">
            <div class="tubiao-contianer">
              <div class="tubiao">
                <!--                <i class="el-icon-s-data"></i>-->
              </div>
              <div class="title">
                <!--                <span style="color: dimgrey;cursor: pointer" @click="goCompositionContent">智能测评</span>-->
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="tubiao-contianer">
              <div class="tubiao">
                <!--                <i class="el-icon-s-custom"></i>-->
              </div>
              <div class="title">
                <!--                <span v-if="loginFlag==='否'" style="color: dimgrey;cursor: pointer" @click="showLogin">登录</span>-->
                <!--                <span v-else style="color: dimgrey">我的</span>-->
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="detailMain">
        <el-container class="commentDetail">
          <el-main width="70%;">
            <el-card style="min-height: 900px">
              <div style="padding: 40px;margin: 0 auto">
                <h1 class="title2">
                  <span>{{title}}</span>
                </h1>
                <div class="tag">
                  <el-tag type="info" >{{tag}}</el-tag>
                </div>
                <div style="padding-left: 40px; padding-right: 40px;margin: 0 auto">
                  <p class="content" v-html="content">{{content}}</p>
                </div>
              </div>
            </el-card>
          </el-main>
          <el-aside width="30%" style="padding-top:20px;">
            <el-card style="min-height: 300px" >
              <!--<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)">-->
                <!--<div class="score">-->
                  <!--<div class="word">-->
                    <!--<span>93</span>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <div style="padding: 10px">
                <div style="margin-bottom: 20px;display: inline-block;">
                  <i class="iconfont icon-jiangbei" ></i>
                  <div style="display: inline-block;">
                    <div style="color: red;font-size: 20px;">{{tags[4]}}</div>
                    <div style="font-size: 10px;">我的得分</div>
                  </div>
                </div>
                <div class='artType'>
                  <!-- <span style="font-weight: bold">标签：</span> -->
                  <span>{{tag}}</span>
                </div>
                <!-- <HR/> -->
                <el-tabs stretch @tab-click="handleClick">
                    <el-tab-pane  label="注释" name="first">
                      <span style="font-weight: bold">注释：</span>
                      <span>{{tags[5]}}</span>
                    </el-tab-pane>
                    <el-tab-pane  label="评语" name="second">
                      <span style="font-weight: bold">评语：</span>
                      <span>{{tags[5]}}</span>
                    </el-tab-pane>
                  </el-tabs>
                <!-- <div style="margin-bottom: 20px">
                  <span style="font-weight: bold">评语：</span>
                  <span>{{tags[5]}}</span>
                </div> -->
              </div>
            </el-card>
            <el-card style="min-height: 580px;margin-top: 20px">
              <div v-for="(item, index) in parallel" :key="index" class="parallel">
                <div class="index">
                  <span>
                    {{index+1}}
                  </span>
                </div>
                <span>{{item}}</span>
              </div>
            </el-card>
          </el-aside>
        </el-container>
      </el-main>
      <el-footer>
        <div class="copyrightContainer">
          <span style="font-size: 12px">Copyright&nbsp;&nbsp;&nbsp;中科智禾教育大数据中心   ©2019</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import logo from '@/assets/image/logo.png'
import {intelligentMeasurement2} from '@/api/getCompositionData'
export default {
  name: 'commentDetail',
  data () {
    return {
      logo: logo,
      title: '',
      passage: '',
      user: '',
      content: '',
      tag: '',
      parallel: [],
      tags: [],
      fullscreenLoading: true
    }
  },
  mounted () {
    // this.title = this.$route.query.title
    // this.passage = this.$route.query.passage
    // this.user = this.$route.query.user
    this.title = localStorage.getItem('title')
    this.passage = localStorage.getItem('passage')
    this.user = localStorage.getItem('user')
    this.getData()
  },
  methods: {
    //标签页点击更换页面
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData () {
      const prames = {
        title: this.title,
        passage: this.passage,
        user: this.user
        // title: null,
        // passage: null,
        // user: null

      }
      intelligentMeasurement2(prames).then((res) => {
        this.content = res.data.data.content
        this.tag = res.data.data.tags[1]
        this.tags = res.data.data.tags
        //截取成绩，保留小数点后两位
        this.tags[4] = this.tags[4].toFixed(2)
        //console.log('4',this.tags[4])
        this.parallel = res.data.data.parallel
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .icon-jiangbei{
    font-size: 40px;
    color: orange;
  }
  /* 中间部分 */
  .detailMain{
    padding: 20px 50px;
  }
  .el-main{
    background-color: rgb(249,205,173)!important;
  }
  .logo_container{
    padding-top: 20px;
  }
  .el-icon-s-custom,
  .el-icon-s-data{
    padding-top: 25px;
    font-size: 23px;
  }
  .tubiao-contianer{
    display: inline-block;
  }
  .tubiao{
    display: inline-block;
  }
  .title{
    display: inline-block;
  }
  .el-main{
    background-color: #F5F5F5;
  }
  .artType{
    color: white;
    font-weight: blod;
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 20px;
    float: right;
    background: linear-gradient(to right ,#FE7655,#FF9972);
    padding: 4px 16px;
  }
  .copyrightContainer{
    padding-top: 20px;
    text-align: center;
  }
  .title_container{
    display: inline-block;
  }
  .input{
    display: inline-block;
  }
  .button_container{
    padding-top: 25px;
    text-align: center;
  }
  .pictureContainer{
    padding-top: 10px;
  }
  .one_row{
    display: inline-block;
  }
  .composition_title{
    display: inline-block;
  }
  .biaoqian{
    display: inline-block;
  }
  .score {
    background-color: orange;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .word {
    line-height: 100px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }
  .title2 {
    padding: 10px;
    text-align: center;
    margin: 0 auto;
    font-size: 28px;
  }
  .tag {
    width: 50px;
    margin: 20px auto;
  }
  .content {
    text-indent: 2em;
    white-space: pre-wrap;
    line-height: 40px;
  }
  .content >>> .parall {
    color: red;
    /*width: 20rem;*/
    /*height: 20px;*/
    /*background-size: 15px 15px;*/
    /*background-repeat: repeat-x;*/
    /*background-image: linear-gradient(135deg, transparent 45%, red 55%, transparent 60%), linear-gradient(45deg,transparent 45%, red 55%, transparent 60%);*/
    background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
    radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
    background-size: 20px 20px;
    background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
    padding: 10px;
  }
  .parallel {
    /*height: 50px;*/
    /*line-height: 100px;*/
    /*text-align: center;*/
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(204,204,204, 0.3);
    border-radius: 4px;
    position: relative;
  }
  .index {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #999999;
    color: white;
    text-align: center;
    line-height: 18px;
    font-weight: bold;
    position: absolute;
    top: -8px;
    left: -8px;
  }
  /* .el-card__body div{
    padding: 40px 6px !important;
  } */
</style>
<style>

</style>
