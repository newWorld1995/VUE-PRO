import request from '@/service'
export function simpleData() {
  return request({
    url: '/data/simpleData',
    method: 'get'
  })
}
