<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#1c0224"
    :default-active="currentPath"
    text-color="#fff"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><IconMenu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu
      v-for="item in userInfo.checkedkeys"
      :index="'/' + item.path"
      :key="item.path"
    >
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :index="`/${item.path}/${child.path}`"
        :key="child.path"
        >{{ child.label }}</el-menu-item
      >
    </el-sub-menu>
    <!-- <el-sub-menu index="/manager">
      <template #title>
        <el-icon><location /></el-icon>
        <span>账户管理</span>
      </template>
      <el-menu-item index="/manager/managerlist">管理员列表</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-sub-menu> -->
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue'
import { Location, Menu as IconMenu } from '@element-plus/icons-vue'
import { mapState } from 'vuex'

export default defineComponent({
  computed: {
    ...mapState(['userInfo', 'currentPath'])
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Location,
    IconMenu
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
