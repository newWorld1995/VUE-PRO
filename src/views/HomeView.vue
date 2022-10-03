<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo-box">
        <el-image style="width: 32px; height: 32px" :src="imgUrl"></el-image>
        <h2 v-show="!flag">新世界后台</h2>
      </div>
      <MenuComp :isCollapse="flag" />
    </el-aside>
    <el-container>
      <el-header>
        <el-icon @click="flag = !flag" :size="30">
          <component :is="computedFlag"></component>
        </el-icon>
        <div class="avatar-box">
          <el-space :size="16">
            <span>欢迎您: {{ userInfo.adminname }}</span>
            <el-dropdown>
              <el-avatar :size="30" :src="circleUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/set')"
                    >设置</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleLogout"
                    >退出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-header>
      <el-main>
        <!-- 调用面包屑导航 -->
        <BreadcrumbComVue></BreadcrumbComVue>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'
// 引入 icon 图标
import { Expand, Fold } from '@element-plus/icons-vue'
// 引入 menu 组件
import MenuComp from '@/components/MenuComp.vue'
// 引入 图片
import imgUrl from '@/assets/bgimg.webp'

// 引入 vuex 中的方法
import { mapMutations, mapState } from 'vuex'
//  引入 面包屑导航组件
import BreadcrumbComVue from '../components/BreadcrumbCom.vue'
export default defineComponent({
  components: {
    Expand,
    Fold,
    MenuComp,
    BreadcrumbComVue
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    handleLogout() {
      // 需要将本地存储的内容清空
      localStorage.removeItem('token')
      // 需要将vuex的用户信息清空
      this.updateUserInfo({})
      // 编程式导航跳转登录页面
      this.$router.push('/login')
    }
  },
  data() {
    return {
      flag: false,
      imgUrl,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: {
    ...mapState(['userInfo']),
    asideWidth() {
      return !this.flag ? '200px' : '64px'
    },
    computedFlag() {
      switch (this.flag) {
        case true:
          return 'Expand'
        case false:
          return 'Fold'
        default:
          return 'Expand'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-box {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
h2 {
  font-size: 20px;
  color: #fff;
}
.el-image {
  margin-right: 20px;
}
.el-container {
  height: 100%;
  background-color: #dfe6e9;
  .el-aside {
    width: v-bind(asideWidth);
    background-color: rgba($color: #1c0224, $alpha: 1);
    transition: all 0.25s;
  }
  .el-header {
    background-color: #7f8fa6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
