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
        <el-container>
          <el-main width="70%;">
            <el-card class="box-card"  shadow="never" style="width: 100%;height: 650px">
              <el-button type="primary" icon="el-icon-upload" size="small" style="margin-bottom: 20px" @click="uploadimg">图片上传</el-button>
              <el-dialog
                title="提示：请按照先带有标题页，再是作文页的顺序进行上传"
                :visible.sync="dialogVisible1"
                width="50%">
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
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible1 = false">取 消</el-button>
                  <el-button type="primary"  @click="subimg">确 定</el-button>
                </span>
              </el-dialog>
              <el-row>
                <el-col :span="2">
                  <div style="padding-top: 8px">
                    <span style="font-weight: bolder">作文标题</span>
                  </div>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    rows="1"
                    placeholder="请输入作文标题"
                    v-model="textarea1">
                  </el-input>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="2">
                  <div style="padding-top: 8px">
                    <span style="font-weight: bolder">作文内容</span>
                  </div>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    rows="18"
                    placeholder="请输入作文内容"
                    v-model="textarea2">
                  </el-input>
                </el-col>
              </el-row>
              <el-row>
                <div class="button_container">
                  <el-button type="primary" round @click="beginMeasure">点击进行智能评测</el-button>
                </div>
              </el-row>
            </el-card>
          </el-main>
          <el-aside width="30%">
            <div style="padding-top: 20px">
              <el-card class="box-card"  shadow="never" >
                <el-row>
                  <span style="font-weight: bolder">推荐模板</span>
                </el-row>
                <el-divider></el-divider>
                <!--<div>-->
                  <!--<span style="font-size: 25px">模板分类</span>-->
                <!--</div>-->
                <div style="text-align: center;margin-top: 10px">
                  <el-link v-for="(item, index) in TypeList1" :key="index" style="margin-right: 10px;font-weight: bolder;font-size: 16px" :type="colorList[index]" @click="Type2(item, index)">{{item}}</el-link>
                </div>
                <div>
                  <el-tag v-for="(item, index) in TypeList2" :key="index" :type="tag_type" @click="Content_Type(item)" class="type2">{{item}}</el-tag>

                  <!--<el-card class="box-card" style="width: 100%;height: 120px" @click.native="gotoContent(item)">-->
                    <!--<el-row>-->
                      <!--<el-col :span="8">-->
                        <!--<img src="http://114.242.223.253/zihui/images/20190703c001.jpg" class="image" style="width: 80px;height: 80px">-->
                      <!--</el-col>-->
                      <!--<el-col :span="16">-->
                        <!--<el-row>-->
                          <!--<span>{{item.title}}</span>-->
                        <!--</el-row>-->
                        <!--<el-row>-->
                          <!--<el-col :span="12">-->
                            <!--<div class="one_row">-->
                              <!--<div class="biaoqian">-->
                                <!--<i class="el-icon-time"></i>-->
                              <!--</div>-->
                              <!--<div class="composition_title">-->
                                <!--<span style="font-size: 10px;font-weight: bolder">{{item.year}}</span>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</el-col>-->
                          <!--<el-col :span="12">-->
                            <!--<div class="one_row">-->
                              <!--<div class="biaoqian">-->
                                <!--<i class="el-icon-view"></i>-->
                              <!--</div>-->
                              <!--<div class="composition_title">-->
                                <!--<span style="font-size: 10px;font-weight: bolder">201</span>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</el-col>-->
                        <!--</el-row>-->
                      <!--</el-col>-->
                    <!--</el-row>-->
                  <!--</el-card>-->
                </div>
                <div style="margin-top: 20px;height: 500px">
                  <el-scrollbar style="height: 100%" class="scrollbar">
                    <el-card style="width: 98%;margin-top: 10px" v-for="(item, index) in content" :key="index">
                      <div slot="header" class="clearfix">
                        <span>{{item.title}}</span>
                      </div>
                      <div>
                        <p :class="isactive === index ? 'addclass' : 'line-limit-length' " style="white-space: pre-wrap;">{{item.content}}</p>
                        <i class="el-icon-more-outline" @click="expend_text(index)" v-if="showicon || isactive !== index"></i>
                        <i class="el-icon-arrow-up" @click="show_switch" v-if="!showicon && isactive === index"></i>
                      </div>
                    </el-card>
                  </el-scrollbar>
                </div>
              </el-card>
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
    <!--<el-dialog-->
      <!--title="智能评测结果"-->
      <!--:visible.sync="dialogVisible"-->
      <!--width="30%">-->
      <!--<div class="dialogContent">-->
        <!--<el-row>-->
          <!--<el-col :span="4">-->
            <!--<span style="font-weight: bolder">我的得分: </span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span>{{dialogData[5]}}</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row style="padding-top: 10px">-->
          <!--<el-col :span="4">-->
            <!--<span style="font-weight: bolder">标签: </span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span>{{dialogData[1]}}</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row style="padding-top: 10px">-->
          <!--<el-col :span="4">-->
            <!--<span style="font-weight: bolder">题材: </span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span>{{dialogData[2]}}</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row style="padding-top: 10px">-->
          <!--<el-col :span="4">-->
          <!--<span style="font-weight: bolder">引用次数: </span>-->
        <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span>{{dialogData[3]}}</span>-->
          <!--</el-col>-->
          <!--<el-col :span="4">-->
            <!--<span style="font-weight: bolder">排比次数: </span>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<span>{{dialogData[4]}}</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row style="padding-top: 10px">-->
          <!--<el-col :span="4">-->
            <!--<span style="font-weight: bolder">建议: </span>-->
          <!--</el-col>-->
          <!--<el-col :span="20">-->
            <!--<span>{{dialogData[6]}}</span>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row style="padding-top: 30px">-->
          <!--<span style="font-weight: bolder">可前往推荐模板处阅读更多模板</span>-->
        <!--</el-row>-->
      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->
    <el-dialog
      title="智能评测结果"
      :visible.sync="dialogVisible"
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="gotoPage">查看评测结果</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {intelligentMeasurement2, getfindByTitle3, getType1, getType2, getContent} from '@/api/getCompositionData'
import logo from '@/assets/image/logo.png'
export default {
  name: 'compositionContent',
  data () {
    return {
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
    }
  }
}
</script>

<style scoped>
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
</style>
