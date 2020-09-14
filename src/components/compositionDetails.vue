<template>
  <div class="article-body">
    <el-header height="80px" style="background-color:white;width: 98.8vw">
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
<!--    <div class="logo_info">-->
<!--      <img src="../assets/image/logo.png" alt="">-->
<!--    </div>-->
    <div class="article" >
      <el-scrollbar style="height: 100%;width: 99vw;">
        <el-row >
          <el-col :span="12" :offset="5">
            <div style="height: 20px;background-color: none;"></div>
            <div ref="pronbit" style="background-color: rgb(248, 225, 204);padding-top: 20px;width: 50vw;">
              <h1>{{ListData.title}}</h1>
              <div class="topic">
                <a>{{ListData.type}}</a>
              </div>
              <p v-html="StrData" style="text-indent: 2em">
      <!--          {{StrData}}-->
              </p>
              <div class="txtdate">
                <span>{{ListData.date}}</span>
              </div>
              <div class="footer">
                <el-tag type="danger">
                  <span><i class="el-icon-thumb"></i> {{ListData.count}}</span>
                </el-tag>
              </div>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="hot-right" id="hot_right" style="width: 17vw;">
              <span class="hot-title" >热门推荐</span>
              <el-divider>
                <i class="iconfont iconremen" style="color: coral;"></i>
                <i class="iconfont iconremen" style="color: yellow;"></i>
                <i class="iconfont iconremen" style="color: red;"></i>
                <!-- <i class="iconfont iconremen" style="color: orange;"></i> -->
              </el-divider>
              <div style="margin: 14px;text-align: left;letter-spacing: 2px;">
                <div style="margin: 20px 0;">
                  <div class="art_title">远方不远，杨帆彼岸</div>
                  <span class="art_type">议论</span>
                  <i class="el-icon-view"></i>
                  <span class="see_num">200</span>
                </div>
                <div style="margin: 20px 0;">
                  <div class="art_title">布鞋和母亲</div>
                  <span class="art_type">叙事</span>
                  <i class="el-icon-view"></i>
                  <span class="see_num">193</span>
                </div>
                <div style="margin: 20px 0;">
                  <div class="art_title">懂我的人，谢谢你</div>
                  <span class="art_type">写人</span>
                  <i class="el-icon-view"></i>
                  <span class="see_num">184</span>
                </div>
                <div style="margin: 20px 0;">
                  <div class="art_title">一片泥土的经历</div>
                  <span class="art_type">叙事</span>
                  <i class="el-icon-view"></i>
                  <span class="see_num">160</span>
                </div>
                <div style="margin: 20px 0;">
                  <div class="art_title">意外的早餐</div>
                  <span class="art_type">日记</span>
                  <i class="el-icon-view"></i>
                  <span class="see_num">121</span>
                </div>
              </div>
            </div>

          </el-col>
        </el-row>

      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {getContentData} from '@/api/getCompositionData'
import logo from '@/assets/image/logo.png'
export default {
  name: 'compositionContent',
  data () {
    return {
      logo: logo,
      id: '',
      ListData: {},
      StrData: '',
      scrollHeigh:0,
    }
  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.id)
    this.getContent()
    window.addEventListener('scroll',this.handleScrollx,true)
  },
  watch: {

  },
  methods: {
    handleScrollx() {
        console.log("滚动条高度1",document.documentElement.scrollTop)
    	  console.log('滚动高度',window.pageYOffset)
    	  console.log('距离顶部高度',this.$refs.pronbit.getBoundingClientRect().top)
        this.scrollHeigh = this.$refs.pronbit.getBoundingClientRect().top
        if(this.scrollHeigh < -460){
           document.getElementById("hot_right").style.marginTop='10px'
           document.getElementById("hot_right").style.position='fixed'
           document.getElementById("hot_right").style.width='17vw'
          // document.getElementById("hot_right").style.backgroundColor="red"
           console.log("我运行了")
        }else{
          document.getElementById("hot_right").style.marginTop='20px'
          document.getElementById("hot_right").style.position='relative'
          document.getElementById("hot_right").style.width='17vw'
        }
    	},
     // window.onscroll = _=>{
     //     console.log(document.documentElement.scrollTop)
     //     let oA = document.querySelector("#a");
     //     console.log(oA.offsetTop)
     //     if((document.documentElement.scrollTop+ document.documentElement.clientHeight) >= oA.offsetTop){
     //         console.log('true')
     //         oA.style.width='500px';
     //     }
     // },


    // scrollHeigh(){
    //   $(window).scroll(function(){   //开始监听滚动条
    //     this.scrollHeigh = $(document).scrollTop();  //滚动条距离顶部的高度
    //      console.log(top)
    //      if(top > 600 ) {
    //        document.getElementById("hot_right").style.marginTop='600'
    //      }
    //     })
    // },
    getContent () {
      const params = {
        id: this.id
      }
      getContentData(params).then(res => {
        if (res.data.code === 0) {
          this.ListData = res.data.data
          this.StrData = res.data.data.content.replace(/(\r\n)|(\n)/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        }
      })
    }
  },
  // destroyed () { //离开这个界面之后，删除，不然会有问题
  //     window.removeEventListener('scroll', this.handleScrollx,false)
  // },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScrollx,false)
  },
}
</script>

<style scoped>
  .pictureContainer{
  padding-top: 10px;
}
  .logo_container{
  padding-top: 20px;
}
  .article-body{
    height: 97.5vh;
    text-align: center;
    background: url("../assets/image/book_back.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    /*background-size: 100% 100%;*/
    /*height: 100%;*/
    top:0;
    left: 0;
    margin: 0;
    padding: 0;
    /* overflow-y: auto; */
    /*overflow-x: auto;*/
  }
  .logo_info {
    position: absolute;
    width: 250px;
    top: 2%;
    left: 5%;
  }
  .logo_info img {
    width: 100%;
  }
  .article{
    height: calc(97vh - 80px );
  }
  .article h1{
    font-size: 45px;
    background: url("../assets/image/p-bg.png");
  }
  .article p{
    background: url("../assets/image/p-bg.png");
    text-align: left;
    font-size: 20px;
    padding: 0 32px 12px;
    line-height: 31px;
  }
  .topic{
    /* margin-top: 0px; */
    /* margin-bottom: 0px; */
    /* padding-bottom: 10px;  */
    height: 20px;
  }
  .topic a{
    color: white;
    background-color: #3399cc;
    padding: 3px 6px;
    font-size: 12px;
    display: inline-block;
    position: relative;
    margin-left: 3px;
  }
  .topic a:hover{
    background-color: gray;
    cursor: pointer;
  }
  /* 右边推荐部分 */
  .hot-right{
    height: 360px;
    background-color: white;
    margin-top: 20px;
    padding: 30px 10px;
  }
  /* 热门推荐 */
  .hot-title{
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: bold;

  }
  .footer {
    margin-bottom: 20px;
    /*margin-right: 70%;*/
    margin-top: 20px;
  }
  .el-icon-view{
    font-size: 10px;
    color: #475669;
    margin-left: 10px;
  }
  .see_num{
    color: #475669;
    font-size: 14px;
  }
  .art_type{
    color: #475669;
    font-size: 14px;

    /* background-color: yellow; */
  }
  .art_title:hover{
    color: #0061E4;
    cursor: pointer;
  }
</style>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>
