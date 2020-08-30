<template>
  <div class="more_info">
    <all-header @selectWord="getSelectData"></all-header>
    <div class="more_second">
      <div class="second_title">
        首页>{{currentType}}
      </div>
      <img src="../assets/image/book.png" alt="">
      <div class="more_second_content">
        <div class="second_left second_book">
          <div v-for="(item, index) in dataTypeList" :key="index" class="content_item">
            <span>{{(10 * page) + index + 1}}.</span>   <span :title="item.localessay.title" @click="gotoPage(item.localessay)">{{item.localessay.title}}</span>
          </div>
        </div>
        <div class="second_right second_book">
          <div v-for="(item, index) in dataTypeRList" :key="index" class="content_item">
            <span>{{(10 * (page + 1)) + index + 1}}.</span>   <span :title="item.localessay.title" @click="gotoPage(item.localessay)">{{item.localessay.title}}</span>
          </div>
        </div>
      </div>
      <div class="page_info">
        <div class="last_page page_item" @click="lastPage">上一页</div>
        <div class="next_page page_item" @click="nextPage">下一页</div>
      </div>
    </div>
<!--    更多-->
  </div>
</template>
<script>
import {getCompositionListData, getResearchListData, getCompositionType, getCompositionDataByType, getfindByTitle2} from '@/api/getCompositionData'
import allHeader from '@/components/allHeader'
export default {
  components: { allHeader },
  data () {
    return {
      page: 0,
      dataTypeList: [],
      dataTypeRList: [],
      total: 0,
      selectWord: ''
    }
  },
  computed: {
    currentType () {
      return this.$route.query.currentType
    }
  },
  mounted () {
    this.getCurrentData()
    this.getCurrentRightData()
  },
  methods: {
    gotoPage(item){
      console.log('点击没：')
      this.$router.push({
        path: '/compositiondetails',
        query: {
          id: item.id
        }
      })
      console.log("文章id",item)
    },
    getCurrentData () {
      if (this.currentType === '全部') {
        const prams = {
          page: this.page,
          // user: this.username
        }
        getCompositionListData(prams).then(respone => {
          this.dataTypeList = respone.data.data.list
          this.total = respone.data.data.total
          //console.log("aaa",respone.data)
        })
      } else {
        const prams = {
          type1: this.currentType,
          page: this.page,
        }
        getCompositionDataByType(prams).then(response => {
          console.log(response.data)
          this.dataTypeList = response.data.data.list
          this.total = response.data.data.total
        })
      }
    },
    getCurrentRightData () {
      if (this.currentType === '全部') {
        const prams = {
          page: this.page + 1,
          // user: this.username
        }
        getCompositionListData(prams).then(respone => {
          this.dataTypeRList = respone.data.data.list
          // this.total = respone.data.data.total
          // console.log(this.fatherArray, this.total)
        })
      } else {
        const prams = {
          type1: this.currentType,
          page: this.page + 1,
        }
        getCompositionDataByType(prams).then(response => {
          console.log(response.data)
          this.dataTypeRList = response.data.data.list
          // this.total = response.data.data.total
        })
      }
    },
    nextPage () {
      this.page += 2
      if (this.selectWord === '') {
        this.getCurrentData()
        this.getCurrentRightData()
      } else {
        this.getSelectContent(this.selectWord)
        this.getSelectRContent(this.selectWord)
      }
    },
    lastPage () {
      if (this.page > 0) {
        this.page -= 2
        console.log('当前页',this.page)
        if (this.selectWord === '') {
          if (this.page >= 0) {
            this.getCurrentData()
            this.getCurrentRightData()
          }
        } else {
          if (this.page >= 0) {
            this.getSelectContent(this.selectWord)
            this.getSelectRContent(this.selectWord)
          }
        }
      }
      // this.page = 0
    },
    getSelectData (word) { // 获取搜索数据
      this.dataTypeList = []
      this.dataTypeRList = []
      this.selectWord = word
      console.log('搜索词：', word)
      this.page = 0
      this.getSelectContent(word)
      // this.page += 1
      this.getSelectRContent(word)
    },
    getSelectContent (word) {
      if (this.select === '普通检索') {
        // this.researchFlag = true
        const prams = {
          title: word,
          page: this.page,
          // size:10
        }
        this.loading = true
        getfindByTitle2(prams).then(respone => {
          this.dataTypeList = respone.data.data.list
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
        // this.researchFlag = true
        const prams = {
          query: word,
          page: this.page,
          size:10
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          this.dataTypeList = respone.data.data.list
          this.total = respone.data.data.total
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
    },
    getSelectRContent (word) {
      if (this.select === '普通检索') {
        // this.researchFlag = true
        const prams = {
          title: word,
          page: this.page + 1
        }
        this.loading = true
        getfindByTitle2(prams).then(respone => {
          this.dataTypeRList = respone.data.data.list
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
        // this.researchFlag = true
        const prams = {
          query: word,
          page: this.page + 1,
          size:10
        }
        this.loading = true
        getResearchListData(prams).then(respone => {
          this.dataTypeRList = respone.data.data.list
          this.total = respone.data.data.total
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
    },
  }
}
</script>
<style scoped>
  .more_info {
    /*background-image: url('../assets/image/background.jpg');*/
    height: 100%;
  }
  .more_second {
    margin-top: 80px;
    height: 870px;
    text-align: center;
    background: url('../assets/image/book_back.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .more_second .second_title {
    position: absolute;
    color: #fff;
    left: 16%;
    top: 6%;
  }
  .more_second img {
    /*width: 100%;*/
    height: 100%;
  }
  .more_second_content {
    /*position: relative;*/
    color: #333333;
  }
  .more_second .more_second_content .second_book {
    position: absolute;
    top: 20%;
  }
  .more_second_content .second_left {
    left: 27%;
  }
  .more_second_content .second_right {
    /*position: absolute;*/
    left: 56%;
  }
  .more_second .more_second_content .content_item {
    text-align: left;
    font-size: 18px;
    margin: 25px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
  }
  .content_item:hover{
    color: #0061E4;
    text-decoration: underline;
  }
  .page_info .page_item {
    position: absolute;
    bottom: 14%;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1px 6px;
    color: #5c5c5c;
    cursor: pointer;
  }
  .page_info .next_page {
    left: 69%;
    background-color: #f19b78;
  }
  .page_info .last_page {
    left: 26%;
  }
</style>
