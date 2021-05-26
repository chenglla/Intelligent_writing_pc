<template>
  <div class="app-contianer">
<!--    <el-divider></el-divider>-->
    <div class="tagContainer">
      <div class="small_tag">
        <el-tag class="addColor label_all label_item" style="margin-left: 2%;margin-top: 2%;cursor:pointer;" type="info" @click="gotoAll">全部</el-tag>
        <el-tag style="margin-left: 2%;margin-top: 2%;cursor:pointer;" class="label_item labelI" v-for="(item, index) in compositionType " :key="index" @click.native = "gotoType(index)"> {{item}}</el-tag>
      </div>
    </div>
    <!-- 全部 -->
    <div class="jump_all">
      <el-divider></el-divider>
          <el-row style="background: #F5F5F5;padding-top: 10px;margin-bottom: 0">
            <el-col :span="4">
              <i class="iconfont iconfengefuhao"></i>
              <div style="font-size: 22px;letter-spacing: 0.1em;display: inline-block">{{currentType}}</div>
            </el-col>
            <el-col :span="4" :offset="16">
              <span class="type_right" @click="gotoOption('trans')">
                <i class="iconfont iconhuanyipi"></i>
                换一批
              </span>
              <span class="type_right" style="margin-left: 25px;" @click="gotoOption('more')">更多 >></span>
            </el-col>
          </el-row>
          <el-row>
            <div v-if="fatherArray"  style="background-color: #F5F5F5;" class="type_list">
      <!--      <div v-if="compositionData"  style="background-color: #F5F5F5;" class="type_list">-->
              <div v-for="(item, index) in fatherArray" :key="index"  @click="gotoContent(item.localessay)" v-loading="loading" class="type_item">
      <!--        <div v-for="(item, index) in compositionData" :key="index"  @click.native="gotoContent(item.localessay)" v-loading="loading" class="type_item">-->
                <div class="picture-container">
                  <!--                // https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png-->
                  <img :src=changePicture(item.localessay) class="image" style="height: 180px">
                </div>
                <div>
                  <el-row style="padding-top: 0;">
                    <div class="one_row">
                      <div class="composition_title">
                        <span style="font-size: 21px">{{item.localessay.title}}</span>
                      </div>
                      <div class="like">
                        <i v-if="item.shouchang === false" class="el-icon-star-off" @click.stop="like(item)"></i>
                        <i v-else class="el-icon-star-on"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row style="width: 80%;margin-left: 10%;text-align: center;color: #7c7c7c">
                    <el-col :span="12">
                      <div class="one_row">
                        <!--                  <i class="el-icon-time"></i>-->
                        <span style="font-size: 10px;font-weight: bolder">{{item.localessay.date}}</span>
                        <!--                  <span style="font-size: 10px;font-weight: bolder">{{item.localessay.date.split(' ')[0]}}</span>-->
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="one_row">
                        <i class="el-icon-view"></i>
                        <span style="font-size: 10px;font-weight: bolder">{{item.localessay.dianzhan}}</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="width: 70%;margin-left: 15%;">
                    <p style="text-indent: 2em;color: #9c9c9c">{{item.localessay.summary}}</p>
                  </el-row>
                </div>
              </div>
            </div>
          </el-row>

    </div>
    <!-- 全部以外其余分类 -->
    <div  v-for="(list,index) in lists" :key="index" :index="index">
      <div class="d_jump">
        <el-divider></el-divider>
            <el-row style="background: #F5F5F5;padding-top: 10px;margin-bottom: 0">
              <el-col :span="4">
                <i class="iconfont iconfengefuhao"></i>
                <div   style="font-size: 22px;letter-spacing: 0.1em;display: inline-block">{{list.type}}</div>
              </el-col>
              <el-col :span="4" :offset="16">
                <span class="type_right" @click="gotoOption1('trans',list,index)">
                  <i class="iconfont iconhuanyipi"></i>
                  换一批
                </span>
                <span class="type_right" style="margin-left: 25px;" @click="gotoOption1('more',list,index)">更多 >></span>
              </el-col>
            </el-row>
            <el-row>
              <div v-if="list.data"  style="background-color: #F5F5F5;" class="type_list">
        <!--      <div v-if="compositionData"  style="background-color: #F5F5F5;" class="type_list">-->
                <div v-for="(item, index) in list.data" :key="index"  @click="gotoContent(item.localessay)" v-loading="loading" class="type_item">
        <!--        <div v-for="(item, index) in compositionData" :key="index"  @click.native="gotoContent(item.localessay)" v-loading="loading" class="type_item">-->
                  <div class="picture-container">
                    <!--                // https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png-->
                    <img :src=changePicture(item.localessay) class="image" style="height: 180px">
                  </div>
                  <div>
                    <el-row style="padding-top: 0;">
                      <div class="one_row">
                        <div class="composition_title">
                          <span style="font-size: 21px">{{item.localessay.title}}</span>
                        </div>
                        <div class="like">
                          <i v-if="item.shouchang === false" class="el-icon-star-off" @click.stop="like(item)"></i>
                          <i v-else class="el-icon-star-on"></i>
                        </div>
                      </div>
                    </el-row>
                    <el-row style="width: 80%;margin-left: 10%;text-align: center;color: #7c7c7c">
                      <el-col :span="12">
                        <div class="one_row">
                          <!--                  <i class="el-icon-time"></i>-->
                          <span style="font-size: 10px;font-weight: bolder">{{item.localessay.date}}</span>
                          <!--                  <span style="font-size: 10px;font-weight: bolder">{{item.localessay.date.split(' ')[0]}}</span>-->
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="one_row">
                          <i class="el-icon-view"></i>
                          <span style="font-size: 10px;font-weight: bolder">{{item.localessay.dianzhan}}</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="width: 70%;margin-left: 15%;">
                      <p style="text-indent: 2em;color: #9c9c9c">{{item.localessay.summary}}</p>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-row>

      </div>
    </div>
    <!-- 触底弹框 -->
    <div
      class="drawer_info"
      v-if="drawer === 1">
