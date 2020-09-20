import request from '@/utils/request'

// 收藏文章
export function collectComposition (parems) {
  return request({
    url: '/plat/collect',
    // url: '/zihui/plat/collect',
    method: 'get',
    params: parems
  })
}
