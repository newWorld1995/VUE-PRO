import request from '@/service'
export function getProList(data) {
  return request({
    url: '/pro/list',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 更新是否秒杀, 是否售卖. 是否推荐的接口
// @params
// data = {proid,type,flag}
export function updateProFlag(data) {
  return request({
    url: '/pro/updateFlag',
    method: 'post',
    data
  })
}

// 获取秒杀或者推荐的列表
export function showdata(data) {
  return request({
    url: '/pro/showdata',
    method: 'post',
    data
  })
}

// 筛选的接口
// data = {category:'手机',search:'iphone'}
export function searchPro(data) {
  return request({
    url: '/pro/searchPro',
    method: 'post',
    data
  })
}

// 获取商品的所有类别
export function getCategory() {
  return request({
    url: '/pro/getCategory',
    method: 'get'
  })
}