<!--      <el-drawer-->
<!--        :modal="false"-->
<!--        :wrapperClosable="false"-->
<!--        :modal-append-to-body="false"-->
<!--        size="35%"-->
<!--        withHeader="false"-->
<!--        :visible.sync="drawer"-->
<!--        :direction="direction"-->
<!--        :before-close="handleClose"-->
<!--      >-->
        <span class="close-btn" @click="closeByButton">X</span>
        <div class="card-one">
          <el-input placeholder="请输入关键字" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 100px" @change="selectchange">
              <el-option label="普通检索" value="普通检索"></el-option>
              <el-option label="AI检索" value="AI检索"></el-option>
            </el-select>
            <i class="iconfont iconsousuo" slot="append" @click="research" style="color: white;"></i>
          </el-input>
        </div>
        <div class="small_tag">
          <el-tag class=" label_all label_item" style="margin-left: 2%;margin-top: 2%;cursor:pointer;" type="info" @click="gotoAll">全部</el-tag>
          <el-tag style="margin-left: 2%;margin-top: 2%;cursor:pointer;" class="label_item labelI" v-for="(item, index) in compositionType " :key="index" @click.native = "gotoType(index)"> {{item}}</el-tag>
        </div>
<!--      </el-drawer>-->
    </div>

  </div>
</template>

