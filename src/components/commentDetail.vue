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
                  <span >{{title}}</span>
                </h1>
                <div class="tag">
                  <el-tag type="info" >{{tag}}</el-tag>
                </div>
                <div style="padding-left: 40px; padding-right: 40px;margin: 0 auto;">
                  <p class="content"  v-html="content">{{content}}</p>
                </div>
              </div>
            </el-card>
            <div class="box_title" v-if="header_score.length!==0">中心突出表达分析</div>
            <el-card style="min-height: 100px" v-if="header_score.length!==0">
              <div style="padding: 0 40px 40px 40px;margin: 0 auto">
                <el-table
                  :data="header_score"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sentence"
                    label="中心句"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="score"
                    label="评分"
                  >
                  </el-table-column>

                </el-table>
              </div>
            </el-card>
            <div class="box_title" v-if="fluency.length!==0">句子流畅性分析</div>
            <el-card style="min-height: 100px" v-if="fluency.length!==0">
              <div style="padding: 40px;margin: 0 auto">
                <el-table
                  :data="fluency"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sentence"
                    label="句子内容"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="score"
                    label="流畅性评价"
                   >
                  </el-table-column>

                </el-table>
              </div>
            </el-card>

          </el-main>
          <el-aside width="30%" style="padding-top:20px;">
            <el-card style="min-height: 300px" >
              <div class="scoreStandard" @click="gotoSee">
                <i class="iconfont iconxiugai"></i>
                作文评分标准
              </div>
              <div style="padding: 10px">
                <div style="margin-bottom: 20px;display: inline-block;" >
                  <i class="iconfont icon-jiangbei" ></i>
                  <div style="display: inline-block;" >
                    <div style="color: red;font-size: 20px;" v-if="score1!== 0">{{score1}}</div>
<!--                    <div style="color: red;font-size: 20px;">{{tags[4]}}</div>-->
                    <div style="font-size: 10px;">作文得分</div>
                  </div>
                </div>
                <div class='artType'>
                  <!-- <span style="font-weight: bold">标签：</span> -->
                  <span v-if="tag!=''">{{tag}}</span>
                </div>
                <div style="margin-bottom: 20px;display: block;">
                  <i class="iconfont icon-jiangbei" ></i>
                  <div style="display: inline-block;" >
                    <div style="color: red;font-size: 20px;" v-if="score2!== 0">{{score2}}</div>
                    <!--                    <div style="color: red;font-size: 20px;">{{tags[4]}}</div>-->
                    <div style="font-size: 10px;">流畅性得分</div>
                  </div>
                </div>
                <div>
                  <span style="font-weight: bold">评语：</span>
                  <span>{{tags[5]}}</span>
                </div>
                                  <!-- <HR/> -->
<!--                <el-tabs stretch @tab-click="handleClick">-->
<!--                    <el-tab-pane  label="注释" name="first">-->
<!--                      <span style="font-weight: bold">注释：</span>-->
<!--                      <span>{{tags[5]}}</span>-->
<!--                    </el-tab-pane>-->
<!--                    <el-tab-pane  label="评语" name="second">-->
<!--                      <span style="font-weight: bold">评语：</span>-->
<!--                      <span>{{tags[5]}}</span>-->
<!--                    </el-tab-pane>-->
<!--                  </el-tabs>-->
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
    <el-dialog
      title="评分标准"
      :visible.sync="showStandard"
      width="50%"
      class="standardDialog"
      :before-close="handleClose">
      <div>
        <table class="standardTable" cellspacing="10">
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>得分说明</td>
              <td>评分</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="8" class="oneOne oneItem">基础</td>
              <td rowspan="5" class="oneTwo oneItem">内容</td>
              <td class="oneThree oneItem">符合题意</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
              <td class="oneThree oneItem">中心突出</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
              <td class="oneThree oneItem">内容充实</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
              <td class="oneThree oneItem">思想健康</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
              <td class="oneThree oneItem">感情真挚</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
              <td rowspan="3" class="oneTwo oneItem">表达</td>
              <td class="oneThree oneItem">符合文体要求</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
              <td class="oneThree oneItem">结构严谨</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
              <td class="oneThree oneItem">语言流畅</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
              <td rowspan="3" class="oneOne oneItem">发展</td>
              <td rowspan="3" class="oneTwo oneItem">特征</td>
              <td class="oneThree oneItem">深刻</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
