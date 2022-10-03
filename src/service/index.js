import axios from 'axios'
import router from '@/router'
// 给axios设置一些默认行为
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
  case 'development':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
}

// 设置超时时间
axios.defaults.timeout = 5000
// 设置跨域是否需要携带凭证
axios.defaults.withCredentials = false

// 请求之前的拦截器
axios.interceptors.request.use((config) => {
  // 后端返回token令牌, 前端需要将token存入本地存储
  let token = localStorage.getItem('token')
  token && (config.headers.token = token)
  return config
})

// 设置响应之后的拦截器
axios.interceptors.response.use((response) => {
  if (response.data?.data?.token) {
    localStorage.setItem('token', response.data.data.token)
  }
  // 全局的弹窗
  ElMessage({
    type: response?.data?.code === '200' ? 'success' : 'error',
    message: response?.data?.message
  })
  // token过期
  if (response.data?.code === '10119') {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return response.data
})

export default axios
