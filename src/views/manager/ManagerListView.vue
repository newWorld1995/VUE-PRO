<template>
  <div class="managerlist-container">
    <div class="header">
      <el-button @click="addManagerBtn" type="primary">
        添加管理员 <el-icon class="el-icon--right"><Plus /></el-icon>
      </el-button>
    </div>
    <el-table
      max-height="600"
      :data="computedTableData"
      style="width: 100%"
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="adminname" label="账号" />
      <el-table-column prop="role" label="权限">
        <template #default="scope">
          <el-tag :type="scope.row.role === 1 ? '' : 'success'">{{
            scope.row.role === 1 ? '管理员' : '超级管理员'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.adminid)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 此处是分页器 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    />
    <!-- 右侧的抽屉 -->
    <el-drawer v-model="showDrawer">
      <template #header>
        <h4>{{ interfaceType === 1 ? '请添加管理员' : '请编辑管理员' }}</h4>
      </template>
      <template #default>
        <el-form label-width="80px" :model="formData" style="max-width: 460px">
          <el-form-item label="账户">
            <el-input v-model="formData.adminname" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="formData.role"
              class="m-2"
              placeholder="请选择角色"
              size="large"
            >
              <el-option label="管理员" value="1"></el-option>
              <el-option label="超级管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限">
            <el-tree
              ref="treeRef"
              :data="menus"
              show-checkbox
              node-key="path"
              default-expand-all
              :default-checked-keys="defaultCheckedKeys"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button
            v-if="interfaceType === 1"
            type="primary"
            @click="confirmAddClick"
            >添加</el-button
          >
          <el-button v-else type="primary" @click="confirmUpdateClick"
            >修改</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// 引入 api 中获取管理员列表的请求方法
import {
  getManagerList,
  deleteManagerById,
  addManagerAdd,
  updateManagerUpdate
} from '@/api/user'
import { Plus } from '@element-plus/icons-vue'
import { routes } from '@/router'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default defineComponent({
  components: {
    Plus
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    cancelClick() {
      console.log('取消了....')
    },
    addManagerBtn() {
      this.clearManager()
      this.interfaceType = 1
      this.showDrawer = true
    },
    // 清空之前的form
    clearManager() {
      this.formData.adminname = ''
      this.formData.role = '1'
      this.formData.password = ''
      this.formData.checkedKeys = []
      // 如果树形控件tree存在的时候, 再去清空选中的情况
      this.$refs.treeRef?.setCheckedKeys([])
    },
    //添加管理员的确认按钮
    addManager() {
      // 调用接口
      addManagerAdd(this.formData).then((res) => {
        console.log('res---->' + res)
        this.showDrawer = false
        this.getTableList() // 重新请求新的管理员列表
      })
    },
    confirmUpdateClick() {
      this.setCheckedKeys()
      updateManagerUpdate(this.formData).then(() => {
        this.getTableList()
        this.showDrawer = false
        // 如果修改的正好是当前用户的话, 需要将vuex的userInfo更改
        if (this.formData.adminname === this.userInfo.adminname) {
          // 需要将userInfo更新
          this.userInfo.checkedkeys = this.formData.checkedKeys
          this.updateUserInfo(this.userInfo)
        }
      })
    },
    confirmAddClick() {
      this.setCheckedKeys()
      this.addManager()
    },
    setCheckedKeys() {
      let list = this.$refs.treeRef.getCheckedNodes(true)
      const tempList = []
      const result = []
      list.forEach((item) => {
        const parent = this.menus.find((mitem) => {
          return mitem.children.some((child) => child.label === item.label)
        })
        if (!tempList.includes(parent.label)) {
          tempList.push(parent.label)
          result.push({
            label: parent.label,
            path: parent.path,
            children: [item]
          })
        } else {
          console.log('---result', result)
          // result.find(item=>{
          //   console.log(item.label,parent.label,item.label===parent.label)
          // })
          result.find((item) => item.label === parent.label).children.push(item)
        }
      })
      console.log(list, result)
      this.formData.checkedKeys = result
    },

    handleEdit(row) {
      this.interfaceType = 2 // 编辑管理员
      this.showDrawer = true
      this.formData.adminname = row.adminname
      this.formData.password = row.password
      this.formData.role = row.role + ''
      // 设置默认的tree选中
      const checkedKeys = []
      row.checkedKeys.forEach((parent) => {
        parent.children.forEach((child) => {
          checkedKeys.push(child.path)
        })
      })
      this.defaultCheckedKeys = checkedKeys // ['managerlist'] (node-keys='path字段')
      if (this.$refs.treeRef) {
        // 后续每次点击编辑按钮的时候, 重置为之前的样子
        this.$refs.treeRef.setCheckedKeys(checkedKeys)
      }
      console.log(row)
    },
    handleDelete(adminid) {
      deleteManagerById({ adminid }).then((res) => {
        console.log(res)
        // this.currentPage = 1 //删除完毕后回到第一页
        this.getTableList() //重新请求后台管理员列表数据进行展示
      })
    },
    getTableList() {
      getManagerList().then((res) => {
        this.tableData = res.data || []
      })
    },
    initMenus() {
      const cloneRoutes = _.cloneDeep(this.menus)
      cloneRoutes[0].children.pop()
      this.menus = cloneRoutes
    }
  },
  computed: {
    ...mapState(['userInfo']),
    computedTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    }
  },
  data() {
    return {
      interfaceType: 1, // 增加管理员
      defaultCheckedKeys: [], // 默认选中的keys
      menus: routes[0].children,
      formData: {
        adminname: '',
        password: '',
        role: '1',
        checkedKeys: []
      },
      showDrawer: false, // 默认不会显示右侧抽屉
      currentPage: 1, //当前的页码
      pageSize: 20, //每一页的条数
      headerCellStyle: {
        color: 'rgba(0,0,0,0.85)',
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'center',
        background: '#f8f8f8',
        height: '60px',
        borderRight: '1px solid #f0f0f0',
        transition: 'background .3s ease'
      },
      tableData: []
    }
  },
  created() {
    this.initMenus()
    this.getTableList()
  }
})
</script>

<style lang="scss" scoped>
.managerlist-container {
  height: 100%;
  background-color: white;
  padding: 24px;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.header {
  margin-bottom: 24px;
}
</style>