<!--              <td>1</td>-->
              <td class="oneThree oneItem">丰富</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
            <tr>
<!--              <td>1</td>-->
<!--              <td>1</td>-->
              <td class="oneThree oneItem">有文采</td>
              <td class="oneFour oneItem">得分说明xxxxxxxxxx</td>
              <td class="oneFive oneItem">1</td>
            </tr>
          </tbody>

        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gotoRelease" class="releaseItem">发布</el-button>
<!--    <el-button type="primary" @click="showStandard = false">确 定</el-button>-->
  </span>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
import request from '../utils/request'
import logo from '@/assets/image/logo.png'
import {intelligentMeasurement2} from '@/api/getCompositionData'
export default {
  name: 'commentDetail',
  data () {
    return {
      // 作为分数
      score1:0,
      // 符合题意分数
      score2:0,
      // 首段分数
      header_score:[],
      // 全文句子分数
      fluency:[],
      logo: logo,
      title: '',
      passage: '',
      user: '',
      content: '',
      tag: '',
      parallel: [],
      tags: [],
      fullscreenLoading: true,
      showStandard: false,
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
    this.essayevaluate()
  },
  methods: {
    essayevaluate () {
      var strtitle = '标题'
      var str = '每个人都有梦想，“它”是人类所向往的，今天的我们正处于花季少年之时，一天天的生活如流水般消逝在我们脑海中往事一件件，回忆，如漫天里的星星一般在我们的脑海中不时闪耀，谁说90后的孩子是为了生存而活，而大多数都是为了梦想而活，而没有梦想的人生是空虚的，但梦想总是随着思想的前进而改变的。我的梦想就是当一名医生。医生是治愈病人，让他们恢复健康，幸福生活的人，他们是与死神抗争的人，是为人类生命健康做贡献的人。医生用非常敬业的精神为病人减轻伤痛，救死扶伤，在病人失去光明、暗无天日的世界里托起一颗充满光芒、温暖、希望的太阳，是他们黑暗路上的一盏明亮的灯光，是他们寒冷夜里的温暖的火炉，是在他们处于绝境时伸出的一双援助之手。每年都有数以万计的人死于癌症和一些极为罕见的疾病，这些病例有些却因无法找到合适的医术治疗而耽误医治的时间失去了生命，有些则因为没有较好的方法去治疗而导致自己的一生都要受病魔的折磨。例如，湖北有一个男婴，一生下来就有好几种疾病，然而这些疾病有是非常棘手的难题。如果动手术则很有可能会引发生命危险，但是不动手术的话，这么幼小的生命却支撑不了多久，就会慢慢朝着死神的地方走去。却在大家犹豫不决的时候，几天后，因为耽误了及时的治疗时间，这个小生命就永远地离开了人世。再如，发生在陕西省延川县一个贫穷的家里的事件：一个小女孩出生到两年内就已经莫名其妙地骨折8次了，她的父母就带他去医院检查，结果发现，原来这是一种极难治疗而又需长期的观察的罕见疾病——成骨不全症。这个消息让这一家人心中的一丝希望都破灭了，因为，目前还没有能够较好地治疗这种疾病的方法。所以，他们只能眼睁睁地看着自己可怜的女儿受痛苦和折磨一辈子。在看完这些令人惋惜伤感的事件后，我的心中难以平静，就有想要当一名能够研究罕见疾病病因，治疗罕见疾病患者的医生的冲动和想法。如果我能知道这些病因的治疗方法，那我能在生死边缘抢回多少条生命啊！就能够让重新得到健康的人幸福快乐地生活，让为他担心的人得以放心，让他们不再充满对病魔的恐惧！想当一名医生，需要的是知识、爱心还有决心、勇气和毅力。所以，就应该认真读书，培养高尚的品德修养，锻炼顽强的意志力和不畏困难的勇气，从现在做起，用行动证明一切，用时间来检验结果。长大后，我要做一个敬职敬业的医生，真心为人们治病，而不是为了所谓的利益却弄虚作假，拿生命做赌注假如没有了梦想，人生就会特别的冷清，没有活力。有了梦想，也就有了动力，它会催人前进。也许在实现梦想的道路上会遇到无数次的坎坷与挫折。但没关系，跌倒了自己再爬起来，为了自己的梦想而努力前进。毕竟是自己的梦想，相信自己未来是自己创造的，相信会有奇迹在等着我们。所以我们要用最真的自我，寻找最真的目标，实现最真的梦想。'
      // var params = {
      //   essay_title:strtitle,
      //   essay_content:str
      // }
      var params = {
        essay_title:this.title,
        essay_content:this.passage
      }
      // var params = 'essay_title='+strtitle+'&essay_content'+str
      request({
        url: 'http://47.94.158.241:11001/essayevaluate',
        method: 'post',
        // eslint-disable-next-line no-undef
        data: qs.stringify(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.score1 = res.data.msg.score
        this.score2 = res.data.msg.accordance_of_title_score
        this.header_score = res.data.msg.central_prominence_score.map((item,index)=>{
          return{
            index:index+1,
            sentence:item[0],
            score:item[1]
          }
        })
        this.fluency = res.data.msg.fluency.map((item,index)=>{
          return{
            index:index+1,
            sentence:item[0],
            score:item[1]
          }
        })
        console.log('江哥接口的数据1',this.score1)
        console.log('江哥接口的数据2',this.score2)
        console.log('江哥接口的数据3',this.header_score)
        console.log('江哥接口的数据3',res.data.msg.central_prominence_score)
        console.log('江哥接口的数据4',this.fluency)
      })
    },
    //标签页点击更换页面
    handleClick(tab, event) {
      console.log(tab, event);
    },
    gotoSee() { // 查看作文评分标准
      this.showStandard = true
    },
    gotoRelease () { // 教师发布
      console.log('发布成功！')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
.box_title{
  height:50px;
  line-height: 50px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(to right,rgb(151,146,201),rgb(78,122,228), cornflowerblue ,rgb(141,164,244));
  /*width: 100%;*/
  margin-top: 40px;
  padding-left: 40px;
  border-radius: 6px 6px 0 0;
}
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
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 2px;
    margin-bottom: 20px;
    float: right;
    background: linear-gradient(to right ,#FE7655,#FF9972);
    padding: 4px 16px;
  }
  .scoreStandard {
    font-size: 1.1rem;
    width: 66%;
    margin-left: 17%;
    text-align: center;
    color: white;
    background: linear-gradient(to right ,#FE7655,#FF9972);
    padding: 15px 16px;
    border-radius: 10px;
    letter-spacing: 5px;
    font-weight: bold;
    margin-bottom: 2vh;
  }
  .scoreStandard .iconfont {
    font-size: 1.2rem;
    font-weight: normal;
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
.standardTable {
  width: 100%;
  text-align: center;
}
.oneItem {
  border-radius: 3px;
  color: white;
  padding: 7px;
  font-weight: bold;
  letter-spacing: 0.1rem;
  font-size: 0.9rem;
}
  .oneOne {
    width: 10%;
    /*color: white;*/
    background: rgb(219, 101, 37);
    font-size: 1.1rem;
    /*letter-spacing: 0.1rem;*/
    /*background: linear-gradient(to right ,#FE7655,#FF9972);*/
  }
  .oneTwo {
    width: 10%;
    /*color: white;*/
    background: rgb(239, 130, 49);
    font-size: 1.1rem;
    /*background: linear-gradient(to right ,#FE7655,#FF9972);*/
  }
  .oneThree {
    width: 20%;
    background: rgb(250, 174, 118);
    font-size: 0.96rem;
    /*background: linear-gradient(to right ,#FE7655,#FF9972);*/
  }
  .oneFour {
    width: 40%;
    background: rgb(251, 237, 226);
    color: #3c3c3c;
    font-weight: normal;
    letter-spacing: unset;
    font-size: unset;
    /*background: linear-gradient(to right ,#FE7655,#FF9972);*/
  }
  .oneFive {
    width: 20%;
    background: rgb(251, 237, 226);
    color: #3c3c3c;
    /*background: linear-gradient(to right ,#FE7655,#FF9972);*/
  }
  .releaseItem {
     font-size: 1.1rem;
     width: 40%;
     /*margin-left: 30%;*/
     /*margin-top: 2vh;*/
     text-align: center;
     color: white;
     background: linear-gradient(to right ,#FE7655,#FF9972);
     padding: 15px 16px;
     border-radius: 30px;
     letter-spacing: 5px;
     font-weight: bold;
     margin-bottom: 2vh;
   }
.standardDialog /deep/ .el-dialog__footer{
  text-align: center;
}
</style>
<style>
</style>
