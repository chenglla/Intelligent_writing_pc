<template>
  <div class="content">
    <div v-for="(item, index) in list" :key="index" class="list_item" @click="gotoRecord(item)">
      <div>
        <img :src="item.icon" alt="">
        <div>{{item.name}}</div>
      </div>
      <div>{{item.price}}</div>
    </div>
  </div>
</template>
<script>
// import _ from 'underscore'
export default {
  data () {
    return {
      list: [{
        icon: 'http://img',
        name: '',
        price: ''
      }],
      record: []
    }
  },
  mounted () {
    let xhr = new XMLHttpRequest()
    xhr.open('get', 'http://www.mohoyo.com/product/list', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.list = xhr.responseText.data
        }
      }
    }
  },
  methods: {
    gotoRecord (val) {
      debounce(this.getDetail(val), 500)
    },
    getDetail (val) {
      this.record.push(val)
    }
  }
}
function debounce (fun, wait) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fun.apply(context, args)
    }, wait)
  }
}
</script>
<style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .list_item {
    flex: 25%;
    margin: 5px 5px;
    border: 1px solid #5c5c5c;
    transition: all 0.5s;
  }
  .list_item:hover {
    transform: translateY(-10px);
  }
</style>
