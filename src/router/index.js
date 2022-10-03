import { createRouter, createWebHashHistory } from 'vue-router'
export const routes = [
  {
    label: '首页',
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        label: '轮播图管理',
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/banner/BannerIndexView.vue'),
        children: [
          {
            label: '轮播图列表',
            path: 'bannerlist',
            name: 'bannerlist',
            component: () => import('@/views/banner/BannerListView.vue')
          },
          {
            label: '添加轮播图',
            path: 'banneradd',
            name: 'banneradd',
            component: () => import('@/views/banner/BannerAddView.vue')
          }
        ]
      },
      {
        label: '账户管理',
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/manager/ManagerIndexView.vue'),
        children: [
          {
            label: '管理员列表',
            path: 'managerlist',
            name: 'managerlist',
            component: () => import('@/views/manager/ManagerListView.vue')
          }
        ]
      },
      {
        path: 'production',
        name: 'production',
        label: '产品管理',
        component: () => import('@/views/production/ProductionIndexView.vue'),
        children: [
          {
            path: 'productionlist',
            name: 'productionlist',
            label: '产品列表',
            component: () => import('@/views/production/ProductionListView.vue')
          },
          {
            path: 'secskilllist',
            name: 'secskilllist',
            label: '秒杀列表',
            component: () =>
              import('@/views/production/ProductionSecListView.vue')
          },
          {
            path: 'recommendlist',
            name: 'recommendlist',
            label: '推荐列表',
            component: () =>
              import('@/views/production/ProductionRecommendListView.vue')
          },
          {
            path: 'categorylist',
            name: 'categorylist',
            label: '筛选列表',
            component: () =>
              import('@/views/production/ProductionCategoryListView.vue')
          }
        ]
      },
      {
        label: '地图管理',
        path: 'map',
        name: 'map',
        component: () => import('@/views/map/MapIndexView.vue'),
        children: [
          {
            label: '地图展示',
            path: 'maplist',
            name: 'maplist',
            component: () => import('@/views/map/MapListView.vue')
          }
        ]
      },
      {
        label: '图标管理',
        path: 'echarts',
        name: 'echarts',
        component: () => import('@/views/echarts/EchartsIndexView.vue'),
        children: [
          {
            label: '图表展示',
            path: 'echartslist',
            name: 'echartslist',
            component: () => import('@/views/echarts/EchartsListView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    label: '登录',
    component: () => import('@/views/LoginView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加前置路由守卫拦截登录
const isLogin = () => {
  return !!localStorage.getItem('token') // 如果token不存在或者token=''|undefined|false ---> false
}

router.beforeEach((to) => {
  if (to.name === 'login') {
    // 如果用户登录了，再去访问登录页面的时候，需要回到首页
    if (isLogin()) {
      ElMessage('登录状态有效，不需要重复登录了')
      return { name: 'home' }
    }
  } else if (to.name === 'home') {
    if (!isLogin()) {
      // 如果用户登录了，清空了token，需要回到登录页面了
      return { name: 'login' }
    }
  }
})

export default router