<script>
import {getCompositionListData, getResearchListData, getCompositionType, getCompositionDataByType, getfindByTitle2} from '@/api/getCompositionData'
import {collectComposition} from '@/api/collectOrLikeComposition'
// import Bus from '@/utils/eventBus'
export default {
  name: 'compositionList',
  inject: ['reload'],
  props: {
    father: String,
    fatherArray: Array,
    // total: Number
  },
  data () {
    return {
      close: false, // 弹框是否被手动关闭
      direction: 'btt', // 自底向上
      drawer: -1, // 底部上拉框
      lists: [], // 各分类的数据
      currentType: '全部',
      compositionData: [],
      compositionType: [],
      currentPage: 1,
      currentPage1: 1,
      input3: '',
      // total: 4437,
      researchFlag: false,
      loading: false,
      likeFlag: false,
      username: localStorage.username,
      select: '普通检索',
      typestr: 'primary'
      // url: this.changePicture()
    }
  },
   watch: {
      input3(newName, oldName) {
        localStorage.setItem("INPUT3",newName)
        console.log("watch到的input3",localStorage.getItem("INPUT3"))
      }
    } ,
  mounted () {
    // if(this.input3 === ''){
    //   console.log("无")
    localStorage.setItem('RESEARCH_FLAG', false)
    //   localStorage.setItem("RESEARCH_FLAG",false)
    // }
    console.log('长度：', this.fatherArray.length, this.total)
    if (this.fatherArray.length === 0 || parseInt(this.total) === 0) {
      this.getData(0)
    }
    this.total = this.fatherArray.length
    this.getCompositionType()
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  updated () {
    // console.log('gengixnle,', this.fatherArray)
    // this.total = this.fatherArray.length
  },
  // mounted () {
  //   Bus.$on('add', (message) => {
  //     // 一些操作，message就是从top组件传过来的值
  //     console.log(message)
  //   })
  // },
  methods: {
    gotoAll(){
       console.log("gotoAll运行了")
       let jump = document.querySelector('.jump_all')
       let total = jump.offsetTop
       document.documentElement.scrollTop = total-85
        console.log('调到的位置',total)
    },
    closeByButton () { // 弹框关闭
      if (this.drawer === 1) {
        this.drawer = 0
      }
    },
    gotoType(index){
      // this.currentType = index
      let labelAll = document.querySelector('.label_all')
      labelAll.className = 'label_item label_all label1'
      console.log('labelAll', labelAll)
      let labelItem = document.querySelectorAll('.labelI')
      console.log('labelItem', labelItem)
      for (let j = 0; j < labelItem.length; j++) {
        console.log(j)
        labelItem[j].className = 'label_item labelI label1'
      }
      labelItem[index].className = 'addColor label_item labelI label1'

      let jump = document.querySelectorAll('.d_jump')
      // console.log("jump",jump)
       // 获取需要滚动的距离
       let total = jump[index].offsetTop
       // console.log("需要滚动的距离",total)
       // Chrome
       // document.body.scrollTop = total

       // Firefox
       document.documentElement.scrollTop = total - 75
       // Safari
       // window.pageYOffset = total
       // $('html body').animate({scrollTop: total}, 500)
    },
    handleScrollx () { // 监测滚动条高度
      console.log('drawer', this.drawer)
      // console.log("lose:",this.close)
      // console.log("滚动条高度1",document.documentElement.scrollTop)
      let scrollHight = document.documentElement.scrollTop

      if (this.close === false) { // 用户未关闭过才会运行
        if (scrollHight > 610) {
          if (this.drawer === 0) {
            this.drawer = 0
          } else {
            this.drawer = 1
          }
          // console.log("我运行了")
        } else {
          this.drawer = -1
        }
      }
    },
    handleClose (done) { // 关闭抽屉
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
        this.close = true
        console.log(this.close)
    },
    research: function () {
      this.input3 = localStorage.getItem('INPUT3')
      this.currentPage = 1
      this.gotoAll()
      if (this.select === '') {
        this.$message.warning('请选择搜索类型')
      } else if (this.select === '普通检索') {
        // this.researchFlag = true
        localStorage.setItem("RESEARCH_FLAG",true)
        console.log("flag1",this.researchFlag)
        const prams = {
          title: this.input3,
          page: 0,
          size:10
        }
        this.loading = true
        getfindByTitle2(prams).then(respone => {
          console.log('测试搜索1')
          console.log(respone.data)
          this.fatherArray= respone.data.data.list
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
      } else { // AI查询
        // this.researchFlag = true
        localStorage.setItem("RESEARCH_FLAG",true)
        const prams = {
          query: this.input3,
          page: 1,
          //size:10
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

    compositionByType: function (item, i) {
      // console.log("按类型查",item,i)

      const prams = {
        type1: item

      }
      getCompositionDataByType(prams).then(response => {
        // console.log('测试按照类型获取作文数据')
        // console.log(response.data)
        this.lists[i].data = response.data.data.list
        // this.compositionData = response.data.data.list
        this.lists[i].total = response.data.data.total
        // console.log("list列表",this.lists)
      })
    },
    getCompositionType: function () {
      getCompositionType().then(response => {
        // console.log('测试作文类型')
        // console.log("类型数据",response.data)
        this.compositionType = response.data.data.list
        console.log(response.data.data.list)
        this.lists = this.compositionType.map((item, index) => {
          // console.log("098",item)
          return {
            type: item,
            data:[],
            total:0,
            currentPage:1,
          }
        })
        console.log("list2",this.lists)
        for(let i = 0;i < this.lists.length;i++){
          // console.log("此时的类型",this.list[i].type)
          this.compositionByType(this.lists[i].type, i)
        }
      })

    },
    changePicture: function (item) {
      var num = (item.id) % 100
      if (num < 10) {
        num = '0' + num
      } else {
        num = '' + num
      }
      var str = 'http://114.242.223.253/zihui/images/20190703a0' + num + '.jpg'
      return str
    },
    gotoOption (val) {
      if (val === 'more') {
        this.$router.push({
          name: 'more',
          query: {
            currentType: this.currentType
          }
        })
      } else {
        this.currentPage += 1
        this.handleCurrentChange(this.currentPage)
      }
    },
    handleCurrentChange (val) {//全部的换一页
      this.researchFlag = localStorage.getItem("RESEARCH_FLAG")
      // this.researchFlag = localStorage.getItem("RESEARCH_FLAG")
      // console.log("researchFlag",this.researchFlag )
      console.log("flag",this.researchFlag)
      if (this.researchFlag  === 'false') {
        console.log(`当前页: ${val}`)
        const prams = {
          page: val - 1,
          user: this.username
        }
        getCompositionListData(prams).then(respone => {
          this.fatherArray = respone.data.data.list
          console.log("换一页的的返回值",espone.data.data.list)
          // this.compositionData = respone.data.data.list
        })
      } else {
        this.input3 = localStorage.getItem("INPUT3")
        console.log("456",this.input3)
        console.log(`当前查询页: ${val}`)
        const prams = {
          query: this.input3,
          page: val - 1,
          size:10
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          this.fatherArray = respone.data.data.list
          // this.compositionData = respone.data.data.list
          this.loading = false
        })
      }
    },
    gotoOption1 (val,list,i) {//其余类型的换一页
      console.log("当前的list信息",list.type)
      if (val === 'more') {
        this.$router.push({
          name: 'more',
          query: {
            currentType: list.type
          }
        })
      } else {
        console.log("qqq",this.lists[i].currentPage)
        this.lists[i].currentPage += 1
        this.handleCurrentChange1(this.lists[i].currentPage,list,i)
      }
    },
    handleCurrentChange1 (val,list,i) {
      // console.log("换一页1",val)
      // if (this.researchFlag === false) {
        console.log(`当前页: ${val}`)
        const prams = {
          // page: val - 1,
          page: val-1,
          type1: list.type,
          size:10,
          // user: this.username
        }
        console.log("prams",prams)
        getCompositionDataByType(prams).then(respone => {
          this.lists[i].data = respone.data.data.list
          // this.compositionData = respone.data.data.list
        })
      //  } else { //存在查询
      //   console.log(`当前页: ${val}`)
      //   const prams = {
      //     query: this.input3,
      //     page: val - 1,
      //     size:10
      //   }
      //   this.loading = true
      //   getResearchListData(prams).then(respone => {
      //     this.fatherArray = respone.data.data.list
      //     // this.compositionData = respone.data.data.list
      //     this.loading = false
      //   })
      // }
    },
    getData: function (flag) {
      // setTimeout(() => {
      //   let labelAll = document.querySelector('.label_all')
      //   if (flag === 0) {
      //     labelAll.className = 'addColor label_item label_all'
      //   } else {
      //     this.currentType = '全部'
      //     // let labelAll = document.querySelector('.label_all')
      //     labelAll.className = 'addColor label_item label_all'
      //     let labelItem = document.querySelectorAll('.labelI')
      //     for (let i in labelItem) {
      //       labelItem[i].className = 'label_item labelI'
      //     }
      //   }
      // }, 150)
      console.log('getData运行了', flag)
      const prams = {
        page: 0,
        user: this.username
      }
      getCompositionListData(prams).then(respone => {
        this.fatherArray = respone.data.data.list
        this.total = respone.data.data.total
        // this.compositionData = respone.data.data.list
        console.log('输出首页展示作文测试')
        console.log(this.fatherArray, this.total)
        // this.total = respone.data.data.total
      })
    },

    gotoContent (item) {
      // const {href} = this.$router.resolve({
      //   path: '/compositionContent',
      //   query: {
      //     id: item.essayId
      //   }
      // })
      // window.open(href, '_bank')
      console.log('点击没：')
      const {href} = this.$router.resolve({
        path: '/compositiondetails',
        query: {
          id: item.id
        }

      })
      window.open(href,'_blank')
      console.log("id",item)
    },
    like: function (item) {
      console.log(this.username)
      console.log('我点了')
      // this.likeFlag = !this.likeFlag
      if (this.username === '' || this.username === undefined) {
        this.$message({
          message: '未登录，无法收藏，请登录后再试',
          type: 'warning'
        })
      } else {
        console.log('用户名')
        console.log(this.username)
        const prams = {
          id: item.localessay.id,
          user: this.username,
          page: this.currentPage
        }
        collectComposition(prams).then(respone => {
          this.$message({
            message: '收藏成功',
            type: 'success'
          })
          // const prams = {
          //   page: 1,
          //   user: this.father
          // }
          // getCompositionListData(prams).then(respone => {
          //   this.compositionData = respone.data.data
          //   console.log('输出收藏后的展示数据')
          //   console.log(this.compositionData)
          // })
        })
        item.shouchang = true
      }
    },
    reloadData: function () {
      this.compositionData = this.fatherArray
      console.log('我正在触发数据更新事件')
      // this.reload()
    },
    selectchange () {//AI检索还是普通检索
      console.log(this.select)
    }
  }
}
</script>

<style scoped>
  .app-contianer {
    width: 100%;
  }
  .biaoqian{
    display: inline-block;
  }
  .composition_title{
    display: inline-block;
    /*margin-top: 10px;*/
  }
  .like {
    margin-left: 20px;
    display: inline-block;
  }
  .one_row{
    text-align: center;
    margin-top: 10px;
    display: inline-block;
  }
  .fenye{
    margin-top: 10px;
    padding-top: 20px;
    text-align: center;
  }
  .tagContainer{
    /*display: inline-block;*/
    padding-left: 10px;
  }
  .small_tag{
    margin-top: 80px;
  }
  .input-with-select>>> .el-input-group__prepend {
    background-color: #fff;
    font-size: 12px;
  }
  .input-with-select>>> .el-input-group__append{
    background-color: #ee7f60;
  }
  .label_item {
    padding: 5px 15px;
    line-height: 20px;
    font-size: 15px;
    color: #666;
    border: 1px solid #e9e9eb;
    border-radius: 4px;
    background-color: #f4f4f5;
    display: inline-block;
    /*line-height: 32px;*/
  }
  .addColor {
    background: linear-gradient(to right, #ee7f60 0%, #f19b78 100%);
    color: #fff;
    padding: 5px 15px!important;
    border-radius: 4px;
    display: inline-block;
  }
  .iconfengefuhao {
    font-size: 22px;
    font-weight: bold;
    color: #ee7f60;
  }
  .type_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .type_right {
    border: 1px solid #ececec;
    padding: 5px 7px;
    background-color:#fff;
    border-radius: 8px;
    cursor:pointer;
  }
  /* 一个作文item */
  .type_list .type_item {
    background-color: #fff;
    margin: 10px 5px 5px 5px;
    flex: 18%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*width:0;*/
    height: 350px;
    overflow: hidden;
    text-align: center;
    /*margin-top: 25px;*/
    /* padding: 10px 0; */
    border-bottom: 1px solid #ececec;
  }
  /* 上拉弹窗的搜索框 */
  .card-one{
    width: 32%;
    position: absolute;
    top: 40px;
    right: 90px;
  }
  small_tag2_item:hover{
    background-color: #FE7756;
  }
  .label1:hover{
    background-color: #FE7756;
  }
  .drawer_info {
    /*background-color: #eee;*/
    background-color: rgba(0, 0, 0, 0.5);
    height: 230px;
    z-index: 2001;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    transition: height .2s;
  }
  .drawer_info .close-btn {
    color: #fff;
    position: absolute;
    right: 30px;
    top: 20px;
    cursor: pointer;
  }
</style>
<style>
  .el-tag {
    display: none;
    height: unset;
  }
  .el-drawer{
    background-color:rgba(148,149,150,0.8);
    /* padding: 0 6%; */
  }
  .el-icon-close:before {
    color: white;
  }
  .addColor1{
    background-color: black;
  }
</style>
