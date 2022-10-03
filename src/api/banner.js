import request from '@/service'
export function getBannerList(data) {
  return request({
    url: '/banner/list',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 根据bannerid进行删除单条数据
export function deleteBannerById(data) {
  return request({
    url: '/banner/delete',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 插入一张图片
export function bannerAdd(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}
