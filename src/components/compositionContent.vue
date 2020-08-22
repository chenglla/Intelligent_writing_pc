<template>
  <div class="app-container">
    <el-container style="width: 100%">
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
      <el-main>
        <el-container style="padding-right: 50px;">
          <el-main  >
            <el-card class="box-card"  shadow="never" style="width: 100%;height: 650px">
              <el-button class="uploadImg" type="primary" size="small"  @click="uploadimg">
              <!-- <el-button class="uploadImg" type="primary" size="small"  @click="gotocommentDetail"> -->
                <i class="iconfont icontupianshangchuan"></i>
                图片上传
              </el-button>
              <el-button class="onMeasure" type="primary" @click="beginMeasure">
                <i class="iconfont iconzhinengceping-"></i>
                <span >点击进行智能评测</span>
              </el-button>
              <el-dialog
                title="提示：请按照先带有标题页，再是作文页的顺序进行上传"
                :visible.sync="dialogVisible1"
                width="40%">
                <el-upload
                  action="http://114.242.223.253/zihui/essay/fileUpload"
                  list-type="picture-card"
                  name="file"
                  :before-upload="beforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"

                >
                  <i class="iconfont icontupianshangchuan"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
                  <el-button class="pictureUpload" type="primary"  @click="subimg" >确 定</el-button>
                </span>
              </el-dialog>
              <el-row>
                <el-col :span="2">
                  <div style="padding-top: 8px">
                    <span style="font-weight: bolder">标题</span>
                  </div>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="text"
                    rows="1"
                    placeholder="请输入作文标题"
                    v-model="textarea1"
                    style="margin-bottom: 30px;">
                  </el-input>
                </el-col>
              </el-row>
              <!-- <el-divider></el-divider> -->
              <el-row>
                <el-col :span="2">
                  <div style="padding-top: 8px">
                    <span style="font-weight: bolder">正文</span>
                  </div>
                </el-col>
                <el-col :span="22">
                  <div id="zhengwen">
                    <mavon-editor  style="height: 500px;" v-model="textarea2" />
                  </div>
                  <!-- <textarea
                    type="textarea"
                    rows="23"
                    placeholder="请输入作文内容"
                    v-model="textarea2"
                    class="textArea2"
                    >
                  </textarea> -->
                  <!-- <div class="zhengwen" id="zhengwen">
                    <el-input
                      type="textarea"
                      rows="23"
                      placeholder="请输入作文内容"
                      v-model="textarea2"
                      id="textArea2"
                      >
                    </el-input>
                  </div> -->
                </el-col>
              </el-row>

            </el-card>
          </el-main>
          <el-aside width="15%" class="asidePart">
            <div class="model_picture" >
              <div class="piture-title" >作文模板</div>
              <div>
                <img class="backPicture" src="../assets/image/作文模板无.png" alt="" @click="changeBackground(0)">
              </div>
              <div>
                <img class="backPicture" src="../assets/image/作文模板1.png" alt="" @click="changeBackground(1)">
              </div>
              <div>
                <img class="backPicture" src="../assets/image/作文模板2.png" alt="" @click="changeBackground(2)">
              </div>
              <div>
                <img class="backPicture" src="../assets/image/作文模板3.png" alt="" @click="changeBackground(3)">
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-main>
      <el-footer>
        <div class="copyrightContainer">
          <span style="font-size: 12px">Copyright&nbsp;&nbsp;&nbsp;中科智禾教育大数据中心   ©2019</span>
        </div>
      </el-footer>
    </el-container>
    <el-dialog
      title="智能评测结果"
      :visible.sync="dialogVisible"
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="gotoPage" style="background-color: #ee7f60;">查看评测结果</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {intelligentMeasurement2, getfindByTitle3, getType1, getType2, getContent} from '@/api/getCompositionData'
import logo from '@/assets/image/logo.png'
export default {
  name: 'compositionContent',
  components:{
    mavonEditor,
  },
  data () {
    return {
      // backgroundImg:[{
      //   url1:'../assets/image/作文模板无.png'
      // },],
      dialogVisible: false,
      username: localStorage.getItem('username'),
      logo: logo,
      textarea1: '',
      textarea2: '',
      measureData: [],
      dialogData: [],
      tuijianData: [],
      tuijianFlag: false,
      loading: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dishimgurl: '',
      dialogImageUrl: '',
      ImageUrlString: '',
      updateUrl: '',
      TypeList1: [],
      TypeList2: [],
      colorList: ['primary', 'success', 'info', 'warning', 'danger'],
      tag_type: '',
      page: 0,
      size: 10,
      type1: '',
      content: [],
      isactive: -1,
      showicon: true
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    gotocommentDetail(){
      this.$router.push({ path: '/commentDetail'
      })

    },
    startEvaluation: function () {
      this.dialogVisible = true
    },
    beginMeasure: function () {
      if (this.textarea1 === '' || this.textarea2 === '') {
        this.$message.error('作文标题或作文内容不能为空')
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        })
        const prames = {
          title: this.textarea1,
          passage: this.textarea2,
          user: this.username
        }
        this.loading = true
        intelligentMeasurement2(prames).then(respone => {
          this.measureData = respone.data.data
          this.dialogData = this.measureData.tags
          this.tuijianData = respone.data.data.passage
          console.log(this.tuijianData)
          this.tuijianFlag = true
          this.dialogVisible = true
          this.loading = false
          loading.close()
        })
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      var list = ''
      for (var i = 0; i < fileList.length; i++) {
        list += fileList[i].response + ';'
      }
      this.ImageUrlString = list
      console.log(this.ImageUrlString)
      this.$message({
        type: 'warning',
        message: '图片移除成功',
        duration: 6000
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible2 = true
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      var list = ''
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      })
      console.log(res)
      console.log(fileList)
      // if (file.response.success) {
      //     this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
      // }
      this.dishimgurl = res
      for (var i = 0; i < fileList.length; i++) {
        list += fileList[i].response + ';'
      }
      this.ImageUrlString = list
      console.log(this.ImageUrlString)
    },
    handleError (res, file) {
      this.$message({
        type: 'error',
        message: '图片上传失败',
        duration: 6000
      })
      console.log(res)
    },
    beforeUpload (file) {
      console.log(file, '文件')
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      // if (!isLt2M) {
      //     this.$message.error('上传图片大小不能超过 2MB!');
      // }
      return (isJPG || isBMP || isGIF || isPNG)
    },
    gotoPage () {
      this.dialogVisible = false
      // let routeData = this.$router.resolve({ path: '/commentDetail',
      //   query: {
      //     title: this.textarea1,
      //     passage: this.textarea2,
      //     user: this.username
      //   }})
      // window.open(routeData.href, '_blank')
      this.$router.push({ path: '/commentDetail'
        // query: {
        //   title: this.textarea1,
        //   passage: this.textarea2,
        //   user: this.username
        // }
      })
      localStorage.setItem('title', this.textarea1)
      localStorage.setItem('passage', this.textarea2)
      localStorage.setItem('user', this.username)
    },
    gotoContent (item) {
      // const {href} = this.$router.resolve({
      //   path: '/compositionContent',
      //   query: {
      //     id: item.essayId
      //   }
      // })
      // window.open(href, '_bank')
      this.$router.push({
        path: '/compositiondetails',
        query: {
          id: item.essayId
        }
      })
      console.log(item)
    },
    uploadimg () {
      this.dialogVisible1 = true
    },
    subimg () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      var params = {
        path: this.ImageUrlString
      }
      getfindByTitle3(params).then((res) => {
        loading.close()
        this.dialogVisible1 = false
        this.textarea1 = res.data.data.title
        this.textarea2 = res.data.data.content
      })
    },
    getType () {
      getType1().then((res) => {
        this.TypeList1 = res.data.data.list
      })
    },
    Type2 (item, index) {
      this.tag_type = this.colorList[index]
      var params = {
        type1: item
      }
      getType2(params).then((res) => {
        this.TypeList2 = res.data.data.list
        this.type1 = item
      })
    },
    Content_Type (item) {
      var params = {
        type1: this.type1,
        page: this.page,
        size: this.size,
        type2: item
      }
      getContent(params).then((res) => {
        this.content = res.data.data.list
      })
    },
    expend_text: function (index) {
      // var styles = {
      //   'max-height': '100%',
      //   index: index
      // }
      this.showicon = false
      this.isactive = index

      // console.log(this.curindex)
      // this.line['max-height'] = '100%'
      // this.line.index = index
    },
    show_switch () {
      this.showicon = true
      this.isactive = -1
    },
    changeBackground(val){
      if(val == 0){
        document.getElementById("zhengwen").style.backgroundImage='none';
      }else{
        var transImag = document.querySelector('.zhengwen')
        var currentImage = require('../assets/image/作文模板'+val+'.png')
        transImag.style.backgroundImage = 'url('+currentImage+')'
      }
    },
    // changeBackground(i){//修改背景图片

    //   document.getElementById("zhengwen").style.backgroundImage='url(../assets/image/作文模板2.png)';
    // },
  }
}
</script>

