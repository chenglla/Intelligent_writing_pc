import request from '@/utils/request'

export function login (parems) {
  return request({
    url: '/login',
    // url: '/zihui/login',
    method: 'post',
    params: parems
  })
}
