<template>
  <div class="article-body">
    <div class="logo_info">
      <img src="../assets/image/logo.png" alt="">
    </div>
    <div class="article">
      <el-scrollbar style="height: 100%;width: 99vw;">
        <el-row >
          <el-col :span="12" :offset="5">
            <div style="height: 130px;background-color: none;"></div>
            <div style="background-color: rgb(248, 225, 204);padding-top: 20px;width: 50vw;">
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
            <div class="hot-right">
              <span class="hot-title">热门推荐</span>
              <el-divider>
                <i class="iconfont iconremen" style="color: coral;"></i>
                <i class="iconfont iconremen" style="color: yellow;"></i>
                <i class="iconfont iconremen" style="color: red;"></i>
                <i class="iconfont iconremen" style="color: orange;"></i>
              </el-divider>
            </div>
          </el-col>
        </el-row>

      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {getContentData} from '@/api/getCompositionData'
export default {
  name: 'compositionContent',
  data () {
    return {
      id: '',
      ListData: {},
      StrData: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.id)
    this.getContent()
  },
  methods: {
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
  }
}
</script>

<style scoped>

  .article-body{

    text-align: center;
    background: url("../assets/image/book_back.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    /*background-size: 100% 100%;*/
    /*height: 100%;*/
    top:0;
    left: 0;
    margin: 0;
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
    height: 97vh;
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
    height: 500px;
    background-color: white;
    margin-top: 40px;
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
</style>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>