<style  scoped>
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
  .type2{
    margin-top: 20px;margin-left: 20px
  }
  .type2:hover {
    cursor: pointer;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .line-limit-length {
    max-height: 60px;
    overflow: hidden;
    /*white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...*/
  }
  .addclass {
    max-height: 100%;
    color: red;
  }
  .scrollbar >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/ .el-card__body {
    background-color: #F5F5F5;
    border: 0;
  }
  .uploadImg{ /* 图片上传按钮 */
    margin-left: 90px;
    margin-bottom: 20px;
    background: linear-gradient(to right ,#FE7655,#FF9972);
  }
  .onMeasure{/* 点击开始测试按钮 */
    color: black;
  }
  .el-upload .icontupianshangchuan{/* 提交图片弹窗的图标 */
    font-size: 100px;
  }
  .pictureUpload{/* 提交图片弹窗的按钮 */
    width: 50%;
    background: linear-gradient(to right ,#FE7655,#FF9972);
  }
  .asidePart{ /* 侧边部分 */
  }
  .model_picture{ /* 侧边外框 */
    position: relative;
    top: 100px;
    background-color: green;
    background-color: white;
    border: 1px solid #CCCCCC;
    text-align: center;
    padding-bottom: 30px;
  }
  .piture-title{ /* "作文模板" */
    width: 100%;
    padding-top: 4px;
    height: 30px;
    background-color: #FF9972;
    text-align: center;
    /* font-weight: bolder; */
    font-size: 16px;
    color: white;
  }
  .backPicture{ /* 每张图片 */
    margin-top: 30px;
    width: 120px;
    height: 70px;
  }
  .backPicture:hover{
    border: 1px solid #FF9972;
    border-radius: 4px;
  }
  .el-button--primary {
    background-color: rgb(249,249,249);
    border: 1px solid #DDDDDD;
    /* color: #000000; */
  }
  .el-card {/* 去除默认边框 */
    border: 0;
  }
  .zhengwen{
    background-color: white;
    /* background-image: none; */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 30px;
    padding: 20px 30px;
  }
</style>
<style>
  .zhengwen .el-textarea .el-textarea__inner {
    background-color: unset;
    border: none;
    font-size: 18px;
    letter-spacing: 2px;
    /* background-image: url(../assets/image/作文模板3.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 30px;
    padding: 20px 30px; */
  }
  .el-dialog{
    background: rgb(250,249,254);

  }
  .el-dialog__footer ,.el-dialog__body{
    text-align: center;
  }

  .el-upload--picture-card {
    background-color: white;
    border-color: rgb(246,114,10);

    width: 80%;
    text-align: center;
  }
  /* 预览部分的背景 */
  .v-show-content{
    /* background-image: url(../assets/image/banner4.png) !important; */
  }
</style>
