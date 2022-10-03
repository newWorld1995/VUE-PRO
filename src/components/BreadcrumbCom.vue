<template>
  <el-breadcrumb separator="/" style="margin-bottom: 10px">
    <el-breadcrumb-item
      v-for="item in crumbList"
      :key="item"
      :to="{ name: item.name }"
      >{{ item.label }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
import { defineComponent } from 'vue'
import { routes } from '@/router'
import { mapMutations } from 'vuex'

export default defineComponent({
  data() {
    this.routesMap = new Map() // 初始化key-value的map
    this.initRouteMap(routes) // 每次路由改变之前动态给routesMap赋值数据
    return {
      crumbList: []
    }
  },
  methods: {
    ...mapMutations(['updateCurrentPath']),
    initRouteMap(routes) {
      routes.forEach((route) => {
        this.routesMap.set(route.name, route.label)
        if (route.children) {
          this.initRouteMap(route.children)
        }
      })
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        console.log('watch监听当前的路由-------------->', route)
        this.updateCurrentPath(route.path)
        this.crumbList = route.matched.map((item) => {
          return {
            name: item.name,
            label: this.routesMap.get(item.name)
          }
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
