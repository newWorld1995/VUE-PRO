import request from '@/service'

// 管理员登录的post接口
// login({adminname:'admin',password:'123456'})
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 获取管理员列表信息展示
export function getManagerList() {
  return request({
    url: '/admin/list',
    method: 'get'
  })
}

// 根据管理员的id进行删除操作
export function deleteManagerById(data) {
  return request({
    url: '/admin/delete',
    method: 'post',
    data
  })
}

// 调用添加管理员接口方法

export function addManagerAdd(data) {
  return request({
    url: '/admin/add',
    method: 'post',
    data
  })
}

// 修改管理员信息的接口

export function updateManagerUpdate(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}
