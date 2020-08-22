<template>
  <div class="app-contianer">
<!--    <el-divider></el-divider>-->
    <div class="tagContainer">
      <div class="small_tag">
        <el-tag class="label_all label_item" style="margin-left: 2%;margin-top: 2%;cursor:pointer;" type="info" @click="getData(1)">全部</el-tag>
        <el-tag style="margin-left: 2%;margin-top: 2%;cursor:pointer;" class="label_item labelI" v-for="(item, i) in compositionType " :key="i" @click="compositionByType(item, i)"> {{item}}</el-tag>
      </div>
<!--      <span v-for="(item, i) in compositionType " :key="i">{{item}}</span>-->
    </div>
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
<!--    <el-row>-->
<!--      <div class="fenye">-->
<!--        <el-pagination-->
<!--          @current-change="handleCurrentChange"-->
<!--          :current-page="currentPage"-->
<!--          :page-sizes="[10]"-->
<!--          :page-size="100"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total=total>-->
<!--        </el-pagination>-->
<!--      </div>-->
<!--    </el-row>-->
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
    total: Number
  },
  data () {
    return {
      currentType: '全部',
      compositionData: [],
      compositionType: [],
      currentPage: 1,
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
  mounted () {
    console.log('长度：', this.fatherArray.length, this.total)
    if (this.fatherArray.length === 0 || parseInt(this.total) === 0) {
      this.getData(0)
    }
    this.total = this.fatherArray.length
    this.getCompositionType()
  },
  updated () {
    console.log('gengixnle,', this.fatherArray)
    // this.total = this.fatherArray.length
  },
  // mounted () {
  //   Bus.$on('add', (message) => {
  //     // 一些操作，message就是从top组件传过来的值
  //     console.log(message)
  //   })
  // },
  methods: {
    compositionByType: function (item, i) {
      this.currentType = item
      let labelAll = document.querySelector('.label_all')
      labelAll.className = 'label_item label_all'
      console.log('labelAll', labelAll)
      let labelItem = document.querySelectorAll('.labelI')
      console.log('labelItem', labelItem)
      for (let j = 0; j < labelItem.length; j++) {
        console.log(j)
        labelItem[j].className = 'label_item labelI'
      }
      labelItem[i].className = 'addColor label_item labelI'
      const prams = {
        type1: item
      }
      getCompositionDataByType(prams).then(response => {
        console.log('测试按照类型获取作文数据')
        console.log(response.data)
        this.fatherArray = response.data.data.list
        // this.compositionData = response.data.data.list
        this.total = response.data.data.total
      })
    },
    getCompositionType: function () {
      getCompositionType().then(response => {
        console.log('测试作文类型')
        console.log(response.data)
        this.compositionType = response.data.data.list
        console.log(response.data.data.list)
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
    getData: function (flag) {
      setTimeout(() => {
        let labelAll = document.querySelector('.label_all')
        if (flag === 0) {
          labelAll.className = 'addColor label_item label_all'
        } else {
          this.currentType = '全部'
          // let labelAll = document.querySelector('.label_all')
          labelAll.className = 'addColor label_item label_all'
          let labelItem = document.querySelectorAll('.labelI')
          for (let i in labelItem) {
            labelItem[i].className = 'label_item labelI'
          }
        }
      }, 150)
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
    handleCurrentChange (val) {
      if (this.researchFlag === false) {
        console.log(`当前页: ${val}`)
        const prams = {
          page: val - 1,
          user: this.username
        }
        getCompositionListData(prams).then(respone => {
          this.fatherArray = respone.data.data.list
          // this.compositionData = respone.data.data.list
        })
      } else {
        console.log(`当前页: ${val}`)
        const prams = {
          query: this.input3,
          page: val - 1
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          this.fatherArray = respone.data.data.list
          // this.compositionData = respone.data.data.list
          this.loading = false
        })
      }
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
      this.$router.push({
        path: '/compositiondetails',
        query: {
          id: item.id
        }
      })
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
    selectchange () {
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
  }
  .input-with-select>>> .el-input-group__prepend {
    background-color: #fff;
    font-size: 12px;
  }
  .label_item {
    padding: 5px 15px;
    line-height: 30px;
    font-size: 15px;
    color: #666;
    border: 1px solid #e9e9eb;
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
</style>
<style>
  .el-tag {
    display: none;
    height: unset;
  }
</style>
