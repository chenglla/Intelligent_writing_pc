import request from '@/utils/request'

// 获取作文列表里面的数据
export function getCompositionListData (parems) {
  return request({
    url: '/zihui/essay/findAll',
    method: 'get',
    params: parems
  })
}

// 获取推荐列表数据
export function getRecommandListData (parems) {
  return request({
    url: '/zihui/essay/allCommend',
    method: 'get',
    params: parems
  })
}

// 搜索关键字获取相关作文数据
export function getResearchListData (parems) {
  return request({
    url: '/zihui/essay/serchEssay',
    method: 'get',
    params: parems
  })
}

// 获取我的收藏
export function getFavoriteListData (parems) {
  return request({
    url: '/zihui/plat/mine',
    method: 'get',
    params: parems
  })
}

// 智能测评
export function intelligentMeasurement (parems) {
  return request({
    url: '/zihui/plat/autoscoring2',
    method: 'post',
    data: parems
  })
}
export function intelligentMeasurement2 (parems) {
  return request({
    url: '/zihui/essay/plat/autoscoring2',
    method: 'post',
    data: parems
  })
}

// 获得作文详情
export function getContentData (parems) {
  return request({
    url: '/zihui/essay/findEssayById',
    method: 'get',
    params: parems
  })
}

// 获取作文分类
export function getCompositionType (parems) {
  return request({
    url: '/zihui/essay/getType',
    method: 'get',
    params: parems
  })
}

// 根据作文类别获取作文内容
export function getCompositionDataByType (parems) {
  return request({
    url: '/zihui/essay/findType',
    method: 'get',
    params: parems
  })
}

export function getfindByTitle2 (parems) {
  return request({
    url: '/zihui/essay/findByTitle2',
    method: 'get',
    params: parems
  })
}
// 上传图片之后获得文章内容
export function getfindByTitle3 (parems) {
  return request({
    url: '/zihui/essay/picture',
    method: 'get',
    params: parems
  })
}

export function getType1 () {
  return request({
    url: '/zihui/shucai/getType1',
    method: 'get'
  })
}

export function getType2 (data) {
  return request({
    url: '/zihui/shucai/getType2',
    method: 'get',
    params: data
  })
}
export function getContent (data) {
  return request({
    url: '/zihui/shucai/findType2Bytype1',
    method: 'get',
    params: data
  })
}
