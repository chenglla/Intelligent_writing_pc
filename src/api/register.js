import request from '@/utils/request'

// 注册
export function register (parems) {
  return request({
    url: '/register',
    // url: '/zihui/register',
    method: 'post',
    params: parems
  })
}
