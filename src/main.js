import { createApp } from 'vue'
import App from './App.vue'
// 引入vue-router的实例, 进行use使用
import router from '@/router/index'
// 引入vuex的实例, 进行use使用
import store from './store/index'
// 引入element-plus的默认的css样式文件
// import 'element-plus/dist/index.css'
// 引入重置样式
import 'normalize.css'
createApp(App).use(router).use(store).mount('#app')
